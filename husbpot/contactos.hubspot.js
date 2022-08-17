const hubspot = require('@hubspot/api-client');
const { resolve } = require('path');
const hubspotClient = new hubspot.Client({"apiKey":"cb4f4cd9-6efa-41f8-89f3-b9743940b96d"});


const contactos = async(contact)=>{
    return new Promise(async(resolve)=>{
        const contactId = '7074301';
        const properties = undefined;
        const propertiesWithHistory = undefined;
        const associations = undefined;
        const archived = false;
        
        try {
          const apiResponse = await hubspotClient.crm.contacts.basicApi.getById(contactId, properties, propertiesWithHistory, associations, archived);
          resolve(apiResponse)
        } catch (e) {
          e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    })
}

module.exports ={
    contactos
}