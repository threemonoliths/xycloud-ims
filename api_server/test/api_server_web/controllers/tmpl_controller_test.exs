defmodule ApiServerWeb.TmplControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.TmplManagement
  alias ApiServer.TmplManagement.Tmpl

  @create_attrs %{
    name: "some name"
  }
  @update_attrs %{
    name: "some updated name"
  }
  @invalid_attrs %{name: nil}

  def fixture(:tmpl) do
    {:ok, tmpl} = TmplManagement.create_tmpl(@create_attrs)
    tmpl
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tmpls", %{conn: conn} do
      conn = get(conn, Routes.tmpl_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create tmpl" do
    test "renders tmpl when data is valid", %{conn: conn} do
      conn = post(conn, Routes.tmpl_path(conn, :create), tmpl: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.tmpl_path(conn, :show, id))

      assert %{
               "id" => id,
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.tmpl_path(conn, :create), tmpl: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update tmpl" do
    setup [:create_tmpl]

    test "renders tmpl when data is valid", %{conn: conn, tmpl: %Tmpl{id: id} = tmpl} do
      conn = put(conn, Routes.tmpl_path(conn, :update, tmpl), tmpl: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.tmpl_path(conn, :show, id))

      assert %{
               "id" => id,
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, tmpl: tmpl} do
      conn = put(conn, Routes.tmpl_path(conn, :update, tmpl), tmpl: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete tmpl" do
    setup [:create_tmpl]

    test "deletes chosen tmpl", %{conn: conn, tmpl: tmpl} do
      conn = delete(conn, Routes.tmpl_path(conn, :delete, tmpl))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.tmpl_path(conn, :show, tmpl))
      end
    end
  end

  defp create_tmpl(_) do
    tmpl = fixture(:tmpl)
    {:ok, tmpl: tmpl}
  end
end
