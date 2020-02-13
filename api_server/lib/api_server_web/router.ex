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
    get "/users/permissions/all", UserController, :permissions 
    resources "/tmpls", TmplController, except: [:new, :edit]

    # 临时
    get "/contracts/receivable_yearly", ContractController, :get_receivable_by_year
    get "/purchase_contracts/payable_yearly", PurchaseContractController, :get_payable_by_year
    get "/contracts/export",ContractController, :export_excel
  end

  scope "/api/v1", ApiServerWeb do 
    pipe_through [:api_auth]
    resources "/users", UserController, except: [:new, :edit]
    resources "/projects", ProjectController, except: [:new, :edit]
    resources "/contracts", ContractController, except: [:new, :edit]

    resources "/purchase_contracts", PurchaseContractController, except: [:new, :edit]

    resources "/clients", ClientController, except: [:new, :edit]
    resources "/suppliers", SupplierController, except: [:new, :edit]

    get "/tmpls/attachment/:id", TmplController, :download_attachment
    put "/user/info", UserController, :set_self
    put "/user/password", UserController, :set_self_password
  end
end
