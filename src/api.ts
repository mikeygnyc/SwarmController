import express, { Request, Response } from "express";
import { docker_controller } from "./dockerController";

export class Api{
    private app:express.Application=express();
    public Init(){
        this.app.get("/GetCurrentHostsOfService",this.getCurrentHostsOfService);
        this.app.listen(9999,function(){
            console.log("listening on port 9999");
        });
    }
    private getCurrentHostsOfService(req:Request,res:Response){
        res.send({hosts:docker_controller.GetCurrentHostsOfService(req.query.serviceName)});
    }
}
export let api:Api = new Api();