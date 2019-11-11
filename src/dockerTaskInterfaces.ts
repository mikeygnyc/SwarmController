import { IDockerService, IDockerVersion, IDockerContainerSpec, IDockerSpec, IDockerResource, IDockerPlacement, IDockerTaskTemplate } from "./dockerServiceInterfaces";
import { IDockerIPAM } from "./dockerNetworkInterfaces";

export interface IDockerTask{
    ID:string;
    Version:IDockerVersion;
    CreatedAt:string;
    UpdatedAt:string;
    Spec:IDockerTaskTemplate;
    ServiceID:string;
    Slot:number;
    NodeID:string;
    Status:IDockerTaskStatus;
    DesiredState:string;
    NetworksAttachements:IDockerTaskNetworkAttachment[];
}

export interface IDockerTaskStatus{
    Timestamp:string;
    State:string;
    Message:string;
    Err:string;
    ContainerStatus:IDockerTaskContainerStatus;
    PortStatus:{};
}
export interface IDockerTaskContainerStatus{
    ContainerId:string;
    PID:number;
    ExitCode:number;
}
export interface IDockerTaskNetworkAttachment{
    Network:IDockerTaskNetwork;
    Addresses:string[];
}
export interface IDockerTaskNetwork{
    ID:string;
    Version:IDockerVersion;
    CreatedAt:string;
    UpdatedAt:string;
    Spec:IDockerNetworkSpec;
}
export interface IDockerNetworkSpec{
    Name:string;
    Labels:Map<string,string>;
    DriverConfiguration:Map<string,string>;
    Ingress:boolean;
    IPAMOptions:IDockerIPAM;
    Scope:string;
}

    