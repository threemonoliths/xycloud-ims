defmodule ApiServer.ProjectManagement.Project do
  use Ecto.Schema
  import Ecto.Changeset

  schema "projects" do
    field :pname, :string
    field :comments, :string
    has_many :contracts, ApiServer.ContractManagement.Contract, on_delete: :nilify_all

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:pname, :comments])
    |> validate_required([:pname])
  end
end
