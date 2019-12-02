defmodule ApiServer.ClientManagement do
  @moduledoc """
  The ClientManagement context.
  """
 
  alias ApiServer.ClientManagement.Client

  use ApiServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import ApiServer.ClientManagement
      use ApiServer.BaseContext
      alias ApiServer.ClientManagement.Client
    end
  end

  def page(params) do 
    Client
    |> query_like(params, "cname")
    |> query_like(params, "comments")
    |> query_order_desc_by(params, "inserted_at")
    |> get_pagination(params)
  end

end
