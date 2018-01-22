const requireAll = (context, filetype) => { // filetype is either 'IMAGE' or 'SOUND'
	const fileList = {};
	context.keys().forEach((filename) => {
		const filenameForKey = filename.substring(
			filename.lastIndexOf('/') + 1,
			filename.lastIndexOf('.')
		);
		switch (filetype) {
			case 'IMAGE':
				fileList[filenameForKey] = new Image();
				fileList[filenameForKey].src = context(filename);
				break;
			case 'SOUND':
				fileList[filenameForKey] = new Audio(context(filename));
				break;
			default:
				throw Error("filetype must be either 'IMAGE' or 'SOUND'");
		}
	});
	totalAssetsCount += fileList.length;
	return fileList;
};

// require the file when calling this function!
const requireIndividual = (path, filetype) => {
	let file = undefined;
	switch (filetype) {
		case 'IMAGE':
			file = new Image();
			file.src = path;
			return file;
		case 'SOUND':
			file = new Audio(path);
			return file;
		default:
			throw Error("filetype must be either 'IMAGE' or 'SOUND'");
	}
};

let allAssetsRequired = false;
let totalAssetsCount = 0;
let loadedAssetsCount = 0;

export const itemImages = requireAll(require.context('../assets/images/items', false, /\./), 'IMAGE');
export const mainViewImages = requireAll(require.context('../assets/images/mainViews', false, /\./), 'IMAGE');
export const mainViewMapImages = requireAll(require.context('../assets/images/mainViewMaps', false, /\./), 'IMAGE');
export const mainViewOverlayImages = requireAll(require.context('../assets/images/mainViewOverlays', false, /\./), 'IMAGE');
export const sounds = requireAll(require.context('../assets/sounds', false, /\./), 'SOUND');

export const arrowImage = requireIndividual(require('../assets/images/arrow.svg'), 'IMAGE');

allAssetsRequired = true;

export const loadAssets = () => {

}