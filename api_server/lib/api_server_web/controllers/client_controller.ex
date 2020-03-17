defmodule ApiServerWeb.ClientController do
  
  use ApiServerWeb, :controller
  use ApiServer.ClientManagement
  use Ecto.Schema
  action_fallback ApiServerWeb.FallbackController

 
  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"client" => client_params}) do
    client_changeset = Client.changeset(%Client{}, client_params)
    changeset_with_details = Ecto.Changeset.put_assoc(client_changeset, :client_details, get_details_changesets(client_params))
    with {:ok, %Client{} = client} <- save_create(changeset_with_details) do 
      conn
      |> render("show.json", client: client)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, client} <- get_by_id(Client, id, [:client_details]) do
      render(conn, "show.json", client: client)
    end
  end 

  def update(conn, %{"id" => id, "client" => client_params}) do
    with {:ok, client} <- get_by_id(Client, id, [:client_details]) do
      client_changeset = Client.changeset(client, client_params)
      changeset_with_details = Ecto.Changeset.put_assoc(client_changeset, :client_details, get_details_changesets(client_params))
      with {:ok, %Client{} = client} <- save_update(changeset_with_details) do
        render(conn, "show.json", client: client)
      end
    end
  end
 
  def delete(conn, %{"id" => id}) do
    with {:ok, %Client{} = client} <- delete_by_id(Client, id, [:client_details]) do
      render(conn, "show.json", client: client)
    end
  end


  defp get_details_changesets(client_params) do
    case Map.get(client_params, "client_details") do
      nil -> []
      list ->
        list 
        |> Enum.map(fn(el) -> ClientDetail.changeset(%ClientDetail{}, el) end)
    end
  end
  
end
