import { connect } from "../../helpers/db/connect.js"


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
    // 2)Encontrar todos los actores que han ganado premios Oscar:
    async getAllAuthorsAwards(){
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

    // 3) Encontrar la cantidad total de premios que ha ganado cada actor:

    async getAllAuthorsAwardsCu(){
      const collection = this.db.collection('authors');
      const data = await collection.aggregate(
        [
          {
            $unwind: "$awards"
          },
    
          {
            $group: {
    
                _id: "$id_actor",
                cantidad_premios: {
                $sum: 1},
                datos_actor: { $addToSet:
                  {
                    nombre:"$full_name",
                    nacionalidad:"$nationality",
                    nacimiento:"$date_of_birth"
                  }
                        }	
              }
            },
          {
            $unwind: "$datos_actor"
          },
          {
            $project: {
              cantidad_premios:"$cantidad_premios",
              nombre:"$datos_actor.nombre",
              nacionalidad:"$datos_actor.nacionalidad",
              nacimiento:"$datos_actor.nacimiento"
            }
          }
        ]
      ).toArray();
      await this.conexion.close();
      return data;
  }
  }
