import { Col } from "reactstrap";
import ProgressiveImage from "react-progressive-graceful-image";
import randomColor from "randomcolor";

import { Hearts } from "react-loading-icons";
import { AiOutlineHeart, AiFillHeart, AiOutlineDownload } from "react-icons/ai";
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from "react-icons/md";

import { useEffect, useReducer, useCallback, forwardRef, memo } from "react";

import imagesDataArrReducer from "../reducers/imagesGridView";
import { handleImages } from "../actions/action.creators";

import Axios from "axios";

import { UNSPLASH_REFERRAL_PATH, UNSPLASH_URL, UNSPLASH_NAME } from "../constants";


const ImagesGridView = forwardRef(({ newImagesData }, ref) => {


  const [imagesDataArr, dispatch] = useReducer(imagesDataArrReducer, []);


  useEffect(() =>  {
    
    function handlingImages() {
      dispatch(handleImages(newImagesData));
    }
    handlingImages();

  }, [newImagesData]);


  const incrementDownloads = useCallback(imageID => {
    
    const URL = `https://api.unsplash.com/photos/${imageID}/download`;

    Axios.get(URL, {
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY
      },
    });
  }, []);


  return ( imagesDataArr.length ? 
    imagesDataArr.map((image, index) => (
      <Col className="justify-content-center d-flex py-1 px-1" key={image.id} sm={6} md={4} lg={3}>
        <ProgressiveImage src={image.urls.regular} placeholder={image.urls.thumb}>
          {(src, loading) => (
            <div 
              ref={imagesDataArr.length - 8 === index ? ref : ""} 
              className="image-container d-flex justify-content-center" 
              style={{backgroundColor : randomColor()}}
            >
              <Hearts className="hearts-loading-icon ms-3" style={{ display: loading ? "block" : "none" }} stroke="#000"/>
              <div className="actions-on-img d-flex">
                <div className="download">
                  <a 
                    href={image.links.download} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={() => incrementDownloads(image.id)}
                  >
                    <AiOutlineDownload/>
                  </a>
                </div>
                <div className="likes d-flex flex-column align-items-center mt-2 mx-4">
                  <AiOutlineHeart className="heart-like"/>
                  <span className="count">{image.likes}</span>
                </div>
                <div className="save">
                  <MdOutlineBookmarkAdd/>
                </div>
              </div>
              <div className="attribution p-1">
                {"Photo by "} 
                <a 
                  href={`${image.links.html}${UNSPLASH_REFERRAL_PATH}`}
                  target="_blank" 
                  rel="noreferrer"
                >
                  {image.user.name}
                </a> 
                {" on "} 
                <a 
                  href={UNSPLASH_URL}
                  target="_blank" 
                  rel="noreferrer"
                >
                  {UNSPLASH_NAME}
                </a>
              </div>
              <img className="image" src={src} alt={image.alt_description}/>
            </div>
          )}
        </ProgressiveImage>
      </Col>
    ))
  : null );
});

export default memo(ImagesGridView);

// TODO : photos count and photographer count Counter