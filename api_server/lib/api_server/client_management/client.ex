defmodule ApiServer.ClientManagement.Client do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clients" do
    field :no, :string #客商编码
    field :name, :string #公司名称
    field :category, :string #客商类型
    field :legal_representative, :string #法定代表人
    field :registered_address, :string #注册地址
    field :registered_capital, :string #注册资金（万元）
    field :business_scope, :string #经营范围
    field :industry_involved, :string #所属行业
    field :project, :string #与祥云开展业务
    field :registered_place, :string #注册所在地
    field :id_type, :string #证件类型
    field :certificate_no, :string #三证合一证件号码
    field :organization_no, :string #组织机构代码证号码
    field :business_license_no, :string #营业执照注册号码
    field :tax_no, :string #税务登记证号码
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
    field :contact1, :string #联系人1姓名
    field :mobile1, :string #联系人1手机
    field :mail1, :string #联系人1电子邮箱
    field :contact2, :string #联系人2姓名
    field :mobile2, :string #联系人2手机
    field :mail2, :string #联系人2电子邮箱
    field :contact3, :string #联系人3姓名
    field :mobile3, :string #联系人3手机
    field :mail3, :string #联系人3电子邮箱
    field :comments, :string #客商评价

    timestamps()
  end

  @doc false
  def changeset(client, attrs) do
    client
    |> cast(attrs, [:no, :name, :category, :legal_representative,
    :registered_address,:registered_capital,:business_scope,:industry_involved,
    :project,:registered_place,:id_type,:certificate_no,:organization_no,
    :business_license_no,:tax_no,:taxpayer_type,:invoice_title,:taxpayer_no,
    :address,:telephone,:bank_name,:bank_account,:receiving_bank_name,
    :receiving_bank_account,:remittance_bank_name,:remittance_bank_account,:contact1,
    :mobile1,:mail1,:contact2,:mobile2,:mail2,:contact3,:mobile3,:mail3,:comments])
    |> validate_required([:name])
  end
end
