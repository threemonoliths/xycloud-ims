defmodule ApiServer.TmplManagementTest do
  use ApiServer.DataCase

  alias ApiServer.TmplManagement

  describe "tmpls" do
    alias ApiServer.TmplManagement.Tmpl

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def tmpl_fixture(attrs \\ %{}) do
      {:ok, tmpl} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TmplManagement.create_tmpl()

      tmpl
    end

    test "list_tmpls/0 returns all tmpls" do
      tmpl = tmpl_fixture()
      assert TmplManagement.list_tmpls() == [tmpl]
    end

    test "get_tmpl!/1 returns the tmpl with given id" do
      tmpl = tmpl_fixture()
      assert TmplManagement.get_tmpl!(tmpl.id) == tmpl
    end

    test "create_tmpl/1 with valid data creates a tmpl" do
      assert {:ok, %Tmpl{} = tmpl} = TmplManagement.create_tmpl(@valid_attrs)
      assert tmpl.name == "some name"
    end

    test "create_tmpl/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TmplManagement.create_tmpl(@invalid_attrs)
    end

    test "update_tmpl/2 with valid data updates the tmpl" do
      tmpl = tmpl_fixture()
      assert {:ok, %Tmpl{} = tmpl} = TmplManagement.update_tmpl(tmpl, @update_attrs)
      assert tmpl.name == "some updated name"
    end

    test "update_tmpl/2 with invalid data returns error changeset" do
      tmpl = tmpl_fixture()
      assert {:error, %Ecto.Changeset{}} = TmplManagement.update_tmpl(tmpl, @invalid_attrs)
      assert tmpl == TmplManagement.get_tmpl!(tmpl.id)
    end

    test "delete_tmpl/1 deletes the tmpl" do
      tmpl = tmpl_fixture()
      assert {:ok, %Tmpl{}} = TmplManagement.delete_tmpl(tmpl)
      assert_raise Ecto.NoResultsError, fn -> TmplManagement.get_tmpl!(tmpl.id) end
    end

    test "change_tmpl/1 returns a tmpl changeset" do
      tmpl = tmpl_fixture()
      assert %Ecto.Changeset{} = TmplManagement.change_tmpl(tmpl)
    end
  end
end
