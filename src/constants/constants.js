// screens
export const screenBorderRadius = 8;

// loading screen
export const loadingAnimationRadius = 35;
export const loadingCircleSize = loadingAnimationRadius / 10 * 2;

// game screen
export const marginBetweenMainScreenAndSidebar = 6;
export const itemInHandImageSize = 48;

// main screen
export const mainScreenWidth = 480;
export const mainScreenHeight = 380;

// arrow
export const arrowAreaWidth = 40;
export const arrowSize = 35;

// detail windows
export const itemDetailWindowMargin = mainScreenWidth * 0.1;
export const itemDetailWindowWidth = mainScreenWidth - itemDetailWindowMargin * 2;
export const itemDetailWindowHeight = mainScreenHeight - itemDetailWindowMargin * 2;
export const itemDetailWindowBorderWidth = 3;
export const itemDetailWindowBorderRadius = 13;

// sidebar
export const itemFrameSize = 55;
export const itemFrameMargin = 3;
export const itemFrameBorderWidth = 3;
export const sidebarWidth = itemFrameSize * 2 + itemFrameMargin * 2 * 2;

export const magnifyingGlassSize = itemFrameSize * 0.3;

// dial position
const dialWidth = 69;
const dialHeight = 81;
export const dialCenterPositions = [
	[126 + dialWidth / 2, 149 + dialHeight / 2],
	[199 + dialWidth / 2, 149 + dialHeight / 2],
	[272 + dialWidth / 2, 149 + dialHeight / 2]
];

// hint
export const hintPadding = 20;
export const hintBorderRadius = 5;

// whole screen
export const wholeScreenWidth = marginBetweenMainScreenAndSidebar + mainScreenWidth + sidebarWidth;
export const screenVerticalMargin = 50;
export const screenHorizontalMargin = 20;
