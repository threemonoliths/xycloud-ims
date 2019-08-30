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
      details: rend_details(contract.contract_details)
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