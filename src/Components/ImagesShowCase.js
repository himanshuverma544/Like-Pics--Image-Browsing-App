import { useCallback, memo } from "react";
import { useSelector } from "react-redux";

import Axios from "axios";

import { Row, Col } from "reactstrap";

import ProgressiveImage from "react-progressive-graceful-image";
import randomColor from "randomcolor";

import { Hearts } from "react-loading-icons";
import { AiOutlineHeart, /*AiFillHeart*/ AiOutlineDownload } from "react-icons/ai";
import { MdOutlineBookmarkAdd, /*MdOutlineBookmarkAdded*/ } from "react-icons/md";


const ImagesShowCase = () => {

  const imagesToDisplay = useSelector(state => state.imagesReducer);
  
  const incrementDownloads = useCallback(imageID => {
    
    const URL = `https://api.unsplash.com/photos/${imageID}/download`;

    Axios.get(URL, {
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY
      },
    });
  }, []);

  return (
    imagesToDisplay.length ? 
      imagesToDisplay.map(imageToDisplay => (
        <Col className="py-1 px-1 d-flex justify-content-center" key={imageToDisplay.id} sm={6} md={4} lg={3}>
          <ProgressiveImage src={imageToDisplay.urls.regular} placeholder={imageToDisplay.urls.thumb}>
            {(src, loading) => (
              <div className="image-container d-flex justify-content-center" style={{backgroundColor : randomColor()}}>
                <Hearts className="hearts-loading-icon ms-3" style={{ display : loading ? "block" : "none" }} stroke="#000"/>
                <div className="actions-on-img d-flex">
                  <div className="download">
                    <a 
                      href={imageToDisplay.actions.download} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={() => incrementDownloads(imageToDisplay.id)}
                    >
                      <AiOutlineDownload/>
                    </a>
                  </div>
                  <div className="likes d-flex flex-column align-items-center mt-2 mx-4">
                    <AiOutlineHeart className="heart-like"/>
                    <span className="count">{imageToDisplay.actions.likes}</span>
                  </div>
                  <div className="save">
                    <MdOutlineBookmarkAdd/>
                  </div>
                </div>
                <div className="attribution p-1">
                  {"Photo by "} 
                  <a 
                    href={imageToDisplay.photographer.profile} 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    {imageToDisplay.photographer.fullName}
                  </a> 
                  {" on "} 
                  <a 
                    href={imageToDisplay.unsplashUrl}
                    target="_blank" 
                    rel="noreferrer"
                  >
                    Unsplash
                  </a>
                </div>
                <img className="image" src={src} alt={imageToDisplay.alt}/>
              </div>
            )}
          </ProgressiveImage>
        </Col>
      ))   
    : null
  );
};

export default memo(ImagesShowCase);

// TODO : photos count and photographer count Counter