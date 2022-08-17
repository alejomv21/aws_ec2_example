const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({"apiKey":"cb4f4cd9-6efa-41f8-89f3-b9743940b96d"});

const companyID = async(comapanyid)=>{
    return new Promise(async(resolve)=>{
        const companyId = comapanyid;
        const properties = [
            "nit",
            "name"
          ];
        const propertiesWithHistory = undefined;
        const associations = undefined;
        const archived = false;
        const idProperty = undefined;
        
        try {
          const apiResponse = await hubspotClient.crm.companies.basicApi.getById(companyId, properties, propertiesWithHistory, associations, archived, idProperty);
          //console.log(apiResponse.properties.name);
          let companyObject = {emp_IdEmpresa: Number(apiResponse.id), emp_nit: apiResponse.properties.nit, emp_nombreEmpresa: apiResponse.properties.name}

          resolve(companyObject);
        } catch (e) {
          e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    })
}


module.exports = {
    companyID
}