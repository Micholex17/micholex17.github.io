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
    Medium: 1.35,
    Hard: 1.65,
    Extreme: 1.87,
    sans: 2.5
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
        case DifficultyLevels.Extreme:
            return "Extreme"
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
        case "difficulty.level.extreme":
            g_difficulty = DifficultyLevels.Extreme
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
        
        let timeBetweenBullets = Math.floor(-500 + (1150 / g_difficulty))
        console.log(timeBetweenBullets)
        clearInterval(Game_FireRandomBullet)
        setInterval(Game_FireRandomBullet, timeBetweenBullets)

        music_play()
    }
    else
    {
        console.log("Difficulty not chosen!")
    }
}

function GameOver()
{
    music_stop()
    g_gameActive = false
    ___game.style.display = "none"
    ___lose.style.display = "block"
    loseDifficultyDisplay.innerHTML = `Difficulty: ${GetDifficultyString(g_difficulty)}`
    loseTimeDisplay.innerHTML = `You got ${time} points`
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
    StayToAvoid: "bullet.type.sans",
    MoveToAvoid: "bullet.type.notsans",
    Healing: "bullet.type.heal"
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
        this.color = ""

        switch(type)
        {
            case BulletType.Normal:
            case BulletType.StayToAvoid:
            case BulletType.MoveToAvoid:
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
            case BulletType.Healing:
                this.speed = 2
                this.damage = -10
                break
        }

        switch (this.type)
        {
            case BulletType.Normal:
                this.color = "white"
                break
            case BulletType.Fast:
                this.color = "yellow"
                break
            case BulletType.StayToAvoid:
                this.color = "blue"
                break
            case BulletType.MoveToAvoid:
                this.color = "orange"
                break
            case BulletType.Healing:
                this.color = "lime"
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
        this.bulletId = c_generateRandomString(25)
        const bullet = {
            id: this.bulletId,
            direction: this.direction,
            x: this.x,
            y: this.y,
            speed: this.speed,
            damage: this.damage,
            size: 15 * g_difficulty,
            type: this.type,
            color: this.color,
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

const maxPlayerHP = 100
let playerHP = maxPlayerHP

let goLeft = false
let goUp = false
let goRight = false
let goDown = false

let isMoving = false

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
        // Get player's hitbox
        let playerHitbox = getPlayerHitbox()
        for (let [key, value] of Bullets) {
            let bulletHitbox = value.GetHitbox()

            // Calculate distance between bullet's hitboxes and player's
            let d = Math.sqrt( ( (playerHitbox.x - bulletHitbox.x) * (playerHitbox.x - bulletHitbox.x) ) + ( (playerHitbox.y - bulletHitbox.y) * (playerHitbox.y - bulletHitbox.y) ) )

            if (d < (value.size * 0.75))
            {
                if (value.type == BulletType.StayToAvoid)
                {
                    if (isMoving)
                    {
                        playerHP -= Math.floor(value.damage * g_difficulty)
                        doHitCooldown()
                    }
                }
                else if (value.type == BulletType.MoveToAvoid)
                {
                    if (!isMoving)
                    {
                        playerHP -= Math.floor(value.damage * g_difficulty)
                        doHitCooldown()
                    }
                }
                else
                {
                    playerHP -= Math.floor(value.damage * g_difficulty)
                    if (value.type != BulletType.Healing)
                    {
                        doHitCooldown()
                    }
                }

                // Immediately destroy bullet if its healing type
                if (value.type == BulletType.Healing)
                {
                    DestroyBullet(value.id)
                }

                // If player's HP falls to 0 or below, end game
                if (playerHP <= 0)
                {
                    GameOver()
                }
                else if (playerHP > maxPlayerHP)
                {
                    playerHP = maxPlayerHP
                }
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

        if (!goLeft && !goRight && !goUp && !goDown)
        {
            isMoving = false
        }
        else
        {
            isMoving = true
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
        timeDisplay.innerHTML = `Points: ${time}`
    }
}
setInterval(__Update__, 33.33)

// Code ---

const normalBullet = new Bullet()
const fastBullet = new Bullet(BulletType.Fast)
const stayToAvoidBullet = new Bullet(BulletType.StayToAvoid)
const moveToAvoidBullet = new Bullet(BulletType.MoveToAvoid)
const healingBullet = new Bullet(BulletType.Healing)

function Game_FireRandomBullet()
{
    if (g_gameActive && !debug_DMODE)
    {
        let rand = Math.floor(Math.random() * 100) + 1
        if (rand <= 50)
        {
            normalBullet.PickDirection()
            normalBullet.PickPosition()
            normalBullet.Fire()
        }
        else if (rand > 50 && rand <= 71)
        {
            fastBullet.PickDirection()
            fastBullet.PickPosition()
            fastBullet.Fire()
        }
        else if (rand > 71 && rand <= 85)
        {
            stayToAvoidBullet.PickDirection()
            stayToAvoidBullet.PickPosition()
            stayToAvoidBullet.Fire()
        }
        else if (rand > 85 && rand <= 99)
        {
            moveToAvoidBullet.PickDirection()
            moveToAvoidBullet.PickPosition()
            moveToAvoidBullet.Fire()
        }
        else if (rand > 99 && rand <= 100)
        {
            healingBullet.PickDirection()
            healingBullet.PickPosition()
            healingBullet.Fire()
        }
    }
}

// Debug ---

let debug_DMODE = false

function Debug_StartGame()
{
    debug_DMODE = true
    StartGame()
}

const debug_normalBullet = new Bullet()
const debug_fastBullet = new Bullet(BulletType.Fast)
const debug_sansBullet = new Bullet(BulletType.StayToAvoid)
const debug_notsansBullet = new Bullet(BulletType.MoveToAvoid)
const debug_healingBullet = new Bullet(BulletType.Healing)

document.addEventListener("keydown", (e)=>{
    if (g_gameActive)
    {
        if (debug_DMODE)
        {
            if (e.key == "1")
            {
                debug_normalBullet.PickDirection()
                debug_normalBullet.PickPosition()
                debug_normalBullet.Fire()
            }
            else if (e.key == "2")
            {
                debug_fastBullet.PickDirection()
                debug_fastBullet.PickPosition()
                debug_fastBullet.Fire()
            }
            else if (e.key == "3")
            {
                debug_sansBullet.PickDirection()
                debug_sansBullet.PickPosition()
                debug_sansBullet.Fire()
            }
            else if (e.key == "4")
            {
                debug_notsansBullet.PickDirection()
                debug_notsansBullet.PickPosition()
                debug_notsansBullet.Fire()
            }
            else if (e.key == "5")
            {
                debug_healingBullet.PickDirection()
                debug_healingBullet.PickPosition()
                debug_healingBullet.Fire()
            }
        }
    }
    else
    {
        if (e.key == "Home")
        {
            Debug_StartGame()
        }
    }
})

// Music

const megalovania = document.getElementById("megalovania")

function music_play()
{
    megalovania.volume = 0.5
    megalovania.play()
}
function music_stop()
{
    megalovania.pause()
    megalovania.currentTime = 0
}