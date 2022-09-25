import Fiber from "fibers";
import "./extensions.js";
import * as promise from "meteor-promise";
import { setMinimumBrowserVersions } from "meteor/modern-browsers";
promise.makeCompatible(Promise, Fiber);

// Reference: https://caniuse.com/#feat=promises
setMinimumBrowserVersions({
  chrome: 32,
  edge: 12,
  // Since there is no IE12, this effectively excludes Internet Explorer
  // (pre-Edge) from the modern classification. #9818 #9839
  ie: 12,
  firefox: 29,
  mobileSafari: 8,
  opera: 20,
  safari: [7, 1],
  // https://github.com/Kilian/electron-to-chromium/blob/master/full-versions.js
  electron: [0, 20],
}, module.id);
