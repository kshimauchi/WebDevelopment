import React from 'react'

//TODO: finish later!
const CurrentTimeStamp = props=>{
 
    let tempDate = new Date();
        
    let date = tempDate.getFullYear() + '-' 
        + (tempDate.getMonth()+1) + '-' 
        + tempDate.getDate() +' '
        + tempDate.getHours()+':'
        + tempDate.getMinutes()+':'
        + tempDate.getSeconds();
        const currentStamp = "Curr Time: " + date;
    return(
        <div className="metadata">
           <span className="date">{ currentStamp }</span>
        </div>
    );
}
export default CurrentTimeStamp;