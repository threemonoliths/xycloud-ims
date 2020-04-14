defmodule ApiServer.ClientManagement.Client do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clients" do
    field :no, :string #客商编码
    field :name, :string #公司名称
    field :category, :string #客商类型
    # field :legal_representative, :string #法定代表人
    field :registered_address, :string #注册地址
    # field :registered_capital, :string #注册资金（万元）
    # field :business_scope, :string #经营范围
    # field :industry_involved, :string #所属行业
    field :project, :string #与祥云开展业务
    field :registered_place, :string #注册所在地
    field :id_type, :string #证件类型
    field :certificate_no, :string #三证合一证件号码
    field :taxpayer_type, :string #纳税人类型
    field :invoice_title, :string #开票抬头
    field :taxpayer_no, :string #纳税人识别号
    field :address, :string #地址
    field :telephone, :string #电话
    field :bank_name, :string #开户银行名称
    field :bank_account, :string #开户银行账号
    field :receiving_bank_name, :string #收款银行名称
    field :receiving_bank_account, :string #收款银行账号
    field :remittance_bank_name, :string #汇款银行名称
    field :remittance_bank_account, :string #汇款银账号
    field :comments, :string #客商评价


    has_many :client_details, ApiServer.ClientManagement.ClientDetail, on_delete: :delete_all, on_replace: :delete #父对象删除时，级联删除；操作父对象的changeset时，删除子对象

    timestamps()
  end

  @doc false
  def changeset(client, attrs) do
    client
    |> cast(attrs, [:no, :name, :category,
    :registered_address,
    :project,:registered_place,:id_type,:certificate_no,:taxpayer_type,:invoice_title,:taxpayer_no,
    :address,:telephone,:bank_name,:bank_account,:receiving_bank_name,
    :receiving_bank_account,:remittance_bank_name,:remittance_bank_account,:comments])
    |> validate_required([:name])
  end
end
