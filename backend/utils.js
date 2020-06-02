const objectGenerator = (error,result,message) => {
    return {
        error,
        result,
        message
    }
};
const messages = (type,data) => {
    switch(type) {
        case "s" : return data + " Successfully";
        case "f" : return data + " Error";
    }
};

exports = module.exports = {
    objectGenerator,messages
}
