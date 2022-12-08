import fs from "fs";

fs.readFile('./8/input.txt', 'utf8', (err, data) => {
    const grid = data
        .split(/\n/)
        .map((line) => line.split('').map((tree) => parseInt(tree)))
    const gridTransposed = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));

    const firstStar = getFirstStar(grid, gridTransposed)
    const secondStar = getSecondStar(grid, gridTransposed)
    console.log(firstStar, secondStar)
});

const getFirstStar = (grid, gridTransposed) => {
    const visible = []
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (i === 0 ||
                i === (grid.length - 1) ||
                j === 0 ||
                j === (grid[0].length - 1) ||
                // top trees
                gridTransposed[j].slice(0, i).every((tree) => tree < grid[i][j]) ||
                // left trees
                grid[i].slice(0, j).every((tree) => tree < grid[i][j]) ||
                // bottom trees
                gridTransposed[j].slice(i + 1).every((tree) => tree < grid[i][j]) ||
                // right trees
                grid[i].slice(j + 1).every((tree) => tree < grid[i][j])
            ) {
                visible.push(grid[i][j])
            }
        }
    }
    return visible.length
}

const getSecondStar = (grid, gridTransposed) => {
    let highestScore = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (i !== 0 &&
                i !== (grid.length - 1) &&
                j !== 0 &&
                j !== (grid[0].length - 1)
            ) {
                const tree = grid[i][j]
                const topTrees = gridTransposed[j].slice(0, i).reverse()
                const topTreesScore = getScore(topTrees, tree)

                const leftTrees = grid[i].slice(0, j).reverse()
                const leftTreesScore = getScore(leftTrees, tree)

                const bottomTrees = gridTransposed[j].slice(i + 1)
                const bottomTreesScore = getScore(bottomTrees, tree)

                const rightTrees = grid[i].slice(j + 1)
                const rightTreesScore = getScore(rightTrees, tree)

                const finalScore = topTreesScore * leftTreesScore * bottomTreesScore * rightTreesScore
                if (finalScore > highestScore) {
                    highestScore = finalScore
                }

            }
        }
    }
    return highestScore
}

const getScore = (trees, currentTree) => {
    const index = trees.findIndex((tree) => tree >= currentTree)
    if (index < 0) {
        return trees.length
    } else {
        return index + 1
    }
}