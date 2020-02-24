defmodule ApiServerWeb.PurchaseContractController do
  use ApiServerWeb, :controller

  use ApiServer.PurchaseContractManagement

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