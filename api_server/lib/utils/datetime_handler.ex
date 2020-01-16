defmodule ApiServer.Utils.DatetimeHandler do

  use Timex

  def get_now() do
    Timex.now("Asia/Shanghai")
  end

  def get_date_str() do
    Timex.now
    |> Timex.format!("%Y%m%d", :strftime)
  end

  # https://hexdocs.pm/timex/formatting.html#content
  # return datetime str "2019-09-17 08:21:30"
  def get_now_str() do
    get_now
    |> Poison.encode!
    |> datetime_str_format
  end

  # 输入日期类型值，输出字符串
  def get_date_str(date) do
    date
    |> Poison.encode!
    |> date_str_format
  end

  def get_now_date_str() do
    get_now_str
    |> String.slice(0..9)
  end

  defp date_str_format(datetime_str) do
    datetime_str
    |> String.slice(1..10)
    |> String.replace("T"," ")
  end


  defp datetime_str_format(datetime_str) do
    datetime_str
    |> String.slice(1..19)
    |> String.replace("T"," ")
  end

  defp print(x) do
    IO.inspect x
    x
  end

end