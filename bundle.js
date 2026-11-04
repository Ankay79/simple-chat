/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\n\nvar STORAGE_KEY = 'simple-chat-message';\nvar NAME_KEY = 'simple_chat_username';\nvar loginScreen = document.getElementById('login-screen');\nvar chatScreen = document.getElementById('chat-screen');\nvar nameInput = document.getElementById('name-input');\nvar loginButton = document.getElementById('login-button');\nvar form = document.querySelector('form');\nvar input = document.querySelector('.form-input');\nvar messageDiv = document.querySelector('.message');\nvar userinput = document.querySelector('.user-input');\nvar fileButton = document.getElementById('fileButton');\nvar fileInput = document.getElementById('fileInput');\nvar channel = new BroadcastChannel('simple-chat');\nchannel.onmessage = function () {\n  return renderMessages(getMessages());\n};\nfunction getMessages() {\n  var stored = localStorage.getItem(STORAGE_KEY);\n  return stored ? JSON.parse(stored) : [];\n}\nfunction saveMessages(messages) {\n  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));\n}\nfunction formatDateTime(isoString) {\n  if (!isoString) return '';\n  var date = new Date(isoString);\n  if (isNaN(date.getTime())) return '';\n  var now = new Date();\n  var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());\n  var msgStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());\n  if (msgStart.getTime() === todayStart.getTime()) {\n    return date.toLocaleTimeString('ru-RU', {\n      hour: '2-digit',\n      minute: '2-digit'\n    });\n  }\n  return date.toLocaleString('ru-RU', {\n    day: '2-digit',\n    month: '2-digit',\n    year: 'numeric',\n    hour: '2-digit',\n    minute: '2-digit'\n  });\n}\nfunction fullDateTitle(isoString) {\n  if (!isoString) return '';\n  var date = new Date(isoString);\n  return isNaN(date.getTime()) ? '' : date.toISOString();\n}\nfunction escapeHtml(str) {\n  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/'/g, '&#039;');\n}\nfunction renderMessages(messages) {\n  messageDiv.innerHTML = '';\n  messages.forEach(function (msg) {\n    messageDiv.insertAdjacentHTML('beforeend', getMessage(msg));\n  });\n  scrollToBottom();\n}\nvar userScrolled = false;\nmessageDiv.addEventListener('scroll', function () {\n  var isAtBottom = Math.abs(messageDiv.scrollHeight - messageDiv.scrollTop - messageDiv.clientHeight) < 50;\n  userScrolled = !isAtBottom;\n});\nfunction scrollToBottom() {\n  if (userScrolled) return;\n  messageDiv.scrollTop = messageDiv.scrollHeight; // мгновенный скролл\n  // Или плавный:\n  // messageDiv.scrollIntoView({ block: 'end', behavior: 'smooth' });\n}\nfunction handleSubmit(event) {\n  event.preventDefault();\n  var textMessage = input.value.trim();\n  if (!textMessage) return;\n  var message = {\n    text: textMessage,\n    username: getUser(),\n    createdAt: new Date().toISOString()\n  };\n  var messages = getMessages();\n  messages.push(message);\n  saveMessages(messages);\n  renderMessages(messages);\n  input.value = '';\n}\nfunction handleKeyPress(event) {\n  if (event.keyCode === 13 && !event.shiftKey) {\n    event.preventDefault();\n    handleSubmit(event);\n  }\n}\nfunction getUser() {\n  return userinput.value;\n}\nfunction getMessage(item) {\n  return \"\\n    <div class=\\\"message-item\\\">\\n      <span>\".concat(escapeHtml(item.username), \"</span>\\n      <span class=\\\"message-text\\\">\").concat(escapeHtml(item.text), \"</span>\\n      <span class=\\\"message-time\\\" title=\\\"\").concat(fullDateTitle(item.createdAt), \"\\\">\").concat(formatDateTime(item.createdAt), \"</span>\\n    </div>\\n  \");\n}\nfileButton.addEventListener('click', function () {\n  fileInput.click();\n});\nfileInput.addEventListener('change', function () {\n  var file = fileInput.files[0];\n  if (!file) return;\n  console.log('Выбран файл:', file.name);\n  console.log('Размер:', file.size, 'байт');\n  console.log('Тип:', file.type);\n  var reader = new FileReader();\n  reader.onload = function (e) {\n    console.log('Содержимое файла:', e.target.result);\n  };\n  reader.readAsText(file);\n});\nfunction showScreen(name) {\n  loginScreen.classList.toggle('hidden', name !== 'login');\n  chatScreen.classList.toggle('hidden', name !== 'chat');\n}\nloginButton.addEventListener('click', function () {\n  var name = nameInput.value.trim();\n  if (!name) {\n    nameInput.focus();\n    return;\n  }\n  localStorage.setItem(NAME_KEY, name);\n  userinput.value = name;\n  showScreen('chat');\n});\nnameInput.addEventListener('keydown', function (event) {\n  if (event.key === 'Enter') loginButton.click();\n});\nvar savedName = localStorage.getItem(NAME_KEY);\nif (savedName) {\n  userinput.value = savedName;\n  showScreen('chat');\n  renderMessages(getMessages());\n} else {\n  showScreen('login');\n}\nform.addEventListener('submit', handleSubmit);\nform.addEventListener('keypress', handleKeyPress);\nrenderMessages(getMessages());\nscrollToBottom();\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });