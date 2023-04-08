import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import ProgressiveImage from "react-progressive-graceful-image";
import { Hearts } from "react-loading-icons";
import { AiOutlineHeart, /*AiFillHeart*/ AiOutlineDownload } from "react-icons/ai";
import { MdOutlineBookmarkAdd, /*MdOutlineBookmarkAdded*/ } from "react-icons/md";
import randomColor from "randomcolor";
import Axios from "axios";


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
    <>
      {imagesToDisplay.map(imageToDisplay => (
        <Col className="py-3" key={imageToDisplay.id} sm={4} md={3}>
          <ProgressiveImage src={imageToDisplay.urls.regular} placeholder={imageToDisplay.urls.thumb}>
            {(src, loading) => (
              <div className="image-container position-relative d-flex justify-content-center align-items-center" style={{backgroundColor : randomColor()}}>
                <Hearts className="hearts-loading-icon ms-3 position-absolute top-0 start-0" style={{ display : loading ? "block" : "none" }} stroke="#000"/>
                <div className="actions-on-img position-absolute d-flex fs-4 text-white">
                  <div className="download">
                    <a 
                      href={imageToDisplay.download} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={() => incrementDownloads(imageToDisplay.id)}
                    >
                      <AiOutlineDownload/>
                    </a>
                  </div>
                  <div className="likes d-flex flex-column align-items-center mt-2 mx-5">
                    <AiOutlineHeart className="heart-like"/>
                    <span className="count fs-6 text-white">{imageToDisplay.likes}</span>
                  </div>
                  <div className="save">
                    <MdOutlineBookmarkAdd className=""/>
                  </div>
                </div>
                <div className="attribution position-absolute bottom-0 p-1 text-white">
                  Photo by <a href="#">Annie Spratt</a> on <a href="#">Unsplash</a>
                </div>
                <img className="image" src={src} alt={imageToDisplay.alt}/>
              </div>
            )}
          </ProgressiveImage>
        </Col>
      ))}    
    </>  
  );
};

export default memo(ImagesShowCase);

// TODO : Like Counter