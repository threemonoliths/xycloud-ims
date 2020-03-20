defmodule ApiServerWeb.PurchaseContractView do
  use ApiServerWeb, :view
  alias ApiServerWeb.PurchaseContractView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, PurchaseContractView, "purchase_contract.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{purchase_contract: purchase_contract}) do
    %{data: render_one(purchase_contract, PurchaseContractView, "purchase_contract.json")}
  end

  def render("purchase_contract.json", %{purchase_contract: purchase_contract}) do
    %{
      id: purchase_contract.id,
      cno: purchase_contract.cno,
      cname: purchase_contract.cname,
      party_a: purchase_contract.party_a,
      party_b: purchase_contract.party_b,
      sign_date: purchase_contract.sign_date,
      expiry_date: purchase_contract.expiry_date,
      amount: purchase_contract.amount,
      project_id: purchase_contract.project_id,
      comments: purchase_contract.comments,
      status: purchase_contract.status,
      details: rend_details(purchase_contract.purchase_contract_details)
    }
  end

  def rend_details(details) do
    details
    |> Enum.map(fn el -> 
      %{
        issue_name: el.issue_name,
        invoice_amount: el.invoice_amount,
        actual_payment: el.actual_payment,
        invoice_date: el.invoice_date,
        payment_date: el.payment_date
      }
    end)
    
  end
end