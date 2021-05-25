import React from 'react';


const CommentList = ({comments}) => {
    
    // const [comments, setComments] = useState([]);
    
    // const fetchData = async () => {
    
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    
    //     setComments(res.data);
    // };
    
    // useEffect(() => {
    //     fetchData();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

const renderedComments = comments.map(comment => {
    return (
        <li
            key={comment.id}>
            {comment.content}
        </li>
    );
});
    return (
      <ul>
        {renderedComments}
      </ul>    
    );
};
export default CommentList;