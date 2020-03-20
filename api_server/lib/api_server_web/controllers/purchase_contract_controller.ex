defmodule ApiServerWeb.PurchaseContractController do
  use ApiServerWeb, :controller

  use ApiServer.PurchaseContractManagement
  use Ecto.Schema
  alias Guardian.Permissions.Bitwise
  alias ApiServerWeb.{PurchaseContractView,DateTimeHandler, Repo, ResolveAssociationRecursion}
  import ApiServerWeb.Permissions, only: [need_perms: 1]

  action_fallback ApiServerWeb.FallbackController

  # plug Bitwise, need_perms([:delete]) when action in [:delete]
  # plug Bitwise, need_perms([:read]) when action in [:index]
  # plug Bitwise, need_perms([:write]) when action in [:create, :update]

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"purchase_contract" => purchase_contract_params}) do
    purchase_contract_params = set_status(purchase_contract_params)
    purchase_contract_changeset = PurchaseContract.changeset(%PurchaseContract{}, purchase_contract_params)
    changeset_with_details = Ecto.Changeset.put_assoc(purchase_contract_changeset, :purchase_contract_details, get_details_changesets(purchase_contract_params))
    with {:ok, %PurchaseContract{} = purchase_contract} <- save_create(changeset_with_details) do
      conn
      |> render("show.json", purchase_contract: purchase_contract)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, purchase_contract} <- get_by_id(PurchaseContract, id, [:purchase_contract_details]) do
      render(conn, "show.json", purchase_contract: purchase_contract)
    end
  end

  def update(conn, %{"id" => id, "purchase_contract" => purchase_contract_params}) do
    with {:ok, purchase_contract} <- get_by_id(PurchaseContract, id, [:purchase_contract_details]) do
      purchase_contract_changeset = PurchaseContract.changeset(purchase_contract, purchase_contract_params)
      changeset_with_details = Ecto.Changeset.put_assoc(purchase_contract_changeset, :purchase_contract_details, get_details_changesets(purchase_contract_params))
      with {:ok, %PurchaseContract{} = purchase_contract} <- save_update(changeset_with_details) do
        render(conn, "show.json", purchase_contract: purchase_contract)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %PurchaseContract{} = purchase_contract} <- delete_by_id(PurchaseContract, id, [:purchase_contract_details]) do
      render(conn, "show.json", purchase_contract: purchase_contract)
    end
  end

  def get_payable_by_year(conn, %{ "date" => date}) do
    json conn, get_payable_yearly(date)
  end

  defp get_details_changesets(purchase_contract_params) do
    case Map.get(purchase_contract_params, "purchase_contract_details") do
      nil -> []
      list ->
        list 
        |> Enum.map(fn(el) -> PurchaseContractDetail.changeset(%PurchaseContractDetail{}, el) end)
    end
  end

  defp get_details_changesets_import(purchase_contract_params) do
    case Map.get(purchase_contract_params, :purchase_contract_details) do
      nil -> []
      list ->
        list 
        |> Enum.map(fn(el) -> PurchaseContractDetail.changeset(%PurchaseContractDetail{}, el) end)
    end
  end

  # 如果时间最大的一条明细完成时间不为空，则需要置合同状态为已完成1，直接在参数中设置
  defp set_status(purchase_contract_params) do
    case Map.get(purchase_contract_params, "purchase_contract_details") do
      nil -> purchase_contract_params
      list ->
        latest_detail = list 
        |> Enum.max_by(fn c -> Map.get(c, "invoice_date") end)
        |> Map.get("payment_date")
        |> case do
          nil -> purchase_contract_params
          date -> 
            c = purchase_contract_params
            |> Map.get("purchase_contract")
            |> Map.put_new("status", 1)
            purchase_contract_params
            |> Map.update!("purchase_contract", c)
        end
      
    end
  end


  def export_excel(conn, params) do
    file_name = ApiServerWeb.PurchaseContractExporter.get_name
    path = ApiServerWeb.PurchaseContractExporter.get_path <> file_name
    find_all(params)
    |> ApiServerWeb.PurchaseContractExporter.export
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
    path = String.replace(attachment.path,"/","\\")
    th = [:cno,:cname,:party_a,:party_b,:sign_date,:expiry_date,:amount,:comments]
    th_details = [:issue_name, :invoice_amount, :actual_payment, :invoice_date, :payment_date]
    Xlsxir.multi_extract(path, 0)
    |>case do
      {:ok, pid} ->
        [head | tail] = pid |> Xlsxir.get_list
        purchase_contract = Enum.map(tail,fn c ->
            # 组装detail为map
            details_list = c -- hd Enum.chunk_every(c,8)
            details_map = details_list |> Enum.chunk_every(5) |> Enum.map(fn el ->
              Enum.zip(th_details,el) |> Enum.into(%{})
            end)
            purchase_contract_params = Enum.zip(th,c) |> Enum.into(%{}) |> Map.put(:purchase_contract_details, details_map)
            purchase_contract_changeset = PurchaseContract.changeset(%PurchaseContract{}, purchase_contract_params)
            changeset_with_details = Ecto.Changeset.put_assoc(purchase_contract_changeset, :purchase_contract_details, get_details_changesets_import(purchase_contract_params))
            {:ok, %PurchaseContract{} = purchase_contract} = save_create(changeset_with_details)
          end)
            |> List.last |> Tuple.to_list |> List.last
        conn
          |> render("show.json", purchase_contract: purchase_contract)
      { :error , _ } ->
        msg = "请上传xlsx格式文件!"
        render(conn, "error.json", %{msg: msg})
    end
    IO.puts("#######import2#######")
  end

end