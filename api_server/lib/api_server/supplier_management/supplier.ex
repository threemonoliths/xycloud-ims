defmodule ApiServer.SupplierManagement.Supplier do
  use Ecto.Schema
  import Ecto.Changeset

  schema "suppliers" do
    field :sname, :string
    field :contact, :string
    field :contact_info, :string
    field :invoice, :string
    field :comments, :string 

    timestamps()
  end

  @doc false
  def changeset(supplier, attrs) do
    supplier
    |> cast(attrs, [:sname, :contact, :contact_info, :invoice, :comments])
    |> validate_required([:sname])
  end
end
