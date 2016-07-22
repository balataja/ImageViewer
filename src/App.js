import React, { Component } from 'react';
import './App.css';
import ImageGallery from "react-image-gallery";
var $ = require('jquery');

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          This is a showcase of image resize and a viewer I've been working on recently. Try resizing the screen and clicking around.
        </p>
        <ImageViewer />
      </div>
    );
  }
}

class ImageViewer extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleDismissModal = this.handleDismissModal.bind(this);
        this.render = this.render.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }
    
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }
    
    handleResize (e) {
        if ($('#imageModal:visible').length !== 0)
        {
            if (e.type === 'resize') 
            { 
                $('img', '.imageCard').map(function(){
                    resize.bind(this)();
                    return true;
                });
            } else if (e.type === 'load'){
                resize.bind(e.target)();
            }

            $('body').addClass('modal-scroll');

            function resize() {
                var maxHeight = $(window).height();
                var maxWidth = $(window).width();
                if (maxWidth > 720) { maxWidth = 720; }
                var ratio = 0;  // Used for aspect ratio
                var width = $(this).width();    // Current image width
                var height = $(this).height();  // Current image height

                if(height > maxHeight){
                    ratio = maxHeight / height; // get ratio for scaling image
                    $(this).css("height", maxHeight);
                    $(this).css("width", width*ratio);
                    height *= ratio;
                    width *= ratio;
                }
                if (width > maxWidth)
                {
                    ratio = maxWidth / width;
                    $(this).css("width", maxWidth);
                    $(this).css("height", height*ratio);
                    height *= ratio;
                } 
                
                if (height <= maxHeight && width <= maxWidth)
                {
                    if (maxHeight/height < maxWidth/width)
                    {
                        ratio = maxHeight / height;
                        $(this).css("height", maxHeight);
                        $(this).css("width", width*ratio);
                        height *= ratio;
                        width *= ratio;
                    }
                    else
                    {
                        ratio = maxWidth / width;
                        $(this).css("width", maxWidth);
                        $(this).css("height", height*ratio);
                        height *= ratio;
                    }
                }
            };
        }
    }
    
    handleDismissModal(e){
        $("#imageModal").fadeOut(300);
    }
    
    render()
    {
        const images = [
          {
            original: 'http://lorempixel.com/1000/600/nature/1/',
            thumbnail: 'http://lorempixel.com/250/150/nature/1/',
          },
          {
            original: 'http://lorempixel.com/1000/600/nature/2/',
            thumbnail: 'http://lorempixel.com/250/150/nature/2/'
          },
          {
            original: 'http://lorempixel.com/1000/600/nature/3/',
            thumbnail: 'http://lorempixel.com/250/150/nature/3/'
          }
        ]
        return (
            <div id="imageModal" className="modal" style={{display:'block'}}>
                <div className="modal-overlay" onClick={this.handleDismissModal}></div>
                    <div className="imageCard" >
                        <button className="modal-close" onClick={this.handleDismissModal}></button>
                        <ImageGallery
                            items={images}
                            showThumbnails={false}
                            lazyLoad={true}
                            showBullets={true}
                            onImageLoad={this.handleResize}
                        />
                    </div>
            </div>
        );
    }   
}

export default App;
