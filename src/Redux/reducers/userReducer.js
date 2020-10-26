import * as ActionType from '../../AcitionTypes';

const initialState = {
    id:1,
    colleges:[],
    users:[]
}

export default function courseReducer(state = initialState,action){

    switch(action.type){
        
        case ActionType.GET_COLLEGES_REQUEST:
            return {
                ...state,
                isInProgress: true
            }
        case ActionType.GET_COLLEGES_SUCCESS:
            return {
                ...state,
                colleges : action.payload,
                isInProgress: false
            }
        case ActionType.GET_COLLEGES_FAILURE:
            return {
                ...state,
                isInProgress: false,
                message: action.error
            }

        case ActionType.ADD_USER:
        let id = state["id"] + 1;
            return {
                ...state, 
                users: [action.payload].concat(state.users),id
            }

        case ActionType.EDIT_USER:
            let ediuserId = action.payload && action.payload.id;
            let updatedUsers = [action.payload].concat(state.users && state.users.filter(user => {
                return ediuserId !== user.id
            }))    

            return {
                ...state, 
                users:updatedUsers
            }

        case ActionType.DELETE_USER:
            
            let users = state.users && state.users.filter(user => {
                return action.payload !== user.id
            })
                return {
                    ...state, 
                    users
                }

        default : 
        return state;
    }
}