defmodule ApiServerWeb.MessageView do
  use ApiServerWeb, :view
  alias ApiServerWeb.MessageView

  def render("index.json", %{messages: messages}) do
    %{data: render_many(messages, MessageView, "message.json")}
  end

  def render("show.json", %{message: message}) do
    %{data: render_one(message, MessageView, "message.json")}
  end

  def render("message.json", %{message: message}) do
    %{
      id: message.id,
      type: message.type,
      body: message.body,
      datetime: message.datetime,
    }
  end

  def render("set_read.json", %{message: record}) do
    %{
      id: record.id,
      last_datetime: record.last_datetime
    }
  end
end
