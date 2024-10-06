import "./styles.css";
// Инициализация отслеживания событий игры
window.eventTracker.ongamestart();
let gameOver = false;
// Настройка canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Константы
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const GAME_BOARD_HEIGHT = canvas.width * 1.6;
const VERTICAL_OVERLAP =
  (CANVAS_HEIGHT - GAME_BOARD_HEIGHT) / 2 > 0
    ? (CANVAS_HEIGHT - GAME_BOARD_HEIGHT) / 2
    : 0;
const BARRIER_WIDTH = CANVAS_WIDTH / 10;
const MAX_BALL_SPEED = 20;
const MAX_TURN_TO_AUTOWIN = 4; // при каком ударе мяч точно полетит до лунки
//Загрузка изображений
const arrowImages = {
  short: new Image(),
  medium: new Image(),
  long: new Image(),
  veryLong: new Image(),
};
const ballImage = new Image();
const holeImage = new Image();
const clubImage = new Image();
const fenceImage = new Image();
const boardImage = new Image();

boardImage.src = require("./assets/land.png");
boardImage.style.imageRendering = "crisp-edges";
fenceImage.src = require("./assets/fence.png");
clubImage.src = require("./assets/club_2.png");
holeImage.src = require("./assets/hole_2.png");
ballImage.src = require("./assets/ball.png");
arrowImages.short.src = require("./assets/hit_power_1.png");
arrowImages.medium.src = require("./assets/hit_power_2.png");
arrowImages.long.src = require("./assets/hit_power_3.png");
arrowImages.veryLong.src = require("./assets/hit_power_4.png");

// Класс для мяча
class Ball {
  constructor(image) {
    this.x = CANVAS_WIDTH / 3 - BARRIER_WIDTH / 4;
    this.radius = (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 60;
    this.y = CANVAS_HEIGHT - VERTICAL_OVERLAP / 2 - BARRIER_WIDTH * 2;
    this.speedX = 0;
    this.speedY = 0;
    this.image = image;
    this.isDragging = false;
    this.isNeedCorrect = false;
    this.numberOfHit = 1;
  }
  update() {
    // Обновление позиции мяча
    if (!this.isDragging) {
      this.x += this.speedX;
      this.y += this.speedY;

      // Трение для постепенной остановки
      this.speedX *= 0.96;
      this.speedY *= 0.96;
      if (Math.abs(this.speedX) <= 0.5) this.speedX = 0;
      if (Math.abs(this.speedY) <= 0.5) this.speedY = 0;
    }
  }

  // Проверка касания мяча с небольшим запасом, чтобы толстым пальцем тоже попасть
  isClicked(mouseX, mouseY) {
    const dist = Math.hypot(mouseX - this.x, mouseY - this.y);
    return dist < this.radius * 2;
  }

  // Начать перетаскивание
  startDragging() {
    if (!this.speedX && !this.speedY) {
      this.isDragging = true;
      this.speedX = 0;
      this.speedY = 0;
    }
  }

  // Рассчет смещение при перетаскивании
  calculateDragOffset(mouseX, mouseY) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;

    return { dx, dy };
  }

  // Корректировка скорости до максимальной с сохранением угла направления
  calculateCorrectedSpeed() {
    if (
      Math.abs(this.speedX) > Math.abs(this.speedY) &&
      Math.abs(this.speedX) > MAX_BALL_SPEED
    ) {
      this.speedY = (MAX_BALL_SPEED * this.speedY) / Math.abs(this.speedX);
      this.speedX = this.speedX > 0 ? MAX_BALL_SPEED : -MAX_BALL_SPEED;
    } else if (
      Math.abs(this.speedX) < Math.abs(this.speedY) &&
      Math.abs(this.speedY) > MAX_BALL_SPEED
    ) {
      this.speedX = (MAX_BALL_SPEED * this.speedX) / Math.abs(this.speedY);
      this.speedY = this.speedY > 0 ? MAX_BALL_SPEED : -MAX_BALL_SPEED;
    }
  }
  // Закончить перетаскивание, установить скорость
  stopDragging(mouseX, mouseY) {
    // Вызов метода для отслеживания текущего удара
    window.eventTracker.turn(this.numberOfHit);
    this.numberOfHit++;
    this.isNeedCorrect = true;
    this.isDragging = false;
    const dx = this.calculateDragOffset(mouseX, mouseY).dx;
    const dy = this.calculateDragOffset(mouseX, mouseY).dy;

    // Устанавливаем скорость мяча
    this.speedX = dx * 0.4;
    this.speedY = dy * 0.4;
    // Ограничение максимальной скорости
    this.calculateCorrectedSpeed();
  }
  // Метод для проверки столкновения с прямоугольными стенками
  checkCollisionWithRect(rect) {
    // Столкновение
    if (
      this.y - this.radius + this.speedY <= rect.y + rect.height &&
      this.y + this.radius + this.speedY >= rect.y &&
      this.x + this.radius + this.speedX > rect.x &&
      this.x - this.radius + this.speedX < rect.x + rect.width
    ) {
      // Проверка на попадания в угол прямоугольника
      if (
        (this.x - this.radius < rect.x + rect.width &&
          this.x - this.radius > rect.x &&
          this.y - this.radius < rect.y + rect.height &&
          this.y - this.radius > rect.y) ||
        (this.x - this.radius < rect.x + rect.width &&
          this.x - this.radius > rect.x &&
          this.y + this.radius > rect.y &&
          this.y + this.radius < rect.y + rect.height) ||
        (this.x + this.radius > rect.x &&
          this.x + this.radius < rect.x + rect.width &&
          this.y + this.radius > rect.y &&
          this.y + this.radius < rect.y + rect.height) ||
        (this.x + this.radius > rect.x &&
          this.x + this.radius < rect.x + rect.width &&
          this.y - this.radius < rect.y + rect.height &&
          this.y - this.radius > rect.y)
      ) {
        this.speedY *= -0.99;
        this.speedX *= -0.99;
      } else if (
        (this.y - this.radius + this.speedY < rect.y + rect.height &&
          this.y + this.speedY > rect.y + rect.height) ||
        (this.y + this.radius + this.speedY > rect.y &&
          this.y + this.speedY < rect.y)
      ) {
        // Столкновение  по вертикали
        this.speedY *= -0.99; // Меняем направление по оси Y
      } else {
        // Столкновение по горизонтали
        this.speedX *= -0.99; // Меняем направление по оси X
      }

      this.isNeedCorrect = !this.isNeedCorrect;
    }
  }
  // Проверка столкновения с кругом
  checkCollisionWithCircle(circle) {
    const dx = this.x - circle.x;
    const dy = this.y - circle.y;
    const distance = Math.hypot(dx, dy); // Расстояние между мячом и кругом

    // Если произошло столкновение (расстояние меньше суммы радиусов)
    if (distance <= this.radius + circle.radius) {
      // Нормализуем вектор столкновения
      const nx = dx / distance;
      const ny = dy / distance;

      // Расчет скалярного произведения вектора скорости на нормаль
      const dotProduct = this.speedX * nx + this.speedY * ny;

      // Отражаем вектор скорости относительно нормали
      this.speedX = this.speedX - 2 * dotProduct * nx;
      this.speedY = this.speedY - 2 * dotProduct * ny;

      // Коррекция положения, чтобы избежать залипания
      const overlap = this.radius + circle.radius - distance;
      this.x += (nx * overlap) / 2;
      this.y += (ny * overlap) / 2;
    }
  }
  // Проверка столкновения с лункой
  checkCollisionWithHole(hole) {
    const dx = hole.x - this.x;
    const dy = hole.y - this.y;
    const distance = Math.hypot(dx, dy); // расстояние между мячом и лункой
    const ballSpeed = Math.hypot(this.speedX, this.speedY); // текущая скорость мяча

    // Если сделано достаточно ударов, то запускаем автонаведение на лунку
    if (this.isNeedCorrect && this.numberOfHit > MAX_TURN_TO_AUTOWIN) {
      const speedFactor = 0.05; // регулирует скорость полета в лунку

      // Перенаправляем мяч на лунку
      this.speedX = dx * speedFactor;
      this.speedY = dy * speedFactor;

      // Ограничение максимальной скорости
      this.calculateCorrectedSpeed();
    }

    // Проверка: мяч достаточно близко к лунке и движется медленно
    if (distance <= hole.radius * 1.2 && ballSpeed < 12) {
      // Плавное уменьшение скорости
      this.speedX *= 0.8;
      this.speedY *= 0.8;

      // Если мяч почти стоит, "притягиваем" его к центру лунки
      if (ballSpeed < 1) {
        this.x += dx * 0.2;
        this.y += dy * 0.2;
        this.radius *= 0.98;
        // Если мяч практически в центре лунки, останавливаем его
        if (distance < 1) {
          this.speedX = 0;
          this.speedY = 0;
          this.x = hole.x;
          this.y = hole.y;
          // Проверка на окончание игры
          if (!gameOver) {
            window.eventTracker.ongameover();
            window.eventTracker.print();
            gameOver = true;
          }
        }
      }
    }
  }
  // Рисунок стрелки напраления удара
  drawArrow(mouseX, mouseY) {
    const dx = this.calculateDragOffset(mouseX, mouseY).dx;
    const dy = this.calculateDragOffset(mouseX, mouseY).dy;
    const distance = Math.hypot(dx, dy); // Рассчитываем расстояние (сила)
    let arrowImage;

    // В зависимости от расстояния выбираем подходящую стрелку
    if (distance < 10) {
      arrowImage = arrowImages.short;
    } else if (distance < 20) {
      arrowImage = arrowImages.medium;
    } else if (distance < 30) {
      arrowImage = arrowImages.long;
    } else {
      arrowImage = arrowImages.veryLong;
    }

    // Определяем угол направления
    const angle = Math.atan2(dy, dx) + Math.PI / 2;

    // Сохраняем текущий контекст перед вращением
    ctx.save();
    // Перемещаем контекст к мячу и поворачиваем
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    let imageHeight = 2 * distance < 80 ? 2 * distance : 80;
    // Рисуем стрелку, исходящую из мяча
    ctx.drawImage(
      arrowImage,
      -15,
      -imageHeight - 2 * this.radius,
      30,
      imageHeight,
    );

    // Восстанавливаем контекст
    ctx.restore();
  }
  drawClub(mouseX, mouseY) {
    const dx = this.calculateDragOffset(mouseX, mouseY).dx;
    const dy = this.calculateDragOffset(mouseX, mouseY).dy;
    const distance = Math.hypot(dx, dy); // Рассчитываем расстояние (сила)

    // Определяем угол направления
    const angle = Math.atan2(dy, dx) + Math.PI / 2;

    // Сохраняем текущий контекст перед вращением
    ctx.save();
    // Перемещаем контекст к мячу и поворачиваем
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    const distanceToBall =
      distance * 0.5 - 150 < -120 ? distance * 0.5 - 150 : -120;

    // Рисуем клюшку
    ctx.drawImage(clubImage, 0, distanceToBall - this.radius, 60, 200);

    // Восстанавливаем контекст
    ctx.restore();
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2,
    );
  }
}
// Класс для кругов
class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath(); // Начинаем новый путь для рисования
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Рисуем полный круг (2π радиан)
    ctx.stroke(); // Заполняем круг цветом
    ctx.closePath(); // Заканчиваем путь
  }
}
// Класс для промоугольников, для расчета столкновений
class Rectangle {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
  draw() {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}

class Hole {
  constructor(x, y, image) {
    this.radius = (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 45;
    this.x = x - this.radius;
    this.y = y;
    this.image = image;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.x - 2.5 * this.radius,
      this.y - 5.4 * this.radius + this.radius,
      this.radius * 5,
      this.radius * 5.4,
    );
  }
}

// создание лунки
const hole = new Hole(
  (CANVAS_WIDTH / 4) * 3,
  2 * BARRIER_WIDTH + VERTICAL_OVERLAP / 2,
  holeImage,
);

// создание мяча
const ball = new Ball(ballImage);

// Массив кругов и прямоугольников для расчета столкновений

const environment = [
  new Circle(
    CANVAS_WIDTH / 2 - BARRIER_WIDTH * 2,
    (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 -
      BARRIER_WIDTH * 2 +
      VERTICAL_OVERLAP / 2,
    BARRIER_WIDTH * 2,
  ),
  new Circle(
    CANVAS_WIDTH / 2 + BARRIER_WIDTH * 1.5,
    ((CANVAS_HEIGHT - VERTICAL_OVERLAP) * 2) / 3 +
      BARRIER_WIDTH * 1.5 +
      VERTICAL_OVERLAP / 2,
    BARRIER_WIDTH * 1.5,
  ),
  new Rectangle(
    0,
    CANVAS_HEIGHT - VERTICAL_OVERLAP - BARRIER_WIDTH + VERTICAL_OVERLAP / 2,
    CANVAS_WIDTH / 2,
    BARRIER_WIDTH,
  ),
  new Rectangle(
    CANVAS_WIDTH / 2,
    ((CANVAS_HEIGHT - VERTICAL_OVERLAP) * 2) / 3 +
      BARRIER_WIDTH * 1.5 +
      VERTICAL_OVERLAP / 2,
    CANVAS_WIDTH / 2,
    (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 3,
  ),
  new Rectangle(
    CANVAS_WIDTH / 2 + BARRIER_WIDTH * 1.5,
    ((CANVAS_HEIGHT - VERTICAL_OVERLAP) * 2) / 3 + VERTICAL_OVERLAP / 2,
    CANVAS_WIDTH / 2,
    (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 3,
  ),
  new Rectangle(
    0,
    (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 -
      BARRIER_WIDTH +
      VERTICAL_OVERLAP / 2,
    BARRIER_WIDTH,
    (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 + BARRIER_WIDTH,
  ),
  new Rectangle(
    CANVAS_WIDTH - BARRIER_WIDTH,
    VERTICAL_OVERLAP / 2,
    BARRIER_WIDTH,
    ((CANVAS_HEIGHT - VERTICAL_OVERLAP) / 3) * 2,
  ),
  new Rectangle(
    CANVAS_WIDTH / 2 - BARRIER_WIDTH / 2,
    +VERTICAL_OVERLAP / 2,
    CANVAS_WIDTH / 2,
    BARRIER_WIDTH,
  ),
  new Rectangle(
    0,
    VERTICAL_OVERLAP / 2,
    CANVAS_WIDTH / 2,
    (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 - BARRIER_WIDTH * 2,
  ),
  new Rectangle(
    0,
    (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 -
      BARRIER_WIDTH * 2 +
      VERTICAL_OVERLAP / 2,
    CANVAS_WIDTH / 2 - BARRIER_WIDTH * 2,
    BARRIER_WIDTH * 2,
  ),

  new Rectangle(
    CANVAS_WIDTH / 2 - BARRIER_WIDTH / 4,
    (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 +
      BARRIER_WIDTH / 2 +
      VERTICAL_OVERLAP / 2,
    BARRIER_WIDTH * 2 - BARRIER_WIDTH / 2,
    BARRIER_WIDTH / 2,
  ),
];
// Отслеживание положения мыши (тача)
let mouseX = 0;
let mouseY = 0;

// Подписка на тачи
canvas.addEventListener("touchstart", (event) => {
  mouseX = event.touches[0].clientX;
  mouseY = event.touches[0].clientY;
  if (ball.isClicked(mouseX, mouseY) && !gameOver) {
    event.preventDefault();
    ball.startDragging();
  }
});

canvas.addEventListener("touchend", (event) => {
  if (ball.isDragging && !gameOver) {
    const lastTouch = event.changedTouches[0]; // Последний контакт
    mouseX = lastTouch.clientX;
    mouseY = lastTouch.clientY;
    ball.stopDragging(mouseX, mouseY);
  }
});
canvas.addEventListener("touchmove", (event) => {
  if (ball.isDragging && !gameOver) {
    event.preventDefault();
    const lastTouch = event.changedTouches[0]; // Последний контакт
    mouseX = lastTouch.clientX;
    mouseY = lastTouch.clientY;
    ball.drawArrow(mouseX, mouseY);
  }
});

// Функция для анимации
function animate() {
  if (!gameOver) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // расчет колизий с круглыми углами
    environment.forEach((element, index) => {
      if (
        ball.numberOfHit > MAX_TURN_TO_AUTOWIN &&
        index === environment.length - 1
      )
        return;
      if (element.constructor === Circle)
        ball.checkCollisionWithCircle(element);
      else ball.checkCollisionWithRect(element);
    });

    //отрисовка игрового поля
    ctx.drawImage(
      boardImage,
      BARRIER_WIDTH,
      VERTICAL_OVERLAP / 2 + BARRIER_WIDTH,
      CANVAS_WIDTH - 2 * BARRIER_WIDTH,
      CANVAS_HEIGHT - VERTICAL_OVERLAP - 2 * BARRIER_WIDTH,
    );
    // отрисовка лунки, мяча
    hole.draw();
    ball.update();
    ball.draw();
    // расчет колизии мяча с лункой
    ball.checkCollisionWithHole(hole);
    // отрисовка забора
    ctx.drawImage(
      fenceImage,
      CANVAS_WIDTH / 2 - BARRIER_WIDTH / 2,
      (CANVAS_HEIGHT - VERTICAL_OVERLAP) / 2 + VERTICAL_OVERLAP / 2,
      BARRIER_WIDTH * 2,
      BARRIER_WIDTH,
    );
    if (ball.isDragging) {
      // Рисуем стрелку, когда мяч перетаскивается
      ball.drawArrow(mouseX, mouseY);
      ball.drawClub(mouseX, mouseY);
    }
  }
}
animate();
