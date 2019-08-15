defmodule ApiServerWeb.AuthAdminPlug do
  import Plug.Conn

  def auth_admin(conn, _opts) do
    resource = ApiServerWeb.Guardian.Plug.current_resource(conn)
    if is_nil(resource) do
      conn |> auth_admin_error
    else
      case resource.is_admin do
        true -> conn
        false -> conn |> auth_admin_error
      end
    end
  end

  defp auth_admin_error(conn) do
    body = Poison.encode!(%{error: "Permission denied!"})
    send_resp(conn, 401, body)
  end
end