defmodule ApiServer.MessageReminding.Message do
  use Ecto.Schema
  import Ecto.Changeset

  schema "messages" do
    field :body, :string
    field :datetime, :string
    field :type, :string      # "new_contract"：新增合同， "payable"：应付，"receivables"：应收
    field :object_name, :string    # 消息针对的表记录的name(issue_name)，用来判断消息重复
    field :object_type, :string   # 消息针对的表记录的类型，用来判断消息重复

    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:body, :datetime, :type, :object_name, :object_type])
    |> validate_required([:body])
  end
end
