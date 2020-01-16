defmodule ApiServerWeb.ContractController do
  use ApiServerWeb, :controller

  use ApiServer.ContractManagement

  alias Guardian.Permissions.Bitwise
  import ApiServerWeb.Permissions, only: [need_perms: 1]

  action_fallback ApiServerWeb.FallbackController

  # plug Bitwise, need_perms([:delete]) when action in [:delete]
  # plug Bitwise, need_perms([:read]) when action in [:index]
  # plug Bitwise, need_perms([:write]) when action in [:create, :update]

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"contract" => contract_params}) do
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
  def get_receivable_by_year(conn, _) do
    json conn, get_receivable_yearly()
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

  defp get_details_changesets(contract_params) do
    case Map.get(contract_params, "contract_details") do
      nil -> []
      list ->
        list 
        |> Enum.map(fn(el) -> ContractDetail.changeset(%ContractDetail{}, el) end)
    end
  end


end