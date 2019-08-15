defmodule ApiServerWeb.ContractView do
  use ApiServerWeb, :view
  alias ApiServerWeb.ContractView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, ContractView, "contract.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{contract: contract}) do
    %{data: render_one(contract, ContractView, "contract.json")}
  end

  def render("contract.json", %{contract: contract}) do
    %{
      id: contract.id,
      cno: contract.cno,
      cname: contract.cname,
      party_a: contract.party_a,
      party_b: contract.party_b,
      sign_date: contract.sign_date,
      expiry_date: contract.expiry_date,
      amount: contract.amount,
      comments: contract.comments,
      details: render_many(contract.contract_details, ContractView, "contract_detail.json")
    }
  end

  def render("contract_detail.json", %{contract_detail: contract_detail}) do
    %{
      issue_name: contract_detail.cno,
      invoice_amount: contract_detail.invoice_amount,
      actual_payment: contract_detail.actual_payment,
      invoice_date: contract_detail.invoice_date,
      payment_date: contract_detail.payment_date
    }
  end
end