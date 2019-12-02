defmodule ApiServerWeb.SupplierController do

  use ApiServerWeb, :controller 
  use ApiServer.SupplierManagement
  import ApiServerWeb.Permissions, only: [need_perms: 1] 
  alias Guardian.Permissions.Bitwise

  action_fallback ApiServerWeb.FallbackController
 
  
  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"supplier" => supplier_params}) do
    supplier_changeset = Supplier.changeset(%Supplier{}, supplier_params)
    with {:ok, %Supplier{} = supplier} <- save_create(supplier_changeset) do
      conn
      |> render("show.json", supplier: supplier)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, supplier} <- get_by_id(Supplier, id) do
      render(conn, "show.json", supplier: supplier)
    end
  end

  def update(conn, %{"id" => id, "supplier" => supplier_params}) do
    with {:ok, supplier} <- get_by_id(Supplier, id) do
      supplier_changeset = Supplier.changeset(supplier, supplier_params)
      with {:ok, %Supplier{} = supplier} <- save_update(supplier_changeset) do
        render(conn, "show.json", supplier: supplier)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Supplier{} = supplier} <- delete_by_id(Supplier, id) do
      render(conn, "show.json", supplier: supplier)
    end
  end
end
