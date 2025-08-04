export default {
  "pb-66": { "padding-bottom": "66px" },
  "pt-120": { "padding-top": "120px" },

  "mobile:pb-66": {
    "@media (min-width: 300px) and (max-width: 767px)": {
      "padding-bottom": "66px",
    },
  },

  "desktop-landscape:text-3xl": {
    "@media (min-width: 1600px)": {
      "font-size": "1.875rem",
    },
  },

  "hover:bg-pink": {
    "&:hover": {
      "background-color": "#ff69b4",
    },
  },
};
