import  React,{Component,useState} from 'react';

import GenericModal from './GenericModal';
import AddOrEditUser from './AddOrEditUser';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteUser} from '../Redux/actions/courseActions';
import TextInput from './SearchInput';
import './searchInput.css'

class UsersList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id:null,
            showAddUserModal: false,
            userId: null,
            searchKey: ""
        };
    }


    componentWillReceiveProps(nextProps){
        if(this.state.userId){
            this.setState({
                userId: null
            })
        }
        if(nextProps && Array.isArray(nextProps.users)){
            this.setState({
                users : nextProps.users
            })
        } 
    }

    onEdit = (e,userId) =>{
        this.setState({
            showAddUserModal: true,
            userId : userId
        })
    }
    
    onDelete = (e,userId) =>{
        this.props.deleteUser(userId);
    }

    showAddUserModal = () => {
        this.setState({
            showAddUserModal : true
        })
    }

    closeModal = () => {
        this.setState({
            showAddUserModal : false
        })
    }

    handleChange = (e) =>{
        let value = e.target && e.target.value;
        if (e.target.value.trim() == "") {
            value = value.slice(0, 0);
        }
        this.setState({
            searchKey : value
        })
    }

    search = (e) => {

        let caseInsensitiveSearchKey = this.state.searchKey ?  this.state.searchKey.toLowerCase() : "";
        let  usersList =  this.state.users && this.state.users.length > 0 && this.state.users.filter( user => {
                return  (user["name"].toLowerCase().includes(caseInsensitiveSearchKey))
        })
        this.setState({
            users : usersList
        })
    }  

    onSearchClose = (e) => {
        this.setState({
            searchKey: '',
            users: this.props.users
        })  
    }
    
    render(){
        return(
            <div class =  'col-sm-12'>
                <br/>
                <div className = 'row'>
                    <div className = "col-sm-1">
                        <button onClick = {this.showAddUserModal} class="btn btn-primary">Add User</button>
                    </div>

                <div className ="">
                    <div className="sub-category" id="actionControls">
                        <div className="right-panel display-inlineflex">
                            <TextInput
                                id = "input-search"
                                value = {this.state.searchKey}
                                onChange = {this.handleChange}
                                divClass = "input-group "
                                className ='form-control borderGrey noRightBorder search-input'
                                spanCallback2 = {this.search}
                                spanCallback1 = {this.onSearchClose}
                                placeholder="Seach Here"
                            />
                        </div>
                    </div>
                </div>
                    
                </div>

                <br/>

            <div className = 'row'>
            {  this.state.users  && this.state.users.length > 0 ? 
                <div class =  'col-sm-12'>         
                    <table class="table table-dark">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Birthdate</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Hobbies</th>
                            <th scope="col">Address</th>
                            <th scope="col">College Name</th>
                            <th scope="col">Edit User</th>
                            <th scope="col">Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users  && this.state.users.map((user,index) => {
                                let id =user.id;
                                let month = user.birthDate.getMonth() + 1;
                                let birthDate = user.birthDate.getDate() + "/" + month + "/" + user.birthDate.getFullYear()
                                ;
                                return <tr key = {index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{birthDate}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.hobbies ? user.hobbies : user.otherHobbies}</td>
                                    <td>{user.address}</td>
                                    <td>{user.collegeName && user.collegeName.label }</td>
                                    <td><button onClick = {(e) =>this.onEdit(e,id)}  class="btn btn-primary">Edit</button></td>
                                    <td><button onClick = {(e) =>this.onDelete(e,id)} class="btn btn-danger">Delete</button></td>
                                </tr> 
                            })
                            }
                        
                        </tbody>
                    </table>
                </div> : null
            }    
            </div>
            {
                this.state.showAddUserModal && 
                <GenericModal 
                show={this.state.showAddUserModal}
                // onHide={this.closeModal}
                modalTitle= "Add User"
                  body={
                    <AddOrEditUser onCloseModal={this.closeModal}
                      edituserId = {this.state.userId}
                    />
                  }
                />
            }
            </div>
        )
    } 
}

function mapStateToProps(state){
    return {
        users: state.users.users
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
        {
            deleteUser
        }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersList);