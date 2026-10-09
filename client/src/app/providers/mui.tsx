
"use client";

import type { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#B8F34A",
      dark: "#83B52B",
      light: "#D8F9A3",
      contrastText: "#000000",
    },

    secondary: {
      main: "#202020",
      dark: "#111111",
      light: "#4B4B4B",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#2E9D46",
      light: "#E7F6E9",
      dark: "#207535",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#F2A900",
      light: "#FFF4D6",
      dark: "#BD790A",
      contrastText: "#000000",
    },

    error: {
      main: "#D93636",
      light: "#FDE8E8",
      dark: "#B42323",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#269CA3",
      light: "#E1F5F5",
      dark: "#18777D",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#FFFFFF",
      paper: "#F7F7F5",
    },

    text: {
      primary: "#000000",
      secondary: "#4B4B4B",
      disabled: "#777777",
    },

    divider: "#D6D6D3",
  },

  spacing: 8,

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily:
      '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    h1: {
      fontWeight: 700,
      color: "#000000",
    },
    h2: {
      fontWeight: 700,
      color: "#000000",
    },
    h3: {
      fontWeight: 700,
      color: "#000000",
    },
    h4: {
      fontWeight: 700,
      color: "#000000",
    },
    h5: {
      fontWeight: 600,
      color: "#000000",
    },
    h6: {
      fontWeight: 600,
      color: "#000000",
    },
    body1: {
      color: "#000000",
    },
    body2: {
      color: "#4B4B4B",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#fffee9",
          color: "#000000",
        },

        "*::selection": {
          backgroundColor: "#D8F9A3",
          color: "#000000",
        },

        "input, textarea": {
          color: "#000000",
        },

        "input::placeholder, textarea::placeholder": {
          color: "#666666",
          opacity: 1,
        },

        a: {
          color: "#202020",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: "10px 22px",
          fontWeight: 600,
          transition: "all 0.2s ease",
        },

        containedPrimary: {
          backgroundColor: "#B8F34A",
          color: "#000000",

          "&:hover": {
            backgroundColor: "#A5E635",
          },

          "&.Mui-disabled": {
            backgroundColor: "#E5E5E5",
            color: "#777777",
          },
        },

        containedSecondary: {
          backgroundColor: "#202020",
          color: "#FFFFFF",

          "&:hover": {
            backgroundColor: "#111111",
          },
        },

        outlined: {
          borderWidth: 1.5,
          borderColor: "#202020",
          color: "#000000",
          backgroundColor: "transparent",

          "&:hover": {
            borderWidth: 1.5,
            borderColor: "#202020",
            backgroundColor: "#F0F0F0",
          },

          "&.Mui-disabled": {
            borderColor: "#D6D6D3",
            color: "#777777",
          },
        },

        text: {
          color: "#202020",

          "&:hover": {
            backgroundColor: "#F0F0F0",
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "#FFFFFF",
          color: "#000000",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#BDBDBD",
            borderWidth: 1.2,
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#202020",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#83B52B",
            borderWidth: 2,
          },

          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D93636",
          },
        },

        input: {
          color: "#000000",
          padding: "14px 16px",

          "&::placeholder": {
            color: "#666666",
            opacity: 1,
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#4B4B4B",

          "&.Mui-focused": {
            color: "#202020",
          },

          "&.Mui-error": {
            color: "#D93636",
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 2,
          color: "#4B4B4B",

          "&.Mui-error": {
            color: "#D93636",
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#4B4B4B",

          "&.Mui-checked": {
            color: "#83B52B",
          },
        },
      },
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#4B4B4B",

          "&.Mui-checked": {
            color: "#83B52B",
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "#83B52B",

            "& + .MuiSwitch-track": {
              backgroundColor: "#B8F34A",
              opacity: 1,
            },
          },
        },

        track: {
          backgroundColor: "#BDBDBD",
          opacity: 1,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "#F7F7F5",
          border: "1px solid #E5E5E3",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.04)",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#000000",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: "#202020",
          textDecorationColor: "#83B52B",

          "&:hover": {
            color: "#83B52B",
          },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#D6D6D3",
        },
      },
    },
  },
});

export const MUIProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default theme;