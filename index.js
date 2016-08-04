"use strict";

const walk = require("walk").walkSync;
const proto = require("protobufjs");

const dir = __dirname + "/POGOProtos";

let builder = proto.newBuilder();

let map = {};
let names = [];
let types = {};

(function() {

  builder.importRoot = dir;

  walk(dir, {
    listeners: {
      file: function(root, stats, next) {
        proto.loadProtoFile(root + "/" + stats.name, builder);
        next();
      }
    }
  });

  types = builder.build();

  let walk_types = function(name, obj) {
    if (obj instanceof Function) {
      if (obj.encode !== void 0 && obj.decode !== void 0) {
        map[name] = obj;
        names.push(name);
      }
    }
    else if (typeof obj === "object") {
      Object.keys(obj).forEach(function(name) {
        if (!name.startsWith("encode") && !name.startsWith("decode")) {
          walk_types(`${name}.${name}`, obj[name]);
        }
      });
    }
  };

  walk_types("POGOProtos", types.POGOProtos);

})();

function info() {
  return (names);
};

function resolve(type) {
  return (map[type]);
};

function parse(buffer, type) {
  return (resolve(type).decode(buffer).toRaw());
};

function serialize(data, type) {
  return (resolve(type).encode(data));
};

module.exports = {
  info: info,
  types: types,
  resolve: resolve,
  parse: parse,
  serialize: serialize
};