const numberOfButtons = 12
const numberOfSkips = 4
const ascendOrder = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "lock"]
const descendOrder = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "lock"]

const cleanState = {
    undoState: null,
    redoState: null,
    red: {
        color: "red",
        isScored: Array(numberOfButtons).fill(false),
        isClickable: Array(numberOfButtons).fill(true),
        order: ascendOrder
    },
    yellow: {
        color: "yellow",
        isScored: Array(numberOfButtons).fill(false),
        isClickable: Array(numberOfButtons).fill(true),
        order: ascendOrder
    },
    green: {
        color: "green",
        isScored: Array(numberOfButtons).fill(false),
        isClickable: Array(numberOfButtons).fill(true),
        order: descendOrder
    },
    blue: {
        color: "blue",
        isScored: Array(numberOfButtons).fill(false),
        isClickable: Array(numberOfButtons).fill(true),
        order: descendOrder
    },
    scores: {
        red: 0,
        yellow: 0,
        green: 0,
        blue: 0,
        skips: 0,
        total: 0,
    },
    skips: Array(numberOfSkips).fill(false),
}

export default Object.freeze(cleanState)