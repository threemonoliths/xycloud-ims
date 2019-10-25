defmodule ApiServerWeb.SupplierView do
  use ApiServerWeb, :view
  alias ApiServerWeb.SupplierView 

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, SupplierView, "supplier.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{supplier: supplier}) do
    %{data: render_one(supplier, SupplierView, "supplier.json")}
  end 

  def render("supplier.json", %{supplier: supplier}) do
    %{
      id: supplier.id,
      sname: supplier.sname,
      contact: supplier.contact,
      contact_info: supplier.contact_info,
      invoice: supplier.invoice,
      comments: supplier.comments
    } 
  end
end
