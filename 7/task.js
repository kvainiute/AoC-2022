import fs from "fs";

fs.readFile('./7/input.txt', 'utf8', (err, data) => {
    let tree = []
    let currentDir
    let readNextLine = false
    let path = []
    data
        .split("\n")
        .forEach((line) => {
            if (line.startsWith('$ cd')) {
                readNextLine = false
                const directory = line.replace('$ cd ', '')
                if (!currentDir) {
                    path.push(directory)
                    tree.push({size: 0, id: directory, path: [...path]})
                } else if (directory === '..') {
                    path.pop()
                } else {
                    path.push(directory)
                    tree.push({size: 0, id: directory, path: [...path]})
                }
                currentDir = path[path.length - 1]
            } else if (readNextLine) {
                tree = enterSize(line, tree, currentDir, path)
            } else {
                readNextLine = true
            }
        })

    const firstStar = tree
        .filter((directory) => directory.size <= 100000)
        .reduce((sum, directory) => sum + directory.size, 0)

    const spaceToFreeUp = 30000000 - (70000000 - tree[0].size)
    const secondStar = tree
        .sort((a, b) => a.size - b.size)
        .filter((directory) => directory.size > spaceToFreeUp)[0].size

    console.log(firstStar, secondStar)
});

const enterSize = (line, tree, currentDir, path) => {
    let size = line.replace(/\D/g,'')
    if (size.length > 0) {
        size = parseInt(size)
        tree = tree.map((directory) =>
            directory.path.every((field) => path.includes(field)) ? ({
                ...directory,
                size: directory.size + size
            }) : directory)
    }
    return tree
}