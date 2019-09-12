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
  def get_now_str() do
    get_now
    # |> Timex.format!("%Y%m%d%H", :strftime)
    |> Poison.encode!
    |> datetime_str_format
    # |> Timex.format!("%Y%m%d%H", :strftime)
    # |> Timex.format!("{YYYY}-{0M}-{D}-{HH}-{M}-{S}")
  end

  defp datetime_str_format(datetime_str) do
    datetime_str
    |> String.slice(1..19)
    |> String.replace("T"," ")
    
  end

end