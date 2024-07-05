

import { ObjectId } from "mongodb";
// import { connect } from "../../helpers/db/connect.js"
import { connect } from "./helpers\db\connect.js"

export class authors extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof authors.instance === 'object') {
            return authors.instance;
        }
        authors.instance = this;
        return this;
    }
    async getAllCharactersAwards(){
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                  $unwind: "$awards"
                },
                {
                  $match: {
                              "awards.name" :"Oscar Award"
                  }
                },
                {
                  $project: {
                    id_actor:1,
                    nombre_actor:"$full_name",
                    nationality:1
                  }
                }
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }
}