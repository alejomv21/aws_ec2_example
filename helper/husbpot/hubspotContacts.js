const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({"apiKey":"cb4f4cd9-6efa-41f8-89f3-b9743940b96d"});


const contactsID = async(id)=>{
    return new Promise(async(resolve)=>{
        const contactId = id;
        const properties = [
            "phone",
            "email",
            "firstname",
            "lastname"
          ];
        const propertiesWithHistory = undefined;
        const associations = undefined;
        const archived = false;
        
        try {
          const apiResponse = await hubspotClient.crm.contacts.basicApi.getById(contactId, properties, propertiesWithHistory, associations, archived);
        
          let contactObject= {cont_IdContacto: Number(apiResponse.id), cont_nombreContacto: apiResponse.properties.firstname + ' '+ apiResponse.properties.lastname,
                              cont_email: apiResponse.properties.email, cont_telefono: apiResponse.properties.phone}

          resolve(contactObject);
        } catch (e) {
          e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    })
}

module.exports = {
    contactsID
}