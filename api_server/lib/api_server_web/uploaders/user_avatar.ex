defmodule ApiServer.UserAvatar do
  use Arc.Definition

  # Include ecto support (requires package arc_ecto installed):
  use Arc.Ecto.Definition
  import Ecto
  
  

  @versions [:original]
  @extension_whitelist ~w(.jpg .jpeg .png)

  # To add a thumbnail version:
  # @versions [:original, :thumb]
  # def acl(:thumb, _), do: :public_read

  # Whitelist file extensions:
  def validate({file, _}) do
  file_extension = file.file_name |> Path.extname |> String.downcase
    Enum.member?(@extension_whitelist, file_extension)
    # ~w(.jpg .jpeg .gif .png) |> Enum.member?(Path.extname(file.file_name))
  end

  # def transform(:original, _) do
  #   Base.decode64!(:original)
  # end

  # Define a thumbnail transformation:
  # def transform(:thumb, _) do
  
    # {:convert, fn(input, output) -> "inline:#{input} -format png #{output}" end, :png}
  # end

  # Override the persisted filenames:
  def filename(version, ops) do
    version
  end

  # Override the storage directory:
  def storage_dir(_version, {_file, scope}) do
    # IO.puts("##########################")
    # IO.puts inspect scope
    # uuid = Ecto.UUID.generate
    "priv/static/files/user/#{scope.uuid}"
  end

  # Provide a default URL if there hasn't been a file uploaded
  # def default_url(version, scope) do
  #   "/images/avatars/default_#{version}.png"
  # end

  # Specify custom headers for s3 objects
  # Available options are [:cache_control, :content_disposition,
  #    :content_encoding, :content_length, :content_type,
  #    :expect, :expires, :storage_class, :website_redirect_location]
  #
  # def s3_object_headers(version, {file, scope}) do
  #   [content_type: Plug.MIME.path(file.file_name)]
  # end
end