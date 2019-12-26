defmodule ApiServer.Repo.Migrations.CreateClients do
  use Ecto.Migration

  def change do
    create table(:clients) do
      add :cname, :string #客户名称
      add :contact, :string #联系人
      add :contact_info, :string #联系方式
      add :invoice, :string #开票信息
      add :comments, :text #备注
      timestamps()
    end

  end
end