import { useContext, useEffect, useRef, useCallback, memo } from "react";

import { tsContext } from "../context";

import  { Button } from "reactstrap";
import { 
  MdOutlineExplore, MdExplore, 
  MdOutlineBookmarkAdded, MdBookmarkAdded,
  MdOutlineLightMode, MdOutlineNightlight
} 
from "react-icons/md";
import { 
  RiSearchLine, RiSearchFill, 
  RiArrowUpSLine 
} 
from "react-icons/ri";


const ButtonsPanel = ({ nodes: { searchValueNode } }) => {

  const { tsData: { triggered }, tsData: { states } } = useContext(tsContext);

  const btnsPanelNode = useRef(null);
  

  const isElementInViewport = useCallback(element => {
    const rect = element.getBoundingClientRect();
    return rect.top <= 40;
  }, []);

  const showHideBtnPanel = useCallback(() => {
    const imagesShowCaseEle = document.querySelector(".images-showcase-row");
    btnsPanelNode.current.style.display = isElementInViewport(imagesShowCaseEle) ? "block" : "none";
  }, [btnsPanelNode, isElementInViewport]);

  useEffect(()=> {

    if (triggered) {

      function addingEventListener() {
        window.addEventListener("scroll", showHideBtnPanel);
      }
      addingEventListener();

      return () => {
        window.removeEventListener("scroll", showHideBtnPanel);
      }
    }
  }, [triggered, showHideBtnPanel]);


  const switchTheme = useCallback(() => {
    states.setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  }, [states]);


  const scrollToTop = useCallback(() => 
    window.scrollTo(0,0)
  , []);


  const search = useCallback(() => {
    scrollToTop();
    searchValueNode.current.focus();
  }, [searchValueNode, scrollToTop]);


  return ( triggered &&
    <div className="btns-panel" ref={btnsPanelNode}>
      <Button className="search panel-btn" onClick={search}>
        <RiSearchLine className="panel-icon"/>
      </Button>
      <Button className="explore panel-btn active ms-1">
        <MdOutlineExplore className="panel-icon"/>
      </Button>
      <Button className="saved panel-btn ms-1">
        <MdOutlineBookmarkAdded className="panel-icon"/>
      </Button>
      <Button className="theme panel-btn ms-1" onClick={switchTheme}>
        <MdOutlineLightMode className="panel-icon light-theme-icon"/>
        <MdOutlineNightlight className="panel-icon dark-theme-icon"/>
      </Button>
      <Button className="up panel-btn ms-1" onClick={scrollToTop}>
        <RiArrowUpSLine className="panel-icon"/>
      </Button>
    </div>
  );
};

export default memo(ButtonsPanel);

// TODO: adding the sliding effect for button panel
