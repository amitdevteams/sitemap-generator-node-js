/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// index.js\n\ndocument.getElementById('crawlForm').addEventListener('submit', function(event) {\n  event.preventDefault();\n  const baseUrl = document.getElementById('baseUrl').value.trim();\n  if (baseUrl) {\n      fetch('/crawl', {\n          method: 'POST',\n          headers: {\n              'Content-Type': 'application/json'\n          },\n          body: JSON.stringify({ baseUrl })\n      })\n      .then(response => {\n          if (!response.ok) {\n              throw new Error('Network response was not ok');\n          }\n          return response.blob(); // Parse response as Blob\n      })\n      .then(blob => {\n          const url = window.URL.createObjectURL(blob);\n          const a = document.createElement('a');\n          a.href = url;\n          a.download = 'sitemap.xml';\n          document.body.appendChild(a); // Append <a> element to the DOM\n          a.click(); // Programmatically trigger the click event on <a>\n          a.remove(); // Remove the <a> element from the DOM after download\n          window.URL.revokeObjectURL(url); // Release the object URL\n      })\n      .catch(error => {\n          console.error('Error:', error);\n          alert('Error occurred while crawling!');\n      });\n  } else {\n      alert('Please enter a URL.');\n  }\n});\n\n\n//# sourceURL=webpack://webpack-demo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;