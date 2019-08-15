defmodule ApiServerWeb.AuthErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, _}, _opts) do
    body = Poison.encode!(%{error: "Permission denied!"})
    send_resp(conn, 401, body)
  end
end