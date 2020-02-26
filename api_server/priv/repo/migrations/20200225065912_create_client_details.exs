defmodule ApiServer.Repo.Migrations.CreateClientDetails do
  use Ecto.Migration

  def change do
    create table(:client_details) do
      add :contact, :string #联系人姓名
      add :mobile, :string #联系人手机
      add :mail, :string #联系人电子邮箱
      add :qq, :string #qq
      add :wechat, :string #微信
      add :position, :string #职务
      add :character, :string #角色
      add :comments, :text #客商评价

      add :client_id, references(:clients)
      timestamps()
    end
  end
end
