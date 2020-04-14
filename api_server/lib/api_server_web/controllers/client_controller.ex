defmodule ApiServerWeb.ClientController do
  
  use ApiServerWeb, :controller
  use ApiServer.ClientManagement
  use Ecto.Schema
  action_fallback ApiServerWeb.FallbackController

 
  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  # 设定no编号
  def no(conn, params) do
    case no = getno() do
      nil->
        json conn, %{no: getDate()<>"01"}
      _->
        if String.slice(to_string(no),0..7) == getDate() do
            no = String.to_integer(no)+1 |> Integer.to_string()
            json conn, %{no: no}
        else 
            no = getDate()<>"01"
            json conn, %{no: no}
        end
        
    end
  end

def getDate() do
  case elem(:calendar.local_time(),0) do
    {y,m,d} when m < 10 and d < 10 ->
      Integer.to_string(y)<>"0"<>Integer.to_string(m)<>"0"<>Integer.to_string(d)
    {y,m,d} when m < 10 and d >= 10 ->
      Integer.to_string(y)<>"0"<>Integer.to_string(m)<>Integer.to_string(d)
    {y,m,d} when m >= 10 and d < 10 -> 
      Integer.to_string(y)<>Integer.to_string(m)<>"0"<>Integer.to_string(d)
    {y,m,d} ->
      Integer.to_string(y)<>Integer.to_string(m)<>Integer.to_string(d)
  end
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
