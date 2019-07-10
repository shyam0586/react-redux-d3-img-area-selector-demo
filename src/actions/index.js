export const RESIZE_SCREEN = "RESIZE_SCREEN";
export const ADD_SELECTION_NAMES = "ADD_SELECTION_NAMES";

export function resizeScreen(width, height) {
    return {
        type: RESIZE_SCREEN,
        width: width,
        height: height
    };
}


export function addSelectionNames(screenNum) {
    return {
        type: ADD_SELECTION_NAMES,
        screenNumber : screenNum
    };

}
