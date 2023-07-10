import { useState, useEffect, useContext, memo } from "react";

import { tsContext } from "../context";
import { storeData } from "../actions/action.creators";

import { Row, Col } from "reactstrap";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";

import { DARK_THEME, LIGHT_THEME } from "../constants";
import getThemeStyles from "../assets/objects/getThemeStyles";

const ThemeSwitcher = () => {

  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem("localTheme");
    return localTheme ? localTheme : DARK_THEME;
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

        ["h1", "h6"].forEach(headingTags => 
          document.querySelectorAll(headingTags).forEach(element => 
            element.style.color = currentTheme.heading.textColor
          )
        );

        document.querySelectorAll('a').forEach(element => 
          element.style.color = currentTheme.links.color
        );

        document.querySelectorAll(".nav-icon").forEach(navIcon => 
          navIcon.style.fill = currentTheme.navIcon.fill
        );
        
        document.querySelectorAll(currentTheme.themeIcon.hideIconClassName).forEach(icon =>
          icon.style.display = "none"
        );

        document.querySelectorAll(currentTheme.themeIcon.showIconClassName).forEach(icon =>
          icon.style.display = "block"
        );

        document.querySelectorAll(".panel-icon").forEach(icon =>
          icon.style.fill = currentTheme.btnsPanelBtnsIcons.fill
        );

        document.querySelectorAll(".panel-btn").forEach(btn => {

          btn.style.backgroundColor = currentTheme.btnsPanelBtns.default.backgroundColor;
            
          btn.addEventListener("mouseover", () => 
            btn.style.backgroundColor = currentTheme.btnsPanelBtns.onHover.backgroundColor
          );
          
          btn.addEventListener("mouseout", () => 
            btn.style.backgroundColor = currentTheme.btnsPanelBtns.default.backgroundColor
          );
        });
      }
      switchTheme();
    }
  }, [triggered, currentTheme]);


  return ( triggered &&
    <div onClick={() => setTheme(prevTheme => prevTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME)}>
      <MdOutlineLightMode className="nav-icon theme-icon light-theme-icon me-4"/>
      <MdOutlineNightlight className="nav-icon theme-icon dark-theme-icon me-4"/> 
    </div> 
  );
};

export default memo(ThemeSwitcher);