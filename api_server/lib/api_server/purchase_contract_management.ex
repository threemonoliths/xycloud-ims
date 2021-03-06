defmodule ApiServer.PurchaseContractManagement do
  @moduledoc """
  The ContractManagement context.
  """

  import Ecto.Query, warn: false
  alias ApiServer.Repo

  alias ApiServer.PurchaseContractManagement.PurchaseContract
  alias ApiServer.PurchaseContractManagement.PurchaseContractDetail
  alias ApiServer.MessageReminding.Message
  use ApiServer.BaseContext

  
  defmacro __using__(_opts) do
    quote do
      import ApiServer.PurchaseContractManagement
      use ApiServer.BaseContext
      alias ApiServer.PurchaseContractManagement.PurchaseContract
      alias ApiServer.PurchaseContractManagement.PurchaseContractDetail
    end
  end

  def page(params) do 
    PurchaseContract
    |> query_like(params, "cname")
    |> query_like(params, "comments")
    |> query_equal(params, "status")
    |> query_equal(params, "project_id")
    |> query_by_start_time(params)
    |> query_by_end_time(params)
    |> query_order_desc_by(params, "inserted_at")
    |> query_preload([:purchase_contract_details])
    |> query_preload([:project])
    |> get_pagination(params)
  end

  def find_all(params) do 
    PurchaseContract
    |> query_like(params, "cname")
    |> query_order_desc_by(params, "inserted_at")
    |> query_preload([:purchase_contract_details])
    |> Repo.all
  end

  # 定时执行，获取应收款信息（提前7天提醒），以供发送消息提醒
  def get_payable_message() do
    # 获取符合条件的明细:details
    now = Timex.now("Asia/Shanghai")
    date_after_6days = now
    |> Timex.shift(days: 0)
    date_after_7days = now
    |> Timex.shift(days: 365)
    details = PurchaseContractDetail
    |> query_greater_or_equal_than("invoice_date", date_after_6days)
    |> query_less_than("invoice_date", date_after_7days)
    |> query_preload([:purchase_contract])
    |> Repo.all

    # 判断消息是否重复，组装消息，并持久化至数据库
    details
    |> Enum.map(fn d ->
      ApiServer.MessageReminding.is_exist(d.issue_name, "payable")
      |> case do
        false ->
            datetime = ApiServer.Utils.DatetimeHandler.get_now_str
            body = "新的应付：" <> "采购合同《" <> d.purchase_contract.cname <> "》有应付款项" <> Float.to_string(d.invoice_amount, decimals: 2) <> "元"
            Message.changeset(%Message{}, 
            %{
              "type"  => "payable", 
              "body" => body, 
              "datetime" => datetime,
              "object_name" => d.issue_name,
              "object_type" => "payable"})
            |> Repo.insert
            ApiServerWeb.Endpoint.broadcast "reminding:contract", "new_msg", %{ messages: [%{ body: body, datetime: datetime }]} 
        true -> nil
      end
    end)
  end

   # 获取年度应收款信息
   def get_receivable_yearly(date_str) do
    # date = Timex.now()
    # 取一年的所有合同明细 details
    date_str
    date = date_str
    |> Timex.parse!("%Y-%m-%d", :strftime)
    start_time = Timex.beginning_of_month(date)
    end_time = Timex.end_of_month(date)
    details = 
    PurchaseContractDetail
    |> query_greater_or_equal_than("invoice_date", start_time)
    |> query_less_or_equal_than("invoice_date", end_time)
    |> query_preload([:purchase_contract])
    |> Repo.all
    # 分月统计
    |> Enum.group_by(fn d -> d.invoice_date.month end )
    |> Enum.map(fn {k, v} -> 
      {k, Enum.reduce(v, 0, fn d, acc -> d.invoice_amount + acc end)} 
    end)
    |> Enum.map(fn {k,v} -> {k, Float.to_string(v, decimals: 2)} end)
    |> Enum.map(fn el->
      el|>Tuple.to_list()
    end)
    |>List.first()
  end


  # 通过起始时间设置查询条件
  defp query_by_start_time(query, params) do 
    params
    |> Map.get("start_time")
    |> case do
      nil -> query
      start_time -> 
        query
        |> query_greater_or_equal_than("sign_date", start_time)
    end
  end

  # 通过结束时间设置查询条件
  defp query_by_end_time(query, params) do
    params
    |> Map.get("end_time")
    |> case do
      nil -> query
      start_time -> 
        query
        |> query_less_or_equal_than("sign_date", start_time)
    end
  end

end
