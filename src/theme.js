import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // 黑色為主色
      contrastText: '#ffffff', // 白色字
    },
    secondary: {
      main: '#ffffff', // 可以視情況設定第二色
    },
  },
});

export default theme;