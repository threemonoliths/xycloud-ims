defmodule ApiServer.ResourceManagement.ResourceDetail do
  use Ecto.Schema
  import Ecto.Changeset

  schema "resource_details" do 
    field :application_date, :date  
    field :finish_date, :date 
    field :change, :string  
    field :original_configuration, :string    
    field :target_configuration, :string  
    field :comments, :string  

    belongs_to :resource, ApiServer.ResourceManagement.Resource, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(resource_detail, attrs) do
    resource_detail
    |> cast(attrs, [:application_date, :finish_date, :change, :original_configuration, :target_configuration, :comments])
    |> validate_required([:change])
  end
end
