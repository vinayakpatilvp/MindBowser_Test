 export function isEmptyOrNull(state, error, propName, errorMessage){
    //Check for empty OR NULL/Undefined  
    if (state[propName] === '' || state[propName] == null) {
        //Set Error Object from localized resource file
        error[propName] = errorMessage;
        let focusError = document.getElementById(propName);
        if (focusError !== null) {
            focusError.focus();
        }
        return true;
    }
    return false;
}


export function isEmailValid(state, error, propName, errorMessage) {
    let emailSplittedArray = state[propName] && state[propName].trim().split('@');
    var validateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailSplittedArray.length == 2 && emailSplittedArray[0].length < 2 || !validateEmail.test(state[propName] && state[propName].trim())) {
        error[propName] = errorMessage;
        let focusError = document.getElementById(propName);
        if (focusError !== null) {
            focusError.focus();
        }
        return true;
    }
    return false;
}

// Check mobile string
export function isMobileValid(state, error, propName, errorMessage) {
    var validateMobile = /^(\+\d{1,3}[- ]?)?\d{6,15}$/;
    if (!validateMobile.test(state[propName])) {
        error[propName] = errorMessage;
        let focusError = document.getElementById(propName);
        if (focusError !== null) {
            focusError.focus();
        }
        return true;
    }
    return false;
}

export function isNoneChecked(state, error, errorMessage, errorPropName, propName1, propName2, propName3, propName4,propName5) {
    if (!!(state[propName1] || state[propName2] || state[propName3] || state[propName4] || state[propName5]) === false) {
        error[errorPropName] = errorMessage;
    }
}