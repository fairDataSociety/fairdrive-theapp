import * as t from "./actionTypes"

export const setSystem = data => ({
    type: t.SET_SYSTEM,
    data
})

export const unlockSystem = data => ({
    type: t.UNLOCK_SYSTEM,
    data
})
