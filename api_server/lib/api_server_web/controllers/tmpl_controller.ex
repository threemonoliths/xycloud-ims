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
      old_attachment = get_attachment(tmpl)
      with {:ok, %Tmpl{} = tmpl} <- save_update(tmpl_changeset) do
        # 更新成功后，删除旧的文件
        tmpl_changeset.changes
        |> Map.has_key?(:attachment)
        |> case do
          false -> nil
          true -> File.rm(old_attachment)
        end
        render(conn, "show.json", tmpl: tmpl)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Tmpl{} = tmpl} <- delete_by_id(Tmpl, id) do
      # 删除成功后，删除上级文件夹
      delete_file(tmpl)
      render(conn, "show.json", tmpl: tmpl)
    end
  end

  def download_attachment(conn, %{"id" => id}) do
    with {:ok, tmpl} <- get_by_id(Tmpl, id) do
      file_name = tmpl.attachment.file_name
      path = tmpl
      |> get_attachment
      conn
      |> put_resp_content_type("application/octet-stream")
      |> put_resp_header("content-disposition", "attachment; filename=\"#{file_name}\"")
      |> Plug.Conn.send_file(200, path)
      |> halt()
    end
  end

  
end
