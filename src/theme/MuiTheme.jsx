import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1AB168",
    },
    custom: {
        black400: "#4A4A4A",
        black300: "#BDBDBD",
        black200: "#5F5F5F",
    }
  },
  typography:{
    fontFamily: "Poppins"
  }
});

export default theme