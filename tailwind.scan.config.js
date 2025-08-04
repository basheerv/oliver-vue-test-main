import customUtilities from "./tailwind.utilities.js";
export default {
  outputDir: "./build",
  sections: {
    dashboard: ["./src/views/dashboard/**/*.vue", "./src/components/charts/*.vue"],
    auth: ["./src/views/auth/**/*.vue", "./src/components/forms/**/*.vue"],
    profile: ["./src/views/user/Profile.vue"],
  },
  customUtilities,
};
