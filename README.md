<div align="center">
  <img src="https://user-images.githubusercontent.com/7829486/164140911-6eaa0ea4-31c1-4393-bb9f-80f8914ef4c9.png" alt="ZEUS logo" style="height: 5rem;"/>
  <div><strong>All-knowing, omniscient God who knows everything about the class.</strong></div>
</div>

## Introduction
As a graduation project, I, as a student, am developing a learning support tool that can solve the frustrations that NEEC students may feel in their daily school life. In addition to supporting learning, the tool will also serve to promote communication among students.

## Features
- View detailed information about the current and next classes.
  - Subject Name
  - Course Location
  - Teacher's Name
  - Time remaining in class / Time remaining before the next class starts
  - Show the corresponding Google Classroom and ZOOM links
- Automatic renaming of assignment files to match the format for submission
- Realtime Chat
- BBS
- List and check notices from teachers
- User Profiles
  - Icon
  - Status Message
  - Various SNS links, etc...

## Technology Stack(Including planned use)
- Next.js deployed in Vercel
- Socket.IO
- Firebase Authentication
- Firebase Cloud Firestore
- Firebase Cloud Storage
- Twitter API

---

## ZEUS 今後の開発方針(リファクタリング案)

### *完成を第一としてサービスの規模を縮小しつつ、在学中にITカレッジの学生に普段遣いレベルで使ってもらう*

#### 仕様変更
- **対応キャンパスの限定化(八王子校のみ対応させる)**
  - 室蘭の天気予報が表示できるようになっていたり、ユーザー登録時に蒲田が選べるようになっていたりするが、他校の状況は不明な上に、他校に対応させると実装コストが段違いに高くなるので八王子校のみでの利用想定とする
  - 天気予報から室蘭を、ユーザー登録時のキャンパス選択項目を消す
- **`学生`と`教員`という概念を無くし、`ユーザー`に一本化する**
  - ユーザーの属性によってパーミッション管理などをするとかなり実装コストが高くなる 
  - Firebaseの`students`コレクションを`users`にリネームする
  - ユーザー登録時のユーザー属性の選択項目を消す
  - 時間割データーの管理について
     - 時間割編集画面を新たに作り、該当クラスに所属しているユーザーならば自分のクラスの時間割データーを好きにいじれるようにする。(荒らされる可能性もあるがユーザーの善意に賭ける)
         - UIはそれなりに適当でも良い。とりあえずリリースして後で修正すれば良い。 
- **`お知らせ`機能の削除**
  - `教員`という概念を無くしたのでお知らせを投稿する人物がいなくなった
  - Classroomを見れば済む話ではあるので必須機能とは考えにくい
- **`FileDispenser`機能の削除**
  - バックエンド側も含めて実装コストが高い
  - 事前にファイルを添付した課題を下書きにして、使う時に投稿する教員がいる
     - 教員側の二度手間になるし、学生はこれまでそれでやってきたから慣れてはいる
  - 代わりに週間の時間割をリスト形式で表示する 
- **ウィジェットの`◯◯の日`の削除**
  - 必須機能ではないのに365日分の何の日かのデーターセットを作成するのはかなり手間

#### それ以外でやること
- オブジェクトの型付けをもう少しどうにかする
  - `interfaces`フォルダーを作成して`firebase.ts`とか`user.ts`とかでジャンルごとにモジュール化して使う 
- コンポーネントをフォルダー分けして整理
- ホームルームのリンクをトップページに追加
- プロフィール編集画面・機能の実装
- プロフィール画面実装
  - チャットやBBSでユーザー名やユーザーアイコンをクリックした時に開く
  - `Popover`で開くのか`Modal`で開くのかは要検討 
- チャットの若干のレイアウト崩れ 
- バックエンド側のドメインを`fugamaru.com`から`server.fugamaru.com`等に変更
  - nginx側でリバースプロキシ設定の対応必要 
 
#### 未定
- **クラスデーター管理について**
  - クラスデーターの管理は何ができれば良いのか
     - `作成``削除``表示名設定・編集``ホームルーム用ClassroomリンクURLの設定・編集`ができれば良い  
  - クラスデーター自体は`表示名`や`時間割`データーしか持たないが、授業データーやクラスチャットは所属クラスによってデーターの取得先だったり、スコープだったりを切り替えているのでクラスデーターの存在は無碍にできない
  - `教員`という概念が消えることによってクラスデーターの管理者がいなくなる
  - しかし、クラスデーターは先の通りZEUSの根幹に近いデーターであることから、荒らされてはまずいので全ユーザーに管理権限を付与することは避けたほうが良いと考える
  - **対応策**→ 環境変数などで許可された指定ユーザーのみアクセスできるクラス管理用のページを作成する