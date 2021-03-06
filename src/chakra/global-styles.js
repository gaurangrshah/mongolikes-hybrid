export const styles = {
  global: (props) => ({
    ".js-focus-visible": {
      /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
    */
      outline: "none",
      boxShadow: "none",
    },
    "@fontFace": {
      fontFamily: "radnika_next",
      src: "url('/static/radnikanext-medium-webfont.woff2') format('woff2')",
      fontWeight: "normal",
      fontStyle: "normal",
    },
    "*": {
      border: 0,
      margin: 0,
      padding: 0,
      fontFeatureSettings: `'kern'`,
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased",
      borderColor: "currentColor",
    },
    "*, *::before, *::after": {
      borderColor: "gray.500",
      boxSizing: "border-box",
      wordWrap: "break-word",
    },
    "*::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.2)",
      borderRadius: "10px",
      backgroundColor: "transparent",
    },
    "*::-webkit-scrollbar": {
      width: "9px",
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundColor: "gray.300",
    },
    "html, body": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      scrollBehavior: "smooth",
      width: "100%",
      height: "100%",
      // fontSize: "100%", // == 16px
      fontSize: "85.2%", // == 10px
      overflowX: "hidden",
    },
    body: {
      position: "relative",
      maxW: "full",
      fontFamily: "body",
      fontSize: "1.5rem",
      lineHeight: 2,
      textRendering: "optimizeLegibility",
      "h1, h2, h3, h4, h5": {
        fontFamily: "heading",
      },
      p: {
        fontFamily: "body",
      },
      color: "gray.600",
    },
    "*::placeholder": {
      color: "gray.500",
    },
    "input:focus": {
      border: "inherit",
    },
    "input:focus:invalid": {
      backround: "rgba(255, 224, 224, 1)",
    },
    "input:focus, input:focus:valid": {
      backround: "rgba(226, 250, 219, 1)",
    },
    "a:active, a:focus, a:visited": {
      outline: 0,
      border: "none",
      outlineStyle: "none",
      textDecoration: "none",
      boxShadow: "0 0 0 1px rgba(0, 0, 0, 0) !important",
    },
    "a:hover": {
      textDecoration: "underline",
    },
    a: {
      textDecoration: "none",
      color: "gray.600",
    },
    button: {
      fontFamily: "body",
    },
  }),
};
