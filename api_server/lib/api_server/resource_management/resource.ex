defmodule ApiServer.ResourceManagement.Resource do
  use Ecto.Schema
  import Ecto.Changeset

  schema "resources" do
    field :name, :string
    field :server_name, :string
    field :opening_type, :string
    field :class, :string
    field :product_type, :string
    field :cpu, :integer 
    field :memory, :integer
    field :storage, :integer
    field :bandwidth, :integer
    field :ip, :string 
    field :applicant, :string
    field :application_time, :date
    field :final_client, :string 
    field :opening_time, :date
    field :security_service, :string
    field :backup_service, :string 
    field :storage_type, :string

    belongs_to :contract, ApiServer.ContractManagement.Contract, on_replace: :delete
    belongs_to :client, ApiServer.ClientManagement.Client, on_replace: :delete
    has_many :resource_details, ApiServer.ResourceManagement.ResourceDetail, on_delete: :delete_all, on_replace: :delete #父对象删除时，级联删除；操作父对象的changeset时，删除子对象
    timestamps()
  end

  @doc false
  def changeset(resource, attrs) do
    resource
    |> cast(attrs, [:name, :server_name, :opening_type, :class, :product_type, :cpu, :memory, :storage, :bandwidth, :ip, :applicant, 
                    :application_time, :final_client, :opening_time, :security_service, :backup_service, :storage_type, :client_id, :contract_id])
    |> validate_required([:name])
  end
end
