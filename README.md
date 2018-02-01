# Note

```
npm start
```

to start the development server

# DOM Structure

```html
<Provider>
	<App>
		<ScreenSwitch container> // manages which screen to display and calls AssetsLoader
			<StartScreen>
			<EndScreen>
			<LoadScreen>
			<div> // fade

			<Game container> // save, hint, cursorなどゲーム全体の統括、重ねるdivのためrelative
				<div> // aligns MainScreen and Sidebar horizontally
					<MainScreen container> // handles actions when either the MainViewMap or ArrowArea is clicked
						<MainView>
						<MainViewOverlay> // dial etc.
						<MainViewMap> // opacity: 0
						<ArrowArea> x4 // fire events when they (not their children!) are clicked
            <ItemDetailWindow>
              <ItemDetailView>
              <ItemDetailViewMap>
					<Sidebar>
						<ItemFrameContainer container>
							<ItemFrame> x10
						<div>
							<SaveButton>
							<HintButton>
				<Hint>
				<div> // save-effect
```

# Data

perspectiveとitem名はファイル名にもなるからcamel caseにする。

actionsはcontainer componentがMainScreenにpropとして渡す？
そしたら、actionの中にthis.changeStatus('door', 'UNLOCKED')とかthis.obtainItem('driver')とかthis.useItem('doorKey')って感じで自分とこの関数を渡せる。

SEの再生はどこで？this.playSound()でいいか。obtainItemでは自動で音がなるようにするし、それならcontainerの方で音データが必要だから。

```javascript
actions = [
	{
		perspective: ,
		location: 'LEFT', // string indicating arrow or color of the clickable map
		action: (state) => {
			changePerspective(newPerspective);
		}
	},
	{
		perspective: ,
		location: 'BLACK', // suppose it's a door that needs its key
		action: (state) => {
			switch (state.status.door) {
				case 'LOCKED':
					if (selectedItem === 'DOOR_KEY') {
						changeState(status.door, 'UNLOCKED');
						changeState(items.doorKey.obtainStatus, 'USED');
						playSE('doorUnlocked.mp3');
					} else {
						playSE('doorLocked.mp3');
					}
					break;
				case 'UNLOCKED':
					changeState(status.door, 'OPEN');
					break;
				case 'OPEN':
					// proceed to the clear screen
					break;
			}
		}
	}
];
```

# State

```javascript
{
	status: {
		door: 'LOCKED',
		picture: 'SCREWED'
	},
	perspective: 'desk',
	items: {
		driver: {
			obtainStatus: 'USED',
			frameIndex: -1
		},
		drawerKey: {
			obtainStatus: 'OBTAINED',
			frameIndex: 0
		}
	}
	selectedItem: 'drawerKey' // 個別に設定してたら、他のが選ばれたときに前のを解除しなければいけない
}
```

# Style

ほとんどをJSXで記述し、CSSはpseudo classes/elementsなどCSSにしかできないこと+共通の設定もちょっとやってもいい。

# Cloud9

cloud9でcreate-react-app使って作ったアプリを動かす時はnpm start後index.jsをRun。そしてworkspace名-ユーザー名.c9users.ioにアクセス。

npm install -g create-react-app
でcreate-react-appだけインストールして、あとはローカルファイルをコピーして試してみる。
npmはちょっとでもアップデートしたらnextick-argsみたいなやつがないためにエラーになる。

# Todo

- sequential motion (like stick protruding into the hanging plant)

- switch languages

- If expanding is disabled on smartphones, can sequencial taps be recognized?

- The file with error is automatically opened even if the error occurred on smartphones!

- Can JavaScript embedded in Hatena blog articles?

- If gameControl solely consists of hint after all, raise hint in the state hierarchy (like I did for screen).

# Bugs

- Android browsers don't play some of the SEs.

  - The default browser doesn't play flipCarpet etc.

  - Chrome doesn't play long SEs like start and end. It can be debugged using the Chrome debugging tool.

# The reasons for specifications

## The graphics software for creating map files

To avoid antialiasing, which creates invalid colors between two colors, use GIMP instead of Inkscape.

## How to retain the content of hint

Retain only inHintVisible as a state, and calculate the content every time the hint gets visible. It's because nothing can provide the whole state though it's required to calculate the content of the hint.

## svg files for dial numbers

They aren't displayed unless the number objects are converted into normal path.

## Is loading screen necessary?

Definitely yes. Without it, I have to deal with the situation in which the MainView is trying to show the image that hasn't been loaded yet.

## Don't retain save as a state

Save a event rather than a state. It's weird to update the state when the save event ends.

## Component/container structure

Export the connect()-ed object as the component itself. As described in [this article](https://marmelab.com/blog/2015/12/17/react-directory-structure.html), the inner component is only used in its container.

Put component and container files in the same folder. They are different only in whether they are provided with state and dispatch(), and they are in the same component hierarchy. If they are put in the separate folders, I might be like [him](https://github.com/reactjs/redux/issues/1618). If the component folder has too many files, separate them according to their features.

## JSX file extension

Extension should be .js since React doesn't import .jsx files unless you put '.jsx' when importing or modify the Webpack's config file, which requires ejecting.
Fortunately, Atom automatically applies the JSX syntax highlighting for JSX files with .js extension! (Sublime doesn't as long as I know, though)

## loadAssetsが走る以前のassetsの利用

しない。普通にrequireしたら遅すぎた。

## アイテムの背景色

Switch等のようにアイテムの背景色を白((237, 237, 237) or #EDEDED)にして、選択されたときに薄いグレーにすると、白いアイテムが見えないうえ二種類の背景に対するアイテムの色を考えなければならない。Elementsのように濃いグレーにして選択されたときに枠の色のみを変えれば、一種類の背景色しか考慮しなくていいしアイテムも見えやすい。そのため、Elementsを参考にする。

## The way to set the image size

Set it inline as follows:

```html
<img width={width} src... />
```

not:

```html
<img style={{width: width}} src... />
```

## アイテムのcursorへの追従

### CSSでオリジナル（アイテムのみ）にする

- 実装が簡単

- どこがクリックポイントなのかわかりにくい

### CSSでオリジナル（カーソル+アイテム）にする

- 実装が簡単

- クリックポイントがわかりやすい

- 画像の生成に時間がかかる？

- デフォルトのカーソルの画像が取得できないため、ユーザーの設定に拘わらず一律になってしまう

- ちなみに、Windowsのカーソルは```C:/Windows/Cursors```にある

### JSでonMouseMove

- 少し遅延が出る

- やりすぎ感

- 柔軟に操作できる

- カーソルのことを気にせず画像を指定できる

# Reactでの不満

- アニメーションの実装が難しい

- ちょっと画面遷移のときにフェードさせたいみたいなのが難しい

- （Unityと比較して）一部だけ絵を変えることができない。例えばNeutralさんのSIGNみたいに3Dのものをはめ込むことはできない

- メソッドの発火に使う引数を延々と下に持っていくか、関係ない中間層で発火させちゃうかっていうジレンマ

- デバッグが難しい。スマホのブラウザ(Chrome以外)でデバッグしたいとき、console.log使えないからちょっとDOMを使って情報を表示したいんだけど、できない

- スタイルをJSに書くのかCSSに書くのか。疑似クラスとかはCSSでしかできない

- ScreenSwitchとか本当は普通に手続き型でやりたいけど、そういう融通が利かない？
