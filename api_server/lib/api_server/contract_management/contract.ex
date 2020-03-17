defmodule ApiServer.ContractManagement.Contract do
  use Ecto.Schema
  import Ecto.Changeset
  
  # 销售合同
  schema "contracts" do
    field :cno, :string #合同编号
    field :cname, :string #合同名称
    field :party_a, :string #甲方
    field :party_b, :string #乙方
    field :sign_date, :date #签订日期
    field :expiry_date, :date #终止日期
    field :amount, :float #合同额
    field :comments, :string #备注
    field :status, :integer, default: 0 # 状态，0表示新建，1表示完成，2表示终止

    belongs_to :project, ApiServer.ProjectManagement.Project, on_replace: :nilify
    has_many :contract_details, ApiServer.ContractManagement.ContractDetail, on_delete: :delete_all, on_replace: :delete #父对象删除时，级联删除；操作父对象的changeset时，删除子对象
    
    timestamps()
  end

  @doc false
  def changeset(contract, attrs) do
    contract
    |> cast(attrs, [:cno, :cname, :party_a, :party_b, :sign_date, :expiry_date, :amount, :comments, :project_id])
    |> validate_required([:cno])
  end
end
