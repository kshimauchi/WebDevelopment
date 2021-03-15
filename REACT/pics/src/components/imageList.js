import './ImageList.css';
import React from 'react';
import ImageCard from './ImageCard';

// We need to use keys for any type of list in React
// behind the scenes we need the list, which has 
// a list of div's but there is already a div in the dom
// we need key prop for each item we are renddering
const ImageList = props => {
    //destructuring image
    const images = props.images.map( (image)=> {
        // eslint-disable-next-line jsx-a11y/alt-text
        return <ImageCard  key= { image.id } image={ image }  />;
    });
    return <div className="image-list">{images}</div>
};
export default ImageList;