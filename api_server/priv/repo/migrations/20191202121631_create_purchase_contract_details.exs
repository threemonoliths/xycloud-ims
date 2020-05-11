defmodule ApiServer.Repo.Migrations.CreatePurchaseContractDetails do
  use Ecto.Migration

  def change do
    create table(:purchase_contract_details) do
      add :issue_name, :string #比次名称
      add :invoice_amount, :float #发票金额
      add :actual_payment, :float #实付金额
      add :invoice_date, :date #挂账日期
      add :due_date, :date #应付日期
      add :payment_date, :date #实付日期

      add :purchase_contract_id, references(:purchase_contracts)

      timestamps()
    end
  end
end
