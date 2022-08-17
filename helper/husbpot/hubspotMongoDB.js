const hubspot = require('@hubspot/api-client');
const { resolve } = require('path');
//const {Usuarios, DealsMongo, PipelineMongo, StageMongo, CompanyMongo, OwnerMongo, StagesMongoDB, Asociations} = require('./db/HubJson')
const hubspotClient = new hubspot.Client({"apiKey":"cb4f4cd9-6efa-41f8-89f3-b9743940b96d"});


const listarDeal = async(afterd)=>{
    return new Promise(async(resolve)=>{
        const limit = 100;
        //const after = '4106187969';
        const after = afterd;
        const properties = [
            "hubspot_owner_id",
            "hubspot_team_id",
            "pipeline",
            "dealname",
            "dealstage",
            "amount",
            "closedate",
            "hs_lastmodifieddate",
            "ciudad_del_negocio",
            'Producto',
            "producto_principal"
        ]
        const propertiesWithHistory = undefined;
        const associations = undefined;
        const archived = false;
        
        try {
          const apiResponse = await hubspotClient.crm.deals.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
          //console.log(apiResponse);
          //console.log(apiResponse);
          resolve(apiResponse)
        } catch (e) {
          e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    })
}



const dealID = async(idDeal)=>{
  return new Promise(async(resolve, reject)=>{
    //const dealId = "8711128331";
    const dealId = idDeal;
    const properties = [
      "hubspot_owner_id",
      "hubspot_team_id",
      "pipeline",
      "dealname",
      "dealstage",
      "amount",
      "producto",
      "closedate",
      "hs_lastmodifieddate",
      "ciudad_del_negocio",
    ];
    const propertiesWithHistory = undefined;
    const associations = undefined;
    const archived = false;
    const idProperty = undefined;
    
    try {
      const apiResponse = await hubspotClient.crm.deals.basicApi.getById(dealId, properties, propertiesWithHistory, associations, archived, idProperty);

      //const companys = await dealAsociations(apiResponse.id);

      //console.log(apiResponse)
/*       let dealMongo = {id: apiResponse.id, amount: apiResponse.properties.amount,
                        closedata: apiResponse.properties.closedate, createdata: apiResponse.properties.createdate,
                        dealname: apiResponse.properties.dealname, dealstage: apiResponse.properties.dealstage, sede: 'apiResponse.properties.ciudad_del_negocio',
                        hs_lastmodifieddate: apiResponse.properties.hs_lastmodifieddate, hs_object_id: apiResponse.properties.hs_object_id,
                        hubspot_owner_id: apiResponse.properties.hubspot_owner_id, semanaAnual: '31', semanaMes: '1', hubspot_team_id: apiResponse.properties.hubspot_team_id,
                        pipeline: apiResponse.properties.pipeline, producto: apiResponse.properties.producto, propertieswithhistory: apiResponse.propertiesWithHistory, idCompany: companys.idCompany,
                        createat: apiResponse.createdAt, updateat: apiResponse.updatedAt, archived: apiResponse.archived, 
                        acivedat: apiResponse.archivedAt, associations:apiResponse.associations}
      const dealsMongo = new Usuarios(dealMongo);
      await dealsMongo.save(); */
      //console.log(dealMongo);
      resolve(apiResponse)
    } catch (e) {
      reject('deal eliminado')
      /* e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e) */
    }
  })
}
//==============================================================================================================

const dealPipeline = async(pipeline)=>{
    return new Promise(async(resolve)=>{
        const objectType = "deal";
        const pipelineId = pipeline;

        try {
            const apiResponse = await hubspotClient.crm.pipelines.pipelinesApi.getById(objectType, pipelineId);
            //console.log(apiResponse);
/*             let pipelineMongo = {id: apiResponse.id, label: apiResponse.label, displayorder: apiResponse.displayOrder, createdat: apiResponse.createdAt, archivedat: apiResponse.archivedAt,
                                  updatedat: apiResponse.updatedAt, archived: apiResponse.archived}
            const pipelinesMongo = new PipelineMongo(pipelineMongo)
            await pipelinesMongo.save(); */

/*             for(let i = 0; i < apiResponse.stages.length; i++){
              var stages = {id: apiResponse.stages[i].id, idPipeline: pipeline, label: apiResponse.stages[i].label,
                            displayOrder: apiResponse.stages[i].displayOrder, isClosed: apiResponse.stages[i].metadata.isClosed,
                            probability: apiResponse.stages[i].metadata.probability, createdAt: apiResponse.stages[i].createdAt,
                            archivedAt: apiResponse.stages[i].archivedAt, updatedAt: apiResponse.stages[i].updatedAt,
                            archived: apiResponse.stages[i].archived}
              const stagesMongoDB = new StagesMongoDB(stages)
              await stagesMongoDB.save();
            } */
            
            resolve(apiResponse.label);
        } catch (e) {
         e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    })
}

//==============================================================================================================

const dealStage = async(pipelineID, stageID)=>{
    return new Promise(async(resolve)=>{
        const objectType = "deal";
        const pipelineId = pipelineID;
        const stageId = stageID;

        try {
            const apiResponse = await hubspotClient.crm.pipelines.pipelineStagesApi.getById(objectType, pipelineId, stageId);
            //console.log(apiResponse);
/*             let dealStageMonoDB = {id: apiResponse.id, label: apiResponse.label, displayOrder: apiResponse.displayOrder,
                                  createdAt: apiResponse.createdAt, archivedAt: apiResponse.archivedAt, updatedAt: apiResponse.updatedAt,
                                  archived: apiResponse.archived}
            const stageMongo = new StageMongo(dealStageMonoDB)
            await stageMongo.save(); */
            resolve(apiResponse.label)
        } catch (e) {
             e.message === 'HTTP request failed'
             ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    })
}

//==============================================================================================================

const dealAsociations = async(id)=>{
    return new Promise(async(resolve)=>{
        const dealId = id;
        const toObjectType = "company";
        const after = undefined;
        const limit = 100;
        let noCompany = "no tiene campañía"
        try {
          const apiResponse = await hubspotClient.crm.deals.associationsApi.getAll(dealId, toObjectType, after, limit);
          //console.log(apiResponse);
          if(apiResponse.results.length != 0){

            let compañia1 = await company(apiResponse.results[0].id, id)
            let jsonAsociado = {dealID: id, idCompany: apiResponse.results[0].id, type: apiResponse.results[0].type}
            //const asociationAsociations = new Asociations(jsonAsociado)
            //asociationAsociations.save();
            resolve(compañia1);
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

//==============================================================================================================

const company = async(comapanyid, delaid)=>{
    return new Promise(async(resolve)=>{
        const companyId = comapanyid;
        const properties = undefined;
        const propertiesWithHistory = undefined;
        const associations = undefined;
        const archived = false;
        const idProperty = undefined;
        
        try {
          const apiResponse = await hubspotClient.crm.companies.basicApi.getById(companyId, properties, propertiesWithHistory, associations, archived, idProperty);
          //console.log(apiResponse.properties.name);
/*           let companyMongoDB = {id: apiResponse.id, createdate: apiResponse.properties.createData, 
                                domain: apiResponse.properties.domain, hs_lastmodifieddate: apiResponse.properties.hs_lastmodifieddate, dealID: delaid,
                                hs_object_id: apiResponse.properties.hs_object_id, name: apiResponse.properties.name, 
                                propertiesWithHistory: apiResponse.propertiesWithHistory, createdAt: apiResponse.createdAt,
                                updatedAt: apiResponse.updatedAt, archived: apiResponse.archived, archivedAt: apiResponse.archivedAt,
                                associations: apiResponse.associations}
          const companyMongo = new CompanyMongo(companyMongoDB)
            await companyMongo.save(); */
          resolve(apiResponse.properties.name);
        } catch (e) {
          e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    })
}

//==============================================================================================================

const owner = async(id, idEquipo)=>{
    return new Promise(async(resolve, reject)=>{
        const ownerId = id;
        const idProperty = "id";
        const archived = false;
        
        try {
          const apiResponse = await hubspotClient.crm.owners.ownersApi.getById(ownerId, idProperty, archived);

/*           let ownerMongoDb = {id: apiResponse.id, email: apiResponse.email, firstName:apiResponse.firstName, 
                              lastName: apiResponse.lastName, userId: apiResponse.userId, createdAt: apiResponse.createdAt,
                              updatedAt: apiResponse.updatedAt, archived: apiResponse.archived, idTems: apiResponse.teams[0].id,
                              name: apiResponse.teams[0].name, primary: apiResponse.teams[0].primary}
          const ownerMongo = new OwnerMongo(ownerMongoDb)
            await ownerMongo.save(); */
          //console.log(apiResponse);
          let husbpotEquipo = apiResponse.teams.find(e => e.id === idEquipo);
          //console.log(husbpotEquipo)
          //let json = {"propietario": apiResponse.firstName + " " + apiResponse.lastName, "equipo": husbpotEquipo.name}

          let ownerAndTeampo = {
            name: apiResponse.firstName+ ' '+ apiResponse.lastName, team : husbpotEquipo.name
          }
          
          resolve(ownerAndTeampo);

        } catch (e) {
          let falla = {
            name: 'Propietario Eliminado', team : 'No registra Equipo'
          }
          reject(falla)
          e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    })
}

const serachProperties = async(nit)=>{
  return new Promise(async(resolve)=>{
  const PublicObjectSearchRequest = { filterGroups: [{"filters":[{"value":nit,"propertyName":"nit","operator":"EQ"}, {"value":nit,"propertyName":"nit","operator":"EQ"}]}], sorts: ["nit"], properties: ["nit"], limit: 2, after: 0 };

  try {
  const apiResponse = await hubspotClient.crm.companies.searchApi.doSearch(PublicObjectSearchRequest);
  console.log(apiResponse);
  //resolve(apiResponse);
        resolve('hola');

  } catch (e) {
  e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
})
}

const ownersListar = async()=>{
  return new Promise(async(resolve)=>{
    const email = undefined;
    const after = 'MTU0MzY2NTI3';
    const limit = 50;
    const archived = false;
    
    
    try {
      const apiResponse = await hubspotClient.crm.owners.ownersApi.getPage(email, after, limit, archived);
      let contadores = apiResponse.results.length
      console.log(apiResponse)
      
      for(let i = 0; i < contadores; i++){
        try{
         let esperar = await owner(apiResponse.results[i].id)
         console.log(i);
        }catch(err){
          console.log(err)
        }
      }
      resolve(apiResponse)
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
  })
}

module.exports = {
    listarDeal,
    dealPipeline,
    dealStage,
    company,
    dealAsociations,
    owner,
    dealID,
    serachProperties,
    ownersListar
}