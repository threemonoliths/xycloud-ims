defmodule ApiServer.BaseContext do
  
  import Ecto.Query, warn: false
  alias ApiServer.Repo
  import ApiServer.SearchTerm
  import Ecto.Query.API, only: [like: 2, field: 2, max: 1]

  defmacro __using__(_opts) do
    quote do
      alias ApiServer.Repo
      import ApiServer.BaseContext
      import ApiServer.SearchTerm
    end
  end

  def list_all(struct) do
    struct
    |> Repo.all
  end

  def get_pagination(query, params) do
    query
    |> query_paginate(params)
  end

  def get_by_id(struct, id, preload_list \\ []) do
    struct
    |> query_preload(preload_list)
    |> Repo.get(id)
    |> case do
      nil -> {:error, :not_found}
      entity -> {:ok, entity}
    end
  end

  def get_by_name(query, field_value) do
    query
    |> Repo.get_by(field_value)
    |> case do
      nil -> {:error, :not_found}
      entity -> {:ok, entity}
    end
  end

  def save_create(changeset) do
    Repo.insert(changeset)
  end

  def save_update(changeset) do
    Repo.update(changeset)
  end

  def delete_by_id(struct, id, preload_list \\ []) do
    struct
    |> get_by_id(id, preload_list)
    |> case do
      {:error, :not_found} -> {:error, :not_found}
      {:ok, entity} -> Repo.delete(entity)
    end
  end

  # 获取某字段的最大值
  def get_max(struct, field_atom) do
    query = from p in struct, select: max(field(p, ^field_atom))
    query 
    |> Repo.one
  end

  def change(struct, entity) do
    struct.changeset(entity, %{})
  end
end