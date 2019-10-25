defmodule ApiServer.SupplierManagementTest do
  use ApiServer.DataCase

  alias ApiServer.SupplierManagement

  describe "suppliers" do
    alias ApiServer.SupplierManagement.Supplier

    @valid_attrs %{sname: "some sname"}
    @update_attrs %{sname: "some updated sname"}
    @invalid_attrs %{sname: nil}

    def supplier_fixture(attrs \\ %{}) do
      {:ok, supplier} =
        attrs
        |> Enum.into(@valid_attrs)
        |> SupplierManagement.create_supplier()

      supplier
    end

    test "list_suppliers/0 returns all suppliers" do
      supplier = supplier_fixture()
      assert SupplierManagement.list_suppliers() == [supplier]
    end

    test "get_supplier!/1 returns the supplier with given id" do
      supplier = supplier_fixture()
      assert SupplierManagement.get_supplier!(supplier.id) == supplier
    end

    test "create_supplier/1 with valid data creates a supplier" do
      assert {:ok, %Supplier{} = supplier} = SupplierManagement.create_supplier(@valid_attrs)
      assert supplier.sname == "some sname"
    end

    test "create_supplier/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = SupplierManagement.create_supplier(@invalid_attrs)
    end

    test "update_supplier/2 with valid data updates the supplier" do
      supplier = supplier_fixture()
      assert {:ok, %Supplier{} = supplier} = SupplierManagement.update_supplier(supplier, @update_attrs)
      assert supplier.sname == "some updated sname"
    end

    test "update_supplier/2 with invalid data returns error changeset" do
      supplier = supplier_fixture()
      assert {:error, %Ecto.Changeset{}} = SupplierManagement.update_supplier(supplier, @invalid_attrs)
      assert supplier == SupplierManagement.get_supplier!(supplier.id)
    end

    test "delete_supplier/1 deletes the supplier" do
      supplier = supplier_fixture()
      assert {:ok, %Supplier{}} = SupplierManagement.delete_supplier(supplier)
      assert_raise Ecto.NoResultsError, fn -> SupplierManagement.get_supplier!(supplier.id) end
    end

    test "change_supplier/1 returns a supplier changeset" do
      supplier = supplier_fixture()
      assert %Ecto.Changeset{} = SupplierManagement.change_supplier(supplier)
    end
  end
end
