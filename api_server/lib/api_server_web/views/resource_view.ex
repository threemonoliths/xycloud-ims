defmodule ApiServerWeb.ResourceView do
  use ApiServerWeb, :view
  alias ApiServerWeb.{Resource,ResourceView}
  import Ecto.Query, only: [from: 2, preload: 3]
  import Ecto.Query.API, only: [like: 2]

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, ResourceView, "resource.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{resource: resource}) do
    %{data: render_one(resource, ResourceView, "resource.json")}
  end 

  def render("resource.json", %{resource: resource}) do
    %{
      id: resource.id,
      name: resource.name,
      server_name: resource.server_name,
      opening_type: resource.opening_type,
      class: resource.class,
      product_type: resource.product_type,
      cpu: resource.cpu,
      memory: resource.memory,
      storage: resource.storage,
      bandwidth: resource.bandwidth,
      storage_type: resource.storage_type,
      ip: resource.ip,
      client_id: resource.client_id,
      final_client: resource.final_client,
      applicant: resource.applicant,
      application_time: resource.application_time,
      opening_time: resource.opening_time,
      security_service: resource.security_service,
      backup_service: resource.backup_service,
      contract_id: resource.contract_id,
      details: rend_details(resource.resource_details)
    }
  end

  def rend_details(details) do
    details
    |> Enum.map(fn el -> 
      %{
        application_date: el.application_date,
        finish_date: el.finish_date,
        change: el.change,
        original_configuration: el.original_configuration,
        target_configuration: el.target_configuration,
        comments: el.comments,
      }
    end)
  end


  def render("error.json", %{msg: msg}) do
    %{error: msg}
  end
end
