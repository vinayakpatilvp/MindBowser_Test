import React from 'react';
import './searchInput.css'

export default function TextInput({ id, error, type, divClass, spanCallback1,spanCallback2, ...props }) {
    return (
        <div class="input-group">
            <input {...props} type={type || "text"} id={id} />
        
                <div class="input-group-append">
                  <button class="btn btn-secondary" type="button" onClick={e => spanCallback2(e)}>
                    <i title="clear"  class="fa fa-search"></i>
                  </button>
                  <button class="btn btn-secondary" type="button" onClick={e => spanCallback1(e)}>
                  <i title="search" class="fa fa-times"></i>
                  </button>
                </div>
            {error && <span className="error"> {error} </span>}
        </div>
    );
}