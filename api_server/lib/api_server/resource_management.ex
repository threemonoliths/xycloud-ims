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
    |> query_like(params, "name")
    |> query_order_desc_by(params, "inserted_at")
    |> query_preload([:resource_details])
    |> get_pagination(params)
  end
  
end
