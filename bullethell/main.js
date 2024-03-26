// Core variables ---

const img_heart = new Image()
img_heart.src = '.\\assets\\heart.png'

const img_heart_hurt = new Image()
img_heart_hurt.src = ".\\assets\\heaurt.png"

const ___menu = document.querySelector(".menu")
const ___game = document.querySelector(".game")
const ___lose = document.querySelector(".lose")

const bullet_board = document.getElementById("bullet_board")
let ctx = bullet_board.getContext("2d")

const DifficultyLevels = {
    Peaceful: 0.75,
    Easy: 1,
    Medium: 1.25,
    Hard: 1.50
}

const chosenDifficultyDisplay = document.getElementById("chosenDifficulty")
const difficultyInGameDisplay = document.getElementById("difficultyInGame")
const loseDifficultyDisplay = document.getElementById("loseDifficulty")

let g_difficulty = null

const hpDisplay = document.getElementById("hpDisplay")

const timeDisplay = document.getElementById("timeDisplay")
const loseTimeDisplay = document.getElementById("loseTime")
let time = 0

let g_gameActive = false

// Core Functions ---

function c_generateRandomString(length)
{
    const charset = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
    let result = ""
    for (let i = 0; i < length; i++)
    {
        let random = Math.floor(Math.random() * charset.length)
        result += charset[random]
    }
    return result
}

function GetDifficultyString(arg)
{
    switch(arg)
    {
        case DifficultyLevels.Peaceful:
            return "Peaceful"
        case DifficultyLevels.Easy:
            return "Easy"
        case DifficultyLevels.Medium:
            return "Medium"
        case DifficultyLevels.Hard:
            return "Hard"
    }
}

function ChooseDifficulty(arg)
{
    switch(arg)
    {
        case "difficulty.level.peaceful":
            g_difficulty = DifficultyLevels.Peaceful
            break
        case "difficulty.level.easy":
            g_difficulty = DifficultyLevels.Easy
            break
        case "difficulty.level.medium":
            g_difficulty = DifficultyLevels.Medium
            break
        case "difficulty.level.hard":
            g_difficulty = DifficultyLevels.Hard
            break
    }

    chosenDifficultyDisplay.innerHTML = `Chosen: ${GetDifficultyString(g_difficulty)}`
}

function StartGame()
{
    if (g_difficulty != null)
    {
        ___menu.style.display = "none"
        ___game.style.display = "block"
        difficultyInGameDisplay.innerHTML = `Difficulty: ${GetDifficultyString(g_difficulty)}`
        time = 0
        playerHP = 100
        clear_board()
        Bullets.clear()
        g_gameActive = true
    }
    else
    {
        console.log("Difficulty not chosen!")
    }
}

function GameOver()
{
    g_gameActive = false
    ___game.style.display = "none"
    ___lose.style.display = "block"
    loseDifficultyDisplay.innerHTML = `Difficulty: ${GetDifficultyString(g_difficulty)}`
    loseTimeDisplay.innerHTML = `You survived ${time}`
}

function GoToMenu()
{
    ___lose.style.display = "none"
    ___menu.style.display = "block"
}

// Bullets ---

const BulletType = {
    Normal: "bullet.type.normal",
    Fast: "bullet.type.fast",
    Strong: "bullet.type.strong"
}

const BulletDirection = {
    LeftToRight: "bullet.direction.ltr",
    RightToLeft: "bullet.direction.rtl",
    TopToBottom: "bullet.direction.ttb",
    BottomToTop: "bullet.direction.btt"
}

let Bullets = new Map()

class Bullet {

    constructor(type=BulletType.Normal)
    {
        this.bulletId = ""
        this.type = type
        this.direction = BulletDirection.LeftToRight
        this.x = 0
        this.y = 0
        this.speed = 1
        this.damage = 1

        switch(type)
        {
            case BulletType.Normal:
                this.speed = 5
                this.damage = 5
                break
            case BulletType.Fast:
                this.speed = 7
                this.damage = 3
                break
            case BulletType.Strong:
                this.speed = 3
                this.damage = 7
                break
        }
    }

    PickDirection()
    {
        let rand = Math.floor(Math.random() * 4) + 1
        switch(rand)
        {
            case 1:
                this.direction = BulletDirection.LeftToRight
                break
            case 2:
                this.direction = BulletDirection.RightToLeft
                break
            case 3:
                this.direction = BulletDirection.TopToBottom
                break
            case 4:
                this.direction = BulletDirection.BottomToTop
                break
        }
    }

    PickPosition()
    {
        switch (this.direction)
        {
            case BulletDirection.LeftToRight:
                this.x = 0 - 15
                this.y = Math.floor(Math.random() * bullet_board.height)
                break
            case BulletDirection.RightToLeft:
                this.x = bullet_board.width
                this.y = Math.floor(Math.random() * bullet_board.height)
                break
            case BulletDirection.TopToBottom:
                this.x = Math.floor(Math.random() * bullet_board.width)
                this.y = 0 - 15
                break
            case BulletDirection.BottomToTop:
                this.x = Math.floor(Math.random() * bullet_board.width)
                this.y = bullet_board.height
                break
        }
    }

    Fire()
    {
        let clr = ""

        switch (this.type)
        {
            case BulletType.Normal:
                clr = "white"
                break
            case BulletType.Fast:
                clr = "yellow"
                break
            case BulletType.Strong:
                clr = "blue"
                break
        }

        this.bulletId = c_generateRandomString(25)
        const bullet = {
            id: this.bulletId,
            direction: this.direction,
            x: this.x,
            y: this.y,
            speed: this.speed,
            damage: this.damage,
            size: 20 * g_difficulty,
            color: clr,
            GetHitbox: function()
            {
                let bulletHitbox = {
                    x: this.x + (this.size / 2),
                    y: this.y + (this.size / 2)
                }
                return bulletHitbox
            }
        }
        Bullets.set(this.bulletId, bullet)
    }
}

function DestroyBullet(id)
{
    Bullets.delete(id)
}


// Player ---

const PlayerCharacter = {
    texture: img_heart,
    x: (bullet_board.width / 2),
    y: (bullet_board.height / 2),
    size: 25,
    color: "red",
    speed: 7
}

let playerHP = 100

let goLeft = false
let goUp = false
let goRight = false
let goDown = false

let hitCooldown = false

function getPlayerHitbox()
{
    let playerHitbox = {
        x: PlayerCharacter.x + (PlayerCharacter.size / 2),
        y: PlayerCharacter.y + (PlayerCharacter.size / 2)
    }
    return playerHitbox
}

function detectCollision()
{
    if (!hitCooldown)
    {
        let playerHitbox = getPlayerHitbox()
        for (let [key, value] of Bullets) {
            let bulletHitbox = value.GetHitbox()

            let d = Math.sqrt( ( (playerHitbox.x - bulletHitbox.x) * (playerHitbox.x - bulletHitbox.x) ) + ( (playerHitbox.y - bulletHitbox.y) * (playerHitbox.y - bulletHitbox.y) ) )

            if (d < (value.size * 0.75))
            {
                playerHP -= Math.floor(value.damage * g_difficulty)
                if (playerHP <= 0)
                {
                    GameOver()
                }
                doHitCooldown()
            }
        }
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms))
async function doHitCooldown()
{
    hitCooldown = true
    //PlayerCharacter.color = "darkred"
    PlayerCharacter.texture = img_heart_hurt
    await delay(2000)
    hitCooldown = false
    //PlayerCharacter.color = "red"
    PlayerCharacter.texture = img_heart
}

function _getKeyDown(e)
{
    switch (e.key)
    {
        case "ArrowLeft":
            goLeft = true
            break
        case "ArrowUp":
            goUp = true
            break
        case "ArrowRight":
            goRight = true
            break
        case "ArrowDown":
            goDown = true
            break
    }
}
function _getKeyUp(e)
{
    switch (e.key)
    {
        case "ArrowLeft":
            goLeft = false
            break
        case "ArrowUp":
            goUp = false
            break
        case "ArrowRight":
            goRight = false
            break
        case "ArrowDown":
            goDown = false
            break
    }
}
document.addEventListener("keydown", _getKeyDown)
document.addEventListener("keyup", _getKeyUp)

// Renderer ---

function render_Player()
{
    //ctx.fillStyle = PlayerCharacter.color
    //ctx.fillRect(PlayerCharacter.x, PlayerCharacter.y, PlayerCharacter.size, PlayerCharacter.size)

    ctx.drawImage(PlayerCharacter.texture, PlayerCharacter.x, PlayerCharacter.y, PlayerCharacter.size, PlayerCharacter.size)
}

function render_Bullets()
{
    for (let [key, value] of Bullets)
    {
        ctx.fillStyle = value.color
        ctx.fillRect(value.x, value.y, value.size, value.size)
    }
}

function clear_board()
{
    ctx.clearRect(0, 0, bullet_board.width, bullet_board.height)
}

// Main Code ---

function __Update__()
{
    if (g_gameActive)
    {
        if (goLeft)
        {
            if (PlayerCharacter.x > 0)
            {
                PlayerCharacter.x -= 1 * PlayerCharacter.speed
            }
            if (PlayerCharacter.x <= 0)
            {
                PlayerCharacter.x = 0
            }
        }
        else if (goRight)
        {
            if (PlayerCharacter.x < bullet_board.width - 25)
            {
                PlayerCharacter.x += 1 * PlayerCharacter.speed
            }
            if (PlayerCharacter.x >= bullet_board.width - 25)
            {
                PlayerCharacter.x = bullet_board.width - 25
            }
        }

        if (goUp)
        {
            if (PlayerCharacter.y > 0)
            {
                PlayerCharacter.y -= 1 * PlayerCharacter.speed
            }
            if (PlayerCharacter.y <= 0)
            {
                PlayerCharacter.y = 0
            }
        }
        else if (goDown)
        {
            if (PlayerCharacter.y < bullet_board.height - 25)
            {
                PlayerCharacter.y += 1 * PlayerCharacter.speed
            }
            if (PlayerCharacter.y >= bullet_board.height - 25)
            {
                PlayerCharacter.y = bullet_board.height - 25
            }
        }

        for (let [key, value] of Bullets)
        {
            switch(value.direction)
            {
                case BulletDirection.LeftToRight:
                    value.x += (1 * value.speed) * g_difficulty
                    if (value.x > bullet_board.width)
                    {
                        DestroyBullet(value.id)
                    }
                    break
                case BulletDirection.RightToLeft:
                    value.x -= (1 * value.speed) * g_difficulty
                    if (value.x < 0)
                    {
                        DestroyBullet(value.id)
                    }
                    break
                case BulletDirection.TopToBottom:
                    value.y += (1 * value.speed) * g_difficulty
                    if (value.y > bullet_board.height)
                    {
                        DestroyBullet(value.id)
                    }
                    break
                case BulletDirection.BottomToTop:
                    value.y -= (1 * value.speed) * g_difficulty
                    if (value.y < 0)
                    {
                        DestroyBullet(value.id)
                    }
                    break
            }
        }

        clear_board()
        render_Player()
        render_Bullets()
        detectCollision()

        time += 1

        hpDisplay.innerHTML = `HP ${playerHP}`
        timeDisplay.innerHTML = `Time survived: ${time}`
    }
}
setInterval(__Update__, 33.33)

// Code ---

const normalBullet = new Bullet()
const fastBullet = new Bullet(BulletType.Fast)
const strongBullet = new Bullet(BulletType.Strong)

function Game_FireRandomBullet()
{
    if (g_gameActive)
    {
        let rand = Math.floor(Math.random() * 100) + 1
        if (rand <= 50)
        {
            normalBullet.PickDirection()
            normalBullet.PickPosition()
            normalBullet.Fire()
        }
        else if (rand > 50 && rand <= 90)
        {
            fastBullet.PickDirection()
            fastBullet.PickPosition()
            fastBullet.Fire()
        }
        else if (rand > 90)
        {
            strongBullet.PickDirection()
            strongBullet.PickPosition()
            strongBullet.Fire()
        }
    }
}
setInterval(Game_FireRandomBullet, 150)

// Debug ---

const debug_testBullet = new Bullet()
const debug_testBullet2 = new Bullet(BulletType.Fast)
const debug_testBullet3 = new Bullet(BulletType.Strong)

document.addEventListener("keydown", (e)=>{
    if (e.key == "1")
    {
        debug_testBullet.PickDirection()
        debug_testBullet.PickPosition()
        debug_testBullet.Fire()
    }
    else if (e.key == "2")
    {
        debug_testBullet2.PickDirection()
        debug_testBullet2.PickPosition()
        debug_testBullet2.Fire()
    }
    else if (e.key == "3")
    {
        debug_testBullet3.PickDirection()
        debug_testBullet3.PickPosition()
        debug_testBullet3.Fire()
    }
})