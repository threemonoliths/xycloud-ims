defmodule ApiServerWeb.SupplierControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.SupplierManagement
  alias ApiServer.SupplierManagement.Supplier

  @create_attrs %{
    sname: "some sname"
  }
  @update_attrs %{
    sname: "some updated sname"
  }
  @invalid_attrs %{sname: nil}

  def fixture(:supplier) do
    {:ok, supplier} = SupplierManagement.create_supplier(@create_attrs)
    supplier
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all suppliers", %{conn: conn} do
      conn = get(conn, Routes.supplier_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create supplier" do
    test "renders supplier when data is valid", %{conn: conn} do
      conn = post(conn, Routes.supplier_path(conn, :create), supplier: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.supplier_path(conn, :show, id))

      assert %{
               "id" => id,
               "sname" => "some sname"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.supplier_path(conn, :create), supplier: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update supplier" do
    setup [:create_supplier]

    test "renders supplier when data is valid", %{conn: conn, supplier: %Supplier{id: id} = supplier} do
      conn = put(conn, Routes.supplier_path(conn, :update, supplier), supplier: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.supplier_path(conn, :show, id))

      assert %{
               "id" => id,
               "sname" => "some updated sname"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, supplier: supplier} do
      conn = put(conn, Routes.supplier_path(conn, :update, supplier), supplier: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete supplier" do
    setup [:create_supplier]

    test "deletes chosen supplier", %{conn: conn, supplier: supplier} do
      conn = delete(conn, Routes.supplier_path(conn, :delete, supplier))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.supplier_path(conn, :show, supplier))
      end
    end
  end

  defp create_supplier(_) do
    supplier = fixture(:supplier)
    {:ok, supplier: supplier}
  end
end
