defmodule ApiServer.ClientManagement.Client do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clients" do
    field :cname, :string 
    field :contact, :string
    field :contact_info, :string
    field :invoice, :string
    field :comments, :string

    timestamps()
  end

  @doc false
  def changeset(client, attrs) do
    client
    |> cast(attrs, [:cname, :contact, :contact_info, :invoice, :comments])
    |> validate_required([:cname])
  end
end
