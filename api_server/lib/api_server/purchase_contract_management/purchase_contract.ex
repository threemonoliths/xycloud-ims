defmodule ApiServer.PurchaseContractManagement.PurchaseContract do
  use Ecto.Schema
  import Ecto.Changeset
  
  # 销售合同
  schema "purchase_contracts" do
    field :cno, :string #合同编号
    field :cname, :string #合同名称
    field :party_a, :string #甲方
    field :party_b, :string #乙方
    field :sign_date, :date #签订日期
    field :expiry_date, :date #终止日期
    field :amount, :float #合同额
    field :comments, :string #备注
    field :status, :integer, default: 0

    belongs_to :project, ApiServer.ProjectManagement.Project, on_replace: :nilify
    has_many :purchase_contract_details, ApiServer.PurchaseContractManagement.PurchaseContractDetail, on_delete: :delete_all, on_replace: :delete #父对象删除时，级联删除；操作父对象的changeset时，删除子对象
    
    timestamps()
  end

  @doc false
  def changeset(purchase_contract, attrs) do
    purchase_contract
    |> cast(attrs, [:cno, :cname, :party_a, :party_b, :sign_date, :expiry_date, :amount, :status, :comments])
    |> validate_required([:cno])
  end
end
