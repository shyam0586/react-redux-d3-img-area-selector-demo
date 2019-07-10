
const initialState = {
    svgWidth: 800,
    svgHeight: 600,
    imageGrabNames: []
};


function appReducer(state, action) {
    switch (action.type) {
        case "RESIZE_SCREEN":
            return Object.assign({}, state, {
                svgWidth: action.width,
                svgHeight: action.height
            });
        case "ADD_SELECTION_NAMES":            
            let imageGrabNamestmp = initialState.imageGrabNames;           
            imageGrabNamestmp.push(action.screenNumber)
            return Object.assign({}, state, {
                imageGrabNames: imageGrabNamestmp
            })

        default:
            return state;
    }
}

export default function (state = initialState, action) {
    return {
        ...appReducer(state, action)
    };
}