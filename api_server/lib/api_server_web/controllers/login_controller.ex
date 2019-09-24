defmodule ApiServerWeb.LoginController do
    
  use ApiServerWeb, :controller   
  alias ApiServer.Repo
  alias ApiServerWeb.{Guardian, Permissions}
  use Ecto.Schema

  alias ApiServer.Accounts.User
    
  def login(conn, %{"login" => login_params}) do
    %{"password" => pw, "username" => un} = login_params
    case check_pwd(un, pw) do
      {:ok, user} ->
        {:ok, token, claims} = Guardian.encode_and_sign(user, %{pem: %{"default" => user.perms_number}})
        render(conn, "login_ok.json", %{user: user, jwt: token})
      {:error, _} ->
        msg = "Username or password incorrect!"
        render(conn, "login_error.json", %{msg: msg})
    end
  end

  def check_pwd(username, password) do
    user = Repo.get_by(User, name: username)
    cond do
      user && user.actived &&  Pbkdf2.verify_pass(password, user.password_hash) ->
        {:ok, user}
      user && not user.actived &&  Pbkdf2.verify_pass(password, user.password_hash) ->
        {:error, "User is not actived."}
      true ->
        {:error, "Invalid username or password."}
    end
  end

end