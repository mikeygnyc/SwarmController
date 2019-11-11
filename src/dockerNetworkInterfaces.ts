export interface IDockerNetwork{
    Name: string;
    Id: string;
    Created: string;
    Scope: string;
    Driver: string;
    EnableIPv6: boolean;
    IPAM: IDockerIPAM;
    Internal: boolean;
    Attachable: boolean;
    Ingress: boolean;
    ConfigFrom: IDockerNetworkConfigFrom;
    ConfigOnly: boolean;
    Containers: null;
    Options: Map<string,string>;
    Labels: Map<string,string>;
};
export interface IDockerNetworkConfigFrom{
    Network:{}
}
export interface IDockerIPAM{
    Driver:string;
    Options:Map<string,string>;
    Config:IDockerNetworkConfig[];
}
export interface IDockerNetworkConfig{
    Subnet:string;
    Gateway:string;
}