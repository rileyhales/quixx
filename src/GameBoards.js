const buttonCount = 12
const numSkips = 4
const ascendOrder = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "lock"]
const descendOrder = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "lock"]
const clickable = [true, true, true, true, true, true, true, true, true, true, false, true]
const scored = Array(buttonCount).fill(false)

const shuffled = () => {
    const allNums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    for (let i = allNums.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allNums[i], allNums[j]] = [allNums[j], allNums[i]];
    }
    allNums.push("lock")
    return allNums
}

const quixx = () => {
    return {
        undoState: null,
        redoState: null,
        board: "q1",
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
    const colors = ['red', 'yel', 'gre', 'blu', 'red', 'yel', 'gre', 'blu', 'red', 'yel', 'gre', 'blu']
    const state = quixx()
    state.g1.color = colors
    state.g2.color = colors
    state.g3.color = colors
    state.g4.color = colors
    return state
}

const randomNum = () => {
    const state = quixx()
    state.g1.nums = shuffled()
    state.g2.nums = shuffled()
    state.g3.nums = shuffled()
    state.g4.nums = shuffled()
    return state
}

const lessSkips = () => {
    const state = quixx()
    state.skips = Array(2).fill(false)
    return state
}

const GameBoards = {
    quixx,
    quixxMixxNumbers,
    quixxMixxColors,
    sequential,
    randomNum,
    lessSkips,

    clickable,
    scored
}

export default GameBoards