import fs from "fs";

fs.readFile('./5/input.txt', 'utf8', (err, data) => {
    const input = data.split("\n")
    const separator = input.findIndex((line) => line.length === 0)
    const stacksTemp = []
    input.slice(0, separator).forEach((line) => {
        if (line.includes('[')) {
            const chars = line.split("")
            for (let i = 0; i <= chars.length; i++) {
                const char = chars[i]
                if (char?.toLowerCase() !== char?.toUpperCase()) {
                    const currentStack = stacksTemp[i]
                    if (!currentStack) {
                        stacksTemp[i] = [char]
                    } else {
                        stacksTemp[i].unshift(char)
                    }
                }
            }
        }
    })
    const stacks = stacksTemp.filter(n => n)
    const steps = input.slice(separator + 1)
    steps.forEach((step) => {
        const [move, from, to] = step.match(/\d+/g)
        const source = stacks[from - 1]
        // add at the end .reverse() for second star
        const cratesToMove = source.splice(source.length - move, move)
        stacks[to - 1].push(...cratesToMove)
    })
    const result = stacks.reduce((value, stack) => {
        return value + stack[stack.length - 1]
    }, "")
    console.log(result)
});