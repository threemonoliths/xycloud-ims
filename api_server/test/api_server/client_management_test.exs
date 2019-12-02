defmodule ApiServer.ClientManagementTest do
  use ApiServer.DataCase

  alias ApiServer.ClientManagement

  describe "clients" do
    alias ApiServer.ClientManagement.Client

    @valid_attrs %{cname: "some cname"}
    @update_attrs %{cname: "some updated cname"}
    @invalid_attrs %{cname: nil}

    def client_fixture(attrs \\ %{}) do
      {:ok, client} =
        attrs
        |> Enum.into(@valid_attrs)
        |> ClientManagement.create_client()

      client
    end

    test "list_clients/0 returns all clients" do
      client = client_fixture()
      assert ClientManagement.list_clients() == [client]
    end

    test "get_client!/1 returns the client with given id" do
      client = client_fixture()
      assert ClientManagement.get_client!(client.id) == client
    end

    test "create_client/1 with valid data creates a client" do
      assert {:ok, %Client{} = client} = ClientManagement.create_client(@valid_attrs)
      assert client.cname == "some cname"
    end

    test "create_client/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = ClientManagement.create_client(@invalid_attrs)
    end

    test "update_client/2 with valid data updates the client" do
      client = client_fixture()
      assert {:ok, %Client{} = client} = ClientManagement.update_client(client, @update_attrs)
      assert client.cname == "some updated cname"
    end

    test "update_client/2 with invalid data returns error changeset" do
      client = client_fixture()
      assert {:error, %Ecto.Changeset{}} = ClientManagement.update_client(client, @invalid_attrs)
      assert client == ClientManagement.get_client!(client.id)
    end

    test "delete_client/1 deletes the client" do
      client = client_fixture()
      assert {:ok, %Client{}} = ClientManagement.delete_client(client)
      assert_raise Ecto.NoResultsError, fn -> ClientManagement.get_client!(client.id) end
    end

    test "change_client/1 returns a client changeset" do
      client = client_fixture()
      assert %Ecto.Changeset{} = ClientManagement.change_client(client)
    end
  end
end
