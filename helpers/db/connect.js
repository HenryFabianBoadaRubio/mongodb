
import {MongoClient} from 'mongodb';

export class connect {
    static instanceConnect;
    user;
    port;
    cluster;
    #host;
    #pass
    #dbName
    constructor({host, user, pass, port,cluster, dbName}=
        {host: "mongodb://", 
            user: "mongo", 
            pass: "MvwjZZrDvXeaTaXAaIVhZLYXQkahfinL", 
            port: 44048, 
            cluster: "monorail.proxy.rlwy.net", 
            dbName: "blockbuster"}
        ) {
        if (typeof connect.instanceConnect === 'object') {
            return connect.instanceConnect;
        }
        this.setHost = host;
        this.user = user;
        this.setPass = pass;
        this.port = port;
        this.cluster = cluster;
        this.setDbName = dbName;
        this.#open()
        connect.instanceConnect = this;
        return this;
    }
    set setHost(host){
        this.#host = host;
    }
    set setPass(pass){
        this.#pass = pass;
    }
    set setDbName(dbName){
        this.#dbName = dbName;
    }
    get getDbName(){
        return this.#dbName;
    }
    async #open(){
        console.log("Entre");
        // mongodb://mongo:PNSmQbwecKrbuFTCqXmYoaqicgEZpFeF@monorail.proxy.rlwy.net:47797/
        // let url = `${this.#host}${this.user}:${this.#pass}@${this.cluster}:${this.port}`;
        let url= `mongodb://mongo:MvwjZZrDvXeaTaXAaIVhZLYXQkahfinL@monorail.proxy.rlwy.net:44048`
        this.conexion = new MongoClient(url);
        await this.conexion.connect();
        console.log("Mensaje de la conexion ");
    }
}