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
    // 1)Contar el número total de copias de DVD disponibles en todos los registros:
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


    // 6)Listar todos los géneros de películas distintos:
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

    // 7)Encontrar películas donde el actor con id 1 haya participado:
    async getAuthorId1(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                {
                  $unwind: "$character"
                },
                {
                  $match: {
                           "character.id_actor":1
                  }
                },
                {
                  $project: {
                    pelicula:"$name"
                  }
                }
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }

    // 8)Calcular el valor total de todas las copias de DVD disponibles:
    async getAllValueDvd(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                {
                  $unwind: "$format"
                },
                {
                  $match: {
                    "format.name": "dvd"
                  }
                },
                {
                  $group: {
                    _id: "$_id",
                    totalValor: {
                      $sum: {
                        $multiply: [
                          "$format.copies",
                          "$format.value"
                        ]
                      }
                    }
                  }
                },
                {
                  $group: {
                    _id: null,
                    totalGeneral: {
                      $sum: "$totalValor"
                    }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    totalGeneral: 1
                  }
                }
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }

    // 9)Encontrar todas las películas en las que John Doe ha actuado:
    async getAllMovisJohn(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
        [
            {
                $unwind: "$character"
            },
            {
                $lookup: {
                from: "authors",
                localField: "character.id_actor",
                foreignField: "id_actor",
                as: "actor"
                }
            },
            {
                $unwind: "$actor"
            },
            {
                $match: {
                "actor.full_name":"John Doe"
                }
            }
            ]
        ).toArray();
        await this.conexion.close();
        return data;
    }

    // 13)Encontrar todas las películas en las que participan actores principales:
    async getAllMovisRolMajor(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                {
                  $match: {
                    "character.rol":"principal"
                  }
                }
            ]
        ).toArray();
        await this.conexion.close();
        return data;
    }

    // 14)**Encontrar el número total de premios que se han otorgado en todas las películas:**
    async getAllMovisAwards(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                {
                  $unwind: "$character"
                },
                {
                  $lookup: {
                    from: "authors",
                    localField: "character.id_actor",
                    foreignField: "id_actor",
                    as: "character.id_actor"
                  }
                },
                  {
                  $unwind: "$character.id_actor"
                },
                  {
                  $set: {
                    totalPremios: {$size:"$character.id_actor.awards"}
                  }
                },
                {
                  $group: {
                    _id: "$_id",
                    nombre:{$first:"$name"},
                   totalPremios:{$sum:"$totalPremios"}
                  }
                },
                
              
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }

    // 15)**Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

    async getAllMovisJohnBluray(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                {
                      $unwind: "$format"
                },
                {
                  $match: {
                    "format.name":"Bluray"
                  }
                },
                {
                  $lookup: {
                    from: "authors",
                    localField: "character.id_actor",
                    foreignField: "id_actor",
                    as: "actor"
                  }
                },
                {
                  $unwind: "$actor"
                },
                {
                  $match: {
                    "actor.full_name":"John Doe"
                  }
                }
                
                
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }
}
 