function Successmsg(message){
    var response = {
        message:message,
        status:"Success"
    }
    return response
}

function Failuremsg(message){
    var response ={
        message:message,
        status:"Failure"
    }
    return response
}

module.exports = {
    Successmsg:Successmsg,
    Failuremsg:Failuremsg

}