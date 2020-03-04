defmodule ApiServer.ResourceManagementTest do
  use ApiServer.DataCase

  alias ApiServer.ResourceManagement

  describe "resources" do
    alias ApiServer.ResourceManagement.Resource

    @valid_attrs %{sname: "some sname"}
    @update_attrs %{sname: "some updated sname"}
    @invalid_attrs %{sname: nil}

    def resource_fixture(attrs \\ %{}) do
      {:ok, resource} =
        attrs
        |> Enum.into(@valid_attrs)
        |> ResourceManagement.create_resource()

      resource
    end

    test "list_resources/0 returns all resources" do
      resource = resource_fixture()
      assert ResourceManagement.list_resources() == [resource]
    end

    test "get_resource!/1 returns the resource with given id" do
      resource = resource_fixture()
      assert ResourceManagement.get_resource!(resource.id) == resource
    end

    test "create_resource/1 with valid data creates a resource" do
      assert {:ok, %Resource{} = resource} = ResourceManagement.create_resource(@valid_attrs)
      assert resource.sname == "some sname"
    end

    test "create_resource/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = ResourceManagement.create_resource(@invalid_attrs)
    end

    test "update_resource/2 with valid data updates the resource" do
      resource = resource_fixture()
      assert {:ok, %Resource{} = resource} = ResourceManagement.update_resource(resource, @update_attrs)
      assert resource.sname == "some updated sname"
    end

    test "update_resource/2 with invalid data returns error changeset" do
      resource = resource_fixture()
      assert {:error, %Ecto.Changeset{}} = ResourceManagement.update_resource(resource, @invalid_attrs)
      assert resource == ResourceManagement.get_resource!(resource.id)
    end

    test "delete_resource/1 deletes the resource" do
      resource = resource_fixture()
      assert {:ok, %Resource{}} = ResourceManagement.delete_resource(resource)
      assert_raise Ecto.NoResultsError, fn -> ResourceManagement.get_resource!(resource.id) end
    end

    test "change_resource/1 returns a resource changeset" do
      resource = resource_fixture()
      assert %Ecto.Changeset{} = ResourceManagement.change_resource(resource)
    end
  end
end
