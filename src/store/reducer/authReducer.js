const initialState = {
    user: null,
    address: [],
    clientSecret: null,
    selectedUserCheckoutAddress: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER"://index.js Line:126 LOGIN_USER
            return {
                ...state,
                user: {
                    id: action.payload.id,  
                    username: action.payload.username,
                    roles: action.payload.roles,
                },
                token: action.payload.token,
            };
        case "USER_ADDRESS":
            return { ...state, address: action.payload };//assigning the addresses into the address variablr line:3
        case "SELECT_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: action.payload };
        case "REMOVE_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: null };
        case "CLIENT_SECRET":
            return { ...state, clientSecret: action.payload };
        case "REMOVE_CLIENT_SECRET_ADDRESS":
            return { ...state, clientSecret: null, selectedUserCheckoutAddress: null };
        case "LOG_OUT":
            return {
                user: null,
                token: null,
                address: [],
                selectedUserCheckoutAddress: null,
                clientSecret: null,
            };

        default:
            return state;
    }
};