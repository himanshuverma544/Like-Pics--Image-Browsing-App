import { useContext } from "react";

import globalDataContext from "../contextAPI/globalData/context";

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

const ButtonsPanel = () => {

  const { globalData: {states} } = useContext(globalDataContext);

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
        <Button className="theme panel-btn ms-1">
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