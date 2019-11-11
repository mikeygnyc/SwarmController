import { IDockerVolumeDriveConfigOptions } from "./dockerServiceInterfaces";

export interface IDockerVolume{
    CreatedAt: string;
    Driver: string;
    Labels: Map<string,string>;
    Mountpoint: string;
    Name: string;
    Options: IDockerVolumeDriveConfigOptions;
    Scope: string;
};
