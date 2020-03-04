defmodule ApiServer.Repo.Migrations.CreateResourceDetails do
  use Ecto.Migration

  def change do
    create table(:resource_details) do
      add :application_date, :date  
      add :finish_date, :date 
      add :change, :string  
      add :original_configuration, :string   
      add :target_configuration, :string  
      add :comments, :string  

      add :resource_id, references(:resources)

      timestamps()
    end

  end
end
