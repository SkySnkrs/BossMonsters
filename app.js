let gold = 0

const turtles = [
    {
        name: 'Raphael',
        lvl: 1,
        hp: 100,
        damage: 5
    },
    {
        name: 'Donatello',
        lvl: 1,
        hp: 100,
        damage: 5
    },
    {
        name: 'Leonardo',
        lvl: 1,
        hp: 100,
        damage: 5
    },
    {
        name: 'Michelangelo',
        lvl: 1,
        hp: 100,
        damage: 5
    },
]

const bosses = [
    {
        name: 'Shredder',
        health: 100,
        damage: 10,
        rank: 1
    }
]

function damageBoss() {

    let damage = 0

    for (let i = 0; i < turtles.length; i++) {
        const turtle = turtles[i];
        if (turtle.hp > 0) {
            damage += turtle.damage
        }
    }

    return damage
}

function bossHealth() {

    let takeHealth = damageBoss()

    const boss = bosses.find((findBoss) => findBoss = 'Shredder')
    boss.health -= takeHealth

    if (boss.health <= 0) {
        gold += 100 * boss.rank
        boss.rank++
        increaseDifficulty()
        drawGoldBalance()
    }


    drawBossHealth()
    drawTurtleStats()
}

function increaseDifficulty() {
    const boss = bosses.find((findBoss) => findBoss = 'Shredder')
    boss.health = boss.rank * 100
    drawBossHealth()
}

function increaseDamage(turtleName) {
    for (let i = 0; i < turtles.length; i++) {
        const turtle = turtles[i];
        if (turtle.name == turtleName) {
            if (gold >= 100) {
                gold -= 100
                drawGoldBalance()
                turtle.lvl++
                turtle.damage += turtle.lvl * 5
                drawTurtleStats()

            }
        }

    }
}

function bossDamage() {


    for (let i = 0; i < turtles.length; i++) {
        const turtle = turtles[i];
        const boss = bosses.find((findBoss) => findBoss = 'Shredder')
        if (turtle.hp <= 0) {

            turtle.hp = 0
            drawTurtleStats()
        } else {
            increaseBossDamage()
            turtle.hp -= boss.damage
            drawTurtleStats()

        }


    }
}

function increaseBossDamage() {
    const boss = bosses.find((findBoss) => findBoss = 'Shredder')
    boss.damage = boss.rank * 4
}


//#region DRAW

const shredderHealthElem = document.getElementById('healthBar')
const shredderRankElem = document.getElementById('rank')
const raphaelStatsElem = document.getElementById('RaphaelHealth')
const donatelloStatsElem = document.getElementById('DonatelloHealth')
const goldElem = document.getElementById('goldAmount')

function drawBossHealth() {
    shredderHealthElem.innerText = bosses[0].health
    shredderRankElem.innerText = bosses[0].rank
}

function drawGoldBalance() {
    goldElem.innerText = ''
    goldElem.innerText += gold
}

function healButton(turtleName) {
    for (let i = 0; i < turtles.length; i++) {
        const turtle = turtles[i];
        if (turtle.name == turtleName) {
            if (turtle.hp < 500) {
                if (gold >= 100) {
                    gold -= 100
                    turtle.hp += 100
                    drawTurtleStats()
                    drawGoldBalance()
                } else {
                    console.log('you cannot afford this')
                }
            } else {
                console.log('you are already max health')
            }
        }
    }
}

function drawTurtleStats() {

    raphaelStatsElem.innerHTML = ''
    donatelloStatsElem.innerHTML = ''
    for (let i = 0; i < turtles.length; i++) {
        const turtle = turtles[i];
        if (turtle.name == 'Raphael') {
            raphaelStatsElem.innerHTML += `<p>Health: ${turtle.hp}</p><p>Level: ${turtle.lvl}</p>`
        }
        if (turtle.name == 'Donatello') {
            donatelloStatsElem.innerHTML += `<p>Health: ${turtle.hp}</p><p>Level: ${turtle.lvl}</p>`
        }
    }
}

drawGoldBalance()
drawTurtleStats()
//#endregion

//#region 

setInterval(bossDamage, 10000)

//#endregion