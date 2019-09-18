defmodule ApiServer.Utils.Print do

  def print(everything) do
    IO.puts "@@@@@@@@@@ debug print start @@@@@@@@@@"
    IO.inspect everything
    IO.puts "@@@@@@@@@@ debug print ending @@@@@@@@@@"
    everything
  end

   
end