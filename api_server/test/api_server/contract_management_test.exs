defmodule ApiServer.ContractManagementTest do
  use ApiServer.DataCase

  alias ApiServer.ContractManagement

  describe "contracts" do
    alias ApiServer.ContractManagement.Contract

    @valid_attrs %{cno: "some cno"}
    @update_attrs %{cno: "some updated cno"}
    @invalid_attrs %{cno: nil}

    def contract_fixture(attrs \\ %{}) do
      {:ok, contract} =
        attrs
        |> Enum.into(@valid_attrs)
        |> ContractManagement.create_contract()

      contract
    end

    test "list_contracts/0 returns all contracts" do
      contract = contract_fixture()
      assert ContractManagement.list_contracts() == [contract]
    end

    test "get_contract!/1 returns the contract with given id" do
      contract = contract_fixture()
      assert ContractManagement.get_contract!(contract.id) == contract
    end

    test "create_contract/1 with valid data creates a contract" do
      assert {:ok, %Contract{} = contract} = ContractManagement.create_contract(@valid_attrs)
      assert contract.cno == "some cno"
    end

    test "create_contract/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = ContractManagement.create_contract(@invalid_attrs)
    end

    test "update_contract/2 with valid data updates the contract" do
      contract = contract_fixture()
      assert {:ok, %Contract{} = contract} = ContractManagement.update_contract(contract, @update_attrs)
      assert contract.cno == "some updated cno"
    end

    test "update_contract/2 with invalid data returns error changeset" do
      contract = contract_fixture()
      assert {:error, %Ecto.Changeset{}} = ContractManagement.update_contract(contract, @invalid_attrs)
      assert contract == ContractManagement.get_contract!(contract.id)
    end

    test "delete_contract/1 deletes the contract" do
      contract = contract_fixture()
      assert {:ok, %Contract{}} = ContractManagement.delete_contract(contract)
      assert_raise Ecto.NoResultsError, fn -> ContractManagement.get_contract!(contract.id) end
    end

    test "change_contract/1 returns a contract changeset" do
      contract = contract_fixture()
      assert %Ecto.Changeset{} = ContractManagement.change_contract(contract)
    end
  end
end
