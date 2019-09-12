defmodule ApiServerWeb.TmplController do

  use ApiServerWeb, :controller
  use ApiServer.TmplManagement
  import Plug.Conn

  action_fallback ApiServerWeb.FallbackController

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, tmpl_formdata_params) do
    tmpl_changeset = Tmpl.changeset(%Tmpl{}, tmpl_formdata_params)
    IO.inspect tmpl_changeset
    with {:ok, %Tmpl{} = tmpl} <- save_create(tmpl_changeset) do
      conn
      |> render("show.json", tmpl: tmpl)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, tmpl} <- get_by_id(Tmpl, id) do
      render(conn, "show.json", tmpl: tmpl)
    end
  end

  def update(conn, %{"id" => id} = tmpl_formdata_params) do
    with {:ok, tmpl} <- get_by_id(Tmpl, id) do
      tmpl_changeset = Tmpl.changeset(tmpl, tmpl_formdata_params)
      IO.puts "changeset is:################"
      IO.inspect tmpl_changeset
      with {:ok, %Tmpl{} = tmpl} <- save_update(tmpl_changeset) do
        render(conn, "show.json", tmpl: tmpl)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Tmpl{} = tmpl} <- delete_by_id(Tmpl, id) do
      render(conn, "show.json", tmpl: tmpl)
    end
  end

  def download_attachment(conn, %{"id" => id}) do
    with {:ok, tmpl} <- get_by_id(Tmpl, id) do
      file_name = tmpl.attachment.file_name
      path = tmpl
      |> get_attachment
      |> ApiServer.Utils.StringHandler.get_file_path_from_arc
      full_path = "priv/static" <> path <> "/" <> file_name
      conn
      |> put_resp_content_type("application/octet-stream")
      |> put_resp_header("content-disposition", "attachment; filename=\"#{file_name}\"")
      |> Plug.Conn.send_file(200, full_path)
      |> halt()
    end
  end

   # 图片
   defp get_attachment(tmpl) do
    case tmpl.attachment do
      nil -> ""
      attachment -> 
        url = ApiServer.Utils.StringHandler.take_prefix(ApiServer.TmplAttachment.url({tmpl.attachment, tmpl}, :original),"/priv/static")
    end
  end
end
