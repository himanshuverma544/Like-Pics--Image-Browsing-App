import { useState, useEffect, useContext, memo } from "react";

import { tsContext } from "../contextAPI/globalData/context";
import { storeData } from "../contextAPI/globalData/action.creators";

import { Row, Col } from "reactstrap";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";

import getThemeStyles from "../assets/objects/getThemeStyles";


const ThemeSwitcher = () => {

  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem("localTheme");
    return localTheme ? localTheme : "dark";
  });
  const currentTheme = getThemeStyles[theme];

  const { tsData: { triggered }, tsDispatch: dispatch } = useContext(tsContext);

  useEffect(() => {
      function storeGlobalData() {
        dispatch(storeData({theme, setTheme}, "states"));
      }
      storeGlobalData();
  }, [theme, dispatch]);


  useEffect(() => {
    if (triggered) {
      function setLocalTheme() {
        localStorage.setItem("localTheme", theme);
      }
      setLocalTheme();
    }
  }, [triggered, theme]);


  useEffect(() => {

    if (triggered) {

      function switchTheme() {

        document.body.style.backgroundColor = currentTheme.body.backgroundColor;

        ["h1", "h6"].forEach(headingTags => {
          document.querySelectorAll(headingTags).forEach(element => 
            element.style.color = currentTheme.heading.textColor
          );
        });

        document.querySelectorAll('a').forEach(element => 
          element.style.color = currentTheme.links.color
        );

        document.querySelector(".theme-icon").style.fill = currentTheme.themeIcon.fill;

        document.querySelectorAll(".panel-btn").forEach(btn => {

          btn.style.backgroundColor = currentTheme.btnsPanelBtns.default.backgroundColor;
            
          btn.addEventListener("mouseover", () => 
            btn.style.backgroundColor = currentTheme.btnsPanelBtns.onHover.backgroundColor
          );
          
          btn.addEventListener("mouseout", () => 
            btn.style.backgroundColor = currentTheme.btnsPanelBtns.default.backgroundColor
          );
          
        });

        document.querySelectorAll(".panel-icon").forEach(icon =>
          icon.style.fill = currentTheme.btnsPanelBtnsIcons.fill
        );
        
        document.querySelectorAll(currentTheme.themeIcon.hideIconClassName).forEach(icon =>
          icon.style.display = "none"
        );

        document.querySelectorAll(currentTheme.themeIcon.showIconClassName).forEach(icon =>
          icon.style.display = "block"
        ); 
      }
      switchTheme();
    }
  }, [triggered, currentTheme]);


  return (
    triggered ? (
    <Row>
      <Col>
        <div onClick={() => setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark")}>
          <MdOutlineLightMode className="theme-icon light-theme-icon"/>
          <MdOutlineNightlight className="theme-icon dark-theme-icon"/> 
        </div> 
      </Col>
    </Row>
    ) : null
  );
};

export default memo(ThemeSwitcher);