export const addToList = (item) => {
    return{
        type: "ADD",
        payload: item
    }
}

export const removeFromTheList = (item) => {
    return{
        type: "REMOVE",
        payload: item
    }
}