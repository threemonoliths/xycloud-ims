defmodule ApiServerWeb.UserController do
  use ApiServerWeb, :controller

  import ApiServerWeb.AuthAdminPlug, only: [auth_admin: 2]
  use ApiServer.Accounts

  # plug :auth_admin
  #  when action in [:index, :create, :show, :update, :delete]
  action_fallback ApiServerWeb.FallbackController

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"user" => user_params}) do
    user_changeset = User.changeset(%User{}, user_params |> set_perm_number)
    with {:ok, %User{} = user} <- save_create(user_changeset) do
      render(conn, "show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, user} <- get_by_id(User, id) do
      render(conn, "show.json", user: user)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    {:ok, entity} = get_by_id(User, id)
    user_changeset = User.changeset(entity, user_params |> set_perm_number)
    with {:ok, %User{} = user} <- save_update(user_changeset) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %User{} = user} <- delete_by_id(User, id) do
      render(conn, "show.json", user: user)
    end
  end

  def permissions(conn, params) do
    render(conn, "permissions.json", params: params)
  end

  defp set_perm_number(user_params) do
    user_params
    |> Map.get("perms_number", nil) 
    |> case do
      nil -> 
        user_params
      [] -> 
        Map.update(user_params, "perms_number", 0, fn list -> 0 end)
      list -> 
        Map.update(user_params, "perms_number", 0, fn list -> 
          %{default: list}
          |> ApiServerWeb.Permissions.get_number_from_perms
          |> Map.get(:default)
        end)
    end
  end
end
