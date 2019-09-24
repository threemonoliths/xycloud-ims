defmodule ApiServer.Accounts.User do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :mobile, :string
    field :password, :string, virtual: true
    # 默认密码"admin123"
    field :password_hash, :string
    field :real_name, :string
    field :position, :string
    field :is_admin, :boolean, default: false
    field :actived, :boolean, default: true
    field :perms_number, :integer, default: 0

    field :uuid, :string
    field :avatar, ApiServer.UserAvatar.Type

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :mobile, :password, :real_name, :position, :is_admin, :actived, :perms_number])
    |> check_uuid
    |> cast_attachments(attrs, [:avatar])
    |> validate_required([:name])
    |> put_default_pwd
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

  defp check_uuid(changeset) do
    if get_field(changeset, :uuid) == nil do
      force_change(changeset, :uuid, Ecto.UUID.generate)
    else
      changeset
    end
  end

  defp put_default_pwd(changeset) do
    if get_field(changeset, :password) == nil do
      force_change(changeset, :password, "admin123")
    else
      changeset
    end
  end
  
end
