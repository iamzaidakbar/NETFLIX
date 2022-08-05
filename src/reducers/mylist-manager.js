const addToMyList = (state = [], action) => {
    switch (action.type){
        case "ADD" : return state.concat(action.payload);
        case "REMOVE" : return state.filter(item => item !== action.payload)
        default: return state
    }
}

export default addToMyList;