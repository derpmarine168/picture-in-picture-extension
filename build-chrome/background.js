/*

 Copyright 2018 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
'use strict';document.pictureInPictureEnabled?chrome.browserAction.onClicked.addListener(function(a){chrome.tabs.executeScript({code:"\n      (async () => {\n        const video = document.querySelector('video');\n\n        if (video.hasAttribute('__pip__')) {\n          await document.exitPictureInPicture();\n        } else {\n          await video.requestPictureInPicture();\n          video.setAttribute('__pip__', true);\n          video.addEventListener('leavepictureinpicture', event => {\n            video.removeAttribute('__pip__');\n          }, { once: true });\n        }\n      })();\n    "})}):
chrome.browserAction.setTitle({title:"Picture-in-Picture NOT supported"});
