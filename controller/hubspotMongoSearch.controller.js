const {response, request} = require('express');
const {dbConection} = require('../db/mongoDB');
const {DealsM} = require('../db/schema')
const {listarDeal,
    dealPipeline,
    dealStage,
    dealAsociations,
    company,
    owner,
    dealID} = require('../helper/husbpot/hubspotMongoDB')
const {serachProperties} = require('../helper/husbpot/search')

const hubspotMongoSearchGet = async (req= request, res= response)=>{
     const conectarDB = async()=>{
        await dbConection();
      }

      await conectarDB(); 
      let seacrh = await serachProperties('1640995200000', 0);
      for(let j = 0; j < seacrh.total; j = j + 100){
      let next = j
      console.log(j)

        console.log(next);
        let listar = await serachProperties('1640995200000', next);
        //console.log(listar.paging.next.after);
        let contador = listar.results.length
        
        for(let i = 0; i < contador; i++){
          try{

            let dealid = await dealID(listar.results[i].id)
            console.log(dealid);

            let Pipeline = await dealPipeline(dealid.properties.pipeline);

            let etapa = await dealStage(dealid.properties.pipeline, dealid.properties.dealstage);


  
            let company = await dealAsociations(listar.results[i].id);

            if(dealid.properties.hubspot_owner_id == null){
                let dealsMongoError = {
                    Deal_ID: listar.results[i].id, Deal_Name: dealid.properties.dealname, Associated_Company: company, Deal_Stage: etapa,
                    Amount_in_company_currency: dealid.properties.amount, Close_Date: dealid.properties.closedate, producto: dealid.properties.producto,
                    HubSpot_Team: 'No registra Equipo', Deal_owner: 'Propietario Eliminado', Create_Date: dealid.properties.createdate, Pipeline: Pipeline, 
                    Ciudad_del_Negocio: dealid.properties.ciudad_del_negocio, semanaAnual: 33, semanaMes: 3
                  }
                  const mongo = new DealsM(dealsMongoError);
                  await mongo.save();

                  console.log(i);
            }else{
                let owners = await owner(dealid.properties.hubspot_owner_id, dealid.properties.hubspot_team_id)
                console.log(owners);
    
      
                let dealsMongo = {
                  Deal_ID: listar.results[i].id, Deal_Name: dealid.properties.dealname, Associated_Company: company, Deal_Stage: etapa,
                  Amount_in_company_currency: dealid.properties.amount, Close_Date: dealid.properties.closedate, producto: dealid.properties.producto,
                  HubSpot_Team: owners.team, Deal_owner: owners.name, Create_Date: dealid.properties.createdate, Pipeline: Pipeline, 
                  Ciudad_del_Negocio: dealid.properties.ciudad_del_negocio, semanaAnual: 33, semanaMes: 3
                }
      
                const mongo = new DealsM(dealsMongo);
                await mongo.save();
      
                console.log(i);
            }
          }catch(error){

            //console.log(error)
            if(error == 'deal eliminado'){
                console.log('deal eliminado')
                console.log(i);
            }else{
            let dealid = await dealID(listar.results[i].id)
           
            let Pipeline = await dealPipeline(dealid.properties.pipeline);
            
            let etapa = await dealStage(dealid.properties.pipeline, dealid.properties.dealstage);

  
            let company = await dealAsociations(listar.results[i].id);

            let dealsMongoError = {
              Deal_ID: listar.results[i].id, Deal_Name: dealid.properties.dealname, Associated_Company: company, Deal_Stage: etapa,
              Amount_in_company_currency: dealid.properties.amount, Close_Date: dealid.properties.closedate, producto: dealid.properties.producto,
              HubSpot_Team: 'No registra Equipo', Deal_owner: 'Propietario Eliminado', Create_Date: dealid.properties.createdate, Pipeline: Pipeline, 
              Ciudad_del_Negocio: dealid.properties.ciudad_del_negocio, semanaAnual: 32, semanaMes: 2
            }
  
            const mongoError = new DealsM(dealsMongoError);
            await mongoError.save();
            console.log(i);
            }
            
        }
    }
/*     afeteref = listar.paging.next.after;
    next = listar.paging.next.after;
    console.log(listar.paging.next.after); */
}
    console.log(listar.paging.next.after)
    res.status(200).send(listar.paging.next.after)
    //res.status(200).send('hola mundo');
}


const hubspotMongoSearchPost = async(req= request, res= response)=>{
    
    res.status(200).send('firebase function activa POST');
}

const hubspotMongoSearchPut = (req= request, res= response)=>{
    res.send('firebase function activa PUT');
}


module.exports={
    hubspotMongoSearchGet,
    hubspotMongoSearchPost,
    hubspotMongoSearchPut
}