const stateToHint = (status, items) => {
	if (items.stick.obtainStatus === 'NOT_OBTAINED') {
		return 'いろいろなところをクリックして探索してね';
	} else if (items.board2.obtainStatus === 'NOT_OBTAINED') {
		return 'めくれそうなところをめくろう';
	} else if (status.retainedStatus.hangingPlant === 'NOTHING') {
		return 'アイテムの使い方のヒントが本に書いてあるよ';
	} else if (status.retainedStatus.picture === 'SCREWED') {
		return '道具を使って外せそうなものを外そう';
	} else if (items.keyToDrawer.obtainStatus === 'NOT_OBTAINED') {
		return '一度アイテムを獲得したところもちゃんと確認しよう';
	} else if (status.retainedStatus.soil === 'ON_PLANTER') {
		return '汚いところをきれいにしよう';
	} else if (status.retainedStatus.window === 'CURTAIN_CLOSED' || status.retainedStatus.window === 'CURTAIN_OPEN') {
		return '鍵を開けたところから何も得られないなんてことはないよ'
	} else {
		return '視点を変えてみよう';
	}
}

export default stateToHint;