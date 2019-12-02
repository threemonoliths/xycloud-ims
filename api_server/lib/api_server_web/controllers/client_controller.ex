defmodule ApiServerWeb.ClientController do
  
  use ApiServerWeb, :controller
  use ApiServer.ClientManagement
  import ApiServerWeb.Permissions, only: [need_perms: 1]
  alias Guardian.Permissions.Bitwise

  action_fallback ApiServerWeb.FallbackController


  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"client" => client_params}) do
    client_changeset = Client.changeset(%Client{}, client_params)
    with {:ok, %Client{} = client} <- save_create(client_changeset) do
      conn
      |> render("show.json", client: client)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, client} <- get_by_id(Client, id) do
      render(conn, "show.json", client: client)
    end
  end

  def update(conn, %{"id" => id, "client" => client_params}) do
    with {:ok, client} <- get_by_id(Client, id) do
      client_changeset = Client.changeset(client, client_params)
      with {:ok, %Client{} = client} <- save_update(client_changeset) do
        render(conn, "show.json", client: client)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Client{} = client} <- delete_by_id(Client, id) do
      render(conn, "show.json", client: client)
    end
  end
end
