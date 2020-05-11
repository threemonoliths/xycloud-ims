# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :api_server,
  ecto_repos: [ApiServer.Repo]

# Configures the endpoint
config :api_server, ApiServerWeb.Endpoint,
  url: [host: "172.27.39.116"],
  secret_key_base: "KI1QW33ZpSh1cOPWWCbVTtEmjkxrtqRjaqEXaZpiL4fCLhs/iBbqPi7fDaSpRpYD",
  render_errors: [view: ApiServerWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: ApiServer.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Configures CORS
config :cors_plug,
  origin: ["*"],
  headers: ["*"],
  max_age: 86400,
  methods: ["*"]

# Configures Guardian
config :api_server, ApiServerWeb.Guardian,
  issuer: "api_server",
  secret_key: "syQnVJjVnGwRpKBNUQtDDdOa0VXBFNWlZLXMznCQVKN+DMgmb8/VYwK2/EVfOyj6"

# Configures Arc
config :arc,
  storage: Arc.Storage.Local

# Cron scheduler
config :api_server, ApiServer.Scheduler,
  jobs: [
    # Every minute
    {"* * * * *",      fn -> ApiServer.ContractManagement.get_receivable_message() end},
    # Every minute
    {"* * * * *",      fn -> ApiServer.PurchaseContractManagement.get_payable_message() end},
  ] 

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
