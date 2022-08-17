const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({"apiKey":"cb4f4cd9-6efa-41f8-89f3-b9743940b96d"});



const dealID = async(idDeal)=>{
    return new Promise(async(resolve)=>{
      //const dealId = "9114383108";
      const dealId = idDeal;
      const properties = [
        "hubspot_owner_id",
        "hubspot_team_id",
        "pipeline",
        "dealname",
        "dealstage",
        "amount",
        "Producto",
        "closedate",
        "hs_lastmodifieddate"
      ];
      const propertiesWithHistory = undefined;
      const associations = undefined;
      const archived = false;
      const idProperty = undefined;
      
      try {
        const apiResponse = await hubspotClient.crm.deals.basicApi.getById(dealId, properties, propertiesWithHistory, associations, archived, idProperty);
        //console.log(apiResponse)
        let asociatedObject = {company: 'company', contacts: 'contacts'}
        let companyID = await dealAsociations(apiResponse.id, asociatedObject.company);
        let contactsID = await dealAsociations(apiResponse.id, asociatedObject.contacts);
        console.log(apiResponse);
        let dealMongo = {negocioIdNegocio:  Number(apiResponse.id), negocioIdPipeLine: Number(apiResponse.properties.pipeline), etapaIdEtapa: Number(apiResponse.properties.dealstage),
                        empIdEmpresa: Number(companyID), contIdContacto: Number(contactsID), propIdPropietario: Number(apiResponse.properties.hubspot_owner_id),
                        lbcoIdcentroperacion: '???????', negocioNombre: apiResponse.properties.dealname}

        resolve(dealMongo);
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }
    })
  }



  const dealAsociations = async(id, asociated)=>{
    return new Promise(async(resolve)=>{
        const dealId = id;
        const toObjectType = asociated;
        const after = undefined;
        const limit = 2;
        let noCompany = 0
        try {
          const apiResponse = await hubspotClient.crm.deals.associationsApi.getAll(dealId, toObjectType, after, limit);
          //console.log(apiResponse);
          if(apiResponse.results.length != 0){

            //let compañia1 = await company(apiResponse.results[0])
            let objetoAsociado =  apiResponse.results[0].id
            resolve(objetoAsociado)
            //
          }else{
            resolve(noCompany)
          }
          //resolve(apiResponse)
          
        } catch (e) {
          e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        } 
    })
}


  module.exports= {
    dealID
  }