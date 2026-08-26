# DEV_HANDOFF.md

## 目的
このファイルは、ChatGPTの会話履歴が失われても、野鳥観察投稿アプリの開発を継続できるようにするための引き継ぎ資料です。

新しいチャットでは、このファイルを渡して、
「このDEV_HANDOFF.mdを読んで、現在地点から開発を再開したい」
と伝えれば、現在の設計・進捗・次の作業を再現できることを目標にします。

---

# 1. プロジェクト概要

## アプリ名
野鳥観察投稿アプリ

## 目的
釧路周辺の野鳥観察情報を投稿・閲覧できるWebアプリ。

主な利用イメージ：
- 野鳥観察投稿を見る
- 鳥から投稿を探す
- エリアから投稿を探す
- 観察投稿を登録する
- 投稿詳細を見る
- 投稿を編集・削除する

## MVP優先方針
まず動くMVPを完成させる。
細かい例外処理、UI完成度、深いSpring/JPA内部理解は後回し。

MVP完成後に、
- コードを自分で再現する
- コードを書く前に処理の流れを説明する
- 小変更・小機能追加ができる状態を目指す

---

# 2. 技術構成

## Frontend
- React
- Vite
- JavaScript
- localhost:5173 または localhost:5174

## Backend
- Java
- Spring Boot
- localhost:8080
- Spring Data JPA

## Database
- MySQL
- Dockerコンテナ
- DB名: `birdwatching`

※ パスワードなどの秘密情報はこのファイルに書かない。

---

# 3. Git運用

プロジェクトルート：
`C:\Users\a123f\OneDrive\ドキュメント\birdwatching-app`

ブランチ：
`master`

## 重要
`git add .` は基本使わない。

理由：
- `application.properties` に今回の機能と無関係な変更がある
- 日本語名の未追跡フォルダがある
- 設計資料などを誤ってコミットしないため

必要なファイルだけ個別に `git add` する。

---

# 4. 主なEntity

## Post
主なフィールド：

```java
private Long postId;
private Long birdId;
private Long areaId;
private LocalDate observedDate;
private String comment;
private LocalDateTime createdAt;
```

コンストラクタ：

```java
public Post() {}

public Post(Long birdId, Long areaId, LocalDate observedDate, String comment) {
    this.birdId = birdId;
    this.areaId = areaId;
    this.observedDate = observedDate;
    this.comment = comment;
}
```

## Bird
```java
private Long id;
private String nameJa;
private String nameEn;
private String description;
private String imageUrl;
```

## Area
現在のMVPでは：

```java
private Long id;
private String name;
```

---

# 5. DTO

## PostRequest
React → Spring Boot の投稿登録用。

```java
private Long birdId;
private Long areaId;
private LocalDate observedDate;
private String comment;
```

流れ：

```text
ReactのJSON
↓
@RequestBody
↓
PostRequest
↓
ServiceでPost Entityへ変換
↓
DB保存
```

## PostResponse
Spring Boot → React の表示用。

主なプロパティ：
- postId
- birdName
- observedDate
- areaName
- comment

Reactでは：

```js
post.postId
post.birdName
post.observedDate
post.areaName
post.comment
```

`birdName` と `areaName` はPost Entityそのものにはなく、ServiceでBird / Areaを取得してPostResponseに詰めている。

---

# 6. Repository

## PostRepository

概ね：

```java
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByBirdId(Long birdId);
    List<Post> findByAreaId(Long areaId);
}
```

`JpaRepository<Post, Long>` の意味：
- Post Entityを扱うRepository
- Postの主キー型はLong

最初から使える代表例：
- findAll()
- findById()
- save()
- deleteById()

自分で定義したもの：
- findByBirdId()
- findByAreaId()

理由：Postの主キー以外のフィールドで検索するため。

## BirdRepository
```java
public interface BirdRepository extends JpaRepository<Bird, Long> {
}
```

## AreaRepository
```java
public interface AreaRepository extends JpaRepository<Area, Long> {
}
```

---

# 7. 実装済み機能

## 投稿一覧
`GET /api/posts`

## 投稿登録
`POST /api/posts`

## 鳥別投稿
`GET /api/posts?birdId=1`

## エリア別投稿
`GET /api/posts?areaId=1`

鳥別・エリア別ともに実装済み、React表示まで動作確認済み。

---

# 8. Reactの主なstate

```jsx
const [posts, setPosts] = useState([])

const [birdId, setBirdId] = useState("")
const [areaId, setAreaId] = useState("")
const [observedDate, setObservedDate] = useState("")
const [comment, setComment] = useState("")

const [birds, setBirds] = useState([])
const [areas, setAreas] = useState([])

const [birdPosts, setBirdPosts] = useState([])
const [selectedBirdId, setSelectedBirdId] = useState("")

const [areaPosts, setAreaPosts] = useState([])
const [selectedAreaId, setSelectedAreaId] = useState("")
```

投稿詳細用として追加中：

```jsx
const [selectedPostId, setSelectedPostId] = useState("")
const [selectedPost, setSelectedPost] = useState(null)
```

---

# 9. データの流れの理解

## Java → JSON → React

例：

Java側のプロパティ：
```java
getBirdName()
```

JSON：
```json
{
  "birdName": "タンチョウ"
}
```

React：
```js
post.birdName
```

重要：
ReactがJavaのgetterを直接呼んでいるわけではない。

```text
Javaオブジェクト
↓
JSON
↓
JavaScriptオブジェクト
```

と姿が変わる。

---

# 10. 鳥から探す

```text
鳥を選択
↓
selectedBirdId更新
↓
useEffect([selectedBirdId])
↓
GET /api/posts?birdId=...
↓
Controller
↓
Service
↓
Repository.findByBirdId()
↓
List<Post>
↓
List<PostResponse>
↓
JSON
↓
React
↓
birdPosts
↓
mapで表示
```

---

# 11. エリアから探す

```text
エリアを選択
↓
selectedAreaId更新
↓
useEffect([selectedAreaId])
↓
GET /api/posts?areaId=...
↓
Controller
↓
Service
↓
Repository.findByAreaId()
↓
List<Post>
↓
List<PostResponse>
↓
JSON
↓
React
↓
areaPosts
↓
mapで表示
```

---

# 12. 投稿フォームの最低限バリデーション

## 発生したバグ
鳥未選択で投稿し、`bird_id = 0` の不正なPostがDBに保存された。

その後：
```text
birdService.getBirdById(0)
↓
null
↓
bird.getNameJa()
↓
NullPointerException
↓
GET /api/posts が500
↓
Reactで posts.map is not a function
```

不正なDB行は手動削除して復旧。

## 対策1：select
```jsx
onChange={(e) =>
  setBirdId(
    e.target.value === "" ? "" : Number(e.target.value)
  )
}
```

areaIdも同様。

意味：
- 未選択なら `""` のまま
- 選択済みなら文字列IDを数値に変換

## 対策2：handleSubmit
```jsx
if (birdId === "" || areaId === "" || observedDate === "") {
    return
}
```

動作確認済み：
- 鳥未選択 → 投稿されない
- エリア未選択 → 投稿されない
- 必須入力済み → 投稿できる

---

# 13. 現在作業中：投稿詳細

## 目的
投稿一覧から1件を選択し、詳細表示する。
その後の編集・削除の入口にする。

流れ：

```text
投稿一覧
↓
投稿1件を選択
↓
投稿詳細
↓
編集 / 削除
```

## React：現在ここまで

投稿一覧の1件をクリック：

```jsx
{posts.map((post) => (
    <div
        key={post.postId}
        onClick={() => setSelectedPostId(post.postId)}
    >
        <p>{post.birdName}</p>
        <p>{post.observedDate}</p>
        <p>{post.areaName}</p>
        <p>{post.comment}</p>
    </div>
))}
```

投稿詳細取得用useEffect：

```jsx
useEffect(() => {
    if (selectedPostId === "") {
        return
    }

    const fetchSelectedPost = async () => {
        const response = await fetch(
            `http://localhost:8080/api/posts/${selectedPostId}`
        )
        const data = await response.json()
        setSelectedPost(data)
    }

    fetchSelectedPost()
}, [selectedPostId])
```

重要：

```text
React
selectedPostId = 3
↓
HTTP
GET /api/posts/3
↓
Spring Boot
@PathVariable Long postId
↓
postId = 3
```

Reactの変数名とJavaの変数名が直接つながっているわけではない。
フロントとバックをつないでいるのはHTTPリクエスト。

## Controller：想定

```java
@GetMapping("/{postId}")
public PostResponse getPostById(@PathVariable Long postId) {
    return postService.getPostById(postId);
}
```

## Service：現在書いたところ

```java
public PostResponse getPostById(Long postId) {
    Post foundPost = postRepository.findById(postId).orElse(null);

    Bird bird = birdService.getBirdById(foundPost.getBirdId());
    Area area = areaService.getAreaById(foundPost.getAreaId());

    String birdName = bird.getNameJa();
    String areaName = area.getName();

    return new PostResponse(
            foundPost.getPostId(),
            birdName,
            foundPost.getObservedDate(),
            areaName,
            foundPost.getComment()
    );
}
```

現在はMVP優先で `.orElse(null)` を使用。
404等の堅牢な例外処理は後回し。

---

# 14. Optionalの理解

`findById()` は直接Postを返さず `Optional<Post>` を返す。

理由：
- 指定IDのPostが存在する可能性
- 存在しない可能性

今回：

```java
postRepository.findById(postId).orElse(null)
```

で、
- あればPost
- なければnull

比較：

```text
findAll()
→ List<Post>
→ 0件なら []

findById()
→ Optional<Post>
→ 1件が存在しない可能性を表す
```

---

# 15. 次にやること

投稿詳細の残り：

1. PostControllerの `GET /api/posts/{postId}` を確認
2. PostServiceの `getPostById()` を保存
3. Spring Boot再起動
4. `/api/posts/1` などで動作確認
5. Reactで投稿1件をクリック
6. `selectedPost` に取得結果が入ることを確認
7. Reactに詳細表示を書く

表示例：

```jsx
{selectedPost && (
    <div>
        <h2>投稿詳細</h2>
        <p>{selectedPost.birdName}</p>
        <p>{selectedPost.observedDate}</p>
        <p>{selectedPost.areaName}</p>
        <p>{selectedPost.comment}</p>
    </div>
)}
```

8. 動作確認
9. 投稿詳細機能をGit commit

---

# 16. 投稿詳細の次

優先順：

```text
投稿詳細
↓
削除
↓
編集
↓
画面遷移
↓
UI/CSS整理
↓
最終バグ修正
```

---

# 17. 画面遷移

現在は `App.jsx` に機能をまとめて実装し、まずデータ取得・登録を通している。

最終的にはReact Router等で、
- トップ
- 投稿画面
- 投稿詳細画面

などに分ける予定。

Routerの詳細理解は後回し。

---

# 18. 理解基準

## 🔴 理解必須
- Entity / DTO / Repository / Service / Controllerの役割
- React → HTTP → Controller → Service → Repository → DB
- DB → Repository → Service/DTO → Controller → JSON → React
- POST JSON → PostRequest → Post Entity → save
- @RequestParam
- @PathVariable
- Repositoryが何を検索しているか
- stateが何を保持しているか
- JavaオブジェクトとJSON/JSオブジェクトの違い
- 主キー検索と主キー以外の検索の違い

## 🟡 60〜70%でよい
- stream / map の正確な構文
- Optionalの内部
- useEffectの細かい仕様
- async / await / fetchの構文暗記
- 三項演算子の構文暗記
- Reactのkey内部仕様
- no-arg constructorのJPA内部事情

## ⚪ 今は不要
- Jacksonの内部実装
- Spring DI内部実装
- JPA内部実装
- Promise内部
- HTTPヘッダの深い仕様

---

# 19. 学習・開発支援の進め方

基本方針：

```text
何の機能が必要か考える
↓
どの層・クラスが必要か考える
↓
自分でコードを書く
↓
必要ならヒント
↓
修正
```

MVP期限を優先し、深掘りしすぎない。

機能ごとのGit commit時に、1〜3問程度の短い理解チェックを入れる。

---

# 20. 現在の進捗目安

2026-08-26 昼時点：

約8合目強。

完了：
- 投稿一覧
- 投稿登録
- 鳥一覧
- エリア一覧
- 鳥別投稿検索
- エリア別投稿検索
- 最低限バリデーション

作業中：
- 投稿詳細

残り主要：
- 投稿詳細
- 削除
- 編集
- 画面遷移
- UI/CSS
- 最終確認

---

# 21. 今後の運用

各機能をコミットしたら、このファイルも更新する。

ChatGPTに：

`引き継ぎファイル更新`

と伝える。

更新対象：
- 完了機能
- 現在地点
- 次にやること
- 新しいAPI
- 新しいstate
- 新しいバグ・注意点
- 理解済みポイント

このファイルは「コードそのもの」ではなく、「なぜそうしたか・今どこにいるか」を保存するためのもの。
