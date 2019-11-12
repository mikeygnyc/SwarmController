import Docker from "dockerode";
import { IDockerService } from "./dockerServiceInterfaces";
import { docker_controller } from "./dockerController";
import { IDockerTask } from "./dockerTaskInterfaces";
import { IDockerNode } from "./dockerNodeInterfaces";
import { api } from "./api";
let doneCt:number=0;
function main() {
    docker_controller.Init();
    docker_controller.GetServices(gotServices);
    docker_controller.GetNodes(gotNodes);
    docker_controller.GetContainers(gotContainers);
    docker_controller.GetTasks(gotTasks);
}
function gotServices() {
    docker_controller.Services.forEach((value: IDockerService) => {
        console.log(value.Spec.Name);
    });
    done();
}
function done() {
    doneCt++;
    if (doneCt === 4) {
        docker_controller.StartCleaner();
        StartAPI();
        test();
    }
}

function gotNodes() {
    docker_controller.Nodes.forEach((value: IDockerNode) => {
        console.log(value.Description.Hostname);
    });
    done();
}
function gotContainers() {
    docker_controller.Containers.forEach((value: Docker.ContainerInfo) => {
        // console.log(value.Id);
        console.log(`${value.Names?(value.Names[0]):""}-${value.State}`)
    });
    done();
}
function gotTasks() {
    docker_controller.Tasks.forEach((value: IDockerTask) => {
        // console.log(value.ID);
        // console.log(value.NodeID);
        // console.log(value.ServiceID);
        console.log(value.Spec.ContainerSpec.Image);
    });
    done();
}
function StartAPI(){
    api.Init();
}
function test(){

    console.log(docker_controller.GetCurrentHostsOfService("galesnet_huemqttbridge"));
    console.log(docker_controller.GetCurrentHostsOfService("portainer_agent"));
}
main();
