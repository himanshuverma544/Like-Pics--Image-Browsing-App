import { useState, useEffect, memo } from "react";
import { Row, Col } from "reactstrap";
import { memoGetImage } from "../functions";
import getThemeStyles from "../assets/objects/getThemeStyles";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem("localTheme");
    return localTheme ? localTheme : "dark";
  });

  const currentTheme = getThemeStyles[theme];

  useEffect(() => {
    function setLocalTheme() {
      localStorage.setItem("localTheme", theme);
    }
    setLocalTheme();
  }, [theme]);

  useEffect(() => {
    function switchTheme() {
      document.body.style.backgroundColor = currentTheme.body.backgroundColor;
      ["h1", "h6"].forEach((headingTags) => {
        document.querySelectorAll(headingTags).forEach((element) => {
          element.style.color = currentTheme.heading.textColor;
        });
      });
    }
    switchTheme();
  }, [currentTheme]);

  return (
    <Row>
      <Col md={12}>
        <img
          className="theme-switch-icon"
          src={memoGetImage(currentTheme.img.name)}
          alt={currentTheme.img.alt}
          style={{ cursor: "pointer" }}
          onClick={() =>
            setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
          }
        />
      </Col>
    </Row>
  );
};

export default memo(ThemeSwitcher);
