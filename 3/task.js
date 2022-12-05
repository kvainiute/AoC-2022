import fs from "fs";

fs.readFile('./3/input.txt', 'utf8', (err, data) => {
    console.log(firstStar(data), secondStar(data))
});

const firstStar = (data) => {
    return data
        .split(/\n/)
        .map((backpack) => {
            const compartmentSize = backpack.length / 2
            const firstCompartment = backpack.slice(0, compartmentSize).split('')
            const secondCompartment = backpack.slice(compartmentSize).split('')
            return firstCompartment.find(value => secondCompartment.includes(value))
        })
        .map((char) => {
            const asciiValue = char.charCodeAt()
            if (asciiValue < 91) {
                return asciiValue - 38
            } else {
                return asciiValue - 96
            }

        })
        .reduce((sum, value) => {return sum + value}, 0)
}

const secondStar = (data) => {
    let groupIndex = 0
    const groups = data
        .split(/\n/)
        .reduce((allGroups, backpack) => {
            const group = allGroups[groupIndex]
            if (!group) {
                allGroups[groupIndex] = [backpack.split('')]
            } else if (group.length < 3) {
                allGroups[groupIndex].push(backpack.split(''))
            }

            if (allGroups[groupIndex]?.length === 3) {
                groupIndex += 1
            }
            return allGroups
        }, [])

    return groups
        .map((group) => group[0].find(value => group[1].includes(value) && group[2].includes(value)))
        .map((char) => {
            const asciiValue = char.charCodeAt()
            if (asciiValue < 91) {
                return asciiValue - 38
            } else {
                return asciiValue - 96
            }

        })
        .reduce((sum, value) => {return sum + value}, 0)
}