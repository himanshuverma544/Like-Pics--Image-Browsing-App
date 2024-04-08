import { createPortal } from "react-dom";

import { memo } from "react";

import ProgressiveImage from "react-progressive-graceful-image";


const ViewImageModal = ({ imageIndexes: {i, j}, imagesData, viewImageModalNode, closeViewImageModal }) => {

  const image = imagesData[i].results[j];

  return createPortal(
    <div className="the-view-image-modal" onClick={event => closeViewImageModal(event)}>
      <ProgressiveImage src={image.urls.full} placeholder={image.urls.regular}>
        {(src, loading) => (
          <img ref={viewImageModalNode} src={src} alt={image.alt_description}/>
        )}
      </ProgressiveImage>
    </div>,
    document.getElementById("view-image-modal")
  );
}

export default ViewImageModal;