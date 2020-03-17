defmodule ApiServerWeb.ResourceController do

  use ApiServerWeb, :controller  
  use ApiServer.ResourceManagement
  import ApiServerWeb.Permissions, only: [need_perms: 1] 
  alias Guardian.Permissions.Bitwise
  use Ecto.Schema
  alias ApiServerWeb.{ResourceView,DateTimeHandler, Repo, ResolveAssociationRecursion}

  action_fallback ApiServerWeb.FallbackController
 
  
  def index(conn, params) do
    page = page(params) 
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"resource" => resource_params}) do
    resource_changeset = Resource.changeset(%Resource{}, resource_params)
    changeset_with_details = Ecto.Changeset.put_assoc(resource_changeset, :resource_details, get_details_changesets(resource_params))
    with {:ok, %Resource{} = resource} <- save_create(changeset_with_details) do 
      conn
      |> render("show.json", resource: resource)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, resource} <- get_by_id(Resource, id, [:resource_details]) do
      render(conn, "show.json", resource: resource)
    end
  end 

  def update(conn, %{"id" => id, "resource" => resource_params}) do
    with {:ok, resource} <- get_by_id(Resource, id, [:resource_details]) do
      resource_changeset = Resource.changeset(resource, resource_params)
      changeset_with_details = Ecto.Changeset.put_assoc(resource_changeset, :resource_details, get_details_changesets(resource_params))
      with {:ok, %Resource{} = resource} <- save_update(changeset_with_details) do
        render(conn, "show.json", resource: resource)
      end
    end
  end 
 
  def delete(conn, %{"id" => id}) do
    with {:ok, %Resource{} = resource} <- delete_by_id(Resource, id, [:resource_details]) do
      render(conn, "show.json", resource: resource)
    end
  end

  # 将合同导出excel
  def export_excel(conn, params) do
    
    file_name = ApiServerWeb.ResourceExporter.get_name
    path = ApiServerWeb.ResourceExporter.get_path <> file_name
    IO.puts("##########################")
    find_all(params)
    |> ApiServerWeb.ResourceExporter.export
    |> case do
      { :ok, _ } ->
        conn
        |> put_resp_content_type("application/octet-stream")
        |> put_resp_header("content-disposition", "attachment; filename=\"#{file_name}\"")
        |> Plug.Conn.send_file(200, path)
        |> halt()
      { _ , _ } ->
        json conn, %{error: "export failed!"}
    end
    
  end

  defp get_details_changesets(resource_params) do
    case Map.get(resource_params, "resource_details") do
      nil -> []
      list ->
        list 
        |> Enum.map(fn(el) -> ResourceDetail.changeset(%ResourceDetail{}, el) end)
    end
  end
end
