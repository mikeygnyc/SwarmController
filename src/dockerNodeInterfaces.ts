import { IDockerVersion, IDockerPlatform, IDockerResourceConfig } from "./dockerServiceInterfaces"

export interface IDockerNode {
    ID:string;
    Version:IDockerVersion;
    CreatedAt:string;
    UpdatedAt:string;
    Spec:IDockerNodeSpec;
    Description:IDockerNodeDescription;
    Status:IDockerNodeStatus;
    Manager:IDockerNodeManagerStatus;
}

export interface IDockerNodeSpec{
    Labels:Map<string,string>;
    Role:string;
    Availability:string;
}
export interface IDockerNodeDescription{
    Hostname:string;
    Platform:IDockerPlatform;
    Resources:IDockerResourceConfig;
    Engine:IDockerEngine;

}
export interface IDockerNodeStatus{
    State:string;
    Addr:string;
}
export interface IDockerNodeManagerStatus{
    Reachability:string;
    Addr:string;
}
export interface IDockerEngine{
    EngineVersion:string;
    Plugins:IDockerEnginePlugin[];
}
export interface IDockerEnginePlugin{
    Type:string;
    Name:string;
}
export interface IDockerTLSInfo{
    TrustRoot:string;
    CertIssuerSubject:string;
    CertIssuerPublicKey:string;
}
   