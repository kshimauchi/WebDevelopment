import React from 'react';
import ReactDom from 'react-dom';
//want to nest this to the body element
const Modal = (props) =>{
    
    return ReactDom.createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
                portal modal
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;