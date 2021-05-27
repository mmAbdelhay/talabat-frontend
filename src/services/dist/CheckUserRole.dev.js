"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRole = void 0;

var checkRole = function checkRole() {
  var role = sessionStorage.getItem("role") != null ? sessionStorage.getItem("role") : "";
  return role ? role : "";
};

exports.checkRole = checkRole;