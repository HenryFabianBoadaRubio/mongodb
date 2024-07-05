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

    // 4) Obtener todos los actores nacidos después de 1980:
    async getAllAuthor1980(){
      const collection = this.db.collection('authors');
      const data = await collection.aggregate(
        [
          {
            $match: {
              "date_of_birth": {$gt:"1980-12-30"}
            }
          }
        ]
      ).toArray();
      await this.conexion.close();
      return data;
  }
   
  // 5)Encontrar el actor con más premios:

  async getAuthorsMostAwards(){
    const collection = this.db.collection('authors');
    const data = await collection.aggregate(
      [
        {
          $unwind: "$awards",
        },
        {
          $group: {
            _id: "$_id",
              nombre:{$first:"$full_name"},
            total: { $sum: 1 },
          }
        },
        {
          $sort: {
            total: -1,
          }
        },
        {
          $limit: 1,
        }
      ]
    ).toArray();
    await this.conexion.close();
    return data;
}

  //  10)Encontrar el número total de actores en la base de datos:
  async getAuthorsData(){
    const collection = this.db.collection('authors');
    const data = await collection.aggregate(
      [{
        $count: 'id_actores'
      }]
    ).toArray();
    await this.conexion.close();
    return data;
}

  // 12) Encontrar todos los actores que tienen una cuenta de Instagram:
  async getAllAuthorsWithInstragram(){
    const collection = this.db.collection('authors');
    const data = await collection.aggregate(
      [
        {
          $match: {
            "social_media.instagram":{$exists:1}
          }
        }
      ]
    ).toArray();
    await this.conexion.close();
    return data;
}

  //  18)Encontrar todos los actores que han ganado premios después de 2015:
  async getAllAuthorsAwards2015(){
    const collection = this.db.collection('authors');
    const data = await collection.aggregate(
      [
        {
          $unwind: "$awards"
        },
        {
          $match: {
            "awards.year":{$gt:2015}
          }
        }
      ]
    ).toArray();
    await this.conexion.close();
    return data;
}
  }
