import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label>Title</label>
                   
                    <input className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
      </div>  
    );
}