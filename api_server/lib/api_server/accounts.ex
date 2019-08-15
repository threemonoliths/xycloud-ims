defmodule ApiServer.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias ApiServer.Repo

  alias ApiServer.Accounts.User
  use ApiServer.BaseContext

  
  defmacro __using__(_opts) do
    quote do
      import ApiServer.Accounts
      use ApiServer.BaseContext
      alias ApiServer.Accounts.User
    end
  end

  def page(params) do 
    User
    |> query_like(params, "name")
    |> query_like(params, "real_name")
    |> query_equal(params, "actived")
    |> query_order_desc_by(params, "inserted_at")
    |> get_pagination(params)
  end
end
