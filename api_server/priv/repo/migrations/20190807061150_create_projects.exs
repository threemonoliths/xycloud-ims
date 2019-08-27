defmodule ApiServer.Repo.Migrations.CreateProjects do
  use Ecto.Migration

  def change do
    create table(:projects) do
      add :pname, :string
      add :date, :string
      add :comments, :text

      timestamps()
    end

  end
end
