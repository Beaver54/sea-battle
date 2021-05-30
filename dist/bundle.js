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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/scss/styles.scss */ \"./src/scss/styles.scss\");\n/* harmony import */ var _js_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/model */ \"./src/js/model.js\");\n\n\n__webpack_require__(\"./src/images sync recursive ^\\\\.\\\\/.*\\\\..*\");\n\n\n;\n\n(function () {\n  'use strict'; // Убираем вывод контекстного меню на игровых полях\n\n  _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getElementById('computer').oncontextmenu = _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getFalse;\n  _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getElementById('player').oncontextmenu = _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getFalse; // Создаем объекты игровых полей игрока и компьютера\n\n  var player = new _js_model__WEBPACK_IMPORTED_MODULE_1__.Field('Player'),\n      computer = new _js_model__WEBPACK_IMPORTED_MODULE_1__.Field('Computer'); // Выводим введенные имена игрока и компьютера\n\n  _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getElementById('start-game').addEventListener(\"click\", function () {\n    _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getFieldName(player, 'player-input', 'player-name', 'player-label');\n    _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getFieldName(player, 'computer-input', 'computer-name', 'computer-label');\n    _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.startGame(player, computer, 'game-menu', 'fields');\n  }); // Генерируем координаты кораблей\n\n  _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.createShipData(player.ships);\n  _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.createShipData(computer.ships); // Вычисляем суммарные хитпоинты кораблей\n\n  _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getSumOfHealth(player);\n  computer.totalHealth = player.totalHealth; // Расставляем корабли на игровом поле игрока\n\n  _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getPlacementOfShips(player); // Обрабатываем события кликов по игровому полю оппонента\n\n  _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getElementById('computer').addEventListener(\"click\", function () {\n    _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.mouseEvent.getPlayerShot(event, player, computer, 'computer', 'player', 'message', 'Вы победили!');\n  });\n  _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.getElementById('computer').addEventListener(\"contextmenu\", function () {\n    _js_model__WEBPACK_IMPORTED_MODULE_1__.Field.mouseEvent.getSkip(event, 'computer');\n  });\n})();\n\n//# sourceURL=webpack://doceditor/./src/index.js?");

/***/ }),

/***/ "./src/js/model.js":
/*!*************************!*\
  !*** ./src/js/model.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Field\": () => (/* binding */ Field)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// Класс игрового поля\nvar Field = /*#__PURE__*/function () {\n  function Field(field) {\n    _classCallCheck(this, Field);\n\n    this.name = field;\n    this.ships = {};\n    this.totalHealth = 0;\n    this.shootingData = [];\n    this.firing = {\n      fire: false,\n      shots: []\n    };\n  }\n\n  _createClass(Field, null, [{\n    key: \"getElementById\",\n    value: // Берем элемент по его ID\n    function getElementById(element) {\n      return document.getElementById(element);\n    } // Выводим введенные имена игрока и компьютера\n\n  }, {\n    key: \"getFieldName\",\n    value: function getFieldName(obj, inputID, outputID, labelID) {\n      obj.name = this.getElementById(\"\".concat(inputID)).value;\n\n      if (obj.name !== '') {\n        this.getElementById(outputID).innerText = obj.name;\n      } else {\n        this.getElementById(labelID).innerText = 'Заполните поле.';\n      }\n    } // Скрываем главное меню и выводим игровые поля\n\n  }, {\n    key: \"startGame\",\n    value: function startGame(playerObj, computerObj, menuID, fieldsID) {\n      if (playerObj.name !== '' && computerObj.name !== '') {\n        this.getElementById(menuID).hidden = true;\n        this.getElementById(fieldsID).hidden = false;\n      }\n    } // Возвращаем false для запрета вывода контектного меню на игровом поле\n\n  }, {\n    key: \"getFalse\",\n    value: function getFalse() {\n      return false;\n    } // Генерация случайного числа из диапозона (включая границы диапозона)\n\n  }, {\n    key: \"getRandomNumber\",\n    value: function getRandomNumber(min, max) {\n      min = Math.ceil(min);\n      max = Math.floor(max);\n      return Math.floor(Math.random() * (max - min + 1)) + min;\n    } // Генерируем объект с данными о кораблях\n\n  }, {\n    key: \"createShipData\",\n    value: function createShipData(obj) {\n      var _this = this;\n\n      // Локальные переменные для создания и проверки координат\n      var position = false,\n          j,\n          max = 0,\n          x = 0,\n          y = 0,\n          x1 = 0,\n          y1 = 0; // Проверяем, совпадают ли сгенерированные координаты с уже существующими\n\n      function findMatches(arg) {\n        for (var key2 in arg) {\n          if (x <= arg[key2].x1 + Field.SHIP_SIDE && x >= arg[key2].x - Field.SHIP_SIDE && y <= arg[key2].y1 + Field.SHIP_SIDE && y >= arg[key2].y - Field.SHIP_SIDE || x1 <= arg[key2].x1 + Field.SHIP_SIDE && x1 >= arg[key2].x - Field.SHIP_SIDE && y1 <= arg[key2].y1 + Field.SHIP_SIDE && y1 >= arg[key2].y - Field.SHIP_SIDE) {\n            j = true;\n            break;\n          } else {\n            j = false;\n          }\n        }\n      } // Генерируем координаты начала корабля\n\n\n      var getRandomCoords = function getRandomCoords(secondRange) {\n        return _this.getRandomNumber(0, secondRange) * _this.SHIP_SIDE;\n      }; // Вычисляем координаты конца корабля\n\n\n      var getEndCoords = function getEndCoords(coord, shipCount) {\n        return coord + (shipCount - 1) * _this.SHIP_SIDE;\n      }; // Вычисляем крайнюю координату стороны\n\n\n      var lastCord = this.FIELD_SIDE / this.SHIP_SIDE - 1;\n\n      for (var key in this.SHIP_DATA) {\n        max = 10 - this.SHIP_DATA[key][1];\n\n        for (var i = 1; i < this.SHIP_DATA[key][0] + 1; i++) {\n          // 1. Случайно генерируем положение корабля\n          position = !this.getRandomNumber(0, 1);\n\n          if (position) {\n            do {\n              // Координаты начала корабля\n              x = getRandomCoords(max);\n              y = getRandomCoords(lastCord); // координаты конца корабля\n\n              x1 = getEndCoords(x, this.SHIP_DATA[key][1]);\n              y1 = y; // Проверка сгенерированных координат\n\n              findMatches(obj);\n            } while (j);\n          } else {\n            do {\n              // Координаты начала корабля\n              x = getRandomCoords(lastCord);\n              y = getRandomCoords(max); // Координаты конца корабля\n\n              x1 = x;\n              y1 = getEndCoords(y, this.SHIP_DATA[key][1]); // Проверка сгенерированных координат\n\n              findMatches(obj);\n            } while (j);\n          } // Генерируем объект корабля\n\n\n          obj[key + i] = {\n            x: x,\n            y: y,\n            x1: x1,\n            y1: y1,\n            position: position,\n            \"class\": \"\".concat(key),\n            decks: this.SHIP_DATA[key][1],\n            health: this.SHIP_DATA[key][1]\n          };\n        }\n      }\n    } // После создания объекта с кораблями проходим 1 раз по нему,\n    // чтобы вычислить сумму хитпоинтов всех кораблей.\n    // Это освободит нас от необходимости после каждого попадания проходить\n    // по объекту и проверять не потопили ли мы все корабли.\n\n  }, {\n    key: \"getSumOfHealth\",\n    value: function getSumOfHealth(obj) {\n      for (var key in obj.ships) {\n        obj.totalHealth += obj.ships[key].health;\n      }\n    } // Определение положения корабля (вертикально или горизонтально)\n\n  }, {\n    key: \"getPositionOfShip\",\n    value: function getPositionOfShip(position) {\n      if (position === false) {\n        return ' vertical';\n      } else {\n        return '';\n      }\n    } // Расстановка кораблей на поле игрока\n\n  }, {\n    key: \"getPlacementOfShips\",\n    value: function getPlacementOfShips(obj) {\n      for (var key in obj.ships) {\n        this.getElementById('player').insertAdjacentHTML('beforeend', \"<div id=\\\"\".concat(key, \"\\\" class=\\\"ship \").concat(obj.ships[key][\"class\"]).concat(this.getPositionOfShip(obj.ships[key].position), \"\\\" style=\\\"top:\").concat(obj.ships[key].y, \"px; left:\").concat(obj.ships[key].x, \"px;\\\"></div>\"));\n      }\n    }\n  }]);\n\n  return Field;\n}();\nField.FIELD_SIDE = 300;\nField.SHIP_SIDE = 30;\nField.SHIP_DATA = {\n  fourdeck: [1, 4],\n  tripledeck: [2, 3],\n  doubledeck: [3, 2],\n  singledeck: [4, 1]\n};\nField.mouseEvent = {\n  // Отображаем ячейку игрового поля в зависимости от результата хода\n  displayCell: function displayCell(x, y, fieldID, cellClassName) {\n    Field.getElementById(\"\".concat(fieldID)).insertAdjacentHTML('beforeend', \"<div class=\\\"\".concat(cellClassName, \"\\\" style=\\\"top:\").concat(y, \"px;left:\").concat(x, \"px;\\\"></div>\"));\n  },\n  // Выводим сообщение в информационное окно\n  getMessageInnerText: function getMessageInnerText(messageID, innerText) {\n    Field.getElementById(\"\".concat(messageID)).innerHTML = \"<p>\".concat(innerText, \"</p>\");\n  },\n  // Считаем нанесенный урон по кораблю\n  getDamage: function getDamage(x, y, obj, ship, messageID, shipDownMessage, getHitMessage, fieldID) {\n    ship.health--; // Проверяем, чтобы клетка была пустой и не находилась за пределами игрового поля\n    // Если условия удовлетворены, то закрываем заведомо пустые клетки на поле и вносим их в лог выстрелов\n\n    function getAroundSafe(obj, maxCoord, x, y, fieldID) {\n      // Флаг, который будет говорить нам о том, что клетка пуста и не находится за пределами поля\n      var safeFlag = true;\n\n      for (var k = 0; k < obj.shootingData.length; k++) {\n        if (x === obj.shootingData[k].x && y === obj.shootingData[k].y) {\n          safeFlag = true;\n          break;\n        } else if (x < maxCoord && y < maxCoord && x >= 0 && y >= 0) {\n          safeFlag = false;\n        }\n      }\n\n      if (!safeFlag) {\n        obj.shootingData.push({\n          x: x,\n          y: y,\n          type: 'safe'\n        });\n        Field.mouseEvent.displayCell(x, y, fieldID, 'safe');\n      }\n    }\n\n    if (ship.health === 0) {\n      var getX = function getX(ship, x, key) {\n        x = ship.x - Field.SHIP_SIDE;\n        return x + Field.SHIP_SIDE * key;\n      };\n\n      var getY = function getY(ship, y, key) {\n        y = ship.y - Field.SHIP_SIDE;\n        return y + Field.SHIP_SIDE * key;\n      };\n\n      var _x, _y;\n\n      if (ship.position) {\n        for (var i = 0; i < 3; i++) {\n          _y = getY(ship, _y, i);\n\n          for (var j = 0; j < ship.decks + 2; j++) {\n            _x = getX(ship, _x, j);\n            getAroundSafe(obj, Field.FIELD_SIDE, _x, _y, fieldID);\n          }\n        }\n      } else {\n        for (var _i = 0; _i < ship.decks + 2; _i++) {\n          _y = getY(ship, _y, _i);\n\n          for (var _j = 0; _j < 3; _j++) {\n            _x = getX(ship, _x, _j);\n            getAroundSafe(obj, Field.FIELD_SIDE, _x, _y, fieldID);\n          }\n        }\n      }\n\n      obj.firing.shots = [];\n      obj.firing.fire = false;\n      Field.mouseEvent.getMessageInnerText(messageID, shipDownMessage);\n    } else {\n      obj.firing.fire = true;\n      Field.mouseEvent.getMessageInnerText(messageID, getHitMessage);\n    }\n  },\n  // Определяем координаты клика по игровому полю\n  getCursorCoords: function getCursorCoords(eventOffset) {\n    return Math.floor(eventOffset / Field.SHIP_SIDE) * Field.SHIP_SIDE;\n  },\n  // Перебираем координаты кораблей и проверяем попадание\n  getHit: function getHit(x, y, obj, messageID, shipDownMessage, getHitMessage, fieldID) {\n    for (var key in obj.ships) {\n      if (obj.ships[key].position) {\n        if (y === obj.ships[key].y && x >= obj.ships[key].x && x <= obj.ships[key].x1) {\n          obj.totalHealth--;\n          obj.shootingData.push({\n            x: x,\n            y: y,\n            type: 'hit'\n          });\n          obj.firing.shots.push({\n            x: x,\n            y: y,\n            decks: obj.ships[key].decks\n          });\n          Field.mouseEvent.getDamage(x, y, obj, obj.ships[key], \"\".concat(messageID), \"\".concat(shipDownMessage), \"\".concat(getHitMessage), fieldID);\n          return true;\n        }\n      } else {\n        if (x === obj.ships[key].x && y >= obj.ships[key].y && y <= obj.ships[key].y1) {\n          obj.totalHealth--;\n          obj.shootingData.push({\n            x: x,\n            y: y,\n            type: 'hit'\n          });\n          obj.firing.shots.push({\n            x: x,\n            y: y,\n            decks: obj.ships[key].decks\n          });\n          Field.mouseEvent.getDamage(x, y, obj, obj.ships[key], \"\".concat(messageID), \"\".concat(shipDownMessage), \"\".concat(getHitMessage), fieldID);\n          return true;\n        }\n      }\n    }\n\n    obj.shootingData.push({\n      x: x,\n      y: y,\n      type: 'dot'\n    });\n    return false;\n  },\n  // В зависимости от результата выстрела меняем отображение ячейки и передаем ход\n  displayOnField: function displayOnField(x, y, hitFlag, fieldID, obj, playerObj, playerTurn, computerTurn, messageID, computerID, playerID) {\n    if (hitFlag === false) {\n      Field.mouseEvent.displayCell(x, y, fieldID, 'dot');\n\n      if (playerTurn) {\n        Field.mouseEvent.getMessageInnerText(messageID, 'Ход компьютера');\n        setTimeout(Field.mouseEvent.getComputerShot, 500, playerObj, messageID, computerID, playerID, 'Вы проиграли :(');\n      }\n    } else {\n      Field.mouseEvent.displayCell(x, y, fieldID, 'hit');\n\n      if (computerTurn) {\n        Field.mouseEvent.getMessageInnerText(messageID, 'Ход компьютера');\n        setTimeout(Field.mouseEvent.getComputerShot, 500, playerObj, messageID, computerID, playerID, 'Вы проиграли :(');\n      }\n    }\n  },\n  checkTheHit: function checkTheHit(x, y, obj, player, messageID, shipDownMessage, getHitMessage, fieldID, computerID, playerID, endGameMessage, playerTurn, computerTurn) {\n    // Создаем флаг, который будет сигнализировать нам о попадании\n    var hitFlag = Field.mouseEvent.getHit(x, y, obj, messageID, shipDownMessage, getHitMessage, fieldID);\n    Field.mouseEvent.displayOnField(x, y, hitFlag, fieldID, obj, player, playerTurn, computerTurn, messageID, computerID, playerID);\n\n    if (computerTurn && !hitFlag) {\n      Field.mouseEvent.getMessageInnerText(messageID, 'Ваш ход');\n    } // Проверяем totalHealth, если он равен 0, то заканчиваем игру\n\n\n    if (obj.totalHealth === 0) {\n      Field.getElementById(\"\".concat(computerID)).style = 'pointer-events:none;';\n      Field.mouseEvent.getMessageInnerText(messageID, endGameMessage);\n    }\n  },\n  getComputerShot: function getComputerShot(player, messageID, computerID, playerID, loseMessage) {\n    var j = false,\n        // Флаг, запускающий цикл генерации координат, пока они не будут удовлетворять условию\n    x,\n        y; // Локальные координаты, которые генерируются (или вычисляются) каждую итерацию\n\n    if (player.firing.fire) {\n      var shotsData = player.firing.shots; // Стратегия поведения компьютера, если идет обстрел 3-х ил 4-х палубного корабля\n\n      if (player.firing.shots.length > 1) {\n        // Вычисляем смещение координат после второго выстрела по 3-х или 4-х палубному кораблю,\n        // чтобы определить его положение\n        var offsetX = shotsData[0].x - shotsData[1].x,\n            offsetY = shotsData[0].y - shotsData[1].y; // Ищем палубы корабля по направлению смещения координат\n\n        outer: for (var i = -1; i < shotsData[0].decks; i++) {\n          x = shotsData[shotsData.length - 1].x + offsetX * i;\n          y = shotsData[shotsData.length - 1].y + offsetY * i;\n\n          for (var k = 0; k < player.shootingData.length; k++) {\n            if (x === player.shootingData[k].x && y === player.shootingData[k].y || x < 0 || x >= Field.FIELD_SIDE || y < 0 || y >= Field.FIELD_SIDE) {\n              continue outer;\n            }\n          }\n\n          break;\n        }\n\n        Field.mouseEvent.checkTheHit(x, y, player, player, 'message', 'Ваш корабль потоплен', 'По вашему кораблю попали', 'player', computerID, playerID, loseMessage, false, true);\n      } // Стратегия поведения компьютера, если идет обстрел 2-х палубного корабля\n      else {\n          // Коэффициенты смещения от точки попадания\n          var offsetArray = [{\n            x: -1,\n            y: 0\n          }, {\n            x: 0,\n            y: -1\n          }, {\n            x: 1,\n            y: 0\n          }, {\n            x: 0,\n            y: 1\n          }]; // Координаты последнего попадания\n\n          var firstShotX = shotsData[shotsData.length - 1].x,\n              firstShotY = shotsData[shotsData.length - 1].y; // Перебираем соседние клетки от попадания\n\n          outer: for (var _i2 = 0; _i2 < 4; _i2++) {\n            x = firstShotX + offsetArray[_i2].x * Field.SHIP_SIDE;\n            y = firstShotY + offsetArray[_i2].y * Field.SHIP_SIDE;\n\n            for (var _k = 0; _k < player.shootingData.length; _k++) {\n              if (x === player.shootingData[_k].x && y === player.shootingData[_k].y || x < 0 || x >= Field.FIELD_SIDE || y < 0 || y >= Field.FIELD_SIDE) {\n                continue outer;\n              }\n            }\n\n            break;\n          }\n\n          Field.mouseEvent.checkTheHit(x, y, player, player, 'message', 'Ваш корабль потоплен', 'По вашему кораблю попали', 'player', computerID, playerID, loseMessage, false, true);\n        }\n    } else {\n      do {\n        x = Field.getRandomNumber(0, 9) * Field.SHIP_SIDE;\n        y = Field.getRandomNumber(0, 9) * Field.SHIP_SIDE;\n\n        for (var _i3 = 0; _i3 < player.shootingData.length; _i3++) {\n          if (x === player.shootingData[_i3].x && y === player.shootingData[_i3].y) {\n            j = true;\n            break;\n          } else {\n            j = false;\n          }\n        }\n      } while (j);\n\n      Field.mouseEvent.checkTheHit(x, y, player, player, 'message', 'Ваш корабль потоплен', 'По вашему кораблю попали', 'player', computerID, playerID, loseMessage, false, true);\n    }\n  },\n  getPlayerShot: function getPlayerShot(event, player, computer, computerID, playerID, messageID, winnerMessage) {\n    // Проверяем, не является ли клетка в статусе \"мимо\"\n    var className = event.target.className;\n\n    if (className !== 'dot' && className !== 'safe' && className !== 'hit') {\n      // Определяем координаты клика\n      var x = Field.mouseEvent.getCursorCoords(event.offsetX);\n      var y = Field.mouseEvent.getCursorCoords(event.offsetY);\n      Field.mouseEvent.checkTheHit(x, y, computer, player, 'message', 'Вы потопили корабль!', 'Вы попали по кораблю!', 'computer', computerID, playerID, winnerMessage, true, false);\n    }\n  },\n  getSkip: function getSkip(event, fieldID) {\n    var className = event.target.className; // Проверяем состояние клетки и добавляем/убираем \"safe\" состояние\n\n    if (className !== 'dot' && className !== 'safe' && className !== 'hit') {\n      // Определяем координаты клика по игровому полю\n      var x = Field.mouseEvent.getCursorCoords(event.offsetX);\n      var y = Field.mouseEvent.getCursorCoords(event.offsetY);\n      Field.mouseEvent.displayCell(x, y, fieldID, 'safe');\n    } else if (className === 'safe') {\n      event.target.remove();\n    }\n  }\n};\n\n//# sourceURL=webpack://doceditor/./src/js/model.js?");

/***/ }),

/***/ "./src/images/cell.png":
/*!*****************************!*\
  !*** ./src/images/cell.png ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"/images/cell.png\");\n\n//# sourceURL=webpack://doceditor/./src/images/cell.png?");

/***/ }),

/***/ "./src/images/deck.png":
/*!*****************************!*\
  !*** ./src/images/deck.png ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"/images/deck.png\");\n\n//# sourceURL=webpack://doceditor/./src/images/deck.png?");

/***/ }),

/***/ "./src/images/dot.png":
/*!****************************!*\
  !*** ./src/images/dot.png ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"/images/dot.png\");\n\n//# sourceURL=webpack://doceditor/./src/images/dot.png?");

/***/ }),

/***/ "./src/images/hit.png":
/*!****************************!*\
  !*** ./src/images/hit.png ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"/images/hit.png\");\n\n//# sourceURL=webpack://doceditor/./src/images/hit.png?");

/***/ }),

/***/ "./src/images/safe.png":
/*!*****************************!*\
  !*** ./src/images/safe.png ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"/images/safe.png\");\n\n//# sourceURL=webpack://doceditor/./src/images/safe.png?");

/***/ }),

/***/ "./src/scss/styles.scss":
/*!******************************!*\
  !*** ./src/scss/styles.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://doceditor/./src/scss/styles.scss?");

/***/ }),

/***/ "./src/images sync recursive ^\\.\\/.*\\..*":
/*!**************************************!*\
  !*** ./src/images/ sync ^\.\/.*\..* ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./cell.png\": \"./src/images/cell.png\",\n\t\"./deck.png\": \"./src/images/deck.png\",\n\t\"./dot.png\": \"./src/images/dot.png\",\n\t\"./hit.png\": \"./src/images/hit.png\",\n\t\"./safe.png\": \"./src/images/safe.png\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/images sync recursive ^\\\\.\\\\/.*\\\\..*\";\n\n//# sourceURL=webpack://doceditor/./src/images/_sync_^\\.\\/.*\\..*?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;