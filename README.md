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

			<Game container> // manages functions related to the whole game, like save, hint, and cursor
				<div> // aligns MainScreen and Sidebar horizontally
					<MainScreen container> // handles click events on MainViewMap, ArrowArea, and ItemDetailWindow
						<MainView>
						<MainViewOverlay> // additional images on the MainView like dial
						<MainViewMap>
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

# Files that have to be changed or added when creating a new scenario

## Assets

assets/images/

- items: item images shown in the ItemFrames

- itemDetails: item images shown in the ItemDetailWindow

- itemDetailMaps: the clickable maps of the ItemDetailWindow

- mainViews: the scene image shown in the MainView

- mainViewOverlays: the images shown in addition to the mainViews. things whose visibility depend on the state

- mainViewMaps: the clickable maps of the mainViews

- endScreenBackground: the background image of the end screen

assets/sounds: sounds played in the game after AssetsLoader runs

## Programs

redux/modules/

- items: the state of the items

- itemStatus: the status of the items in the ItemDetailWindow

- status: the status of the game

## Others

If overlaps on the MainView or on the ItemDetailWindow during motion is needed, create a new component.

# Style

ほとんどをJSXで記述し、CSSはpseudo classes/elementsなどCSSにしかできないこと+共通の設定もちょっとやってもいい。

# Cloud9

cloud9でcreate-react-app使って作ったアプリを動かす時はnpm start後index.jsをRun。そしてworkspace名-ユーザー名.c9users.ioにアクセス。

npm install -g create-react-app
でcreate-react-appだけインストールして、あとはローカルファイルをコピーして試してみる。
npmはちょっとでもアップデートしたらnextick-argsみたいなやつがないためにエラーになる。

# Todo

- loading progress

- switch languages

- The file with error is automatically opened even if the error occurred on smartphones!

# Bugs

- Android browsers don't play some of the SEs.

  - The default browser doesn't play flipCarpet etc.

  - Chrome doesn't play long SEs like start and end. It can be debugged using the Chrome debugging tool.

- Can't use MainViewOverlay during motions.

# The reasons for specifications

## The graphics software for creating map files

To avoid antialiasing, which creates invalid colors between two colors, use GIMP instead of Inkscape.

## How to retain the content of hint

Retain only isHintVisible as a state, and calculate the content every time the hint gets visible. It's because nothing can provide the whole state though it's required to calculate the content of the hint.

## svg files for dial numbers

They aren't displayed unless the text objects are converted into normal path.

## Is loading screen necessary?

Definitely yes. Without it, I have to deal with the situation in which the MainView is trying to show the image that hasn't been loaded yet.

## Don't retain save as a state

Saving is an event rather than a state. It's weird to update the state when the save event ends.

## Component/container structure

Export the ```connect()```ed object as the component itself. As described in [this article](https://marmelab.com/blog/2015/12/17/react-directory-structure.html), the inner component is only used in its container.

Put component and container files in the same folder. They are different only in whether they are provided with state and dispatch(), and they are in the same component hierarchy. If they are put in the separate folders, I might be like [him](https://github.com/reactjs/redux/issues/1618). If the component folder has too many files, separate them according to their features.

## JSX file extension

Extension should be .js since React doesn't import .jsx files unless you put '.jsx' when importing or modify the Webpack's config file, which requires ejecting.
Fortunately, Atom automatically applies the JSX syntax highlighting for JSX files with .js extension! (Sublime doesn't as long as I know, though)

## ItemFrameContainer

ItemFrameContainer is not a div with ```display: flex``` but a table because a table can have the fixed item count per row. Also, when I used flex layout, all ItemFrames are aligned vertically in a narrow window though ItemFrameContainer has sufficient width to accommodate two ItemFrames in a row.

## Disable any user interaction during motion

Actions dispatched in clickLocationToAction during motion can cause some contradictory state because the final state achieved by the motion does not realize until the end of the motion. Saving the game state during motion can cause some weird state being saved, and showing hint or ItemDetailWindow would change the state, which will force the redraw of MainView. Considering these possibilities, it is safer to disable all the user interaction during the motion.

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

- （Unityと比較して）一部だけ絵を変えることができない。例えばNeutralさんのSIGNみたいに3Dのものをはめ込む方法が何パターンもあるとかだとお手上げ

- メソッドの発火に使う引数を延々と下に持っていくか、関係ない中間層で発火させちゃうかっていうジレンマ

- デバッグが難しい。スマホのブラウザ(Chrome以外)でデバッグしたいとき、console.log使えないからちょっとDOMを使って情報を表示したいんだけど、できない

- スタイルをJSに書くのかCSSに書くのか。疑似クラスとかはCSSでしかできない

- ScreenSwitchとか本当は普通に手続き型でやりたいけど、そういう融通が利かない？
