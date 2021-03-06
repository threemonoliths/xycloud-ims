defmodule ApiServer.ContractManagement.ContractDetail do
  use Ecto.Schema
  import Ecto.Changeset

  schema "contract_details" do
    field :issue_name, :string   #笔次信息
    field :invoice_amount, :float #发票金额
    field :actual_payment, :float #实付金额
    field :invoice_date, :date #发票日期
    field :payment_date, :date #实付日期

    belongs_to :contract, ApiServer.ContractManagement.Contract, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(contract_detail, attrs) do
    contract_detail
    |> cast(attrs, [:issue_name, :invoice_amount, :actual_payment, :invoice_date, :payment_date])
    |> validate_required([:issue_name])
  end
end
