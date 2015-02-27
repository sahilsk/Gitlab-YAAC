var 
	Users =  require("../lib/users")
  , conf = require("./testConf")
	;


describe(" Users", function() {
  var gUsers = null;

  beforeEach(function() {
    gUsers = new Users( conf.gitlab );
  });

  it("should not accept empty arguments ", function() {
     expect( function(){ gUsers.find(); } ).toThrow();
  });

  it("should fetch all users list", function(done){

    var callback = jasmine.createSpy("callback");
    callback(err, resp, res);
    gUsers.find( callback);
    
    setTimeout( function(){
      expect( callback).toHaveBeenCalled();
      expect( callback.calls.count()).toEqual(1);
      done();
    }, 9000);
    
  }, 10000) ;

});

/*

//** List all user 
gUsers.find(function(err,  resp, result){
  if(err){
    console.log("oops, caught error", err);
  }else{
   console.log( resp.statusCode);
   console.log("Total users: ", result.length);
   console.log("First user: ", result[0]);
  }
});



//** search user by email or username
gUsers.find("sonukr666@gmail.com", function(err,  resp, result){
  if(err){
    console.log("oops, caught error", err);
  }else{
   console.log( resp.statusCode);
   console.log("matching users: ", result.length);
   console.log("First user: ", result[0]);
  }
});



//** find user by id
gUsers.find(4, function(err,  resp, result){
  if(err){
    console.log("oops, caught error", err);
  }else{
   console.log( resp.statusCode);
   console.log("user: ", result);
  }
});



//** Create new user

gUsers.create( { "name" : "dummy-test001", 
   "username" : "Newsername",
   "email" :"dumm@mailinator.com", 
   "password" : "S3CR3T" },
     function(err, resp, result){
      if(err){
        console.log("oops, caught error", err);
      }else{
       console.log( resp.statusCode);
       console.log("New user: ", result);
      }
});

*/