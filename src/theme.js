import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#303f9f" },
    secondary: { main: "#B7ADCF" }
  },
  status: {
    danger: "orange"
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    }
  }
});

export default theme;
