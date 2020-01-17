import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const background = "#F4F4ED";

let theme = createMuiTheme({
  palette: {
    primary: { main: "#303f9f" },
    secondary: { main: "#B7ADCF" },
    background: { default: background }
  },
  status: {
    danger: "orange"
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    },
    MuiPaper: {
      root: {
        textAlign: "center"
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
