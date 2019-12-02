defmodule ApiServerWeb.ClientView do
  use ApiServerWeb, :view
  alias ApiServerWeb.ClientView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, ClientView, "client.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{client: client}) do
    %{data: render_one(client, ClientView, "client.json")}
  end

  def render("client.json", %{client: client}) do
    %{
      id: client.id,
      cname: client.cname,
      contact: client.contact,
      contact_info: client.contact_info,
      invoice: client.invoice,
      comments: client.comments
    } 
  end
end
