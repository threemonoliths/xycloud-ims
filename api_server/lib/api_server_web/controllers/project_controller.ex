defmodule ApiServerWeb.ProjectController do
  use ApiServerWeb, :controller

  use ApiServer.ProjectManagement
  action_fallback ApiServerWeb.FallbackController

  import ApiServerWeb.Permissions, only: [need_perms: 1]
  alias Guardian.Permissions.Bitwise
  plug Bitwise, need_perms([:read]) when action in [:index, :show]

  def index(conn, params) do
    IO.inspect conn
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"project" => project_params}) do
    project_changeset = Project.changeset(%Project{}, project_params)
    with {:ok, %Project{} = project} <- save_create(project_changeset) do
      conn
      |> render("show.json", project: project)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, project} <- get_by_id(Project, id) do
      render(conn, "show.json", project: project)
    end
  end

  def update(conn, %{"id" => id, "project" => project_params}) do
    with {:ok, project} <- get_by_id(Project, id) do
      project_changeset = Project.changeset(project, project_params)
      with {:ok, %Project{} = project} <- save_update(project_changeset) do
        render(conn, "show.json", project: project)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Project{} = project} <- delete_by_id(Project, id) do
      render(conn, "show.json", project: project)
    end
  end
end