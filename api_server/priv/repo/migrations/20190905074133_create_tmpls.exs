defmodule ApiServer.Repo.Migrations.CreateTmpls do
  use Ecto.Migration

  def change do
    create table(:tmpls) do
      add :name, :string
      add :comments, :text
      add :attachment, :string
      add :uuid, :string

      timestamps()
    end

  end
end
