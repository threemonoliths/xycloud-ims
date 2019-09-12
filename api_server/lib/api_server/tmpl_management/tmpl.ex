defmodule ApiServer.TmplManagement.Tmpl do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset

  schema "tmpls" do
    field :name, :string
    field :comments, :string
    field :uuid, :string
    field :attachment, ApiServer.TmplAttachment.Type

    timestamps()
  end

  @doc false
  def changeset(tmpl, attrs) do
    tmpl
    |> cast(attrs, [:name, :comments])
    |> validate_required([:name])
    |> check_uuid(:uuid)
    |> cast_attachments(attrs, [:attachment])
  end

  defp check_uuid(changeset, uuid) do
    case get_field(changeset, uuid) do
      nil ->
        force_change(changeset, uuid, Ecto.UUID.generate)
      _ ->
        changeset
    end
  end
end
