defmodule ApiServer.ResourceManagement do
  @moduledoc """
  The ResourceManagement context.
  """
  import Ecto.Query, warn: false
  alias ApiServer.Repo

  alias ApiServer.ResourceManagement.Resource
  alias ApiServer.ResourceManagement.ResourceDetail
  alias ApiServer.MessageReminding.Message
  use ApiServer.BaseContext

  defmacro __using__(_opts) do
    quote do 
      import ApiServer.ResourceManagement
      use ApiServer.BaseContext
      alias ApiServer.ResourceManagement.Resource
      alias ApiServer.ResourceManagement.ResourceDetail
    end
  end

  def page(params) do  
    Resource
    |> query_like(params, "ip")
    |> query_equal(params, "client_id")
    |> query_equal(params, "contract_id")
    |> query_order_desc_by(params, "inserted_at")
    |> query_preload([:resource_details])
    |> query_preload([:contract])
    |> query_preload([:client])
    |> get_pagination(params)
  end

  def find_all(params) do 
    Resource
    |> query_like(params, "name")
    |> query_order_desc_by(params, "inserted_at")
    |> query_preload([:resource_details])
    |> query_preload([:contract])
    |> query_preload([:client])
    |> Repo.all
  end
  
end
