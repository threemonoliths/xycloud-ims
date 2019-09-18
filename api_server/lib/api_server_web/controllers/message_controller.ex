defmodule ApiServerWeb.MessageController do
  use ApiServerWeb, :controller

  use ApiServer.MessageReminding

  action_fallback ApiServerWeb.FallbackController

  # 用户获取到提醒消息后，需要设置已读状态
  def set_read(conn, %{"last_datetime" => last_datetime}) do
    resource = ApiServerWeb.Guardian.Plug.current_resource(conn)
    with {:ok, %UserMessageRecord{} = record} <- set_last_datetime(resource.id, last_datetime) do
      render("set_read.json", message: record)
    end
  end

end
