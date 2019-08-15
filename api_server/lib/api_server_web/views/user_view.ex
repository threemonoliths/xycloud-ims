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
      perms_number: user.perms_number |> resolve_perms
    }
  end

  defp resolve_perms(perms_number) do
    perms_number
  end
end
