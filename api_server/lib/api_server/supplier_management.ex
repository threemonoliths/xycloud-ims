defmodule ApiServer.SupplierManagement do
  @moduledoc """
  The SupplierManagement context.
  """

  alias ApiServer.SupplierManagement.Supplier

  use ApiServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import ApiServer.SupplierManagement
      use ApiServer.BaseContext
      alias ApiServer.SupplierManagement.Supplier
    end
  end

  def page(params) do  
    Supplier
    |> query_like(params, "sname")
    |> query_like(params, "comments")
    |> query_order_desc_by(params, "inserted_at")
    |> get_pagination(params)
  end
  
end
