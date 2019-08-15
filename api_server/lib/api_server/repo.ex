defmodule ApiServer.Repo do
  use Ecto.Repo,
    otp_app: :api_server,
    adapter: Ecto.Adapters.Postgres
  use Scrivener, page_size: 10
end
