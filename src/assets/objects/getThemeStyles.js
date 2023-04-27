const getThemeStyles = {
  
  light: {
    body: {
      backgroundColor: "#FFF"
    },
    heading: {
      textColor: "#000",
    },
    themeIcon: {
      fill: "#000",
      hideIconClassName: ".light-theme-icon",
      showIconClassName: ".dark-theme-icon"
    },
    btnsPanelOpenIcon: {
      backgroundColor: "#FFF",
      stroke: "#252525"
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
    themeIcon: {
      fill: "#FFF",
      hideIconClassName: ".dark-theme-icon",
      showIconClassName: ".light-theme-icon"
    },
    btnsPanelOpenIcon: {
      backgroundColor: "#252525",
      stroke: "#FFF"
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