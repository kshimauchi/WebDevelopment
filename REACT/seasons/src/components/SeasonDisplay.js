import '../SeasonDisplay.css'
import React from 'react'


/*Helper function: not to be confused as a component */
const seasonConfig = {
    summer:{
        text: "Let's hit the beach!",
        iconName: 'sun'
    },
    winter:{
        text: "Burr it's very chilly",
        iconName: 'snowflake'
    }
}

/*Depends on Hemispheres */
const getSeason = (lat, month)=>{
    //determines the season based on months and the hemispheres
    if(month > 2 && month < 9){
      return lat > 0 ? 'summer':'winter';
    } else {
        return lat > 0 ? 'winter': 'summer';
    }
};
// Component
function SeasonDisplay(props) {
    const season = getSeason(props.lat, new Date().getMonth());
    const {text, iconName} = seasonConfig[season] // {text, iconName}
   
    // the template string is part of the className
    return (
        <div className={`season-display ${season}`}>
            <i className={`icon-left massive ${iconName} icon`} />
            <h1>{text}</h1>
            <i className={`icon-right massive ${iconName} icon`} />
        </div>
    );
}
export default SeasonDisplay;