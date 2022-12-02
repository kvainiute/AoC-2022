import fs from "fs";

fs.readFile('./1/input.txt', 'utf8', (err, data) => {
    const elves = data
        .split(/\n\n/)
        .map((elf) =>
            elf
                .split(/\n/)
                .reduce((sum, value) => sum + parseInt(value), 0))
        .sort((a, b) => b - a )
    const firstStar = elves[0]
    const secondStar = elves[0] + elves[1] + elves[2]
    console.log(firstStar, secondStar)
});