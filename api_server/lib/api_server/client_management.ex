defmodule ApiServer.ClientManagement do
  @moduledoc """
  The ClientManagement context.
  """
  import Ecto.Query, warn: false
  alias ApiServer.Repo

  alias ApiServer.ClientManagement.Client
  alias ApiServer.ClientManagement.ClientDetail
  alias ApiServer.MessageReminding.Message
  use ApiServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import ApiServer.ClientManagement
      use ApiServer.BaseContext
      alias ApiServer.ClientManagement.Client
      alias ApiServer.ClientManagement.ClientDetail
    end
  end

  def page(params) do 
    Client
    |> query_like(params, "no")
    |> query_like(params, "name")
    |> query_like(params, "comments")
    |> query_order_desc_by(params, "inserted_at")
    |> query_preload([:client_details])
    |> get_pagination(params)
  end

  # def find_all(params) do 
  #   Client
  #   |> query_like(params, "name")
  #   |> query_like(params, "comments")
  #   |> query_order_desc_by(params, "inserted_at")
  #   |> query_preload([:client_details])
  #   |> Repo.all
  # end

end
