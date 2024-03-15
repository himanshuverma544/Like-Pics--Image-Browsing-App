const getThemeStyles = {
  
  light: {
    body: {
      backgroundColor: "#FFF"
    },
    heading: {
      textColor: "#000",
    },
    links: {
      color: "#FFF"
    },
    navIcon: {
      fill: "#000"
    },
    themeIcon: {
      hideIconClassName: ".light-theme-icon",
      showIconClassName: ".dark-theme-icon"
    },
    btnsPanelBtns: {
      default: {
        backgroundColor: "#FFF",
      },
      onHover: {
        backgroundColor: "#BFBFBF"
      }
    },
    btnsPanelBtnsIcons: {
      fill: "#000"
    }
  },

  dark: {
    body: {
      backgroundColor: "#252525"
    },
    heading: {
      textColor: "#FFF",
    },
    links: {
      color: "#FFF"
    },
    navIcon: {
      fill: "#FFF"
    },
    themeIcon: {
      hideIconClassName: ".dark-theme-icon",
      showIconClassName: ".light-theme-icon"
    },
    btnsPanelBtns: {
      default: {
        backgroundColor: "#252525",
      },
      onHover: {
        backgroundColor: "#6c757d"
      }
    },
    btnsPanelBtnsIcons: {
      fill: "#FFF"
    }
  }
  
}

export default getThemeStyles;