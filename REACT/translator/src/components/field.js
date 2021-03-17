import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default({ label, value, onChange} ) =>{

    return(
        <div>
           <label>{label}</label>
                <input
                className="input"
                value={value}
                onChange={ e => onChange(e.target.value) }
                />
        </div>
        
    );
};
