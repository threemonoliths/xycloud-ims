defmodule ApiServer.ClientManagement.ClientDetail do
  use Ecto.Schema
  import Ecto.Changeset

  schema "client_details" do
    field :contact, :string #联系人姓名
    field :mobile, :string #联系人手机
    field :mail, :string #联系人电子邮箱
    field :qq, :string #qq
    field :wechat, :string #微信
    field :position, :string #职务
    field :character, :string #角色
    field :comments, :string #评价

    belongs_to :client, ApiServer.ClientManagement.Client, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(client_detail, attrs) do
    client_detail
    |> cast(attrs, [:contact,:mobile,:mail,:qq,:wechat,:position,:character,:comments,])
    |> validate_required([:contact,:mobile,])
  end
end
