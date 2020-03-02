defmodule ApiServerWeb.ContractView do
  use ApiServerWeb, :view
  alias ApiServerWeb.{Contract, ContractView}
  import Ecto.Query, only: [from: 2, preload: 3]
  import Ecto.Query.API, only: [like: 2]

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, ContractView, "contract.json"),
      page_number: page.page_number,
      # page_size: page.page_size,
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
      project_id: contract.project_id,
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

  def add_data(page_size,page,date1,date2,flag) do
    IO.puts inspect ("------------search1-----------")
    q = ~s/select a."cname",a."cno",a."sign_date" from 
    (select "cname","cno","sign_date" t1 where t1."sign_date" in
      (select max("sign_date") from contracts  
        where "sign_date">=$1 and "sign_date"<=$2 group by "cname","cno" order by "cname","cno")) as a,
    (select "cname","cno","sign_date" t1 where t1."sign_date" in
      (select min("sign_date") from contracts  
        where "sign_date">=$1 and "sign_date"<=$2 group by "cname","cno" order by "cname","cno")) as b
    where a."cname" =b."cname" and a."cno"=b."cno"	
    order by "cname","cno"/
    total = Ecto.Adapters.SQL.query!(ApiServer.Repo, q, [date1,date2])
    IO.puts inspect ("------------search2-----------")
    contractlist1 = total.rows
    total = total.num_rows
    data1 =
    if flag == "1" do
      contractlist1 |> Enum.map(fn [x,x1,x2,x3,x4,x5,x6,x7,x8]->%{cname: x,cno: x1,party_a: x2,party_b: x3,sign_date: x4,expiry_date: x5,amount: x6,comments: x7,project_id: x8} end)
    end
    dq = q <> " " <> "limit $3::integer offset ($4::integer-1)*$3;"
    res = Ecto.Adapters.SQL.Sandbox.query!(ApiServer.Repo, dq, [date1,date2,String.to_integer(page_size),String.to_integer(page)])
    contractlist = res.rows
    data = contractlist |> Enum.map(fn [x,x1,x2,x3,x4,x5,x6,x7,x8]->%{cname: x,cno: x1,party_a: x2,party_b: x3,sign_date: x4,expiry_date: x5,amount: x6,comments: x7,project_id: x8} end)
    %{total: total, data: data, data1: data1}
  end
  
end