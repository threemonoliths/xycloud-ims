defmodule ApiServer.SearchTerm do
  use Ecto.Schema
  import Ecto.Query, only: [where: 3, or_where: 3, order_by: 3, preload: 3]
  import Ecto.Query.API, only: [like: 2, field: 2]
  alias ApiServer.Repo

  def query_like(query, params, field_name) do
    case Map.get(params, field_name) do
      nil -> query
      value -> 
        where(query, [e], like(field(e, ^String.to_existing_atom(field_name)), ^"%#{value}%"))
    end
  end

  def query_or_like(query, value, field_name) do
    case value do
      nil -> query
      value -> 
        or_where(query, [e], like(field(e, ^String.to_existing_atom(field_name)), ^"%#{value}%"))
    end
  end

  def query_equal(query, params, field_name) do
    case Map.get(params, field_name) do
      nil -> query
      value -> query |> where([e], field(e, ^String.to_existing_atom(field_name)) == ^value)
    end
  end

  def query_not_equal(query, params, field_name) do
    case Map.get(params, field_name) do
      nil -> query
      value -> query |> where([e], field(e, ^String.to_existing_atom(field_name)) != ^value)
    end
  end

  def query_greater_than(query, field_name, compare_value) do
    query 
    |> where([e], field(e, ^String.to_existing_atom(field_name)) > ^compare_value)
  end

  def query_greater_or_equal_than(query, field_name, compare_value) do
    query 
    |> where([e], field(e, ^String.to_existing_atom(field_name)) >= ^compare_value)
  end

  def query_less_than(query, field_name, compare_value) do
    query 
    |> where([e], field(e, ^String.to_existing_atom(field_name)) < ^compare_value)
  end

  def query_less_or_equal_than(query, field_name, compare_value) do
    query 
    |> where([e], field(e, ^String.to_existing_atom(field_name)) <= ^compare_value)
  end

  # 默认升序排列
  def query_order_by(query, params, default_field) do
    sort = [{Map.get(params, "sort_direction", "asc") |> String.to_existing_atom, Map.get(params, "sort_field", default_field) |> String.to_existing_atom}]
    order_by(query, [e], ^sort)
  end

  # 默认降序排列
  def query_order_desc_by(query, params, default_field) do
    sort = [{Map.get(params, "sort_direction", "desc") |> String.to_existing_atom, Map.get(params, "sort_field", default_field) |> String.to_existing_atom}]
    order_by(query, [e], ^sort)
  end

  def query_paginate(query, params) do
    query
    |> Repo.paginate(page: Map.get(params, "page_number", "1"), page_size: Map.get(params, "page_size", "20"))
  end

  def query_preload(query, field_name_atom_list) do
    preload(query, [e], ^field_name_atom_list)
  end
  
end