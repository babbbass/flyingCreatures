// @type {HTMLCanvasElement}
const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")

CANVAS_WIDTH = canvas.width = 500
CANVAS_HEIGHT = canvas.height = 700
const nbEnemies = 18
const enemies = []
let gameFrame = 0
let enemy = "enemy1.png"
let spriteHeight = 293
let spriteWidth = 155
const enemyImg = new Image()
class Enemy {
  constructor() {
    this.speed = null
    this.spriteWidth = spriteHeight
    this.spriteHeight = spriteWidth
    this.width = this.spriteWidth / 2.5
    this.height = this.spriteHeight / 2.5
    this.x = Math.random() * (CANVAS_WIDTH - this.width)
    this.y = Math.random() * (CANVAS_HEIGHT - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
  }

  update() {
    this.x += Math.random() * 5 - 2.5
    this.y += Math.random() * 5 - 2.5
    if ((gameFrame * this.flapSpeed) % 2 === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }

  draw() {
    //ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(
      enemyImg,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

class Enemy2 extends Enemy {
  constructor() {
    super()
    this.angle = Math.random() * 2
    this.angleSpeed = Math.random() * 0.2
    this.curve = Math.random() * 7
  }
  update() {
    this.x -= Math.random() * 4 + 1
    this.x = this.x + this.width < 0 ? CANVAS_WIDTH : this.x
    this.y += this.curve * Math.sin(this.angle)
    this.angle += this.angleSpeed
    if ((gameFrame * this.flapSpeed) % 2 === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
}

class Enemy3 extends Enemy {
  constructor() {
    super()
    this.angle = Math.random() * 2
    this.angleSpeed = Math.random() * 1.5 + 0.5
    this.curve = Math.random() * 200 + 50
  }
  update() {
    this.x =
      this.curve * Math.sin((this.angle * Math.PI) / 180) +
      (CANVAS_WIDTH / 2 - this.width / 2)
    this.x = this.x + this.width < 0 ? CANVAS_WIDTH : this.x
    this.y =
      this.curve * Math.cos((this.angle * Math.PI) / 180) +
      (CANVAS_HEIGHT / 2 - this.height / 2)
    this.angle += this.angleSpeed
    if ((gameFrame * this.flapSpeed) % 2 === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
}

class Enemy4 extends Enemy {
  constructor() {
    super()
    this.newX = Math.random() * (CANVAS_WIDTH - this.width)
    this.newY = Math.random() * (CANVAS_HEIGHT - this.height)
    this.interval = Math.floor(Math.random() * 200 + 50)
  }
  update() {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (CANVAS_WIDTH - this.width)
      this.newY = Math.random() * (CANVAS_HEIGHT - this.height)
    }
    let dx = this.x - this.newX
    let dy = this.y - this.newY

    this.x -= dx / 70
    this.y -= dy / 70

    this.x = this.x + this.width < 0 ? CANVAS_WIDTH : this.x
    if ((gameFrame * this.flapSpeed) % 2 === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
}

enemyImg.src = enemy
for (let i = 0; i < nbEnemies; i++) {
  enemies.push(new Enemy())
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  enemies.forEach((enemy) => {
    enemy.update()
    enemy.draw()
  })
  gameFrame++
  requestAnimationFrame(animate)
}

animate()

document.getElementById("enemy-2").addEventListener("click", () => {
  enemyImg.src = "enemy2.png"
  spriteHeight = 266
  spriteWidth = 188
  enemies.length = 0
  for (let i = 0; i < nbEnemies; i++) {
    enemies.push(new Enemy2())
  }
})

document.getElementById("enemy-1").addEventListener("click", () => {
  enemyImg.src = "enemy1.png"
  spriteHeight = 293
  spriteWidth = 155
  enemies.length = 0
  for (let i = 0; i < nbEnemies; i++) {
    enemies.push(new Enemy())
  }
})

document.getElementById("enemy-3").addEventListener("click", () => {
  enemyImg.src = "enemy3.png"
  spriteHeight = 218
  spriteWidth = 177
  enemies.length = 0
  for (let i = 0; i < nbEnemies; i++) {
    enemies.push(new Enemy3())
  }
})

document.getElementById("enemy-4").addEventListener("click", () => {
  enemyImg.src = "enemy4.png"
  spriteHeight = 213
  spriteWidth = 213
  enemies.length = 0
  for (let i = 0; i < nbEnemies; i++) {
    enemies.push(new Enemy4())
  }
})
