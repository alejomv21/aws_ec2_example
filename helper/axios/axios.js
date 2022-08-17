const axios = require('axios');

const postAxios = async(data, url, logs)=>{
    var config = {
        method: 'post',
        url,
        Headers: {
            'Content-Type': 'application/json'
        },
        data
    };

    axios(config)
    .then(function(response){
        if(response.status == 201){
            console.log(logs.guardado);
        }else{
            console.log(logs.existente);
        }
    })
    .catch(function (error){
        console.log(error)
    })
}

module.exports={
    postAxios
}