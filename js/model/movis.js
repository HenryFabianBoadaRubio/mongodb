import { connect } from "../../helpers/db/connect.js"


export class movis extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof movis.instance === 'object') {
            return movis.instance;
        }
        movis.instance = this;
        return this;
    }
    async getCountDvd(){
        const collection = this.db.collection('movis');
        const data = await collection.find(
            {
                format: { 
                    $elemMatch: 
                    {name: {$eq: "dvd"}}
                }
            }
        ).toArray();
        await this.conexion.close();
        return {countByMoviDVD: data.length};
    }



    async getAllGenre(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                { $unwind: "$genre" },
                {
                  $group: {
                    _id: null,
                    generos: { $addToSet: "$genre" }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    generos: 1
                  }
                }
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }
}
 