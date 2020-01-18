import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const background = "#F4F4ED";

let theme = createMuiTheme({
  palette: {
    primary: { main: "#303f9f" },
    secondary: { main: "#B7ADCF" },
    background: { default: background },
    textPrimary: { main: "#B7ADCF" }
  },
  props: {
    MuiTextField: {
      margin: "normal",
      variant: "filled",
      fullWidth: true,
      color: "primary"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    },
    MuiPaper: {
      root: {
        textAlign: "center",
        padding: "10px"
      }
    },
    MuiInputLabel: {
      filled: {
        /*default didn't have enough contrast*/
        color: "#000000"
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
