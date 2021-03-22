
import React, {useState} from 'react';

const Accordion = ( {items} ) => {
    //initialize state
    // array destructuring
    const [activeIndex, setActiveIndex]= useState(null);
    
    //Helper functions (this could get out of hand real quick)
    const onTitleClick = (index)=>{
        //console.log('Titled Clicked', index)
        setActiveIndex(index);
    };
    
    const renderedItems = items.map( (item,index) => {
        return (
            <React.Fragment key={item.title}>
                <div 
                    className="title active"
                    onClick={()=> onTitleClick(index)}
                    //{ ()=> console.log('Titled Clicked', index)}
                >
                <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className="content active">
                    <p>{item.content}</p>
                </div>
                </React.Fragment>
            );
            });
        return( 
                <div className="ui styled accordion">{renderedItems}
                <h1>{activeIndex}</h1>
                </div>
            );
        };   
export default Accordion;