# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     ApiServer.Repo.insert!(%ApiServer.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias ApiServer.Accounts.User

admin = %User{
  name: "admin",
  password_hash: Comeonin.Pbkdf2.hash_pwd_salt("admin123"),
  real_name: "王磊",
  mobile: "15156709660",
  position: "挨踢狗",
  is_admin: true,
  perms_number: 15
}

admin
|> ApiServer.Repo.insert
