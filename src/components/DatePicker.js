import React from 'react';
//for airbnb date picker
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
// import './datePicker.less';
import moment from 'moment';

//https://github.com/airbnb/react-dates

export function DatePickerSingle({self, customProps, ...props}){
    return(
        <SingleDatePicker
            {...props}
            numberOfMonths={1}
            displayFormat="YYYY-MM-DD"
            regular={false}
            inputIconPosition="after"
            required={false}
            small={false}
            showDefaultInputIcon={true}
            showClearDate =  {true}
            customCloseIcon ={customProps && !customProps.showClearDate ? null :  <span aria-label="Clear value" className="Select-clear-zone" title="Clear value"><span className="Select-clear">×</span></span> }
            noBorder={true}
            appendToBody={false}
            hideKeyboardShortcutsPanel /* info icon on calendar */
            // renderMonthElement = {renderMonthYearElement}
            isOutsideRange= {() => false} //to enable past date selection
            readOnly = {true} // Do not allow any keypress event
            verticalSpacing={0}
        />
    )
}