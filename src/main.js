import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/main";
import "./scripts/parallax";
import "./scripts/reviews";
import "./scripts/works";
import "./scripts/skills";
import "./scripts/validation";

import validator from "./scripts/validation";

// window.addEventListener('load', () => {
//   validator.init('#feedback-form');
// })