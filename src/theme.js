import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#6002ee" },
    secondary: { main: "#75e900" }
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
