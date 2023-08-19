const initialState = {
    isLoggedIn: false,
    token: null,
    userId: null,
};

const authReducer = (state = initialState, action) => {
     // Handle different actions and update the state accordingly
     switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                userId: action.payload.userId,

            };

            case 'LOGOUT':
                return {
                    ...state,
                    isLoggedIn: false,
                    token: null,
                    userId: null,
                };
                default:
                    return state;

     }
};

export default authReducer;