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
    themeIcon: {
      fill: "#000",
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
    themeIcon: {
      fill: "#FFF",
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