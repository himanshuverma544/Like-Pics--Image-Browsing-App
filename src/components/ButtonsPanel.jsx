import { useContext, useEffect, useRef, useCallback, memo } from "react";

import { tsContext } from "../context-API/context";

import  { Button } from "reactstrap";

import { 
  MdExplore, MdOutlineExplore,
  MdOutlineLightMode, MdOutlineNightlight
} 
from "react-icons/md";
import { BsBookmarkCheckFill, BsBookmarkCheck } from "react-icons/bs";
import { RiSearchLine, RiArrowUpSLine } from "react-icons/ri";


const ButtonsPanel = () => {

  const { data: { triggered }, data: { states } } = useContext(tsContext);

  const btnsPanelNode = useRef(null);

  const searchValueNode = useRef(null);

  useEffect(() => {

    searchValueNode.current = document.getElementById("search-field");
  }, []);

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


  return ( 
    triggered &&
      <div className="btns-panel-container d-flex justify-content-center">
        <div className="btns-panel" ref={btnsPanelNode}>
          <Button className="search panel-btn" onClick={search}>
            <RiSearchLine className="panel-icon"/>
          </Button>
          <Button className="explore panel-btn active ms-1">
            <MdExplore className="panel-icon"/>
          </Button>
          <Button className="saved panel-btn ms-1">
            <BsBookmarkCheck className="panel-icon"/>
          </Button>
          <Button className="theme panel-btn ms-1" onClick={switchTheme}>
            {states.theme === "light" ?
              <MdOutlineNightlight className="dark-theme-icon panel-icon"/> : 
              <MdOutlineLightMode className="light-theme-icon panel-icon"/>
            }
          </Button>
          <Button className="up panel-btn ms-1" onClick={scrollToTop}>
            <RiArrowUpSLine className="panel-icon"/>
          </Button>
        </div>
      </div>
  );
};

export default ButtonsPanel;

// TODO: adding the sliding effect for button panel
