if (! globalThis.process) {
  // TODO: support installed process, will require moving to it's own package and being CJS
  globalThis.process = {};
}

var proc = globalThis.process;

if (Meteor.isClient) {
  proc.platform = "browser";
  proc.nextTick = proc.nextTick || Meteor._setImmediate;
}

if (typeof proc.env !== "object") {
  proc.env = {};
}

var hasOwn = Object.prototype.hasOwnProperty;
for (var key in meteorEnv) {
  if (hasOwn.call(meteorEnv, key)) {
    proc.env[key] = meteorEnv[key];
  }
}
