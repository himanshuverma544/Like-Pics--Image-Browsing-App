import { useCallback } from "react";
import { useSelector } from "react-redux";

import  { Row, Col, Button } from "reactstrap";
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

const ButtonsPanel = () => {

  // const check = useSelector(state => state.globalDataReducer);

  // console.log(check);



  // const triggerThemeSwitcher = useCallback(() => {

  // });

  return(
    <div className="btns-panel">
      <div className="btns">
        <Button className="search panel-btn">
          <RiSearchLine className="panel-icon"/>
        </Button>
        <Button className="explore panel-btn ms-1">
          <MdOutlineExplore className="panel-icon"/>
        </Button>
        <Button className="saved panel-btn ms-1">
          <MdOutlineBookmarkAdded className="panel-icon"/>
        </Button>
        <Button className="theme panel-btn ms-1" onClick={triggerThemeSwitcher}>
          <MdOutlineLightMode className="panel-icon"/>
        </Button>
        <Button className="up panel-btn ms-1">
          <RiArrowUpSLine className="panel-icon"/>
        </Button>
      </div>
    </div>
  );
};

export default ButtonsPanel;