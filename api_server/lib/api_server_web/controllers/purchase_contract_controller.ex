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

end