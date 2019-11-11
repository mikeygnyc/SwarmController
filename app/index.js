"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dockerController_1 = require("./dockerController");
var api_1 = require("./api");
var doneCt = 0;
function main() {
    dockerController_1.docker_controller.Init();
    dockerController_1.docker_controller.GetServices(gotServices);
    dockerController_1.docker_controller.GetNodes(gotNodes);
    dockerController_1.docker_controller.GetContainers(gotContainers);
    dockerController_1.docker_controller.GetTasks(gotTasks);
}
function gotServices() {
    dockerController_1.docker_controller.Services.forEach(function (value) {
        console.log(value.Spec.Name);
    });
    done();
}
function done() {
    doneCt++;
    if (doneCt === 4) {
        StartAPI();
        test();
    }
}
function gotNodes() {
    dockerController_1.docker_controller.Nodes.forEach(function (value) {
        console.log(value.Description.Hostname);
    });
    done();
}
function gotContainers() {
    dockerController_1.docker_controller.Containers.forEach(function (value) {
        // console.log(value.Id);
        value.Names ? console.log(value.Names[0]) : "";
    });
    done();
}
function gotTasks() {
    dockerController_1.docker_controller.Tasks.forEach(function (value) {
        // console.log(value.ID);
        // console.log(value.NodeID);
        // console.log(value.ServiceID);
        console.log(value.Spec.ContainerSpec.Image);
    });
    done();
}
function StartAPI() {
    api_1.api.Init();
}
function test() {
    console.log(dockerController_1.docker_controller.GetCurrentHostsOfService("galesnet_huemqttbridge"));
    console.log(dockerController_1.docker_controller.GetCurrentHostsOfService("portainer_agent"));
}
main();
//# sourceMappingURL=index.js.map