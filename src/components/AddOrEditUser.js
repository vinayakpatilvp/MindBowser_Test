import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TextareaAutosize from 'react-autosize-textarea';
import Select from "react-select";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getColleges,addUser,editUser} from '../Redux/actions/courseActions';
import {isEmailValid,isMobileValid,isEmptyOrNull,isNoneChecked} from '../infrastructure/validations';
import './addUsers.css';
 
class AddOrEditUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            birthDate :new Date(),
            error:{},
            selectedCollege: null
        }
    }

    componentDidMount = () => {
        let users = this.props.users;
        this.props.getColleges();
        if(this.props.edituserId){
            let editedUser = users && users.length && users.filter( user =>{
                return user.id === this.props.edituserId
            })
            this.setState({
                ...this.state,
                name: editedUser[0].name,
                email: editedUser[0].email,
                phone: editedUser[0].phone,
                birthDate: editedUser[0].birthDate,
                address: editedUser[0].address,
                selectedCollege: editedUser[0].collegeName,
                selectedOption:editedUser[0].gender,
                gaming:editedUser[0].gaming,
                drawing:editedUser[0].drawing,
                reading:editedUser[0].reading,
                travelling:editedUser[0].travelling,
                other:editedUser[0].other,
                otherHobbies:editedUser[0].otherHobbies
            })
        } 
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleSubmit = () => {
        if(this.validateField()){
            let id = this.props.edituserId ? this.props.edituserId : this.props.id;
            let checkBoxes = ["gaming","drawing","travelling","reading"]
            let commaSeparatedCheckBoxes;
            let selectedCheckBoxes = [];
            
            selectedCheckBoxes = checkBoxes.filter( hobby => {
                return this.state[hobby] == true;
            })

            if (selectedCheckBoxes.length > 0) {
                commaSeparatedCheckBoxes = selectedCheckBoxes.join(",");
            }

            console.log("Comma separated checkBoxes",commaSeparatedCheckBoxes);

            let user = {
                "id": id,
                "name": this.state.name,
                "email":this.state.email,
                "phone":this.state.phone,
                "collegeName":this.state.selectedCollege,
                "address":this.state.address,
                "gender": this.state.selectedOption,
                "hobbies": commaSeparatedCheckBoxes,
                "gaming":this.state.gaming,
                "drawing":this.state.drawing,
                "reading":this.state.reading,
                "travelling":this.state.travelling,
                "other":this.state.other,
                "otherHobbies":this.state.otherHobbies,
                "birthDate":this.state.birthDate
            }
            this.props.edituserId ?  this.props.editUser(user,this.props.edituserId): this.props.addUser(user);
            this.props.onCloseModal();
        }
    }

    validateField = () => {
        var error = {};
       
            isEmptyOrNull(this.state, error, 'name', 'enter Name');
            this.state.email ? isEmailValid(this.state,error,"email","Enter Valid Email") : isEmptyOrNull(this.state, error, 'email', 'Email is mandatory'); 

            this.state.phone ? isMobileValid(this.state,error,"phone","enter Valid mobile number") : isEmptyOrNull(this.state, error, 'phone', 'Mobile is mandatory');

            isNoneChecked(this.state, error, "Please enter atleast Other hobbies", "isNoneChecked", "travelling", "drawing", "gaming", "reading","other");
            // this.isEmptyOrNull(this.state, error, 'name', 'enter Name');
            // this.isEmptyOrNull(this.state, error, 'name', 'enter Name');
        // {
        //     getConfigValue(this.formConfiguration,"addShortcutMessages.visibileTo.visible") && getConfigValue(this.formConfiguration,"addShortcutMessages.visibileTo.mandatory") &&
        //     isEmptyOrNull(this.state, error, 'visibleTo', 'validateField.emptyVisibleTo');
        // }
        
        // {
        //     getConfigValue(this.formConfiguration,"addShortcutMessages.message.visible") && getConfigValue(this.formConfiguration,"addShortcutMessages.message.mandatory") &&
        //     isEmptyOrNull(this.state, error, 'message', 'validateField.emptyMessage');
        // }
        
        
        this.setState({
                ...this.state,
                error: error
            });
        return Object.keys(error).length === 0 && error.constructor === Object;
    }

    onDateChange = (date, id) => {
        this.setState({
            birthDate: date,
          error: {
            ...this.state.error,
              [id]: ''
            }
        });
      }

      dropDowndata = () => {
          let colleges =  this.props.colleges;

        let dropdowns = colleges.map((data) => {
            let label = data.name;
            let dropdown = {
                value: data.name,
                label: label
            };
            return dropdown;
        });
        return dropdowns;

      }

      onSelectChange = (selectedOption) => {
        this.setState({
            selectedCollege: selectedOption
        })
    }

    onCheck(e) {
        if(e.target.id == "other"){
            (e.target.checked) ? this.setState({ ...this.state,[e.target.id]: true, travelling: false,drawing : false,gaming: false, reading : false, error: { 'isNoneChecked': false} }) : this.setState({ [e.target.id]: false });
        }else{
            (e.target.checked) ? this.setState({ ...this.state,[e.target.id]: true,other: false, error: { 'isNoneChecked': false} }) : this.setState({ [e.target.id]: false });
        }
      }


    // onValueChange = (e) => {
    //     let value = e.target ? e.target.type == 'radio' ? e.target.value == 'true' ? true : false : e.target.value : e.value;
    //     this.setState({
    //         ...this.state,
    //         [e.target.id]:value
    //     })
    // }

    onValueChange = (event) => {
        this.setState({
          selectedOption: event.target.value
        });
      }

    render(){

        return(
        <div class =  'col-sm-12'>
            <div className = 'row'>
                <div class = 'col-sm-10'>
                        <div class="form-group">
                            <label className = "label" for="name">Name</label>
                            <input type="text" class="form-control" id="name" onChange = {this.onChangeHandler} aria-describedby="name" placeholder="Enter fullname" value = {this.state.name} />
                            {this.state.name ? '' : this.state.error && this.state.error["name"] && <label htmlFor="name" className="error">{this.state.error.name}</label>}
                        </div>

                    <div className="form-group">
                        <span>
                            <label className = "label">Birth Date</label>
                            <div>
                                <DatePicker
                                    onChange={this.onDateChange}
                                    value={this.state.birthDate}
                                />
                            </div>
                        </span>
                    </div>
                        <div class="form-group">
                            <label className = "label" for="exampleInputPassword1">Email</label>
                            <input type="text" class="form-control" id="email" onChange = {this.onChangeHandler} placeholder="Enter Email" value = {this.state.email}/>
                            {this.state.email ? this.state.error && this.state.error["email"] ?  this.state.error["email"] : '' : this.state.error && this.state.error["email"] && <label htmlFor="email" className="error">{this.state.error.email}</label>}
                        </div>
                        <div class="form-group">
                            <label className = "label" for="exampleInputPassword1">Phone</label>
                            <input type="number" class="form-control" id="phone" onChange = {this.onChangeHandler} placeholder="Enter Email"
                            value = {this.state.phone}/>
                            {this.state.phone ? this.state.error && this.state.error["phone"] ? this.state.error["phone"] : '' : this.state.error && this.state.error["phone"] && <label htmlFor="phone" className="error">{this.state.error.phone}</label>}
                        </div>
                        <div class="form-group">
                        <label className = "label" for="exampleInputPassword1">Address</label>
                            <span>
                                <TextareaAutosize maxLength="1000" className="form-control text-area-layout" id = "address" value={this.state.address} onChange={this.onChangeHandler} placeholder= "Address" />

                            </span>
                            {this.state.address ? '' : this.state.error &&this.state.error.address && <label htmlFor="visibleTo" className="error">{this.state.error.address}</label>}
                        </div>
                        <div class="form-group">
                        <label className = "label" for="exampleInputPassword1">Select Gender</label>
                        <div class="form-check">
                            <label>
                                <input
                                type="radio"
                                value="Male"
                                checked={this.state.selectedOption === "Male"}
                                onChange={this.onValueChange}
                                className = "button-layout"
                                />
                                Male
                            </label>
                        </div>
                        <div class="form-check">
                            <label>
                                <input
                                type="radio"
                                value="Female"
                                checked={this.state.selectedOption === "Female"}
                                onChange={this.onValueChange}
                                className = "button-layout"
                                />
                                Female
                            </label>
                        </div>
                        </div>
                        <div class="form-group">
                        <label className = "label" for="exampleInputPassword1">Select College</label>
                        <Select
                                    name="columnName"
                                    autosize={false}
                                    value={this.state.selectedCollege}
                                    placeholder="Select College"
                                    options={this.dropDowndata()}
                                    onChange={(e) => this.onSelectChange(e)}
                                    resetValue={{ value: "" }}
                                />
                        </div>


                        <div class="form-group">
                        <label className = "label" for="exampleInputPassword1">Choose Your Hobbies</label>
                        <div className="form-group checkbox-wrapper">
                        <div className="row-check-select">
                            <input type="checkbox" id="reading" checked={this.state.reading} onChange={e => this.onCheck(e)}/><label>Reading</label>
                        </div>
                        <div className="row-check-select">
                            <input type="checkbox" id="gaming" checked={this.state.gaming} onChange={e => this.onCheck(e)}/><label>Gaming</label>
                        </div>
                        </div>
                        <div className="form-group checkbox-wrapper">
                        <div className="row-check-select">
                            <input type="checkbox" id="travelling" checked={this.state.travelling} onChange={e => this.onCheck(e)}/><label>Travelling</label>
                        </div>
                        <div className="row-check-select">
                            <input type="checkbox" id="drawing" checked={this.state.drawing} onChange={e => this.onCheck(e)}/><label>Drawing</label>
                        </div>
                        </div>
                        <div className="form-group checkbox-wrapper">
                        <div className="row-check-select">
                            <input type="checkbox" id="other" checked={this.state.other} onChange={e => this.onCheck(e)}/><label>Other</label>
                            {this.state.error && this.state.error.isNoneChecked && <label className="error">{this.state.error.isNoneChecked}</label>}
                        </div>
                        </div>
                        </div>

                        

                        { this.state.other &&  <div class="form-group">
                                    <label className = "label" for="name">Hobbies</label>
                                    <input type="text" class="form-control" id="otherHobbies" onChange = {this.onChangeHandler} aria-describedby="otherHobbies" placeholder="Enter other hobbies" value = {this.state.otherHobbies} />
                            </div>}

    
                        <button type="submit" onClick = {() =>this.props.onCloseModal()} class="btn btn-primary cancel-button">Cancel</button>
                        <button type="submit" class="btn btn-primary" onClick = {this.handleSubmit}>Submit</button>
                </div> 
            </div> 
        </div> 
        
        )
    }
}

function mapStateToProps(state){
    return {
        colleges: state.users.colleges,
        id:state.users.id,
        users:state.users.users
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
        {
           getColleges,addUser,editUser
        }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AddOrEditUser);