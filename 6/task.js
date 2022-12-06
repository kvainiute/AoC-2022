import fs from "fs";

fs.readFile('./6/input.txt', 'utf8', (err, data) => {
    const characters = data.split("")
    const marker = []
    let markerIndex = 0

    for (let i = 0; i <= characters.length; i++) {
        const char = characters[i]

        // change to 4 for first star
        if (marker.length === 14) {
            const hasDuplicates = new Set(marker).size !== marker.length
            if (!hasDuplicates) {
                markerIndex = i
                break;
            }
            marker.shift()
        }

        // change to 4 for first star
        if (marker.length <= 14) {
            marker.push(char)
        }
    }

    console.log(markerIndex)
});