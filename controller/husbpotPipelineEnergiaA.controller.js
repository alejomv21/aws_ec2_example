const {response, request} = require('express');
const { postAxios } = require('../helper/axios/axios');
const { companyID } = require('../helper/husbpot/hubspotCompany');
const { contactsID } = require('../helper/husbpot/hubspotContacts');
const { dealID } = require('../helper/husbpot/hubspotDeals');
const { ownerID } = require('../helper/husbpot/hubspotOwner');


const husbpotPipelineEnergiaGET = async(req= request, res= response)=>{
    let logs ={
        guardado: 'El objeto se almacenó correctamente',
        existente: 'El objeto no se pudo almacenar'
    }

    let url = 'http://apisceinformewebapi-test.us-east-2.elasticbeanstalk.com/api/';
    let deal = await dealID('9688053769');
    await postAxios(deal, url+'HubspotNegocio', logs);
        //await postAxios(deal, url+'HubspotNegocioSCCE', logs);
        
        if(deal.contIdContacto != 0){
            let contacts = await contactsID(deal.contIdContacto);
            console.log(contacts);
                await postAxios(contacts, url+'HubspotContactos', logs);
                 //await postAxios(contacts, url+'HubspotContactosSCCE', logs);
        }
        if(deal.empIdEmpresa != 0){
            let company = await companyID(deal.empIdEmpresa);
            console.log(company)
            await postAxios(company, url+'HubspotEmpresa', logs)
           //await postAxios(company, url+'HubspotEmpresaSCCE', logs) 
        }

        let owner = await ownerID(deal.propIdPropietario);
        console.log(owner);
        await postAxios(owner, url+'HubspotPropietario', logs);    
        //await postAxios(owner, url+'HubspotPropietarioSCCE', logs);
    
    res.send('firebase function activa Energia GET');
}


const husbpotPipelineEnergiaPOST = async(req= request, res= response)=>{
    let idhubspot = req.body[0].objectId.toString();
    console.log(idhubspot);

    if((req.body[0].propertyValue == '13729215') || (req.body[0].propertyValue == '13729214')){
        let logs ={
            guardado: 'El objeto se almacenó correctamente',
            existente: 'El objeto no se pudo almacenar'
        }

        console.log(req.body[0]);
        //=================================================================
        //id objeto eliminado
       

        let url = 'http://apisceinformewebapi-test.us-east-2.elasticbeanstalk.com/api/';
        

        try{
        let deal = await dealID(idhubspot);
        console.log(deal);
        await postAxios(deal, url+'HubspotNegocio', logs);
        //await postAxios(deal, url+'HubspotNegocioSCCE', logs);
        
        if(deal.contIdContacto != 0){
            let contacts = await contactsID(deal.contIdContacto);
            console.log(contacts)
                //await postAxios(contacts, url+'HubspotContactos', logs);
                 //await postAxios(contacts, url+'HubspotContactosSCCE', logs);
        }
        if(deal.empIdEmpresa != 0){
            let company = await companyID(deal.empIdEmpresa);
            console.log(company)
            await postAxios(company, url+'HubspotEmpresa', logs)
           //await postAxios(company, url+'HubspotEmpresaSCCE', logs) 
        }

        let owner = await ownerID(deal.propIdPropietario);
        console.log(owner);
        await postAxios(owner, url+'HubspotPropietario', logs);    
        //await postAxios(owner, url+'HubspotPropietarioSCCE', logs);

        }catch(err){
            console.log(err)
        }
    }
    res.status(200).send('firebase function activa Energia POST');
}

const husbpotPipelineEnergiaPUT = (req= request, res= response)=>{
    res.send('firebase function activa Energia PUT');
}


module.exports={
    husbpotPipelineEnergiaGET,
    husbpotPipelineEnergiaPOST,
    husbpotPipelineEnergiaPUT
}