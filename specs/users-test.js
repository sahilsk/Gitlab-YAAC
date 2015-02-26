var 
	Users =  require("../lib/users")
  , conf = require("./testConf")
	;



var gUsers = new Users( conf );

//** List Users 
gUsers.all({}, function(err,  resp, result){
  if(err){
    console.log("oops, caught error", err);
  }else{
   console.log( resp.statusCode);
   console.log("Total users: ", result.length);
   console.log("First user: ", result[0]);

  }
});