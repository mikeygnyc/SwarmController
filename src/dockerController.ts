import cfgs from "./config.json";
import Docker from "dockerode";
import { IDockerService } from "./dockerServiceInterfaces";
import async from "async";
import { IDockerTask } from "./dockerTaskInterfaces.js";
import { IDockerContainer } from "./dockerContainerInterfaces.js";
import { IDockerNode } from "./dockerNodeInterfaces.js";
export class DockerController {
    private dockerApis: Docker[] = new Array<Docker>();
    public Services: Map<string, IDockerService> = new Map<
        string,
        IDockerService
    >();
    public Tasks: Map<string, IDockerTask> = new Map<string, IDockerTask>();
    public Containers: Map<string, Docker.ContainerInfo> = new Map<
        string,
        Docker.ContainerInfo
    >();
    public Nodes: Map<string, IDockerNode> = new Map<string, IDockerNode>();
    public Init() {
        cfgs.dockerConfigs.forEach((cfg: any) => {
            var docker = new Docker({
                protocol: cfg.protocol,
                host: cfg.host,
                port: cfg.port,
                socketPath: cfg.socketPath ? cfg.socketPath : undefined
            });
            this.dockerApis.push(docker);
        });
    }

    public GetServices(callback: any) {
        async.forEachSeries(
            this.dockerApis,
            this._ListServices.bind(this),
            callback
        );
    }
    private async _ListServices(api: Docker, callback: Function) {
        const apiSvc = await api.listServices();
        for (const svc of apiSvc) {
            this.Services.set(svc.ID, svc);
        }
        callback();
    }
    public GetTasks(callback: any) {
        async.forEachSeries(
            this.dockerApis,
            this._ListTasks.bind(this),
            callback
        );
    }
    private async _ListTasks(api: Docker, callback: Function) {
        const apiTask = await api.listTasks();
        for (const tsk of apiTask) {
            this.Tasks.set(tsk.ID, tsk);
        }
        callback();
    }
    public GetContainers(callback: any) {
        async.forEachSeries(
            this.dockerApis,
            this._ListContainers.bind(this),
            callback
        );
    }
    private async _ListContainers(api: Docker, callback: Function) {
        const apiCont = await api.listContainers();
        for (const cont of apiCont) {
            this.Containers.set(cont.Id, cont);
        }
        callback();
    }
    public GetNodes(callback: any) {
        async.forEachSeries(
            this.dockerApis,
            this._ListNodes.bind(this),
            callback
        );
    }
    private async _ListNodes(api: Docker, callback: Function) {
        const apiNodes: IDockerNode[] = await api.listNodes();
        for (const node of apiNodes) {
            this.Nodes.set(node.ID, node);
        }
        callback();
    }
    public GetCurrentHostsOfService(serviceName: string): string[] {
        let retVal: string[] = new Array<string>();
        let all_services = Array.from(this.Services.values());
        const service = all_services.find((val: IDockerService) => {
            return val.Spec.Name === serviceName;
        });
        let servArr: string[] = new Array<string>();

        if (service) {
            let all_tasks = Array.from(this.Tasks.values());
            const tasks = all_tasks.filter((val: IDockerTask) => {
                return (
                    val.ServiceID === service.ID &&
                    val.Status.State === "running"
                );
            });
            if (tasks) {
                const nodeIds = tasks.map((tsk: IDockerTask) => {
                    return tsk.NodeID;
                });
                if (nodeIds) {
                    let all_nodes = Array.from(this.Nodes.values());
                    let vals= all_nodes.filter((node: IDockerNode) => {
                        return nodeIds.includes(node.ID);
                    }).map((node:IDockerNode)=>{return node.Status.Addr;}) as string[];
                    if (vals){
                        retVal=vals?vals:[];
                    }
                    
                }
            }
        }
        return retVal;
    }
}

export let docker_controller: DockerController = new DockerController();
