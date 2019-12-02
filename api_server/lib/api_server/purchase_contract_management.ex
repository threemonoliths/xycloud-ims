defmodule ApiServer.PurchaseContractManagement do
  @moduledoc """
  The ContractManagement context.
  """

  import Ecto.Query, warn: false
  alias ApiServer.Repo

  alias ApiServer.PurchaseContractManagement.PurchaseContract
  use ApiServer.BaseContext

  
  defmacro __using__(_opts) do
    quote do
      import ApiServer.PurchaseContractManagement
      use ApiServer.BaseContext
      alias ApiServer.PurchaseContractManagement.PurchaseContract
      alias ApiServer.PurchaseContractManagement.PurchaseContractDetail
    end
  end

  def page(params) do 
    PurchaseContract
    |> query_like(params, "cname")
    |> query_like(params, "comments")
    |> query_order_desc_by(params, "inserted_at")
    |> query_preload([:purchase_contract_details])
    |> get_pagination(params)
  end
end
