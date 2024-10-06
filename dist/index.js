/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\n// Инициализация отслеживания событий игры\nwindow.eventTracker.ongamestart();\nvar gameOver = false;\n// Настройка canvas\nvar canvas = document.getElementById(\"gameCanvas\");\nvar ctx = canvas.getContext(\"2d\");\ncanvas.width = canvas.offsetWidth;\ncanvas.height = canvas.offsetHeight;\n\n// Константы\nvar CANVAS_WIDTH = canvas.width;\nvar CANVAS_HEIGHT = canvas.height;\nvar GAME_BOARD_HEIGHT = canvas.width * 1.6;\nvar VERTICAL_OVERLAP = (CANVAS_HEIGHT - GAME_BOARD_HEIGHT) / 2 > 0 ? (CANVAS_HEIGHT - GAME_BOARD_HEIGHT) / 2 : 0;\nvar BARRIER_WIDTH = CANVAS_WIDTH / 10;\nvar MAX_BALL_SPEED = 20;\nvar MAX_TURN_TO_AUTOWIN = 4; // при каком ударе мяч точно полетит до лунки\n//Загрузка изображений\nvar arrowImages = {\n  \"short\": new Image(),\n  medium: new Image(),\n  \"long\": new Image(),\n  veryLong: new Image()\n};\nvar ballImage = new Image();\nvar holeImage = new Image();\nvar clubImage = new Image();\nvar fenceImage = new Image();\nvar boardImage = new Image();\nboardImage.src = __webpack_require__(/*! ./assets/land.png */ \"./src/assets/land.png\");\nboardImage.style.imageRendering = \"crisp-edges\";\nfenceImage.src = __webpack_require__(/*! ./assets/fence.png */ \"./src/assets/fence.png\");\nclubImage.src = __webpack_require__(/*! ./assets/club_2.png */ \"./src/assets/club_2.png\");\nholeImage.src = __webpack_require__(/*! ./assets/hole_2.png */ \"./src/assets/hole_2.png\");\nballImage.src = __webpack_require__(/*! ./assets/ball.png */ \"./src/assets/ball.png\");\narrowImages[\"short\"].src = __webpack_require__(/*! ./assets/hit_power_1.png */ \"./src/assets/hit_power_1.png\");\narrowImages.medium.src = __webpack_require__(/*! ./assets/hit_power_2.png */ \"./src/assets/hit_power_2.png\");\narrowImages[\"long\"].src = __webpack_require__(/*! ./assets/hit_power_3.png */ \"./src/assets/hit_power_3.png\");\narrowImages.veryLong.src = __webpack_require__(/*! ./assets/hit_power_4.png */ \"./src/assets/hit_power_4.png\");\n\n// Класс для мяча\nvar Ball = /*#__PURE__*/function () {\n  function Ball(image) {\n    _classCallCheck(this, Ball);\n    this.x = CANVAS_WIDTH / 3 - BARRIER_WIDTH / 4;\n    this.radius = (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 60;\n    this.y = CANVAS_HEIGHT - VERTICAL_OVERLAP / 2 - BARRIER_WIDTH * 2;\n    this.speedX = 0;\n    this.speedY = 0;\n    this.image = image;\n    this.isDragging = false;\n    this.isNeedCorrect = false;\n    this.numberOfHit = 1;\n  }\n  return _createClass(Ball, [{\n    key: \"update\",\n    value: function update() {\n      // Обновление позиции мяча\n      if (!this.isDragging) {\n        this.x += this.speedX;\n        this.y += this.speedY;\n\n        // Трение для постепенной остановки\n        this.speedX *= 0.96;\n        this.speedY *= 0.96;\n        if (Math.abs(this.speedX) <= 0.5) this.speedX = 0;\n        if (Math.abs(this.speedY) <= 0.5) this.speedY = 0;\n      }\n    }\n\n    // Проверка касания мяча с небольшим запасом, чтобы толстым пальцем тоже попасть\n  }, {\n    key: \"isClicked\",\n    value: function isClicked(mouseX, mouseY) {\n      var dist = Math.hypot(mouseX - this.x, mouseY - this.y);\n      return dist < this.radius * 2;\n    }\n\n    // Начать перетаскивание\n  }, {\n    key: \"startDragging\",\n    value: function startDragging() {\n      if (!this.speedX && !this.speedY) {\n        this.isDragging = true;\n        this.speedX = 0;\n        this.speedY = 0;\n      }\n    }\n\n    // Рассчет смещение при перетаскивании\n  }, {\n    key: \"calculateDragOffset\",\n    value: function calculateDragOffset(mouseX, mouseY) {\n      var dx = this.x - mouseX;\n      var dy = this.y - mouseY;\n      return {\n        dx: dx,\n        dy: dy\n      };\n    }\n\n    // Корректировка скорости до максимальной с сохранением угла направления\n  }, {\n    key: \"calculateCorrectedSpeed\",\n    value: function calculateCorrectedSpeed() {\n      if (Math.abs(this.speedX) > Math.abs(this.speedY) && Math.abs(this.speedX) > MAX_BALL_SPEED) {\n        this.speedY = MAX_BALL_SPEED * this.speedY / Math.abs(this.speedX);\n        this.speedX = this.speedX > 0 ? MAX_BALL_SPEED : -MAX_BALL_SPEED;\n      } else if (Math.abs(this.speedX) < Math.abs(this.speedY) && Math.abs(this.speedY) > MAX_BALL_SPEED) {\n        this.speedX = MAX_BALL_SPEED * this.speedX / Math.abs(this.speedY);\n        this.speedY = this.speedY > 0 ? MAX_BALL_SPEED : -MAX_BALL_SPEED;\n      }\n    }\n    // Закончить перетаскивание, установить скорость\n  }, {\n    key: \"stopDragging\",\n    value: function stopDragging(mouseX, mouseY) {\n      // Вызов метода для отслеживания текущего удара\n      window.eventTracker.turn(this.numberOfHit);\n      this.numberOfHit++;\n      this.isNeedCorrect = true;\n      this.isDragging = false;\n      var dx = this.calculateDragOffset(mouseX, mouseY).dx;\n      var dy = this.calculateDragOffset(mouseX, mouseY).dy;\n\n      // Устанавливаем скорость мяча\n      this.speedX = dx * 0.4;\n      this.speedY = dy * 0.4;\n      // Ограничение максимальной скорости\n      this.calculateCorrectedSpeed();\n    }\n    // Метод для проверки столкновения с прямоугольными стенками\n  }, {\n    key: \"checkCollisionWithRect\",\n    value: function checkCollisionWithRect(rect) {\n      // Столкновение\n      if (this.y - this.radius + this.speedY <= rect.y + rect.height && this.y + this.radius + this.speedY >= rect.y && this.x + this.radius + this.speedX > rect.x && this.x - this.radius + this.speedX < rect.x + rect.width) {\n        // Проверка на попадания в угол прямоугольника\n        if (this.x - this.radius < rect.x + rect.width && this.x - this.radius > rect.x && this.y - this.radius < rect.y + rect.height && this.y - this.radius > rect.y || this.x - this.radius < rect.x + rect.width && this.x - this.radius > rect.x && this.y + this.radius > rect.y && this.y + this.radius < rect.y + rect.height || this.x + this.radius > rect.x && this.x + this.radius < rect.x + rect.width && this.y + this.radius > rect.y && this.y + this.radius < rect.y + rect.height || this.x + this.radius > rect.x && this.x + this.radius < rect.x + rect.width && this.y - this.radius < rect.y + rect.height && this.y - this.radius > rect.y) {\n          this.speedY *= -0.99;\n          this.speedX *= -0.99;\n        } else if (this.y - this.radius + this.speedY < rect.y + rect.height && this.y + this.speedY > rect.y + rect.height || this.y + this.radius + this.speedY > rect.y && this.y + this.speedY < rect.y) {\n          // Столкновение  по вертикали\n          this.speedY *= -0.99; // Меняем направление по оси Y\n        } else {\n          // Столкновение по горизонтали\n          this.speedX *= -0.99; // Меняем направление по оси X\n        }\n        this.isNeedCorrect = !this.isNeedCorrect;\n      }\n    }\n    // Проверка столкновения с кругом\n  }, {\n    key: \"checkCollisionWithCircle\",\n    value: function checkCollisionWithCircle(circle) {\n      var dx = this.x - circle.x;\n      var dy = this.y - circle.y;\n      var distance = Math.hypot(dx, dy); // Расстояние между мячом и кругом\n\n      // Если произошло столкновение (расстояние меньше суммы радиусов)\n      if (distance <= this.radius + circle.radius) {\n        // Нормализуем вектор столкновения\n        var nx = dx / distance;\n        var ny = dy / distance;\n\n        // Расчет скалярного произведения вектора скорости на нормаль\n        var dotProduct = this.speedX * nx + this.speedY * ny;\n\n        // Отражаем вектор скорости относительно нормали\n        this.speedX = this.speedX - 2 * dotProduct * nx;\n        this.speedY = this.speedY - 2 * dotProduct * ny;\n\n        // Коррекция положения, чтобы избежать залипания\n        var overlap = this.radius + circle.radius - distance;\n        this.x += nx * overlap / 2;\n        this.y += ny * overlap / 2;\n      }\n    }\n    // Проверка столкновения с лункой\n  }, {\n    key: \"checkCollisionWithHole\",\n    value: function checkCollisionWithHole(hole) {\n      var dx = hole.x - this.x;\n      var dy = hole.y - this.y;\n      var distance = Math.hypot(dx, dy); // расстояние между мячом и лункой\n      var ballSpeed = Math.hypot(this.speedX, this.speedY); // текущая скорость мяча\n\n      // Если сделано достаточно ударов, то запускаем автонаведение на лунку\n      if (this.isNeedCorrect && this.numberOfHit > MAX_TURN_TO_AUTOWIN) {\n        var speedFactor = 0.05; // регулирует скорость полета в лунку\n\n        // Перенаправляем мяч на лунку\n        this.speedX = dx * speedFactor;\n        this.speedY = dy * speedFactor;\n\n        // Ограничение максимальной скорости\n        this.calculateCorrectedSpeed();\n      }\n\n      // Проверка: мяч достаточно близко к лунке и движется медленно\n      if (distance <= hole.radius * 1.2 && ballSpeed < 12) {\n        // Плавное уменьшение скорости\n        this.speedX *= 0.8;\n        this.speedY *= 0.8;\n\n        // Если мяч почти стоит, \"притягиваем\" его к центру лунки\n        if (ballSpeed < 1) {\n          this.x += dx * 0.2;\n          this.y += dy * 0.2;\n          this.radius *= 0.98;\n          // Если мяч практически в центре лунки, останавливаем его\n          if (distance < 1) {\n            this.speedX = 0;\n            this.speedY = 0;\n            this.x = hole.x;\n            this.y = hole.y;\n            // Проверка на окончание игры\n            if (!gameOver) {\n              window.eventTracker.ongameover();\n              window.eventTracker.print();\n              gameOver = true;\n            }\n          }\n        }\n      }\n    }\n    // Рисунок стрелки напраления удара\n  }, {\n    key: \"drawArrow\",\n    value: function drawArrow(mouseX, mouseY) {\n      var dx = this.calculateDragOffset(mouseX, mouseY).dx;\n      var dy = this.calculateDragOffset(mouseX, mouseY).dy;\n      var distance = Math.hypot(dx, dy); // Рассчитываем расстояние (сила)\n      var arrowImage;\n\n      // В зависимости от расстояния выбираем подходящую стрелку\n      if (distance < 10) {\n        arrowImage = arrowImages[\"short\"];\n      } else if (distance < 20) {\n        arrowImage = arrowImages.medium;\n      } else if (distance < 30) {\n        arrowImage = arrowImages[\"long\"];\n      } else {\n        arrowImage = arrowImages.veryLong;\n      }\n\n      // Определяем угол направления\n      var angle = Math.atan2(dy, dx) + Math.PI / 2;\n\n      // Сохраняем текущий контекст перед вращением\n      ctx.save();\n      // Перемещаем контекст к мячу и поворачиваем\n      ctx.translate(this.x, this.y);\n      ctx.rotate(angle);\n      var imageHeight = 2 * distance < 80 ? 2 * distance : 80;\n      // Рисуем стрелку, исходящую из мяча\n      ctx.drawImage(arrowImage, -15, -imageHeight - 2 * this.radius, 30, imageHeight);\n\n      // Восстанавливаем контекст\n      ctx.restore();\n    }\n  }, {\n    key: \"drawClub\",\n    value: function drawClub(mouseX, mouseY) {\n      var dx = this.calculateDragOffset(mouseX, mouseY).dx;\n      var dy = this.calculateDragOffset(mouseX, mouseY).dy;\n      var distance = Math.hypot(dx, dy); // Рассчитываем расстояние (сила)\n\n      // Определяем угол направления\n      var angle = Math.atan2(dy, dx) + Math.PI / 2;\n\n      // Сохраняем текущий контекст перед вращением\n      ctx.save();\n      // Перемещаем контекст к мячу и поворачиваем\n      ctx.translate(this.x, this.y);\n      ctx.rotate(angle);\n      var distanceToBall = distance * 0.5 - 150 < -120 ? distance * 0.5 - 150 : -120;\n\n      // Рисуем клюшку\n      ctx.drawImage(clubImage, 0, distanceToBall - this.radius, 60, 200);\n\n      // Восстанавливаем контекст\n      ctx.restore();\n    }\n  }, {\n    key: \"draw\",\n    value: function draw() {\n      ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);\n    }\n  }]);\n}(); // Класс для кругов\nvar Circle = /*#__PURE__*/function () {\n  function Circle(x, y, radius) {\n    _classCallCheck(this, Circle);\n    this.x = x;\n    this.y = y;\n    this.radius = radius;\n  }\n  return _createClass(Circle, [{\n    key: \"draw\",\n    value: function draw() {\n      ctx.beginPath(); // Начинаем новый путь для рисования\n      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Рисуем полный круг (2π радиан)\n      ctx.stroke(); // Заполняем круг цветом\n      ctx.closePath(); // Заканчиваем путь\n    }\n  }]);\n}(); // Класс для промоугольников, для расчета столкновений\nvar Rectangle = /*#__PURE__*/function () {\n  function Rectangle(x, y, width, height) {\n    _classCallCheck(this, Rectangle);\n    this.width = width;\n    this.height = height;\n    this.x = x;\n    this.y = y;\n  }\n  return _createClass(Rectangle, [{\n    key: \"draw\",\n    value: function draw() {\n      ctx.strokeRect(this.x, this.y, this.width, this.height);\n      ctx.stroke();\n    }\n  }]);\n}();\nvar Hole = /*#__PURE__*/function () {\n  function Hole(x, y, image) {\n    _classCallCheck(this, Hole);\n    this.radius = (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 45;\n    this.x = x - this.radius;\n    this.y = y;\n    this.image = image;\n  }\n  return _createClass(Hole, [{\n    key: \"draw\",\n    value: function draw() {\n      ctx.drawImage(this.image, this.x - 2.5 * this.radius, this.y - 5.4 * this.radius + this.radius, this.radius * 5, this.radius * 5.4);\n    }\n  }]);\n}(); // создание лунки\nvar hole = new Hole(CANVAS_WIDTH / 4 * 3, 2 * BARRIER_WIDTH + VERTICAL_OVERLAP / 2, holeImage);\n\n// создание мяча\nvar ball = new Ball(ballImage);\n\n// Массив кругов и прямоугольников для расчета столкновений\n\nvar environment = [new Circle(CANVAS_WIDTH / 2 - BARRIER_WIDTH * 2, (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 - BARRIER_WIDTH * 2 + VERTICAL_OVERLAP / 2, BARRIER_WIDTH * 2), new Circle(CANVAS_WIDTH / 2 + BARRIER_WIDTH * 1.5, (CANVAS_HEIGHT - VERTICAL_OVERLAP) * 2 / 3 + BARRIER_WIDTH * 1.5 + VERTICAL_OVERLAP / 2, BARRIER_WIDTH * 1.5), new Rectangle(0, CANVAS_HEIGHT - VERTICAL_OVERLAP - BARRIER_WIDTH + VERTICAL_OVERLAP / 2, CANVAS_WIDTH / 2, BARRIER_WIDTH), new Rectangle(CANVAS_WIDTH / 2, (CANVAS_HEIGHT - VERTICAL_OVERLAP) * 2 / 3 + BARRIER_WIDTH * 1.5 + VERTICAL_OVERLAP / 2, CANVAS_WIDTH / 2, (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 3), new Rectangle(CANVAS_WIDTH / 2 + BARRIER_WIDTH * 1.5, (CANVAS_HEIGHT - VERTICAL_OVERLAP) * 2 / 3 + VERTICAL_OVERLAP / 2, CANVAS_WIDTH / 2, (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 3), new Rectangle(0, (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 - BARRIER_WIDTH + VERTICAL_OVERLAP / 2, BARRIER_WIDTH, (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 + BARRIER_WIDTH), new Rectangle(CANVAS_WIDTH - BARRIER_WIDTH, VERTICAL_OVERLAP / 2, BARRIER_WIDTH, (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 3 * 2), new Rectangle(CANVAS_WIDTH / 2 - BARRIER_WIDTH / 2, +VERTICAL_OVERLAP / 2, CANVAS_WIDTH / 2, BARRIER_WIDTH), new Rectangle(0, VERTICAL_OVERLAP / 2, CANVAS_WIDTH / 2, (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 - BARRIER_WIDTH * 2), new Rectangle(0, (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 - BARRIER_WIDTH * 2 + VERTICAL_OVERLAP / 2, CANVAS_WIDTH / 2 - BARRIER_WIDTH * 2, BARRIER_WIDTH * 2), new Rectangle(CANVAS_WIDTH / 2 - BARRIER_WIDTH / 4, (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 + BARRIER_WIDTH / 2 + VERTICAL_OVERLAP / 2, BARRIER_WIDTH * 2 - BARRIER_WIDTH / 2, BARRIER_WIDTH / 2)];\n// Отслеживание положения мыши (тача)\nvar mouseX = 0;\nvar mouseY = 0;\n\n// Подписка на тачи\ncanvas.addEventListener(\"touchstart\", function (event) {\n  mouseX = event.touches[0].clientX;\n  mouseY = event.touches[0].clientY;\n  if (ball.isClicked(mouseX, mouseY) && !gameOver) {\n    event.preventDefault();\n    ball.startDragging();\n  }\n});\ncanvas.addEventListener(\"touchend\", function (event) {\n  if (ball.isDragging && !gameOver) {\n    var lastTouch = event.changedTouches[0]; // Последний контакт\n    mouseX = lastTouch.clientX;\n    mouseY = lastTouch.clientY;\n    ball.stopDragging(mouseX, mouseY);\n  }\n});\ncanvas.addEventListener(\"touchmove\", function (event) {\n  if (ball.isDragging && !gameOver) {\n    event.preventDefault();\n    var lastTouch = event.changedTouches[0]; // Последний контакт\n    mouseX = lastTouch.clientX;\n    mouseY = lastTouch.clientY;\n    ball.drawArrow(mouseX, mouseY);\n  }\n});\n\n// Функция для анимации\nfunction animate() {\n  if (!gameOver) {\n    requestAnimationFrame(animate);\n    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);\n    // расчет колизий с круглыми углами\n    environment.forEach(function (element, index) {\n      if (ball.numberOfHit > MAX_TURN_TO_AUTOWIN && index === environment.length - 1) return;\n      if (element.constructor === Circle) ball.checkCollisionWithCircle(element);else ball.checkCollisionWithRect(element);\n    });\n\n    //отрисовка игрового поля\n    ctx.drawImage(boardImage, BARRIER_WIDTH, VERTICAL_OVERLAP / 2 + BARRIER_WIDTH, CANVAS_WIDTH - 2 * BARRIER_WIDTH, CANVAS_HEIGHT - VERTICAL_OVERLAP - 2 * BARRIER_WIDTH);\n    // отрисовка лунки, мяча\n    hole.draw();\n    ball.update();\n    ball.draw();\n    // расчет колизии мяча с лункой\n    ball.checkCollisionWithHole(hole);\n    // отрисовка забора\n    ctx.drawImage(fenceImage, CANVAS_WIDTH / 2 - BARRIER_WIDTH / 2, (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 + VERTICAL_OVERLAP / 2, BARRIER_WIDTH * 2, BARRIER_WIDTH);\n    if (ball.isDragging) {\n      // Рисуем стрелку, когда мяч перетаскивается\n      ball.drawArrow(mouseX, mouseY);\n      ball.drawClub(mouseX, mouseY);\n    }\n  }\n}\nanimate();\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-webpack-project/./src/styles.css?");

/***/ }),

/***/ "./src/assets/ball.png":
/*!*****************************!*\
  !*** ./src/assets/ball.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"67fbe42416d763d4742a.png\";\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/ball.png?");

/***/ }),

/***/ "./src/assets/club_2.png":
/*!*******************************!*\
  !*** ./src/assets/club_2.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"e9ece261c7ca4b4d59dc.png\";\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/club_2.png?");

/***/ }),

/***/ "./src/assets/fence.png":
/*!******************************!*\
  !*** ./src/assets/fence.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"b75f865446d69a94283a.png\";\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/fence.png?");

/***/ }),

/***/ "./src/assets/hit_power_1.png":
/*!************************************!*\
  !*** ./src/assets/hit_power_1.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"42c941b5fa1b7de173b2.png\";\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/hit_power_1.png?");

/***/ }),

/***/ "./src/assets/hit_power_2.png":
/*!************************************!*\
  !*** ./src/assets/hit_power_2.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"2b9fc9aa204cd7431511.png\";\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/hit_power_2.png?");

/***/ }),

/***/ "./src/assets/hit_power_3.png":
/*!************************************!*\
  !*** ./src/assets/hit_power_3.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"f72c2da1036523e2ecbb.png\";\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/hit_power_3.png?");

/***/ }),

/***/ "./src/assets/hit_power_4.png":
/*!************************************!*\
  !*** ./src/assets/hit_power_4.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"c65042133b4c1725fc49.png\";\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/hit_power_4.png?");

/***/ }),

/***/ "./src/assets/hole_2.png":
/*!*******************************!*\
  !*** ./src/assets/hole_2.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"b5ec655263959f4ef286.png\";\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/hole_2.png?");

/***/ }),

/***/ "./src/assets/land.png":
/*!*****************************!*\
  !*** ./src/assets/land.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"9b5aab2e306c45e46c84.png\";\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/land.png?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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