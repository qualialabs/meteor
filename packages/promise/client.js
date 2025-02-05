import "./extensions.js";
import * as promise from "meteor-promise";
const _Promise = Promise;
promise.makeCompatible(_Promise);

export { _Promise as Promise };
