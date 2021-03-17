import ReactDOM from 'react-dom'
import React from 'react'
import faker from 'faker'

import CommentDetail from './components/CommentDetail';
import ApprovalCard from './components/ApprovalCard';

const App = () =>{
  
  return (
    
    <div className="ui container comments">
      <ApprovalCard>
        <div>
          <h4>Warning</h4>
          Are you sure you want to do this!
        </div>
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail 
          author="Sam" 
          timeAgo="Today at 1:00 PM"
          content="Nice blog post" 
          avatar={faker.image.animals()}
        />
      </ApprovalCard> 
      
      <ApprovalCard>     
        <CommentDetail 
        author="Jane" 
        timeAgo= "Today at 2:00AM"
        content="I like the subject"
        avatar={faker.image.city()}
        />
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetail 
        author="Godzilla" 
        timeAgo= "Today at 2:00AM"
        content="What the hell"
        avatar={faker.image.sports()}
        />
      </ApprovalCard>
    </div>
  );
  };

ReactDOM.render(<App />, document.getElementById("root"));
// https://semantic-ui.com/
// When we show a component we use the component
