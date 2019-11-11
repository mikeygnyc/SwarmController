export interface IDockerService{
    ID:string;
    Version:IDockerVersion;
    CreatedAt:string;
    UpdatedAt:string;
    Spec:IDockerSpec;
    Endpoint:IDockerEndpoint;
    PreviousSpec:IDockerSpec
}
export interface IDockerEndpoint{
    Spec:IDockerEndpointSpec;
    Ports:IDockerPort[];
    VirtualIPs:IDockerVIP[];
}
export interface IDockerVersion{
    Index:number;
}
export interface IDockerVIP{
    NetworkID: string;
    Addr: string;
}
export interface IDockerSpec{
    Name:string;
    Labels:Map<string,string>;
    TaskTemplate:IDockerTaskTemplate;
    Mode: IDockerReplicationMode;
    EndpointSpec:IDockerEndpointSpec;

}
export interface IDockerMount{
    Type:string;
    Source:string;
    Target:string;
    VolumeOptions:IDockerVolumeOptions;
}
export type IDockerLabel={key:string,value:string};
export interface IDockerVolumeOptions{
    Labels:Map<string,string>;
    NoCopy?:boolean;
    DriverConfig?:IDockerVolumeDriverConfig;
}
export interface IDockerVolumeDriverConfig{
    Name: string;
    Options: IDockerVolumeDriveConfigOptions;
}
export interface IDockerVolumeDriveConfigOptions{
    device?:string;
    o?:string;
    type?:string;
}
export interface IDockerTaskTemplate{
    ContainerSpec:IDockerContainerSpec;
    Resources?:IDockerResource;
    Placement?:IDockerPlacement;
    Networks?:IDockerServiceNetwork[];
    ForceUpdate:number;
    Runtime:string;
    Args?:string[];
    Mounts?:IDockerMount[];
}
export interface IDockerResourceConfig{
    Limits?:IDockerResource;
    Reservations?:IDockerResource;
}
export interface IDockerResource{
    NanoCPUs: number;
    MemoryBytes: number;
   
}
export interface IDockerContainerSpec{
    Image:string;
    Labels:Map<string,string>;
    Env?:string[];
    Privileges:IDockerPrivileges[];
    Healthcheck?:IDockerHealthcheck;
    DNSConfig?:IDockerDNSConfig;
    Configs?:IDockerTaskTemplate[];
    Isolation:string;
}
export interface IDockerPrivileges{
    CredentialSpec:string;
    SELinuxContext:string;
}
export interface IDockerConfig{
    File:IDockerConfig;
    ConfigID:string;
    ConfigName:string;
}
export interface IDockerDNSConfig{
    Nameservers:string[];
}
export interface IDockerConfigFile{
    Name:string;
    UID:string;
    GID:string;
    Mode:number;
}
export interface IDockerHealthcheck{
        Test: string[];
        Interval:number;
        Timeout:number;
        StartPeriod:number;
        Retries:number;
}
export interface IDockerPlacement{
    Platforms:IDockerPlatform[];
    Containers:string[];
}
export interface IDockerPlatform{
    Architecture?:string;
    OS?:string;
}
export interface IDockerServiceNetwork{
    Target:string;
    Aliases:string[];
}
export interface IDockerReplicationMode{
    Replicated?:IDockerReplicatedMode;
    Global?:{};
}
export interface IDockerReplicatedMode{
    Replicas:number;
}
export interface IDockerEndpointSpec{
    Mode:string;
    Ports:IDockerPort[];
}
export interface IDockerPort{
    Protcol:EPortProtocol,
    TargetPort:number,
    PublishedPort:number;
    PublishMode: string;

}

export enum EPortProtocol{
    tcp,
    udp
}
export enum EPublishMode{
    ingress
}
