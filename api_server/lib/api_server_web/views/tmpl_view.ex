defmodule ApiServerWeb.TmplView do
  use ApiServerWeb, :view
  alias ApiServerWeb.TmplView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, TmplView, "tmpl.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{tmpl: tmpl}) do
    %{data: render_one(tmpl, TmplView, "tmpl.json")}
  end

  def render("tmpl.json", %{tmpl: tmpl}) do
    %{
      id: tmpl.id,
      name: tmpl.name,
      comments: tmpl.comments,
      file_name: tmpl.attachment && tmpl.attachment.file_name
    }
  end

end
