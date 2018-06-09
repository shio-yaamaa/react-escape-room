"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/react-escape-room/index.html","b3ff6093bedf228fad3cff1a51330bf3"],["/react-escape-room/static/css/main.22b23867.css","1dd6348801c04a0d7c53184188bee851"],["/react-escape-room/static/js/main.c7ae8241.js","27b51605b1b0e8e22cdf35865fcaeb74"],["/react-escape-room/static/media/arrow.9c84be0f.svg","9c84be0fdb5e42edeeef15b8e1188d3b"],["/react-escape-room/static/media/board.60b5088d.mp3","60b5088db3d7e4f5d6717bc26a17f52d"],["/react-escape-room/static/media/board1_00.cd061887.png","cd061887b3e33f931bb2b9f20d08e228"],["/react-escape-room/static/media/board2_00.e4203747.png","e4203747c8d2552afa5cbf405ca43028"],["/react-escape-room/static/media/boards_00.e8227ce4.png","e8227ce4656de1fc35f58e93f0db2c48"],["/react-escape-room/static/media/book_00.2b19f826.png","2b19f8266cc0241e644afc4d20c1b9f5"],["/react-escape-room/static/media/book_01.0e347042.png","0e3470428e2e013146ae812768f6206f"],["/react-escape-room/static/media/box_00.637a01d3.png","637a01d34037cf3c8b3644e11d50ee24"],["/react-escape-room/static/media/box_01.d841c16c.png","d841c16c44cb7a162b3e5964109e3746"],["/react-escape-room/static/media/box_02.553375fe.png","553375fef21b392dc4b6a29ebf1f5c02"],["/react-escape-room/static/media/button.933f69e5.mp3","933f69e50636799896e9ebf508a0c2fc"],["/react-escape-room/static/media/carpet_00.a3d5681d.png","a3d5681d64c049fe6d7bbcdf2c11a8ec"],["/react-escape-room/static/media/carpet_01.be7f5c97.png","be7f5c9765c92c0a6796b19e76f53e3b"],["/react-escape-room/static/media/carpet_02.e8350589.png","e83505894cd148ec9475a9d9b4548a04"],["/react-escape-room/static/media/closeBook.8a6cf2c0.mp3","8a6cf2c0fefeac82f28b32977f03f2ac"],["/react-escape-room/static/media/closeBox.fda89e40.mp3","fda89e4069541a10455084380e13a3aa"],["/react-escape-room/static/media/closeDrawer.af789f79.mp3","af789f7912635dd2c31f58c65b1b9172"],["/react-escape-room/static/media/closeLocker.c45aa797.mp3","c45aa797da2abca7d62a00fa943b3960"],["/react-escape-room/static/media/curtain.392eab48.mp3","392eab48964d62f28b5ac998454fdea1"],["/react-escape-room/static/media/detachPicture.bb9dd37b.mp3","bb9dd37bee9e6f92a8f4e99394bd9e07"],["/react-escape-room/static/media/dial.853c9834.mp3","853c9834196a4a83ac2de821ff1c6a81"],["/react-escape-room/static/media/dial0.83463b26.svg","83463b269c079636d8f9f96349c7ea87"],["/react-escape-room/static/media/dial1.d0b1f5ce.svg","d0b1f5ceb55c35fd9c4f8cf9a85565f5"],["/react-escape-room/static/media/dial2.0c7a4306.svg","0c7a430626e370a259608c12d9418efd"],["/react-escape-room/static/media/dial3.91ab340a.svg","91ab340a07063fc04476487d0f89ea4f"],["/react-escape-room/static/media/dial4.88a81c90.svg","88a81c904150f4cdeaaaf5cb0f4c99d4"],["/react-escape-room/static/media/dial5.a5b02848.svg","a5b028481c38201225dd1e5d2b1bd248"],["/react-escape-room/static/media/dial6.6c163228.svg","6c163228e27e6301eaa67306c682e52a"],["/react-escape-room/static/media/dial7.4466c168.svg","4466c1688d20a0da8e30fab855ae0e40"],["/react-escape-room/static/media/dial8.9d1df483.svg","9d1df483009a04c0b834694fd96e43d9"],["/react-escape-room/static/media/dial9.df29dbac.svg","df29dbac398729016eb98d828bfda6e8"],["/react-escape-room/static/media/dial_00.887ca3a6.png","887ca3a6aae12ead6664ddb58ca6d002"],["/react-escape-room/static/media/dial_template.0bcf47c1.svg","0bcf47c1c465e4433c91840d3387777e"],["/react-escape-room/static/media/door.63e8e1b9.mp3","63e8e1b9645ec94629cf75a82b3dd334"],["/react-escape-room/static/media/drawer_00.f620a480.png","f620a480c01fe42a29decc1ec143c2c2"],["/react-escape-room/static/media/drawer_01.19ce8081.png","19ce8081d435cdb39312656637f579e2"],["/react-escape-room/static/media/drawer_02.dbb0e28c.png","dbb0e28cf7838ad98cc14a87fef0ac7f"],["/react-escape-room/static/media/end.6563d573.mp3","6563d573dd080cd99cefa419884b3aa9"],["/react-escape-room/static/media/endScreenBackground.0ddb9a14.png","0ddb9a148c850b53f35311cdf3721a5d"],["/react-escape-room/static/media/flipCarpet.8fcec2fa.mp3","8fcec2fa2aa5956ee5161f93d9216789"],["/react-escape-room/static/media/hangingPlant_00.b7e2bee9.png","b7e2bee96fafeba5277e61986d8a9df8"],["/react-escape-room/static/media/hangingPlant_01.db0ce0a7.png","db0ce0a77303e4ca78d8119c0a9ca3e5"],["/react-escape-room/static/media/hangingPlant_02.44529fd3.png","44529fd3ff592b5a34c06dc7d1250f36"],["/react-escape-room/static/media/keyToBox_00.1ea94e38.png","1ea94e38e16f498bea41a27cd01cf54d"],["/react-escape-room/static/media/keyToDoor_00.bb336441.png","bb336441cd0b34a503ed64e90e7315e7"],["/react-escape-room/static/media/keyToDrawer_00.a5f48d39.png","a5f48d39af0f7b548f626f543d267bea"],["/react-escape-room/static/media/keyToLocker1_00.16a7eacb.png","16a7eacb877d387433a758fcfa25744f"],["/react-escape-room/static/media/keyToLocker3_00.bdcdb736.png","bdcdb736fcc162f3b0c13cb37bb8707f"],["/react-escape-room/static/media/layCarpet.e6da1b08.mp3","e6da1b08ad1ee2c95f6eee882fa78caf"],["/react-escape-room/static/media/locked.05570ffc.mp3","05570ffcb08444ddc79bea8ad450f490"],["/react-escape-room/static/media/locker_00.777af2bb.png","777af2bba366b473d7ab2a6f3f68d427"],["/react-escape-room/static/media/locker_01.a500fa31.png","a500fa312e7940458d2e40c6b09faade"],["/react-escape-room/static/media/locker_02.9adbfa3b.png","9adbfa3b9c85b187e30d579201dae365"],["/react-escape-room/static/media/locker_03.551e19de.png","551e19de767e1c56271b6f1daaf4fd4f"],["/react-escape-room/static/media/locker_04.5e0c097d.png","5e0c097de2eb2607d4cc6c80b95e959a"],["/react-escape-room/static/media/locker_05.c85c1049.png","c85c10492d387f8fa0f6e5bdec396cd3"],["/react-escape-room/static/media/locker_06.dd771458.png","dd771458a81dc4d3c287bab00acd4d89"],["/react-escape-room/static/media/magnifyingGlass.c7471f44.svg","c7471f442173a208d81c5f065151723e"],["/react-escape-room/static/media/obtainItem.d7263017.mp3","d72630179612e3784a89edd9da537661"],["/react-escape-room/static/media/openBook.c76e8cb2.mp3","c76e8cb208c1064819beefc421d677d2"],["/react-escape-room/static/media/openBox.ea2bf200.mp3","ea2bf200b1d61c546f6816b40bb83e79"],["/react-escape-room/static/media/openDrawer.6c487f83.mp3","6c487f83b5dd82f937f44aeeaf513bcb"],["/react-escape-room/static/media/openLocker.1dbe4f43.mp3","1dbe4f431aa4e593f0e714190513077c"],["/react-escape-room/static/media/picture_00.77c0ca04.png","77c0ca04cc2941c28bff405fe025ae78"],["/react-escape-room/static/media/picture_01.a9321bcb.png","a9321bcbccdc6c883e0a274e694fe3c1"],["/react-escape-room/static/media/picture_02.2c601771.png","2c601771967f5ef2981c9fa8617a1699"],["/react-escape-room/static/media/picture_03.6c2d1953.png","6c2d1953f00b7c58e1339d3197ca2fda"],["/react-escape-room/static/media/plant_00.97671169.png","976711691f7bd8bbf26196f4da90a2d3"],["/react-escape-room/static/media/plant_01.f3ccefa0.png","f3ccefa013f2be322d397dd285d7b9cd"],["/react-escape-room/static/media/plant_02.62bf56e5.png","62bf56e517a6b37e2d643035dc9f60c0"],["/react-escape-room/static/media/save.d7e23664.mp3","d7e2366424b710a0f1bec5390afe7502"],["/react-escape-room/static/media/screwdriver_00.36ba3b0c.png","36ba3b0c66ca87a75109b631604eaa4a"],["/react-escape-room/static/media/sofa_00.ea778438.png","ea7784385352f7597d865d311022b7ec"],["/react-escape-room/static/media/sofa_01.66ff0a2a.png","66ff0a2a44ef2599f921f214f04f9515"],["/react-escape-room/static/media/start.9baef592.mp3","9baef59215c1a544a09833d87b183e46"],["/react-escape-room/static/media/stick.d2e57ec6.mp3","d2e57ec64b5930e2b4f6f271897122ff"],["/react-escape-room/static/media/stick_00.05fe6180.png","05fe61808fca682229fa92b66f96e19a"],["/react-escape-room/static/media/tissue.8160a8ae.mp3","8160a8ae682b153dd05f4886133412b9"],["/react-escape-room/static/media/tissueBox_00.8ef643d7.png","8ef643d7ba24ea1fbd6fa8ea7cba506a"],["/react-escape-room/static/media/tissueBox_01.1ae73c21.png","1ae73c2158a25538d98e91082dc02782"],["/react-escape-room/static/media/tissueToBall.914e73e9.mp3","914e73e9a60e19075a6e913f486bd17a"],["/react-escape-room/static/media/tissue_00.e2b714b0.png","e2b714b049af90703b0e9f92a44d81ff"],["/react-escape-room/static/media/tissue_01.7b02c965.png","7b02c965de516cc7c0598b5fe09af3d3"],["/react-escape-room/static/media/unlock.06a15f48.mp3","06a15f4807759b871016fdbb7a7c90f4"],["/react-escape-room/static/media/unscrew.0bd4dc90.mp3","0bd4dc90815c96436b16b5683a33ff76"],["/react-escape-room/static/media/upperDrawer_00.08fc31db.png","08fc31db01233b3565eea931d39a6310"],["/react-escape-room/static/media/viewWithDesk_00.58cf2ab5.png","58cf2ab5c4139cb1b7f191c0a150dc21"],["/react-escape-room/static/media/viewWithDesk_01.9194a18c.png","9194a18cf57427c6b018ad4b788a5baf"],["/react-escape-room/static/media/viewWithDoor_00.2b17b4a5.png","2b17b4a5cae83cd0bab96e12bd67ea38"],["/react-escape-room/static/media/viewWithDoor_01.7d8eb847.png","7d8eb8476324aab68eb3b7def44c0e83"],["/react-escape-room/static/media/viewWithDoor_02.db8bcb91.png","db8bcb91accd197c10d2b7853af8112e"],["/react-escape-room/static/media/viewWithDoor_03.1c5a0720.png","1c5a072040bfef47c28452cbb38bf77f"],["/react-escape-room/static/media/viewWithDoor_04.814b8374.png","814b8374ff49dcbeae1ae8ef74eb03d1"],["/react-escape-room/static/media/viewWithDoor_05.ecf5c578.png","ecf5c578485eb321601f8ae1c87ab0dc"],["/react-escape-room/static/media/viewWithSofa_00.70287289.png","7028728950c8b82377384a8f324de627"],["/react-escape-room/static/media/viewWithSofa_01.48df5f2c.png","48df5f2cdda22ce946e2906654465408"],["/react-escape-room/static/media/viewWithSofa_02.e4a51c26.png","e4a51c265c7b92de8bd75ab7ea57e458"],["/react-escape-room/static/media/viewWithSofa_03.89ea46db.png","89ea46db6caac028720ed71364b0ef1c"],["/react-escape-room/static/media/viewWithSofa_04.e80aabe1.png","e80aabe1685b10b7660b8b9e73ab0ac8"],["/react-escape-room/static/media/viewWithSofa_05.d754a482.png","d754a4823611a34afb905b93fe360eae"],["/react-escape-room/static/media/viewWithSofa_06.602daddc.png","602daddc11355229601491d9ec21d28b"],["/react-escape-room/static/media/viewWithSofa_07.472700eb.png","472700ebff2cd65107b0940b6c7bcc97"],["/react-escape-room/static/media/viewWithWindow_00.25555f22.png","25555f22c5d36a47fa6c03be0f647eee"],["/react-escape-room/static/media/viewWithWindow_01.1e4b240e.png","1e4b240ec8f3673c3eadd3bfc5f86a4b"],["/react-escape-room/static/media/viewWithWindow_02.4bd3fc66.png","4bd3fc6608eb24c708c8f93119fe6022"],["/react-escape-room/static/media/viewWithWindow_03.699e0e48.png","699e0e4801382c2128cc03300e2714a1"],["/react-escape-room/static/media/viewWithWindow_04.cebe40a1.png","cebe40a1d9c6b67193ff571052e7bb6d"],["/react-escape-room/static/media/viewWithWindow_05.c3eb19c2.png","c3eb19c23bf53ca72018ea2dffc137ca"],["/react-escape-room/static/media/wipeSoil.69062c14.mp3","69062c1424b13289a611dc542172c8ca"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,a,c,t){var r=new URL(e);return t&&r.pathname.match(t)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],t=new URL(a,self.location),r=createCacheKey(t,hashParamName,c,/\.\w{8}\./);return[t.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var t=new Request(c,{credentials:"same-origin"});return fetch(t).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),t="index.html";(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,t),a=urlsToCacheKeys.has(c));var r="/react-escape-room/index.html";!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(c=new URL(r,self.location).toString(),a=urlsToCacheKeys.has(c)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});