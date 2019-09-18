defmodule ApiServerWeb.RemindingChannel do
  use Phoenix.Channel

  use ApiServer.MessageReminding
  alias ApiServer.MessageReminding.Message

  def join("reminding:contract", %{"token" => token}, socket) do
    with {:ok, claims} <- ApiServerWeb.Guardian.decode_and_verify(token) do
      {:ok, resource} = ApiServerWeb.Guardian.resource_from_claims(claims)
      send(self, {:after_join, resource})
      {:ok, socket}
    end
  end

  def handle_info({:after_join, resource}, socket) do
    messages = get_all_reminding_message(%{"type" => "new_contract"}, resource)
    push socket, "new_msg", %{messages: messages |> resolve_messages}
    {:noreply, socket}
  end

  def join("reminding:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
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

  # 客户端确认接收到消息后，会发一条返回消息，后台置已读状态
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
      datetime: x.datetime
    } end)
  end

end