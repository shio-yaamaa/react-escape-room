let totalFileCount = 0;
let readyFileCount = 0;

const MAIN_VIEW_IMAGE_PATH = '../assets/images/mainViews';
const MAIN_VIEW_MAP_IMAGE_PATH = '../assets/images/mainViewMaps';
const MAIN_VIEW_OVERLAY_IMAGE_PATH = '../assets/images/mainViewOverlays';
const ITEM_IMAGE_PATH = '../assets/images/items';
const SOUND_PATH = '../assets/sounds';

const mainViewImageFileNames = [
	'book_00', 'book_01',
	'box_00', 'box_01', 'box_02',
	'carpet_00', 'carpet_01', 'carpet_02',
	'dial_00',
	'drawer_00', 'drawer_01', 'drawer_02',
	'hangingPlant_00', 'hangingPlant_01', 'hangingPlant_02',
	'locker_00', 'locker_01', 'locker_02', 'locker_03', 'locker_04', 'locker_05', 'locker_06',
	'picture_00', 'picture_01', 'picture_02', 'picture_03',
	'plant_00', 'plant_01', 'plant_02',
	'sofa_00', 'sofa_01',
	'tissueBox_00', 'tissueBox_01',
	'upperDrawer_00',
	'viewWithDesk_00', 'viewWithDesk_01',
	'viewWithDoor_00', 'viewWithDoor_01', 'viewWithDoor_02', 'viewWithDoor_03', 'viewWithDoor_04', 'viewWithDoor_05',
	'viewWithSofa_00', 'viewWithSofa_01', 'viewWithSofa_02', 'viewWithSofa_03', 'viewWithSofa_04', 'viewWithSofa_05', 'viewWithSofa_06', 'viewWithSofa_07',
	'viewWithWindow_00', 'viewWithWindow_01', 'viewWithWindow_02', 'viewWithWindow_03', 'viewWithWindow_04', 'viewWithWindow_05'
];

const mainViewMapImageFileNames = [
	'book_00', 'box_00', 'carpet_00', 'dial_00',
	'drawer_00', 'drawer_01', 'drawer_02',
	'hangingPlant_00', 'locker_00', 'locker_01', 'locker_02', 'locker_03',
	'picture_00', 'plant_00', 'sofa_00', 'tissueBox_00', 'upperDrawer_00',
	'viewWithDesk_00', 'viewWithDoor_00', 'viewWithSofa_00', 'viewWithWindow_00'
];

const mainViewOverlayImageFileNames = [
	'dial0', 'dial1', 'dial2', 'dial3', 'dial4', 'dial5', 'dial6', 'dial7', 'dial8', 'dial9'
];

const itemImageFileNames = [
	'board1', 'board2', 'keyToBox', 'keyToDoor', 'keyToDrawer', 'keyToLocker1', 'keyToLocker3', 'screwdriver', 'stick', 'tissue'
];

const soundFileNames = [
	'board', 'closeBook', 'closeBox', 'closeDrawer', 'closeLocker', 'curtain', 'detachPicture', 'dial', 'door', 'end', 'flipCarpet', 'layCarpet', 'locked', 'obtainItem', 'openBook', 'openBox', 'openDrawer', 'openKey', 'openLocker', 'save', 'start', 'stick', 'tissue', 'unscrew', 'wipeSoil'
];

export const mainViewImageData = {};
export const mainViewMapImageData = {};
export const mainViewOverlayImageData = {};
export const itemImageData = {};
export const soundData = {};

const executeCallbackIfReady = (callback) => {
	readyFileCount++;
	if (readyFileCount === totalFileCount) {
		callback();
	}
};

const loadImages = (path, fileNames, storeObj, callback) => {
	fileNames.forEach(fileName => {
		storeObj[fileName] = new Image();
		storeObj[fileName].onload = () => {
			console.log(fileName + ' is ready');
			executeCallbackIfReady(callback);
		};
		storeObj[fileName].src = path + fileName + '.png'; // 元のkeyじゃ無理だよね？
	});
};

const loadSounds = (path, fileNames, storeObj, callback) => {
	fileNames.forEach(fileName => {
		storeObj[fileName] = new Audio();
		storeObj[fileName].oncanplaythrough = () => {
			console.log(fileName + ' is ready');
			executeCallbackIfReady(callback);
		};
		storeObj[fileName].src = path + fileName + '.mp3';
	});
};

const loadAssets = (callback) => {
	loadImages(
		MAIN_VIEW_IMAGE_PATH,
		mainViewImageFileNames,
		mainViewImageData,
		callback
	);
	loadImages(
		MAIN_VIEW_MAP_IMAGE_PATH,
		mainViewMapImageFileNames,
		mainViewMapImageData,
		callback
	);
	loadImages(
		MAIN_VIEW_OVERLAY_IMAGE_PATH,
		mainViewOverlayImageFileNames,
		mainViewOverlayImageData,
		callback
	);
	loadImages(
		ITEM_IMAGE_PATH,
		itemImageFileNames,
		itemImageData,
		callback
	);
	loadSounds(
		SOUND_PATH,
		soundFileNames,
		soundData,
		callback
	);
};

export default loadAssets;