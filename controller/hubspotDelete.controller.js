const {response, request} = require('express');
const { postAxios } = require('../helper/axios/axios');


const hubspotdeleteGet = (req= request, res= response)=>{
    res.send('firebase function activa GET');
}


const hubspotdeletePost = async(req= request, res= response)=>{
    console.log(req.body[0]);
    //=================================================================
    //id objeto eliminado
    let idhubspot = req.body[0].objectId.toString();
    //=================================================================
    //Data a envíar 
    let data = {
        idhubspot,
        estado: false
    }
    //=================================================================
    //URL de servicio
    let url = process.env.ULR_CARLOS + 'EqTempCompanyCrmDeleted';
    //=================================================================
    //LOGS strings para imprimir en console.log
    let logs ={
        guardado: 'El objeto eliminado se almacenó correctamente',
        existente: 'El objeto eliminado no se pudo almacenar'
    }
    //=================================================================
    //Consumo de servicio mediante axios, solicitud POST
    //await postAxios(data, url, logs);
    //=================================================================
    //RESPONSE
    res.status(200).send('firebase function activa POST');
}

const hubspotdeletePut = (req= request, res= response)=>{
    res.send('firebase function activa PUT');
}


module.exports={
    hubspotdeleteGet,
    hubspotdeletePost,
    hubspotdeletePut
}