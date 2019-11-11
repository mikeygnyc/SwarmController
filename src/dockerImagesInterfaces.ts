export interface IDockerImage{
    Containers: number;
    Created: number;
    Id: string;
    Labels:Map<string,string>;
    ParentId: string;
    RepoDigests: string[];
    RepoTags: string[];
    SharedSize: number;
    Size: number;
    VirtualSize: number
};