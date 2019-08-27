defmodule ApiServerWeb.ProjectView do
  use ApiServerWeb, :view
  alias ApiServerWeb.ProjectView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, ProjectView, "project.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{project: project}) do
    %{data: render_one(project, ProjectView, "project.json")}
  end

  def render("project.json", %{project: project}) do
    %{
      id: project.id,
      pname: project.pname,
      comments: project.comments,
      date: project.date
    }
  end
end