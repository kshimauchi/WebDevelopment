import {useState, useEffect,useRef} from 'react';

const Dropdown =  ({options, selected, onSelectedChange})=> {
    
    const[open, setOpen] = useState(false);
    const ref = useRef();  //reference to parent element ui-form
    //one-time event listener
    //we want it to close, but this remains open
    //Body, item, dropdown click listener order
    //all event which use body addEventListener are invoked first
    //followed by the react event listeners from most child to most parent
    //event bubbling, what element was clicked and whether the element
    //was clicked was in the dropdown
    useEffect(()=>{
        //assigned to top  element ui-form
        document.body.addEventListener('click',(event)=>{
            //tells what is contained in the dom component
            // null with changes in app.js
        
            if(ref.current.contains(event.target)){
                return;
            }
            setOpen(false);
        });
        //clean up function, or turn off the event listener
        return () =>{
            
        };
    }, []);


    const renderedOptions = options.map((option)=>{
        //Currently selected item will not be displayed
        // as it returns null
        if(option.value === selected.value){
            return null;
        }
        return(
            <div 
                key={option.value} 
                className="item"
                onClick={ ()=>onSelectedChange(option)}
                >    
                {option.label}
            </div>
        );
    });
    
    return(
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">Select a Color</label>
            <div 
                onClick={()=>setOpen(!open)} 
                className={`ui selection dropdown ${open ?'visible active':''}`}
                >
                <i className="dropdown icon"></i>            
                
                <div className="text">{selected.label}</div>
                
                <div className={`menu ${open ? 'visible transition' : ''}`}>
                    {renderedOptions}
                </div>
            
            </div>
            </div>
        </div>
    );
};
export default Dropdown;