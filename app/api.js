"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dockerController_1 = require("./dockerController");
var Api = /** @class */ (function () {
    function Api() {
        this.app = express_1.default();
    }
    Api.prototype.Init = function () {
        this.app.get("/GetCurrentHostsOfService", this.getCurrentHostsOfService);
        this.app.listen(9999, function () {
            console.log("listening on port 9999");
        });
    };
    Api.prototype.getCurrentHostsOfService = function (req, res) {
        res.send({ hosts: dockerController_1.docker_controller.GetCurrentHostsOfService(req.query.serviceName) });
    };
    return Api;
}());
exports.Api = Api;
exports.api = new Api();
//# sourceMappingURL=api.js.map