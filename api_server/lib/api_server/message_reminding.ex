defmodule ApiServer.MessageReminding do
  @moduledoc """
  The MessageReminding context.
  """

  import Ecto.Query, warn: false
  alias ApiServer.Repo

  alias ApiServer.MessageReminding.Message
  alias ApiServer.UserMessageRecord
  use ApiServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import ApiServer.MessageReminding
      use ApiServer.BaseContext
      alias ApiServer.MessageReminding.Message
      alias ApiServer.UserMessageRecord
    end
  end

  def get_all_reminding_message(params, user) do 
    last_datetime = get_last_datetime(user.id)
    Message
    |> query_equal(params, "type")
    |> query_greater_than("datetime", last_datetime)
    |> query_order_desc_by(params, "inserted_at")
    |> Repo.all
  end

  def get_last_datetime(user_id) do
    UserMessageRecord
    |> query_equal(%{ "user_id" => user_id }, "user_id")
    |> Repo.one
    |> case do
      nil ->
        params = %{ user_id: user_id, last_datetime: "0000-00-00 00:00:00"} 
        UserMessageRecord.changeset(%UserMessageRecord{}, params)
        |> Repo.insert
        "0000-00-00 00:00:00"
      record ->
        record.last_datetime
    end
  end

  def set_last_datetime(user_id, last_datetime) do
    UserMessageRecord
    |> query_equal(%{ "user_id" => user_id }, "user_id")
    |> Repo.one
    |> case do
      nil ->
        params = %{ user_id: user_id, last_datetime: last_datetime} 
        UserMessageRecord.changeset(%UserMessageRecord{}, params)
        |> Repo.insert
      record ->
        UserMessageRecord.changeset(record, %{last_datetime: last_datetime})
        |> Repo.update
    end
  end

  # 根据消息针对的对象id和类型，查询message是否已经存在
  def is_exist(object_name, object_type) do
    Message
    |> query_equal(%{ "object_name" => object_name }, "object_name")
    |> query_equal(%{ "object_type" => object_type }, "object_type")
    |> Repo.all 
    |> case do
      [] -> false
      _ -> true
    end
  end
end
