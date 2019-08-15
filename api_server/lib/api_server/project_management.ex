defmodule ApiServer.ProjectManagement do
  @moduledoc """
  The ProjectManagement context.
  """

  alias ApiServer.ProjectManagement.Project

  use ApiServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import ApiServer.ProjectManagement
      use ApiServer.BaseContext
      alias ApiServer.ProjectManagement.Project
    end
  end

  def page(params) do 
    Project
    |> query_like(params, "pname")
    |> query_like(params, "comments")
    |> query_order_desc_by(params, "inserted_at")
    |> get_pagination(params)
  end


end
