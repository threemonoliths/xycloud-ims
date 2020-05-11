defmodule ApiServerWeb.ContractController do
  use ApiServerWeb, :controller

  use ApiServer.ContractManagement
  use Ecto.Schema
  alias Guardian.Permissions.Bitwise
  alias ApiServerWeb.{ContractView,DateTimeHandler, Repo, ResolveAssociationRecursion,ChangesetView}
  import ApiServerWeb.Permissions, only: [need_perms: 1]
  import Plug.Conn
  action_fallback ApiServerWeb.FallbackController

  # plug Bitwise, need_perms([:delete]) when action in [:delete]
  # plug Bitwise, need_perms([:read]) when action in [:index]
  # plug Bitwise, need_perms([:write]) when action in [:create, :update]

  def index(conn, params) do
    IO.inspect page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"contract" => contract_params}) do
    contract_params = set_status(contract_params)
    contract_changeset = Contract.changeset(%Contract{}, contract_params)
    changeset_with_details = Ecto.Changeset.put_assoc(contract_changeset, :contract_details, get_details_changesets(contract_params))
    with {:ok, %Contract{} = contract} <- save_create(changeset_with_details) do
      conn
      |> render("show.json", contract: contract)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, contract} <- get_by_id(Contract, id, [:contract_details]) do
      render(conn, "show.json", contract: contract)
    end
  end

  def update(conn, %{"id" => id, "contract" => contract_params}) do
    with {:ok, contract} <- get_by_id(Contract, id, [:contract_details]) do
      contract_changeset = Contract.changeset(contract, contract_params)
      changeset_with_details = Ecto.Changeset.put_assoc(contract_changeset, :contract_details, get_details_changesets(contract_params))
      with {:ok, %Contract{} = contract} <- save_update(changeset_with_details) do
        render(conn, "show.json", contract: contract)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Contract{} = contract} <- delete_by_id(Contract, id, [:contract_details]) do
      render(conn, "show.json", contract: contract)
    end
  end

  # 查询年度中每个月应收金额
  def get_receivable_by_year(conn, %{ "date" => date}) do
    th=[:month, :amount]
    case get_receivable_yearly(date) do
      nil -> json conn, %{error: "无信息"}
      list ->
        details = Enum.zip(th,get_receivable_yearly(date)) |> Enum.into(%{})
        json conn, details
    end
  end

  defp get_details_changesets(contract_params) do
    IO.puts inspect ("-----------------------")
    case Map.get(contract_params, "contract_details") do
      nil -> []
      list ->
        list 
        |> Enum.map(fn(el) -> ContractDetail.changeset(%ContractDetail{}, el) end)
    end
  end

  defp get_details_changesets_import(contract_params) do
    IO.puts inspect ("-----------------------")
    case Map.get(contract_params, :contract_details) do
      nil -> []
      list ->
        list 
        |> Enum.map(fn(el) -> ContractDetail.changeset(%ContractDetail{}, el) end)
    end
  end

  # 将合同导出excel
  def export_excel(conn, params) do
    file_name = ApiServerWeb.ContractExporter.get_name
    path = ApiServerWeb.ContractExporter.get_path <> file_name
    find_all(params)
    |> ApiServerWeb.ContractExporter.export
    |> case do
      { :ok, _ } ->
        conn
        |> put_resp_content_type("application/octet-stream")
        |> put_resp_header("content-disposition", "attachment; filename=\"#{file_name}\"")
        |> Plug.Conn.send_file(200, path)
        |> halt()
      { _ , _ } ->
        json conn, %{error: "export failed!"}
    end
    
  end

  #将合同excel导入
  def import_excel(conn,params) do
    IO.puts("#######import#######")
    attachment = Map.get(params, "attachment")
    # path = String.replace(attachment.path,"/","\\")
    path = attachment.path
    th = [:cno,:cname,:party_a,:party_b,:sign_date,:expiry_date,:amount,:comments]
    th_details = [:issue_name, :invoice_amount, :actual_payment, :invoice_date, :payment_date]
    Xlsxir.multi_extract(path, 0)
    |>case do
      {:ok, pid} ->
        [head | tail] = pid |> Xlsxir.get_list
        contract = Enum.map(tail,fn c ->
            # 组装detail为map
            details_list = c -- hd Enum.chunk_every(c,8)
            details_map = details_list |> Enum.chunk_every(5) |> Enum.map(fn el ->
              Enum.zip(th_details,el) |> Enum.into(%{})
            end)
            contract_params = Enum.zip(th,c) |> Enum.into(%{}) |> Map.put(:contract_details, details_map)
            contract_changeset = Contract.changeset(%Contract{}, contract_params)
            changeset_with_details = Ecto.Changeset.put_assoc(contract_changeset, :contract_details, get_details_changesets_import(contract_params))
            {:ok,  %Contract{} = contract} = save_create(changeset_with_details)
          end)
            |> List.last |> Tuple.to_list |> List.last
        conn
          |> render("show.json", contract: contract)
      { :error , _ } ->
        msg = "请上传xlsx格式文件!"
        render(conn, "error.json", %{msg: msg})
    end
    IO.puts("#######import2#######")
  end

  # 如果时间最大的一条明细完成时间不为空，则需要置合同状态为已完成1，直接在参数中设置
  defp set_status(contract_params) do
    case Map.get(contract_params, "contract_details") do
      nil -> contract_params
      list ->
        latest_detail = list 
        |> Enum.max_by(fn c -> Map.get(c, "invoice_date") end)
        |> Map.get("payment_date")
        |> case do
          nil -> contract_params
          date -> 
            c = contract_params
            |> Map.get("contract")
            |> Map.put_new("status", 1)
            contract_params
            |> Map.update!("contract", c)
        end
      
    end
  end


end