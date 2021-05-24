import React,{useState} from 'react';
import axios from 'axios';

//Functional Component
const CommentCreate = ({postId}) => {
    
    //We need to pass the postId which is on a props
    const [content, setContent] = useState('');
    
    //onSubmit for form
    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        
        });
        //clears the comment for visibility reuse
        setContent('');
    };
    return (
    <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>New Comment</label>
                <input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="form control" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>    
    );
};
export default CommentCreate;