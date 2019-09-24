defmodule ApiServerWeb.UserView do
  use ApiServerWeb, :view
  alias ApiServerWeb.UserView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, UserView, "user.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      real_name: user.real_name,
      position: user.position,
      is_admin: user.is_admin,
      activedd: user.actived,
      perms_number: user.perms_number |> resolve_perms,
      avatar: user |> get_avatar,
    }
  end

  def render("permissions.json", %{params: _}) do
    %{
      all_perms: ApiServerWeb.Permissions.get_all_permissions 
      |> Map.get(:default)
    }
  end

  defp resolve_perms(perms_number) do
    %{default: perms_number}
    |> ApiServerWeb.Permissions.get_perms_from_number
    |> Map.get(:default)
  end

  # 获avatar图片url
  def get_avatar(user) do
    case user.avatar do
      nil -> ""
      avatar -> 
        url = ApiServer.Utils.StringHandler.take_prefix(ApiServer.UserAvatar.url({user.avatar, user}, :original),"/priv/static")  
        ApiServerWeb.Endpoint.static_url <> url
    end
  end

end
