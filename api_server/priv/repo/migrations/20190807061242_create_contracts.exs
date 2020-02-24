defmodule ApiServer.Repo.Migrations.CreateContracts do
  use Ecto.Migration

  def change do
    create table(:contracts) do
      add :cno, :string
      add :cname, :string
      add :party_a, :string #甲方公司名称
      add :party_b, :string #乙方公司名称
      add :sign_date, :date #签订日期
      add :expiry_date, :date #终止日期
      add :amount, :float #合同额
      add :status, :integer
      add :comments, :text #备注

      add :project_id, references(:projects) 

      timestamps()
    end

  end
end
