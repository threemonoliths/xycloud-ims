defmodule ApiServer.Utils.NoGenerator do

  alias ApiServer.Utils.DatetimeHandler

  # 获取当天最小流水号单号
  def get_min_no() do
    DatetimeHandler.get_date_str <> "00001"
  end

  # 获取下个流水号
  def get_next_no(currentNo) do
    currentNo = 
    if is_nil(currentNo) do
      "0000000000000"
    else
      currentNo
    end
    date_no_str = currentNo
    |> String.slice(0..7)
    serial_no_str = currentNo
    |> String.slice(8..12)
    today_no_str = DatetimeHandler.get_date_str

    case { date_no_str > today_no_str, date_no_str == today_no_str && serial_no_str == "99999" } do
      {true, _} -> {:error, "date_str is invalid."}
      {_, true} -> {:error, "serial_no is overflow."}
      {false, false} -> 
        
        current_serial_no = 
        if date_no_str < today_no_str do
          0
        else 
          serial_no_str
          |> String.to_integer
        end
        
        next_serial_no_str = current_serial_no + 1
        |> Integer.to_string

        case String.length(next_serial_no_str) do
          1 -> {:ok, today_no_str <> "0000" <> next_serial_no_str}
          2 -> {:ok, today_no_str <> "000" <> next_serial_no_str}
          3 -> {:ok, today_no_str <> "00" <>next_serial_no_str}
          4 -> {:ok, today_no_str <> "0" <>next_serial_no_str}
          5 -> {:ok, today_no_str <> next_serial_no_str}
          _ -> {:error, "serial_no is invalid."}
        end
    end
  end


end