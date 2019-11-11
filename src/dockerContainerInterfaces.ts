import { EPortProtocol, IDockerLabel, IDockerMount } from "./dockerServiceInterfaces"

 
 
 export interface IDockerContainer{
     Id:string;
     Names:string[];
     Image:string;
     ImageID:string;
     Command:string;
     Created:number;
     Ports:IDockerContainerPort[];
     Labels:Map<string,string>;
     State:string;
     Status:string;
     HostConfig:IDockerHostConfig;
     NetworkSettings:IDockerContainerNetworkSettings;
     Mounts:IDockerMount[];
 }
 export interface IDockerHostConfig{
     NetworkMode:string;
 }
 export interface IDockerContainerPort{
     PrivatePort:number;
     Type:EPortProtocol;

 }
 export interface IDockerContainerNetworkSettings{
    Networks:Map<string,IDockerContainerNetwork>;
}
export interface IDockerContainerNetwork{
    IPAMConfig:Map<string,string>,
    Links: string[],
    Aliases: string[],
    NetworkID:string;
    EndpointID:string;
    Gateway:string;
    IPAddress:string;
    IPPrefixLen:number;
    IPv6Gateway:string;
    GlobalIPv6Address:string;
    GlobalIPv6PrefixLen:number;
    MacAddress:string;
    DriverOpts: {};
}
export interface IDockerContainerMount{
    Type:string;
    Name?:string;
    Source:string;
    Destination:string;
    Mode:string;
    RW:boolean;
    Propagation:string;
    Driver?:string;
}

    