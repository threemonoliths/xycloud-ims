defmodule ApiServerWeb.ResourceControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.ResourceManagement
  alias ApiServer.ResourceManagement.Resource

  @create_attrs %{
    sname: "some sname"
  }
  @update_attrs %{
    sname: "some updated sname"
  }
  @invalid_attrs %{sname: nil}

  def fixture(:resource) do
    {:ok, resource} = ResourceManagement.create_resource(@create_attrs)
    resource
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all resources", %{conn: conn} do
      conn = get(conn, Routes.resource_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create resource" do
    test "renders resource when data is valid", %{conn: conn} do
      conn = post(conn, Routes.resource_path(conn, :create), resource: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.resource_path(conn, :show, id))

      assert %{
               "id" => id,
               "sname" => "some sname"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.resource_path(conn, :create), resource: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update resource" do
    setup [:create_resource]

    test "renders resource when data is valid", %{conn: conn, resource: %Resource{id: id} = resource} do
      conn = put(conn, Routes.resource_path(conn, :update, resource), resource: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.resource_path(conn, :show, id))

      assert %{
               "id" => id,
               "sname" => "some updated sname"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, resource: resource} do
      conn = put(conn, Routes.resource_path(conn, :update, resource), resource: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete resource" do
    setup [:create_resource]

    test "deletes chosen resource", %{conn: conn, resource: resource} do
      conn = delete(conn, Routes.resource_path(conn, :delete, resource))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.resource_path(conn, :show, resource))
      end
    end
  end

  defp create_resource(_) do
    resource = fixture(:resource)
    {:ok, resource: resource}
  end
end
