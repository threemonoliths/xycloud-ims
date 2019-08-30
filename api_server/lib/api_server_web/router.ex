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
    resources "/contracts", ContractController, except: [:new, :edit]
    post "/login", LoginController, :login
    get "/users/permissions/all", UserController, :permissions
  end

  scope "/api/v1", ApiServerWeb do
    pipe_through [:api_auth]
    resources "/users", UserController, except: [:new, :edit]
    
    resources "/projects", ProjectController, except: [:new, :edit]
    
  end
end
