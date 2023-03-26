import { memo } from "react";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import ProgressiveImage from "react-progressive-graceful-image";
import { Hearts } from "react-loading-icons";
import randomColor from "randomcolor";


const ImagesShowCase = () => {

  const imagesToDisplay = useSelector(state => state.imagesReducer);

  return (
    <>
      {imagesToDisplay.map(imageToDisplay => (
        <Col className="py-3" key={imageToDisplay.id} sm={4} md={3}>
          <ProgressiveImage src={imageToDisplay.regular} placeholder={imageToDisplay.thumb}>
            {(src, loading) => (
              <div className="image-container position-relative" style={{backgroundColor : randomColor()}}>
                <Hearts className="hearts-loading-icon ms-3 position-absolute top-0 start-0" style={{ display : loading ? "block" : "none" }} stroke="#000"/>
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