import React from 'react';

class ImageCard extends React.Component {
    constructor(props){
        super(props);
        this.state = { spans: 0 };
        this.imageReference = React.createRef();
    }
    //for loading purposes, this cant be accomplished
    //This is imageReference, imageReference.current.clientHeight
    // returns height 0 because, the picture hasn't loaded yet
    // so a work around, in the css...we are using a span value

    // console.log(this.imageReference); //grabs the ref
    // console.log(this.imageReference.current.clientHeight); //grabs the ref
    componentDidMount(){
        //callbacks
        this.imageReference.current.addEventListener('load', this.setSpans);
    }
    setSpans = () =>{
        const height =this.imageReference.current.clientHeight;

        const spans = Math.ceil(height / 10);

        this.setState({ spans });
    };
    render() {
        //destructured
        //ref is a jsx tag so check the ref system
        const {description, urls}= this.props.image;
        return (
            <div style={{gridRowEnd: `span ${this.state.spans}`}}>
                <img 
                ref={this.imageReference}
                alt={description}
                src={urls.regular}
                />
            </div>
        );
    }
}
export default ImageCard;