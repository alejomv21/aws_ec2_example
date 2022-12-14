const {Schema, model} = require('mongoose');

const HubspotSchema = Schema({
    
    Deal_ID: {
        type: String,
    },
    
    Deal_Name: {
        type: String,
    },
    
    Associated_Company: {
        type: String,
    },
    Deal_Stage: {
        type: String
    },
    Amount_in_company_currency: {
        type: String
    },
    Close_Date:{
        type: String      
    },
    producto:{
        type: String
    },
    HubSpot_Team: {
        type: String
    },
    Deal_owner: {
        type: String
    },
    Create_Date: {
        type: String
    },
    Pipeline: {
        type: String
    },
    Ciudad_del_Negocio: {
        type: String
    },
    semana:{
        type: String
    }

})

let DealsM =  model('deals_pruebas', HubspotSchema)


module.exports = {DealsM}