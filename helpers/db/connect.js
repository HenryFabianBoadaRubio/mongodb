
import {MongoClient} from 'mongodb';

export class connect {
    static instance;
    user;
    port;
    cluster;
    #host;
    #pass
    #dbName
    constructor({host, user, pass, port,cluster, dbName}=
        {host: "mongodb://", 
            user: "mongo", 
            pass: "PNSmQbwecKrbuFTCqXmYoaqicgEZpFeF", 
            port: 47797, 
            cluster: "monorail.proxy.rlwy.net", 
            dbName: "test"}
        ) {
        if (typeof connect.instance === 'object') {
            return connect.instance;
        }
        this.setHost = host;
        this.user = user;
        this.setPass = pass;
        this.port = port;
        this.cluster = cluster;
        this.setDbName = dbName;
        this.#open()
        connect.instance = this;
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
        let url = `${this.#host}${this.user}:${this.#pass}@${this.cluster}:${this.port}`;
        this.conexion = new MongoClient(url);
        await this.conexion.connect();
        console.log("Mensaje de la coexion ");
    }
}