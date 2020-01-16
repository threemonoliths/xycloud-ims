defmodule ApiServerWeb.RemindingChannel do
  use Phoenix.Channel

  use ApiServer.MessageReminding
  alias ApiServer.MessageReminding.Message

  # 加入channel，需要验证token
  def join("reminding:contract", %{"token" => token}, socket) do
    with {:ok, claims} <- ApiServerWeb.Guardian.decode_and_verify(token) do
      {:ok, resource} = ApiServerWeb.Guardian.resource_from_claims(claims)
      send(self, {:after_join, resource})
      {:ok, socket}
    end
  end

  def join("reminding:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  # 客户端加入channel后，获取并发送新消息
  def handle_info({:after_join, resource}, socket) do
    messages = get_all_reminding_message(%{}, resource)
    push socket, "new_msg", %{messages: messages |> resolve_messages}
    {:noreply, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    ApiServer.Utils.Print.print body
    datetime = ApiServer.Utils.DatetimeHandler.get_now_str
    msg_params = %{"type" => "new_contract", "body" => body, "datetime" => datetime}
    Message.changeset(%Message{}, msg_params)
    |> Repo.insert
    push socket, "new_msg",%{ messages: [%{ body: body, datetime: datetime }]}
    # broadcast!(socket, "new_msg", %{ messages: [%{ body: body, datetime: datetime }]})
    {:noreply, socket}
  end

  # 客户端清空消息后，会发一条返回消息，后台置已读状态
  def handle_in("received", %{"last_datetime" => last_datetime, "token" => token}, socket) do
    with {:ok, claims} <- ApiServerWeb.Guardian.decode_and_verify(token) do
      {:ok, resource} = ApiServerWeb.Guardian.resource_from_claims(claims)
      set_last_datetime(resource.id, last_datetime)
      {:noreply, socket}
    end
  end

  # def handle_out("user_joined", msg, socket) do
  #   # if Accounts.ignoring_user?(socket.assigns[:user], msg.user_id) do
  #   #   {:noreply, socket}
  #   # else
  #   #   push(socket, "user_joined", msg)
  #   #   {:noreply, socket}
  #   # end
  # end

  defp resolve_messages(messages) do
    Enum.map(messages, fn x -> %{
      id: x.id,
      type: x.type,
      body: x.body,
      type: x.type,
      object_name: x.object_name,
      object_type: x.object_type,
      datetime: x.datetime
    } end)
  end

end