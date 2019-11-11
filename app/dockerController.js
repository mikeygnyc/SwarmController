"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = __importDefault(require("./config.json"));
var dockerode_1 = __importDefault(require("dockerode"));
var async_1 = __importDefault(require("async"));
var DockerController = /** @class */ (function () {
    function DockerController() {
        this.dockerApis = new Array();
        this.Services = new Map();
        this.Tasks = new Map();
        this.Containers = new Map();
        this.Nodes = new Map();
    }
    DockerController.prototype.Init = function () {
        var _this = this;
        config_json_1.default.dockerConfigs.forEach(function (cfg) {
            var docker = new dockerode_1.default({
                protocol: cfg.protocol,
                host: cfg.host,
                port: cfg.port,
                socketPath: cfg.socketPath ? cfg.socketPath : undefined
            });
            _this.dockerApis.push(docker);
        });
    };
    DockerController.prototype.GetServices = function (callback) {
        async_1.default.forEachSeries(this.dockerApis, this._ListServices.bind(this), callback);
    };
    DockerController.prototype._ListServices = function (api, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var apiSvc, _i, apiSvc_1, svc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.listServices()];
                    case 1:
                        apiSvc = _a.sent();
                        for (_i = 0, apiSvc_1 = apiSvc; _i < apiSvc_1.length; _i++) {
                            svc = apiSvc_1[_i];
                            this.Services.set(svc.ID, svc);
                        }
                        callback();
                        return [2 /*return*/];
                }
            });
        });
    };
    DockerController.prototype.GetTasks = function (callback) {
        async_1.default.forEachSeries(this.dockerApis, this._ListTasks.bind(this), callback);
    };
    DockerController.prototype._ListTasks = function (api, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var apiTask, _i, apiTask_1, tsk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.listTasks()];
                    case 1:
                        apiTask = _a.sent();
                        for (_i = 0, apiTask_1 = apiTask; _i < apiTask_1.length; _i++) {
                            tsk = apiTask_1[_i];
                            this.Tasks.set(tsk.ID, tsk);
                        }
                        callback();
                        return [2 /*return*/];
                }
            });
        });
    };
    DockerController.prototype.GetContainers = function (callback) {
        async_1.default.forEachSeries(this.dockerApis, this._ListContainers.bind(this), callback);
    };
    DockerController.prototype._ListContainers = function (api, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var apiCont, _i, apiCont_1, cont;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.listContainers()];
                    case 1:
                        apiCont = _a.sent();
                        for (_i = 0, apiCont_1 = apiCont; _i < apiCont_1.length; _i++) {
                            cont = apiCont_1[_i];
                            this.Containers.set(cont.Id, cont);
                        }
                        callback();
                        return [2 /*return*/];
                }
            });
        });
    };
    DockerController.prototype.GetNodes = function (callback) {
        async_1.default.forEachSeries(this.dockerApis, this._ListNodes.bind(this), callback);
    };
    DockerController.prototype._ListNodes = function (api, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var apiNodes, _i, apiNodes_1, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.listNodes()];
                    case 1:
                        apiNodes = _a.sent();
                        for (_i = 0, apiNodes_1 = apiNodes; _i < apiNodes_1.length; _i++) {
                            node = apiNodes_1[_i];
                            this.Nodes.set(node.ID, node);
                        }
                        callback();
                        return [2 /*return*/];
                }
            });
        });
    };
    DockerController.prototype.GetCurrentHostsOfService = function (serviceName) {
        var retVal = new Array();
        var all_services = Array.from(this.Services.values());
        var service = all_services.find(function (val) {
            return val.Spec.Name === serviceName;
        });
        var servArr = new Array();
        if (service) {
            var all_tasks = Array.from(this.Tasks.values());
            var tasks = all_tasks.filter(function (val) {
                return (val.ServiceID === service.ID &&
                    val.Status.State === "running");
            });
            if (tasks) {
                var nodeIds_1 = tasks.map(function (tsk) {
                    return tsk.NodeID;
                });
                if (nodeIds_1) {
                    var all_nodes = Array.from(this.Nodes.values());
                    var vals = all_nodes.filter(function (node) {
                        return nodeIds_1.includes(node.ID);
                    }).map(function (node) { return node.Status.Addr; });
                    if (vals) {
                        retVal = vals ? vals : [];
                    }
                }
            }
        }
        return retVal;
    };
    return DockerController;
}());
exports.DockerController = DockerController;
exports.docker_controller = new DockerController();
//# sourceMappingURL=dockerController.js.map