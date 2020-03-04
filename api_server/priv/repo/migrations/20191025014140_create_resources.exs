defmodule ApiServer.Repo.Migrations.CreateResources do
  use Ecto.Migration

  def change do
    create table(:resources) do 

      add :name, :string
      add :server_name, :string
      add :class, :string
      add :product_type, :string
      add :cpu, :integer 
      add :memory, :integer
      add :storage, :integer
      add :bandwidth, :integer
      add :ip, :string 
      add :applicant, :string
      add :application_time, :date 
      add :opening_time, :date
      add :security_service, :string
      add :backup_service, :string
      add :storage_type, :string
      add :client_id, references(:clients) 
      add :contract_id, references(:contracts) 

      timestamps()
    end

  end
end
