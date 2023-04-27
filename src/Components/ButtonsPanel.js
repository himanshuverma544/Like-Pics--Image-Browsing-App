import { useContext, useCallback, memo } from "react";

import { tsContext } from "../contextAPI/globalData/context";

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
  
  const switchTheme = useCallback(() => {
    states.setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  }, [states]);

  const scrollToTop = useCallback(() => 
    window.scrollTo(0,0)
  , []);

  const search = useCallback(() => {
    if (triggered) {
      scrollToTop();
      searchValueNode.current.focus();
    }
  }, [triggered, searchValueNode, scrollToTop]);

  return (
    triggered ? (
      <div className="btns-panel">
        <Button className="search panel-btn" onClick={search}>
          <RiSearchLine className="panel-icon"/>
        </Button>
        <Button className="explore panel-btn ms-1">
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
    ) : null
  );
};

export default memo(ButtonsPanel);