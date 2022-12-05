import fs from "fs";

fs.readFile('./4/input.txt', 'utf8', (err, data) => {
    const assignments = data
        .split(/\n/)
        .map((pair) => pair
            .split(',')
            .map((assignment) => {
                const [start, finish] = assignment
                    .split("-")
                    .map((point) => parseInt(point))
                if (start === finish) {
                    return [start]
                }
                let sections = []
                for (let i = start; i <= finish; i++) {
                    sections.push(i);
                }
                return sections
            })
        )

    const firstStar = assignments
        .reduce((sum, pair) => {
            if (pair[0].every((section) => pair[1].includes(section)) ||
                pair[1].every((section) => pair[0].includes(section))) {
                sum += 1
            }
            return sum
        }, 0)
    const secondStar = assignments
        .reduce((sum, pair) => {
            if (pair[0].find((section) => pair[1].includes(section)) ||
                pair[1].find((section) => pair[0].includes(section))) {
                sum += 1
            }
            return sum
        }, 0)
    console.log(firstStar, secondStar)
});