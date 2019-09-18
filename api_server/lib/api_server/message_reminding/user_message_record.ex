defmodule ApiServer.UserMessageRecord do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user_message_record" do
    field :user_id, :integer
    field :last_datetime, :string

    timestamps()
  end

  @doc false
  def changeset(user_message_record, attrs) do
    user_message_record
    |> cast(attrs, [:user_id, :last_datetime])
    |> validate_required([:user_id])
  end
end
