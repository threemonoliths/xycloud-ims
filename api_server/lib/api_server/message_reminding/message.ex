defmodule ApiServer.MessageReminding.Message do
  use Ecto.Schema
  import Ecto.Changeset

  schema "messages" do
    field :body, :string
    field :datetime, :string
    field :type, :string

    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:body, :datetime, :type])
    |> validate_required([:body])
  end
end
