const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({"apiKey":"cb4f4cd9-6efa-41f8-89f3-b9743940b96d"});


const ownerID = async(id)=>{
    return new Promise(async(resolve)=>{
        const ownerId = id;
        const idProperty = "id";
        const archived = false;
        
        try {
          const apiResponse = await hubspotClient.crm.owners.ownersApi.getById(ownerId, idProperty, archived);

          let owner = {prop_idPropietario: Number(apiResponse.id), prop_nombre:apiResponse.firstName, 
                       prop_apellido: apiResponse.lastName, prop_email: apiResponse.email}
          //console.log(apiResponse);
          //let husbpotEquipo = apiResponse.teams.find(e => e.id === idEquipo);
          //console.log(husbpotEquipo)
          //let json = {"propietario": apiResponse.firstName + " " + apiResponse.lastName, "equipo": husbpotEquipo.name}
          resolve(owner);

        } catch (e) {
          e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    })
}

module.exports= {
    ownerID
}