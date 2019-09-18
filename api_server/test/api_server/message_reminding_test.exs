defmodule ApiServer.MessageRemindingTest do
  use ApiServer.DataCase

  alias ApiServer.MessageReminding

  describe "messages" do
    alias ApiServer.MessageReminding.Message

    @valid_attrs %{body: "some body"}
    @update_attrs %{body: "some updated body"}
    @invalid_attrs %{body: nil}

    def message_fixture(attrs \\ %{}) do
      {:ok, message} =
        attrs
        |> Enum.into(@valid_attrs)
        |> MessageReminding.create_message()

      message
    end

    test "list_messages/0 returns all messages" do
      message = message_fixture()
      assert MessageReminding.list_messages() == [message]
    end

    test "get_message!/1 returns the message with given id" do
      message = message_fixture()
      assert MessageReminding.get_message!(message.id) == message
    end

    test "create_message/1 with valid data creates a message" do
      assert {:ok, %Message{} = message} = MessageReminding.create_message(@valid_attrs)
      assert message.body == "some body"
    end

    test "create_message/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = MessageReminding.create_message(@invalid_attrs)
    end

    test "update_message/2 with valid data updates the message" do
      message = message_fixture()
      assert {:ok, %Message{} = message} = MessageReminding.update_message(message, @update_attrs)
      assert message.body == "some updated body"
    end

    test "update_message/2 with invalid data returns error changeset" do
      message = message_fixture()
      assert {:error, %Ecto.Changeset{}} = MessageReminding.update_message(message, @invalid_attrs)
      assert message == MessageReminding.get_message!(message.id)
    end

    test "delete_message/1 deletes the message" do
      message = message_fixture()
      assert {:ok, %Message{}} = MessageReminding.delete_message(message)
      assert_raise Ecto.NoResultsError, fn -> MessageReminding.get_message!(message.id) end
    end

    test "change_message/1 returns a message changeset" do
      message = message_fixture()
      assert %Ecto.Changeset{} = MessageReminding.change_message(message)
    end
  end
end
