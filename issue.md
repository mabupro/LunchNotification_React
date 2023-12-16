### 名前

**いつでもランチチェック**

### Page一覧

- User
  - ランチメニューを表示するのみ
- Admin
  - ランチメニューの売り切れ情報を変更できる
- Login
  - FireabaseのAuthenticationなので、画面実質なし
  - GoogleLogin採用

### Components一覧

- Header
  - タイトル、ログインログアウトボタン
- ReloadButton（仮）
  - 更新ボタンのロジック書く用
- Card
  - ランチの情報を入れる
    - ランチの画像（soldoutはスタイルで変更）
    - ランチの名前
    - ランチの値段
  - 売り切れ情報切り替えるボタン
    - ログイン時のみ表示する
- Menu
  - Cardをまとめるcomonent（UserとAdminに使用）

### database(Firebase Firestore)

- admin
  - admin_users
    - gmail(string,null:false, unique:true)
- menu
  - (menu_name)
    - name(string,null:false, unique:true)
    - price(int,null:false)
    - is_soldout(bool,null:false)