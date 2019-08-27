defmodule ApiServerWeb.Router do
  use ApiServerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug Guardian.Plug.Pipeline, module: ApiServerWeb.Guardian,
      error_handler: ApiServerWeb.AuthErrorHandler
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/api/v1", ApiServerWeb do
    post "/login", LoginController, :login
  end

  scope "/api/v1", ApiServerWeb do
    pipe_through [:api_auth]
    resources "/users", UserController, except: [:new, :edit]
    resources "/projects", ProjectController, except: [:new, :edit]
    resources "/contracts", ContractController, except: [:new, :edit]
  end
end
