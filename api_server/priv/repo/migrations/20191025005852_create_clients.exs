defmodule ApiServer.Repo.Migrations.CreateClients do
  use Ecto.Migration

  def change do
    create table(:clients) do
      add :no, :string #客商编码
      add :name, :string #公司名称
      add :category, :string #客商类型
      add :legal_representative, :string #法定代表人
      add :registered_address, :string #注册地址
      add :registered_capital, :string #注册资金（万元）
      add :business_scope, :string #经营范围
      add :industry_involved, :string #所属行业
      add :project, :string #与祥云开展业务
      add :registered_place, :string #注册所在地
      add :id_type, :string #证件类型
      add :certificate_no, :string #三证合一证件号码
      add :organization_no, :string #组织机构代码证号码
      add :business_license_no, :string #营业执照注册号码
      add :tax_no, :string #税务登记证号码
      add :taxpayer_type, :string #纳税人类型
      add :invoice_title, :string #开票抬头
      add :taxpayer_no, :string #纳税人识别号
      add :address, :string #地址
      add :telephone, :string #电话
      add :bank_name, :string #开户银行名称
      add :bank_account, :string #开户银行账号
      add :receiving_bank_name, :string #收款银行名称
      add :receiving_bank_account, :string #收款银行账号
      add :remittance_bank_name, :string #汇款银行名称
      add :remittance_bank_account, :string #汇款银账号
      add :comments, :text #客商评价
      timestamps()
    end

  end
end
