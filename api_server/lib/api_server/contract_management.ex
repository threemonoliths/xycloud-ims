defmodule ApiServer.ContractManagement do
  @moduledoc """
  The ContractManagement context.
  """

  import Ecto.Query, warn: false
  alias ApiServer.Repo

  alias ApiServer.ContractManagement.Contract
  use ApiServer.BaseContext

  
  defmacro __using__(_opts) do
    quote do
      import ApiServer.ContractManagement
      use ApiServer.BaseContext
      alias ApiServer.ContractManagement.Contract
      alias ApiServer.ContractManagement.ContractDetail
    end
  end

  def page(params) do 
    Contract
    |> query_like(params, "cname")
    |> query_like(params, "comments")
    |> query_order_desc_by(params, "inserted_at")
    |> query_preload([:contract_details])
    |> get_pagination(params)
  end
end
