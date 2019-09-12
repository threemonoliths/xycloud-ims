defmodule ApiServer.TmplManagement do
  @moduledoc """
  The TmplManagement context.
  """

  alias ApiServer.TmplManagement.Tmpl

  use ApiServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import ApiServer.TmplManagement
      use ApiServer.BaseContext
      alias ApiServer.TmplManagement.Tmpl
    end
  end

  def page(params) do 
    Tmpl
    |> query_like(params, "name")
    |> query_like(params, "comments")
    |> query_order_desc_by(params, "inserted_at")
    |> get_pagination(params)
  end
end
