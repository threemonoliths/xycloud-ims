defmodule ApiServerWeb.ClientView do
  use ApiServerWeb, :view
  alias ApiServerWeb.ClientView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, ClientView, "client.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{client: client}) do
    %{data: render_one(client, ClientView, "client.json")}
  end

  def render("client.json", %{client: client}) do
    %{
      id: client.id,
      no: client.no, #客商编码
      name: client.name, #公司名称
      category: client.category, #客商类型
      legal_representative: client.legal_representative, #法定代表人
      registered_address: client.registered_address, #注册地址
      registered_capital: client.registered_capital, #注册资金（万元）
      business_scope: client.business_scope, #经营范围
      industry_involved: client.industry_involved, #所属行业
      project: client.project, #与祥云开展业务
      registered_place: client.registered_place, #注册所在地
      id_type: client.id_type, #证件类型
      certificate_no: client.certificate_no, #三证合一证件号码
      organization_no: client.organization_no, #组织机构代码证号码
      business_license_no: client.business_license_no, #营业执照注册号码
      tax_no: client.tax_no, #税务登记证号码
      taxpayer_type: client.taxpayer_type, #纳税人类型
      invoice_title: client.invoice_title, #开票抬头
      taxpayer_no: client.taxpayer_no, #纳税人识别号
      address: client.address, #地址
      telephone: client.telephone, #电话
      bank_name: client.bank_name, #开户银行名称
      bank_account: client.bank_account, #开户银行账号
      receiving_bank_name: client.receiving_bank_name, #收款银行名称
      receiving_bank_account: client.receiving_bank_account, #收款银行账号
      remittance_bank_name: client.remittance_bank_name, #汇款银行名称
      remittance_bank_account: client.remittance_bank_account, #汇款银账号
      contact1: client.contact1, #联系人1姓名
      mobile1: client.mobile1, #联系人1手机
      mail1: client.mail1, #联系人1电子邮箱
      contact2: client.contact2, #联系人2姓名
      mobile2: client.mobile2, #联系人2手机
      mail2: client.mail2, #联系人2电子邮箱
      contact3: client.contact3, #联系人3姓名
      mobile3: client.mobile3, #联系人3手机
      mail3: client.mail3, #联系人3电子邮箱
      comments: client.comments, #客商评价
    } 
  end
end
