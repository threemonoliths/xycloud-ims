defmodule ApiServer.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :mobile, :string
    field :password, :string, virtual: true
    # 默认密码"admin123"
    field :password_hash, :string, default: "$pbkdf2-sha512$160000$GhgB6V3uq7P5y2A/4ujKqQ$k1.DjV8r1WM2aMyhpCuR1nCilPn7cdKPdDLt10GWXdj.CMsQ/kiGg.cPLbmVF78pUbmlLramQM65L65iI5fLFw"
    field :real_name, :string
    field :position, :string
    field :is_admin, :boolean, default: false
    field :actived, :boolean, default: true
    field :perms_number, :integer, default: 0
    # field :avatar, RestfulApiWeb.Avatar.Type

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :mobile, :password, :real_name, :position, :is_admin, :actived, :perms_number])
    |> validate_required([:name])
    |> put_password_hash
  end

  defp put_password_hash(changeset) do  
    
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Pbkdf2.hash_pwd_salt(password))
      _ ->
        changeset
    end
  end
end
