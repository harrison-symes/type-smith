"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const server = express();
server.use(express.static(path.join(__dirname, "../dist")));
exports.default = server;
//# sourceMappingURL=server.js.map