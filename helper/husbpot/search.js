
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({"apiKey":"cb4f4cd9-6efa-41f8-89f3-b9743940b96d"});

const serachProperties = async(date, next)=>{
    return new Promise(async(resolve)=>{
    const PublicObjectSearchRequest = { filterGroups: [{"filters":[{"value":date,"propertyName":"createdate","operator":"GTE"}, {"value":date,"propertyName":"createdate","operator":"GTE"}]}], sorts: ["createdate"], properties: ["createdate"], limit: 100, after: next };
  
    try {
    const apiResponse = await hubspotClient.crm.deals.searchApi.doSearch(PublicObjectSearchRequest);
    //console.log(apiResponse.results[0].properties);
    console.log(apiResponse);
    //resolve(apiResponse);
    resolve(apiResponse);
  
    } catch (e) {
    e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
  })
  }

  module.exports = {serachProperties}