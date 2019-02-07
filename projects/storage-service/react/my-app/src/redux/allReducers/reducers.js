
export const registerBusinesses = (state = { business_name: "", contact_name: "", contact_email: "", contact_number: "", errors: {} }, action) => {
    let newState = state
    switch (action.type) {
        case "NAME":
            newState = { ...state, business_name: action.value };
            break;
        case "CONTACT_NAME":
            newState = { ...state, contact_name: action.value };
            break;
        case "CONTACT_EMAIL":
            newState = { ...state, contact_email: action.value };
            break;
        case "CONTACT_NUMBER":
            newState = { ...state, contact_number: action.value };
            break;
        case "ERROS":
            newState = { ...state, errors: action.value };
            break;

    }
    return newState;
};

export const businessLocations = (state = { address: "", country: "", businesses_id: '', errors: {} }, action) => {
    let newState = state
    switch (action.type) {
        case "ADDRESS":
            newState = { ...state, address: action.value };
            break;
        case "COUNTRY":
            newState = { ...state, country: action.value };
            break;
        case "BUSINESS_ID":
            newState = { ...state, businesses_id: action.value };
            break;
        case "ERROS":
            newState = { ...state, errors: action.value };
            break;
    }
    return newState;
};

export const businessBlocks = (state = { block_name: "", locations_id: '', errors: {} }, action) => {
    let newState = state;
    switch (action.type) {
        case "BLOCK_NAME":
            newState = { ...state, block_name: action.value };
            break;
        case "LOCATION_ID":
            newState = { ...state, locations_id: action.value };
            break;
        case "ERROS":
            newState = { ...state, errors: action.value };
            break;
    }
    return newState;
};

export const businessUnitTypes = (state = { name: "", length: "", height: "", width: "", errors: {} }, action) => {
    let newState = state;
    switch (action.type) {
        case "NAME":
            newState = { ...state, name: action.value };
            break;
        case "LENGTH":
            newState = { ...state, length: action.value };
            break;
        case "HEIGHT":
            newState = { ...state, height: action.value };
            break;
        case "WIDTH":
            newState = { ...state, width: action.value };
            break;
        case "ERROS":
            newState = { ...state, errors: action.value };
            break;
    }
    return newState;
};

export const businessUnits = (state = { unit_name: "", blocks_id: "", units_type_id: "", errors: {} }, action) => {
    let newState = state;
    switch (action.type) {
        case "NAME":
            newState = { ...state, unit_name: action.value };
            break;
        case "BLOCK_ID":
            newState = { ...state, blocks_id: action.value };
            break;
        case "UNIT_TYPES_ID":
            newState = { ...state, units_type_id: action.value };
            break;
        case "ERROS":
            newState = { ...state, errors: action.value };
            break;
    }
    return newState;
};

export const selectValues = (state = { selections: '' }, action) => {
    let newState = state;
    switch (action.type) {
        case "ADD_SELECT":
            newState = { ...state, selections: action.value };
            break;
    }
    return newState;

};

export const signUpPage = (state = { username: "", email: "", password: "", errors: {} }, action) => {
    let newState = state;
    switch (action.type) {
        case "ADD_USER_NAME":
            newState = { ...state, username: action.value };
            break;
        case "ADD_EMAIL":
            newState = { ...state, email: action.value };
            break;
        case "ADD_PASSWORD":
            newState = { ...state, password: action.value };
            break;
        case "ERROS":
            newState = { ...state, errors: action.value };
            break;
    }
    return newState;
}

export const loginPage = (state = { email: "", password: "", errors: {} }, action) => {
    let newState = state;
    switch (action.type) {
        case "CONFIRM_EMAIL":
            newState = { ...state, email: action.value };

            break;
        case "CONFIRM_PASSWORD":
            newState = { ...state, password: action.value };
            console.log("password", newState);
            break;
        case "ERROS":
            newState = { ...state, errors: action.value };
            break;
    }
    return newState;
}

export const customerUnits = (state = { customer_id: "", unit_id: "" }, action) => {
    let newState = state;
    switch (action.type) {
        case "CUSTOMER_ID":
            newState = { ...state, customer_id: action.value };
            console.log(" customer id", newState);
            break;
        case "":
            newState = { ...state, unit_id: action.value };
            console.log("unit id", newState);
            break;

    }
}
