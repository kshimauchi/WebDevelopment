import React from 'react';
import Modal from '../Modal';

const StreamDelete = ()=>{
    //cannot just pass two seperate functions in the divs in makes the buttons 
    //not valid syntax, have to use a fragment React.Fragment allows
    //one to wrap these buttons or you can use <></>
    const actions = (
        <React.Fragment>
           <button className="ui button negative">Delete</button>
            <button className="ui button">Cancel</button>
        </React.Fragment>
    );
    return (
        <div>
            StreamDelete
            <Modal 
                title= "Delete Stream"
                content="Are you sure you want to delete this stream?"
                actions={actions}
            />
        </div>
    );
};
export default StreamDelete;