import fs from "fs";

fs.readFile('./11/input.txt', 'utf8', (err, data) => {
    const monkeys = []
    let currentMonkey
    data
        .split(/\n/)
        .forEach((line) => {
            const firstWord = line.trimStart().split(" ")[0]
            switch (firstWord) {
                case 'Monkey':
                    currentMonkey = line.match(/\d+/g)[0]
                    monkeys[currentMonkey] = {}
                    break;
                case 'Starting':
                    const items = line.match(/\d+/g).map((item) => parseInt(item))
                    monkeys[currentMonkey].currentItems = items
                    monkeys[currentMonkey].count = 0
                    break;
                case 'Operation:':
                    let [_, operationSign, operationCoef] = line.match(/([+*])\s(.*)?/)
                    if (!isNaN(operationCoef)) {
                        operationCoef = parseInt(operationCoef)
                    }
                    monkeys[currentMonkey].operationSign = operationSign
                    monkeys[currentMonkey].operationCoef = operationCoef
                    break;
                case 'Test:':
                    const divisible = parseInt(line.match(/\d+/g)[0])
                    monkeys[currentMonkey].test = divisible
                    break;
                case 'If':
                    const monkey = parseInt(line.match(/\d+/g)[0])
                    if (line.includes("true")) {
                        monkeys[currentMonkey].trueDirection = monkey
                    } else {
                        monkeys[currentMonkey].falseDirection = monkey
                    }
                    break;
            }
        })
    let lcm = monkeys.map((monkey) => monkey.test).reduce(findLCM)
    for (let round = 1; round <= 10000; round++) {
        monkeys.forEach((monkey) => {
            const itemsCount = monkey.currentItems.length
            for (let i = 0; i < itemsCount; i++) {
                monkey.count += 1
                let item = monkey.currentItems.shift()
                const coef = typeof monkey.operationCoef === 'number' ? monkey.operationCoef : item
                switch (monkey.operationSign) {
                    case '+':
                        item += coef
                        break;
                    case '*':
                        item *= coef
                        break;
                }
                // first star
                // item = Math.floor(item / 3)
                // second star
                item = item % lcm
                if (item % monkey.test === 0) {
                    monkeys[monkey.trueDirection].currentItems.push(item)
                } else {
                    monkeys[monkey.falseDirection].currentItems.push(item)
                }
            }
        })

    }
    const topMonkeysCount = monkeys
        .sort((monkeyA, monkeyB) => monkeyB.count - monkeyA.count)
        .slice(0,2)
        .map((monkey) => monkey.count)
    console.log(topMonkeysCount[0] * topMonkeysCount[1])
})

const findGCD = (a, b) => a ? findGCD(b % a, a) : b
const findLCM = (a, b) => a * b / findGCD(a, b);
