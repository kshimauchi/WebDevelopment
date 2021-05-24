import React,{useState, useEffect} from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const [posts, setPosts] = useState({});
    //When first displayed we call this in useEffect
    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4000/posts');
        setPosts(res.data);
    };
      
    //Run this function a single time
    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map(posts => {
        return (
            <div
                className="card"
                style={{ width: '30%', marginBotom: '20px' }}
                key={posts.id}
            >
                <div className="card-body">
                <h3>{posts.title}</h3>
                </div>
            </div>
        );
    });
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
};

