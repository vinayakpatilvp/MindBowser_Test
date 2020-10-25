import axios from '../../infrastructure/config';
import  * as ActionTypes  from '../../AcitionTypes';


export const getColleges =()=> dispatch => {
    dispatch(requestGetColleges());
    axios.get('search?name=india').then(response =>{
              dispatch(getCollegesSuccess(response.data));
          }).catch(error => {
              dispatch(getCollegesFailure(error.response))
          })  
}

export const requestGetColleges =()=>{
    return{
      type: ActionTypes.GET_COLLEGES_REQUEST
    }
  }
  
  
  export const getCollegesSuccess= (data)=>{
    return{
      type: ActionTypes.GET_COLLEGES_SUCCESS,
      payload: data
    }
  }
  
  export const getCollegesFailure = (error) => {
    return{
        type: ActionTypes.GET_COLLEGES_FAILURE,
        error
    }
  }

  export const addUser = (userData) => dispatch => {
    dispatch(adduserDetais(userData));
  }

  export const adduserDetais = (userData)=>{
    return {
        type: ActionTypes.ADD_USER,
        payload: userData
    }
  }

  export const editUser = (userData,id) => dispatch => {
    dispatch(edituserDetais(userData));
  }

  export const edituserDetais = (userData)=>{
    return {
        type: ActionTypes.EDIT_USER,
        payload: userData
    }
  }

  export const deleteUser = (id) => dispatch => {
    dispatch(deleteUserDetails(id));
  }

  export const deleteUserDetails = (id)=>{
    return {
        type: ActionTypes.DELETE_USER,
        payload: id
    }
  }
