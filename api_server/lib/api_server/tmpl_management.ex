defmodule ApiServer.TmplManagement do
  @moduledoc """
  The TmplManagement context.
  """

  alias ApiServer.TmplManagement.Tmpl

  use ApiServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import ApiServer.TmplManagement
      use ApiServer.BaseContext
      alias ApiServer.TmplManagement.Tmpl
    end
  end

  def page(params) do 
    Tmpl
    |> query_like(params, "name")
    |> query_like(params, "comments")
    |> query_order_desc_by(params, "inserted_at")
    |> get_pagination(params)
  end

  def delete_by_id_with_file(struct, id, preload_list \\ []) do
    struct
    |> get_by_id(id, preload_list)
    |> case do
      {:error, :not_found} -> {:error, :not_found}
      {:ok, entity} -> 
        delete_file(entity)
        Repo.delete(entity)
    end
  end

  def delete_file(tmpl) do
    tmpl
    |> get_path
    |> File.rm_rf
    # file_name = tmpl.attachment.file_name
    # path = tmpl
    # |> get_attachmentpath
    # |> ApiServer.Utils.StringHandler.get_file_path_from_arc
    # full_path = "priv/static" <> path <> "/" <> file_name
  end

  # 获取完整路径
  def get_attachment(tmpl) do
    case tmpl.attachment do
      nil -> ""
      attachment -> 
        file_name = attachment.file_name
        path = ApiServer.Utils.StringHandler.take_prefix(ApiServer.TmplAttachment.url({tmpl.attachment, tmpl}, :original),"/priv/static")
        |> ApiServer.Utils.StringHandler.get_file_path_from_arc
        "priv/static" <> path <> "/" <> file_name
    end
  end

  # 获取文件所在文件夹路径
  defp get_path(tmpl) do
    case tmpl.attachment do
      nil -> ""
      attachment -> 
        path = ApiServer.Utils.StringHandler.take_prefix(ApiServer.TmplAttachment.url({tmpl.attachment, tmpl}, :original),"/priv/static")
        |> ApiServer.Utils.StringHandler.get_file_path_from_arc
        "priv/static" <> path
    end
  end
end
