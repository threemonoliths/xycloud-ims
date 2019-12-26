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

  def create(conn, %{ "user" => user_params}) do
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
    with {:ok, _} <- can_delete(conn, id), {:ok, %User{} = user} <- delete_by_id(User, id) do
      render(conn, "show.json", user: user)
    end
  end

  def set_self(conn, user_params_formdata) do
    {:ok, entity} = get_self(conn)
    user_changeset = User.changeset(entity, user_params_formdata |> set_perm_number)
    with {:ok, %User{} = user} <- save_update(user_changeset) do
      render(conn, "show.json", user: user)
    end
  end

  def set_self_password(conn, %{"password" => password, "new_password" => new_password}) do
    {:ok, entity} = get_self(conn)
    user_changeset = User.changeset(entity, %{"password" => new_password})
    with {:ok, user} <- ApiServerWeb.LoginController.check_pwd(entity.name, password),
    {:ok, %User{} = user} <- save_update(user_changeset) do
      render(conn, "show.json", user: user)
    end
  end

  # 获取所有权限
  def permissions(conn, params) do
    render(conn, "permissions.json", params: params)
  end

  defp get_self(conn) do
    ApiServerWeb.Guardian.Plug.current_resource(conn)
    |> case do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end

  # 判断要删除的用户是否为登陆用户
  defp can_delete(conn, id) do
    {:ok, current_user} = get_self(conn)
    cond do
      (Integer.to_string(current_user.id) != id) -> {:ok, current_user}
      true -> {:error, :can_not_delete}
    end
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
