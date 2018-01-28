const requireAll = (context, filetype, callback) => { // filetype is either 'IMAGE' or 'SOUND'
	totalAssetsCount += context.keys().length;

	const fileList = {};
	context.keys().forEach((filename) => {
		const filenameForKey = filename.substring(
			filename.lastIndexOf('/') + 1,
			filename.lastIndexOf('.')
		);
		switch (filetype) {
			case 'IMAGE':
				fileList[filenameForKey] = new Image();
				fileList[filenameForKey].onload = () => {
					loadedAssetsCount++;
					callback.call();
				};
				fileList[filenameForKey].src = context(filename);
				break;
			case 'SOUND':
				fileList[filenameForKey] = new Audio(context(filename));
				fileList[filenameForKey].oncanplaythrough = () => {
					loadedAssetsCount++;
					callback.call();
				}; // 間に合うのか？
				break;
			default:
				throw Error("filetype must be either 'IMAGE' or 'SOUND'");
		}
	});
	return fileList;
};

// require the file when calling this function!
const requireIndividual = (path, filetype, callback) => {
	totalAssetsCount += 1;

	let file = undefined;
	switch (filetype) {
		case 'IMAGE':
			file = new Image();
			file.onload = () => {
				loadedAssetsCount++;
				callback.call();
			};
			file.src = path;
			return file;
		case 'SOUND':
			file = new Audio(path);
			file.oncanplaythrough = () => {
				loadedAssetsCount++;
				callback.call();
			}
			return file;
		default:
			throw Error("filetype must be either 'IMAGE' or 'SOUND'");
	}
};

let totalAssetsCount = 0;
let loadedAssetsCount = 0;

const itemImageContext = require.context('../assets/images/items', false, /\./);
const mainViewImageContext = require.context('../assets/images/mainViews', false, /\./);
const mainViewMapImageContext = require.context('../assets/images/mainViewMaps', false, /\./);
const mainViewOverlayImageContext = require.context('../assets/images/mainViewOverlays', false, /\./);
const soundContext = require.context('../assets/sounds', false, /\./);
const arrowImageContext = require('../assets/images/arrow.svg');
const endScreenBackgroundContext = require('../assets/images/endScreenBackground.png');

export let itemImages = undefined;
export let mainViewImages = undefined;
export let mainViewMapImages = undefined;
export let mainViewOverlayImages = undefined;
export let sounds = undefined;
export let arrowImage = undefined;
export let endScreenBackground = undefined;

export const loadAssets = (callback) => {
	const callbackIfReady = () => {
		if (allAssetsRequired && totalAssetsCount === loadedAssetsCount) {
			callback.call();
		}
	}

	let allAssetsRequired = false;

	itemImages = requireAll(itemImageContext, 'IMAGE', callbackIfReady);
	mainViewImages = requireAll(mainViewImageContext, 'IMAGE', callbackIfReady);
	mainViewMapImages = requireAll(mainViewMapImageContext, 'IMAGE', callbackIfReady);
	mainViewOverlayImages = requireAll(mainViewOverlayImageContext, 'IMAGE', callbackIfReady);
	sounds = requireAll(soundContext, 'SOUND', callbackIfReady);
	arrowImage = requireIndividual(arrowImageContext, 'IMAGE', callbackIfReady);
	endScreenBackground = requireIndividual(endScreenBackgroundContext, 'IMAGE', callbackIfReady);

	allAssetsRequired = true;
}