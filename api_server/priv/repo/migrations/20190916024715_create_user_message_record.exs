defmodule ApiServer.Repo.Migrations.CreateUserMessageRecord do
  use Ecto.Migration

  def change do
    create table(:user_message_record) do
      add :user_id, :integer
      add :last_datetime, :string
      timestamps()
    end

  end
end
