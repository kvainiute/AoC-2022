import fs from "fs";

fs.readFile('./2/input.txt', 'utf8', (err, data) => {
    firstStar(data)
    secondStar(data)
});

const firstStar = (data) => {
    const variation = {
        'A': 1,
        'B': 2,
        'C': 3,
        'X': 1,
        'Y': 2,
        'Z': 3
    }
    const plays = data
        .split('\n')
        .map((play) =>
            play
                .split(/\s/)
                .map((hand) => variation[hand])
        )
    let points = 0
    plays.forEach(([playerA, playerB]) => {
        if (playerA && playerB) {
            points += playerB
            if (playerA === playerB) {
                points += 3
            } else if ((playerA === 3 && playerB === 1) || (playerA === 2 && playerB === 3) || (playerA === 1 && playerB === 2)) {
                points += 6
            }
        }

    })
    console.log(points)
}

const secondStar = (data) => {
    const variation = {
        'A': 1,
        'B': 2,
        'C': 3,
    }
    const result = {
        'X': 0,
        'Y': 3,
        'Z': 6
    }
    const plays = data
        .split('\n')
        .map((play) =>
            play
                .split(/\s/)
                .map((hand) => variation[hand] ?? result[hand])
        )
    let points = 0
    plays.forEach(([playerA, end]) => {
        if (playerA && end !== undefined) {
            points += end
            if (end === 0) {
                if (playerA === 3) {
                    points += 2
                } else if (playerA === 2) {
                    points += 1
                } else {
                    points += 3
                }
            } else if (end === 3) {
                points += playerA
            } else {
                if (playerA === 3) {
                    points += 1
                } else if (playerA === 2) {
                    points += 3
                } else {
                    points += 2
                }
            }
        }
    })
    console.log(points)
}