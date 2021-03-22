
import React, {useState} from 'react';

const Accordion = ( {items} ) => {
    // initialize state
    // array destructuring shortcut for referencing
    // activeIndex is the value and setActiveIndex is a function
    // which changes the value
    const [activeIndex, setActiveIndex]= useState(null);
    
    //Helper functions (this could get out of hand real quick)
    const onTitleClick = (index)=>{
        //console.log('Titled Clicked', index)
        setActiveIndex(index);
    };
    
    const renderedItems = items.map( (item,index) => {
        //we want to expand selected activeIndex not have them already expanded
        //below we remove the className name 'active' on each and we will refactor
        //to make them active selected, that is, expanded
        const active = index === activeIndex ? 'active' : ''
        return (
            <React.Fragment key={item.title}>
                <div 
                    className={`title ${active}`}
                    onClick={()=> onTitleClick(index)}
                    //{ ()=> console.log('Titled Clicked', index)}
                >
                <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
                </React.Fragment>
            );
            });
        return( 
                <div className="ui styled accordion">
                    {renderedItems}
                </div>
            );
        };   
export default Accordion;