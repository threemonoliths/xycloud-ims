defmodule ApiServer.Utils.StringHandler do

  # input: "abc.doc" output: "abc"
  def get_file_name(full_name) do
    list = String.split(full_name, ".")
    length = length(list)
    case length do
      0 -> nil
      1 -> full_name
      n -> List.delete_at(list, n-1) |> List.to_string
    end
  end

   # input: "abc/doc" output: "abc"
   def get_file_path_from_arc(full_name) do
    list = String.split(full_name, "/")
    length = length(list)
    case length do
      0 -> nil
      1 -> full_name
      n -> 
        max_index =n-2
        List.delete_at(list, n-1) 
        |> Enum.with_index
        |> Enum.reduce("", fn {e, index}, acc -> 
          cond do
            index == max_index -> acc <> e
            index < max_index -> acc <> e <> "/" 
            true -> acc
          end
        end)
    end
  end

  # input: "ab?c.doc?1234" output: "ab?c.doc"
  def get_file_name_from_arc_field(full_name) do
    list = String.split(full_name, "?")
    length = length(list)
    case length do
      0 -> nil
      1 -> full_name
      n -> 
        max_index =n-2
        List.delete_at(list, n-1) 
        |> Enum.with_index
        |> Enum.reduce("", fn {e, index}, acc -> 
          cond do
            index == max_index -> acc <> e
            index < max_index -> acc <> e <> "?" 
            true -> acc
          end
        end)
    end
  end

  # 删除前缀，示例 输入 ("helloworld", "hello") 输出 ("world")
  def take_prefix(full, prefix) do  
    base = String.length(prefix)
    String.slice(full, base, String.length(full) - base)
  end  

end