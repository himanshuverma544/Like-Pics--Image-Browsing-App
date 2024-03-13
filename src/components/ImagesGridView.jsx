import { Col } from "reactstrap";
import ProgressiveImage from "react-progressive-graceful-image";
import randomColor from "randomcolor";

import { Hearts } from "react-loading-icons";
import { AiOutlineHeart, AiFillHeart, AiOutlineDownload } from "react-icons/ai";
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from "react-icons/md";

import { useState, useRef, useCallback, forwardRef, memo } from "react";

import Axios from "axios";

import ViewImageModal from "./modals/ViewImageModal";

import { isClickedOutsideOfModal } from "../functions";

import { UNSPLASH_REFERRAL_PATH, UNSPLASH_URL, UNSPLASH_NAME } from "../constants";


const ImagesGridView = forwardRef(({ imagesData }, ref) => {


  const [showViewImageModal, setShowViewImageModal] = useState(null);
  const viewImageModalNode = useRef(null);


  const incrementDownloads = useCallback(imageID => {
    
    const URL = `https://api.unsplash.com/photos/${imageID}/download`;

    
    Axios.get(URL, {
      params: {
        client_id: import.meta.env.VITE_UNSPLASH_API_ACCESS_KEY
      },
    });
  }, []);


  const openViewImageModal = useCallback(imageIndexes =>
    setShowViewImageModal(imageIndexes)
  , []);

  const closeViewImageModal = useCallback(event => {
    if (isClickedOutsideOfModal(event, viewImageModalNode)) {
      setShowViewImageModal(null);
    }
  }, []);


  return ( 
    <> 
      {imagesData.map((imageData, i) => (
        imageData.results.map((image, j) => (
          <Col className="justify-content-center d-flex py-1 px-1" key={image.id} sm={6} md={4} lg={3}>
            <ProgressiveImage src={image.urls.regular} placeholder={image.urls.thumb}>
              {(src, loading) => (
                <div 
                  ref={imageData.results.length - 8 === j ? ref : ""} 
                  className="image-container d-flex justify-content-center" 
                  style={{backgroundColor : randomColor()}}
                  onClick={() => openViewImageModal({i, j})}
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
      ))}
      { showViewImageModal && 
        <ViewImageModal
          imageIndexes={showViewImageModal}
          imagesData={imagesData}
          viewImageModalNode={viewImageModalNode}
          closeViewImageModal={closeViewImageModal}
        />
      }
    </>
  );
});

export default memo(ImagesGridView);

// TODO : photos count and photographer count Counter