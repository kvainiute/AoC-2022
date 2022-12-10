import fs from "fs";

fs.readFile('./10/input.txt', 'utf8', (err, data) => {
    const firstStar = getFirstStar(data)
    console.log(firstStar)
    getSecondStar(data)
})

const getFirstStar = (data) => {
    let cycle = 0
    let value = 1
    const cycles = [20, 60, 100, 140, 180, 220]
    let result = 0

    const updateCycleResult = () => {
        if (cycles.includes(cycle)) {
            result += value * cycle
        }
    }
    data
        .split(/\n/)
        .forEach((operation) => {
            switch (operation) {
                case 'noop':
                    cycle += 1
                    updateCycleResult()
                    break;
                default:
                    for (let i = 1; i <= 2; i++) {
                        cycle += 1
                        updateCycleResult()
                    }
                    value += parseInt(operation.replace('addx ', ''))

            }

        })
    return result
}

const getSecondStar = (data) => {
    let cycle = 0
    let X = 1
    const screen = Array(6)
        .fill(null)
        .map(() => Array(40).fill('   '));


    const updateCRT = () => {
        const column = cycle % 40
        if ([X - 1, X, X + 1].includes(column)) {
            const row = Math.floor(cycle/40);
            screen[row][column] = ' @ '
        }
    }

    data
        .split(/\n/)
        .forEach((operation) => {
            switch (operation) {
                case 'noop':
                    updateCRT()
                    cycle += 1
                    break;
                default:
                    for (let i = 1; i <= 2; i++) {
                        updateCRT()
                        cycle += 1
                    }
                    X += parseInt(operation.replace('addx ', ''))
            }

        })
    screen.forEach((row) => {
        console.log(row.join(''))
    })
}