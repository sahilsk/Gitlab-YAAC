var 
	Session =  require("../lib/session")
  , conf = require("./helpers/testConf")
	;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
var existingUser = {};

describe(" Users: user input check", function() {
  var gUsers = null;
  var callback = jasmine.createSpy("callback");

  beforeAll( function(done){
  	 new Session( { "url": conf.gitrep.url })
  	  				.create( conf.gitrep , function(err, response, result){
  	  	callback( err, response, result);
  	  	done();
  	  } );
  });


  it("should create session and return token", function() {
     expect( callback.calls.mostRecent().args[0]).toBeNull();
     expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(201);
     expect( callback.calls.mostRecent().args[2]["private_token"]).toBeDefined;
  });

});