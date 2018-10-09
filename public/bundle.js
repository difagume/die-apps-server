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
/******/ 	return __webpack_require__(__webpack_require__.s = "./config/config.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! dotenv */ \"./node_modules/dotenv/lib/main.js\").config();\r\nmodule.exports = {\r\n    //CADUCIDAD_TOKEN: 14400, // 4 horas\r\n    CADUCIDAD_TOKEN: 5, // segundos\r\n    PUERTO: process.env.PORT || 5000,\r\n    FRONT_URL: process.env.FRONT_URL,\r\n    BACK_URL: process.env.BACK_URL\r\n}\n\n//# sourceURL=webpack:///./config/config.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\n\n/*\n * Parses a string or buffer into an object\n * @param {(string|Buffer)} src - source to be parsed\n * @returns {Object} keys and values from src\n*/\nfunction parse (src) {\n  const obj = {}\n\n  // convert Buffers before splitting into lines and processing\n  src.toString().split('\\n').forEach(function (line) {\n    // matching \"KEY' and 'VAL' in 'KEY=VAL'\n    const keyValueArr = line.match(/^\\s*([\\w.-]+)\\s*=\\s*(.*)?\\s*$/)\n    // matched?\n    if (keyValueArr != null) {\n      const key = keyValueArr[1]\n\n      // default undefined or missing values to empty string\n      let value = keyValueArr[2] || ''\n\n      // expand newlines in quoted values\n      const len = value ? value.length : 0\n      if (len > 0 && value.charAt(0) === '\"' && value.charAt(len - 1) === '\"') {\n        value = value.replace(/\\\\n/gm, '\\n')\n      }\n\n      // remove any surrounding quotes and extra spaces\n      value = value.replace(/(^['\"]|['\"]$)/g, '').trim()\n\n      obj[key] = value\n    }\n  })\n\n  return obj\n}\n\n/*\n * Main entry point into dotenv. Allows configuration before loading .env\n * @param {Object} options - options for parsing .env file\n * @param {string} [options.path=.env] - path to .env file\n * @param {string} [options.encoding=utf8] - encoding of .env file\n * @returns {Object} parsed object or error\n*/\nfunction config (options) {\n  let dotenvPath = path.resolve(process.cwd(), '.env')\n  let encoding = 'utf8'\n\n  if (options) {\n    if (options.path) {\n      dotenvPath = options.path\n    }\n    if (options.encoding) {\n      encoding = options.encoding\n    }\n  }\n\n  try {\n    // specifying an encoding returns a string instead of a buffer\n    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }))\n\n    Object.keys(parsed).forEach(function (key) {\n      if (!process.env.hasOwnProperty(key)) {\n        process.env[key] = parsed[key]\n      }\n    })\n\n    return { parsed }\n  } catch (e) {\n    return { error: e }\n  }\n}\n\nmodule.exports.config = config\nmodule.exports.load = config\nmodule.exports.parse = parse\n\n\n//# sourceURL=webpack:///./node_modules/dotenv/lib/main.js?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });