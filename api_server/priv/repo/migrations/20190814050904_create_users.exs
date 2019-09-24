defmodule ApiServer.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :mobile, :string
      add :password_hash, :string
      add :real_name, :string
      add :position, :string
      add :is_admin, :boolean, default: false
      add :actived, :boolean, default: true
      add :perms_number, :integer, default: 0
      add :uuid, :string
      add :avatar, :string

      timestamps()
    end

  end
end
