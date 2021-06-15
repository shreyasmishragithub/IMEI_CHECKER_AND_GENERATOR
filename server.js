import express, { request } from "express";
import imei from "node-imei";
import path from "path";
//use the application off of express.
var app = express();
var IMEI=new imei();
app.use(express.static("public"));
//define the route for "/"
app.get("/", function (request, response){
    response.sendFile(path.join(__dirname,'static',"index.html"));
});

app.get("/getemail", function (request, response){
    var address = request.query.address;
    // const s=toString(address);
    console.log(address.length);
    if(address.length<15){
        response.send("Length is Not 15 not Valid");
    }
    else if(IMEI.isValid(address)){
        response.send("True IMEI")
    }
    else if(IMEI.isValid(address)!=true){
        const Changed_IMEI = address.slice(0,14);
        const last_digit = address.slice(14);
        var true_digit;
        console.log(last_digit);

        var i;
        var val=-1;
        for(i=0;i<10;i++)
        {
            var remade = Changed_IMEI+i.toString();
            if(IMEI.isValid(remade))
            {
                val=remade;
                break;
            }
        }
        if(val==-1){
            response.send(" Cant change last Digit");
        }
        else{
            response.send(" Valid IMEI By changing Last Digit is "+val);
        }

    }
    else{
        response.send("Valid");
    }
});

//start the server

app.listen(process.env.PORT,()=>{
  console.log("Something awesome to happen")  
})
