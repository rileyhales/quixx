const buttonCount = 12
const numSkips = 4
const ascendOrder = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "lock"]
const descendOrder = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "lock"]
const clickable = [true, true, true, true, true, true, true, true, true, true, false, true]

const quixx = () => {
    return {
        undoState: null,
        redoState: null,
        g1: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: descendOrder,
            color: Array(buttonCount).fill('blu')
        },
        g2: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: descendOrder,
            color: Array(buttonCount).fill('gre')
        },
        g3: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: ascendOrder,
            color: Array(buttonCount).fill('yel')
        },
        g4: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: ascendOrder,
            color: Array(buttonCount).fill('red')
        },
        skips: Array(numSkips).fill(false),
    }
}

const quixxMixxNumbers = () => {
    return {
        undoState: null,
        redoState: null,
        g1: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: [5, 7, 11, 9, 12, 3, 8, 10, 2, 6, 4, "lock"],
            color: Array(buttonCount).fill('blu')
        },
        g2: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: [8, 2, 10, 12, 6, 9, 7, 4, 5, 11, 3, "lock"],
            color: Array(buttonCount).fill('gre')
        },
        g3: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: [9, 12, 4, 6, 7, 2, 5, 8, 11, 3, 10, "lock"],
            color: Array(buttonCount).fill('yel')
        },
        g4: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: [10, 6, 2, 8, 3, 4, 12, 5, 9, 7, 11, "lock"],
            color: Array(buttonCount).fill('red')
        },
        skips: Array(numSkips).fill(false),
    }
}

const quixxMixxColors = () => {
    return {
        undoState: null,
        redoState: null,
        g1: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: descendOrder,
            color: ['gre', 'gre', 'red', 'red', 'red', 'red', 'yel', 'yel', 'blu', 'blu', 'blu', 'blu']
        },
        g2: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: descendOrder,
            color: ['blu', 'blu', 'blu', 'yel', 'yel', 'yel', 'red', 'red', 'red', 'gre', 'gre', 'gre']
        },
        g3: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: ascendOrder,
            color: ['red', 'red', 'gre', 'gre', 'gre', 'gre', 'blu', 'blu', 'yel', 'yel', 'yel', 'yel']
        },
        g4: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: ascendOrder,
            color: ['yel', 'yel', 'yel', 'blu', 'blu', 'blu', 'gre', 'gre', 'gre', 'red', 'red', 'red']
        },
        skips: Array(numSkips).fill(false),
    }
}

const sequential = () => {
    const colors = ['red', 'yel', 'gre', 'blu', 'red', 'yel', 'gre', 'blu', 'red', 'yel', 'gre', 'blu']
    return {
        undoState: null,
        redoState: null,
        g1: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: descendOrder,
            color: colors
        },
        g2: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: descendOrder,
            color: colors
        },
        g3: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: ascendOrder,
            color: colors
        },
        g4: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: ascendOrder,
            color: colors
        },
        skips: Array(numSkips).fill(false),
    }
}

export default {
    quixx,
    quixxMixxNumbers,
    quixxMixxColors,
    sequential
}