const buttonCount = 12
const numSkips = 4
const ascendOrder = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "lock"]
const descendOrder = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "lock"]
const clickable = [true, true, true, true, true, true, true, true, true, true, false, true]
const scored = Array(buttonCount).fill(false)
const allNums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const allCols = ["blu", "gre", "yel", "red"]


const shuffle = (arr, mixCount) => {
    let count = 0
    while (count < mixCount) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        count = count + 1
    }
    return arr
}

const mixColors = () => {
    let g1 = []
    let g2 = []
    let g3 = []
    let g4 = []
    Array(buttonCount - 1).fill(null).forEach(_ => {
        const newColors = shuffle(allCols.slice(0), 15)
        g1.push(newColors[0])
        g2.push(newColors[1])
        g3.push(newColors[2])
        g4.push(newColors[3])
    })
    g1.push(allCols[0])
    g2.push(allCols[1])
    g3.push(allCols[2])
    g4.push(allCols[3])
    return [g1, g2, g3, g4]
}

const quixx = () => {
    return {
        undoState: null,
        redoState: null,
        g1: {
            scored: Array(...scored),
            canClick: Array(...clickable),
            nums: descendOrder,
            color: Array(buttonCount).fill('blu')
        },
        g2: {
            scored: Array(...scored),
            canClick: Array(...clickable),
            nums: descendOrder,
            color: Array(buttonCount).fill('gre')
        },
        g3: {
            scored: Array(...scored),
            canClick: Array(...clickable),
            nums: ascendOrder,
            color: Array(buttonCount).fill('yel')
        },
        g4: {
            scored: Array(...scored),
            canClick: Array(...clickable),
            nums: ascendOrder,
            color: Array(buttonCount).fill('red')
        },
        skips: Array(numSkips).fill(false),
    }
}

const quixxMixxNumbers = () => {
    const state = quixx()
    state.g1.nums = [5, 7, 11, 9, 12, 3, 8, 10, 2, 6, 4, "lock"]
    state.g2.nums = [8, 2, 10, 12, 6, 9, 7, 4, 5, 11, 3, "lock"]
    state.g3.nums = [9, 12, 4, 6, 7, 2, 5, 8, 11, 3, 10, "lock"]
    state.g4.nums = [10, 6, 2, 8, 3, 4, 12, 5, 9, 7, 11, "lock"]
    return state
}

const quixxMixxColors = () => {
    const state = quixx()
    state.g1.color = ['gre', 'gre', 'red', 'red', 'red', 'red', 'yel', 'yel', 'blu', 'blu', 'blu', 'blu']
    state.g2.color = ['blu', 'blu', 'blu', 'yel', 'yel', 'yel', 'red', 'red', 'red', 'gre', 'gre', 'gre']
    state.g3.color = ['red', 'red', 'gre', 'gre', 'gre', 'gre', 'blu', 'blu', 'yel', 'yel', 'yel', 'yel']
    state.g4.color = ['yel', 'yel', 'yel', 'blu', 'blu', 'blu', 'gre', 'gre', 'gre', 'red', 'red', 'red']
    return state
}

const sequential = () => {
    const colors = ['red', 'yel', 'gre', 'blu', 'red', 'yel', 'gre', 'blu', 'red', 'yel', 'gre', ]
    const state = quixx()
    state.g1.color = colors.concat(["blu"])
    state.g2.color = colors.concat(["gre"])
    state.g3.color = colors.concat(["yel"])
    state.g4.color = colors.concat(["red"])
    return state
}

const randomNum = () => {
    const state = quixx()
    state.g1.nums = shuffle(allNums.slice(0), 15).concat(["lock"])
    state.g2.nums = shuffle(allNums.slice(0), 15).concat(["lock"])
    state.g3.nums = shuffle(allNums.slice(0), 15).concat(["lock"])
    state.g4.nums = shuffle(allNums.slice(0), 15).concat(["lock"])
    return state
}

const randomCol = () => {
    const state = quixx()
    const mixedColors = mixColors()
    state.g1.color = mixedColors[0]
    state.g2.color = mixedColors[1]
    state.g3.color = mixedColors[2]
    state.g4.color = mixedColors[3]
    return state
}
const randomNumCol = () => {
    let state = randomNum()
    const mixedColors = mixColors()
    state.g1.color = mixedColors[0]
    state.g2.color = mixedColors[1]
    state.g3.color = mixedColors[2]
    state.g4.color = mixedColors[3]
    return state
}

const trixx = () => {
    return quixx()
}

const lessSkips = () => {
    const state = quixx()
    state.skips = Array(2).fill(false)
    return state
}

const lookup = {
    1: quixx,
    2: quixxMixxNumbers,
    3: quixxMixxColors,
    4: randomNum,
    5: randomCol,
    6: randomNumCol,
    7: lessSkips,
    8: sequential,
    9: trixx
}

const scores = {
    blu: 0,
    gre: 0,
    yel: 0,
    red: 0,
    skips: 0,
    total: 0
}

const groups = ["g1", "g2", "g3", "g4"]

const Boards = {
    quixx,
    lookup,
    groups,
    scores,
    clickable,
    scored
}

export default Boards