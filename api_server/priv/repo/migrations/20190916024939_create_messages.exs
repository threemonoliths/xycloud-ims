defmodule ApiServer.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :body, :string
      add :type, :string
      add :datetime, :string
      timestamps()
    end

  end
end
