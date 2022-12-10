import fs from "fs";

fs.readFile('./9/input.txt', 'utf8', (err, data) => {
    const movements = data
        .split(/\n/)
        .map((movement) => {
            const [direction, value] = movement.split(' ')
            return [direction, parseInt(value)]
        })

    const head = {x: 0, y: 0}
    // change this to 1 for first star
    const tailNumber = 9
    const tails = Array(tailNumber)
        .fill(null)
        .map(() => ({x: 0, y: 0}));
    const positions = [{...head}]

    movements.forEach(([direction, value]) => {
        for (let i = 1; i <= value; i++) {
            repositionTails(tailNumber, tails, head, positions)
            switch (direction) {
                case 'U':
                    head.y = head.y + 1
                    break;
                case 'D':
                    head.y = head.y - 1
                    break;
                case 'R':
                    head.x = head.x + 1
                    break;
                case 'L':
                    head.x = head.x - 1
                    break;
            }
        }
        repositionTails(tailNumber, tails, head, positions)
    })
    console.log(positions.length)
})

const repositionTails = (tailNumber, tails, head, positions) => {
    for (let j = 0; j < tailNumber; j++) {
        const tail = tails[j]
        const currentHead = j === 0 ? head : tails[j - 1]
        repositionTail(currentHead, tail)
        if ((j === tailNumber - 1) && !positions.find(({x, y}) => x === tail.x && y === tail.y)) {
            positions.push({...tail})
        }
    }
}

const repositionTail = (head, tail) => {
    const dX = head.x - tail.x
    const dY = head.y - tail.y

    if (![Math.abs(dX), Math.abs(dY)].includes(2)){
        return
    }
    if (dX) {
        tail.x = tail.x + (dX > 0 ? 1 : -1)
    }
    if (dY){
        tail.y = tail.y + (dY > 0 ? 1 : -1)
    }
}