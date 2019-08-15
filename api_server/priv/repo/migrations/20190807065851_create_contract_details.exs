defmodule ApiServer.Repo.Migrations.CreateContractDetails do
  use Ecto.Migration

  def change do
    create table(:contract_details) do
      add :issue_name, :string #比次名称
      add :invoice_amount, :float #发票金额
      add :actual_payment, :float #实付金额
      add :invoice_date, :date #发票日期
      add :payment_date, :date #实付日期

      add :contract_id, references(:contracts)

      timestamps()
    end

  end
end
