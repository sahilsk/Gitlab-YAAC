var 
	Users =  require("../users")
  , conf = require("./helpers/testConf")
	;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
var existingUser = {};

describe(" Users: user input check", function() {
  var gUsers = null;
  gUsers = new Users( conf.gitrep );

  it("should not accept empty arguments ", function() {
     expect( function(){ gUsers.find(); } ).toThrow();
  });

});

describe(" Users: fetch all users", function(){

  var gUsers = null;
  var callback = jasmine.createSpy("callback");
 
  beforeAll( function(done){
    gUsers = new Users( conf.gitrep );
    gUsers.find( function(err, res, result){
      callback(err, res, result);
      done();
    });
  });

  it("- callback should have been called and only once", function(done){
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.count()).toEqual(1);
    done();
  });

  it("- should have statusCode be 200", function(){
    var res = callback.calls.mostRecent().args[1];
    expect( res.statusCode).toEqual(200);
  });
  it("- should not have error", function(){
     var err = callback.calls.mostRecent().args[0];
      expect( err).toBeNull();   
  });
  it("- should have user list(might be empty)", function(){
     var result = callback.calls.mostRecent().args[2];
     expect( typeof result ).toEqual("object");
  });

  describe("- fetch users with pagination", function () {
      var callback = jasmine.createSpy("callback");
      beforeAll( function(done){
        gUsers.find({ page: 0, per_page:1}, function(err, res, result){
          callback(err, res, result);
          done();
        })
      });

      it("should return one user per page", function(){
        expect( callback.calls.mostRecent().args[0]).toBeNull() ;
        expect( callback.calls.mostRecent().args[1]['statusCode']).toBe(200) ;
        expect(callback.calls.mostRecent().args[2].length).toBe(1);
      })
  });
     
  describe("- fetch user by id", function () {
      var callback = jasmine.createSpy("callback");
      beforeAll( function(done){
        gUsers.find( 1, { page: 122, per_page:1}, function(err, res, result){
          callback(err, res, result);
          done();
        })
      });

      it("should return one user per page", function(){
        expect( callback.calls.mostRecent().args[0]).toBeNull() ;
        expect( callback.calls.mostRecent().args[1]['statusCode']).toBe(200) ;
        expect( typeof callback.calls.mostRecent().args[2]).toBe("object");
      })
  }); 
  describe("- search users by username/email", function () {
      var callback = jasmine.createSpy("callback");
      beforeAll( function(done){
        gUsers.find( "root", { page: 23, per_page:1}, function(err, res, result){
          console.log( result);
          callback(err, res, result);
          done();
        })
      });

      it("should return user with username: root", function(){
        expect( callback.calls.mostRecent().args[0]).toBeNull() ;
        expect( callback.calls.mostRecent().args[1]['statusCode']).toBe(200) ;
        //expect( callback.calls.mostRecent().args[2]).toBe();
      })
  });      

});

describe("users - search by invalid input", function(){
  var gUsers = null;
  var callback = jasmine.createSpy("callback");

  beforeAll( function(done){
    gUsers = new Users( conf.gitrep );
    gUsers.find("rDontMatchWithEmailOrUsername", function(err, res, result){
      callback(err, res, result);
      done();
    })
  });
  
  it("- user should not be found", function(done){
      expect(callback.calls.mostRecent().args[0]).toBeNull();
      expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(200);
      expect( callback.calls.mostRecent().args[2].length ).toBe(0);
      done();
  });

});

describe("users: CREATE, READ, UPDATE, DELETE", function(){
  var newUser = { "name" : "dummyName", 
   "username" : "dummyUsername",
   "email" :"dumm@mailinator.com", 
   "password" : "S3CR3TGoesHere" };

  var newKeyObj = { 
       "key": "ssh-dss AAAAB3NzaC1kc3MAAACBAMLrhYgI3atfrSD6KDas1b/3n6R/HP+bLaHHX6oh+L1vg31mdUqK0Ac/NjZoQunavoyzqdPYhFz9zzOezCrZKjuJDS3NRK9rspvjgM0xYR4d47oNZbdZbwkI4cTv/gcMlquRy0OvpfIvJtjtaJWMwTLtM5VhRusRuUlpH99UUVeXAAAAFQCVyX+92hBEjInEKL0v13c/egDCTQAAAIEAvFdWGq0ccOPbw4f/F8LpZqvWDydAcpXHV3thwb7WkFfppvm4SZte0zds1FJ+SRofEq5YLdwgrwkMmIawa21Hr8Xzzc5zMHe6J4Nlay/rP4ewmIW7iFKNBEYb/yWa+ceLrs+TfR672TaAgO6o7iFrZ2D9SPao/IwvENzk/xcHu7YAAACAQFXQH6HQnxOrw4dqf0NqeKy1tfIPxYYUZhPJfo9O0AmBW2S36pD2l14kS89fvz6Y1g8gN/FwFnRncMzlLY/hX70FSc/3hKBSbH6C6j8hwlgFKfizav21eS358JJz93leOakJZnGb8XlWvz1UJbwCsnR2VEY8Dz90uIk1l/UqHkA= loicc@call",
       "title": "dummSSHkey"};

  var gUsers = null;
  var callback = jasmine.createSpy("callback");

   beforeAll(function(done){
    gUsers = new Users( conf.gitrep );
    gUsers.create( newUser, function(err, res, result){
      newUser.id = result.id;
      callback(err, res, result);
      done();
    });
   });

  describe(" CREATE ------- ", function(){

     it("- should create new user", function(){
        var err = callback.calls.mostRecent().args[0];
        var res = callback.calls.mostRecent().args[1];
        expect( err ).toBeNull()
        expect( res.statusCode ).toEqual(201);
     });

     it("- should have posted information", function(){
        var user = callback.calls.mostRecent().args[2];
        expect( user.username).toBe( newUser.username);
        expect( user.email).toBe( newUser.email);
        expect( user.name).toBe( newUser.name);
     });
 
  });

  describe(" READ ----------", function(){
    var gUsers = null;
    var callback = jasmine.createSpy("callback");

    beforeAll( function(done){
      gUsers = new Users( conf.gitrep );
      gUsers.find( newUser.id, function(err, res, result){
        callback(err, res, result);
        done();
      });
    });
    
    describe("- find user by id", function(){
      it("- user should be found", function(done){
        expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(200);
        expect( typeof callback.calls.mostRecent().args[2] ).toEqual("object");
        expect(  callback.calls.mostRecent().args[2]["name"] ).toBe( newUser.name);
        expect(  callback.calls.mostRecent().args[2]["username"] ).toBe( newUser.username);
        expect(  callback.calls.mostRecent().args[2]["email"] ).toBe( newUser.email);
        done();
      });
    });

    describe("- find by email", function(){
      var gUsers = null;
      var callback = jasmine.createSpy("callback");

      beforeAll( function(done){
        gUsers = new Users( conf.gitrep );
        gUsers.find(newUser.email, function(err, res, result){
          callback(err, res, result);
          done();
        })
      });
      
      it("- user should be found", function(done){
          expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(200);
          expect( typeof callback.calls.mostRecent().args[2] ).toEqual("object");
          expect(  callback.calls.mostRecent().args[2][0]["name"] ).toBeDefined();
          done();
      });

    });

    describe("- find by username", function(){
      var gUsers = null;
      var callback = jasmine.createSpy("callback");

      beforeAll( function(done){
        gUsers = new Users( conf.gitrep );
        gUsers.find(newUser.username, function(err, res, result){
          callback(err, res, result);
          done();
        })
      });
      
      it("- user should be found", function(done){
          expect( callback.calls.mostRecent().args[0]).toBeNull();
          expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(200);
          expect( typeof callback.calls.mostRecent().args[2] ).toEqual("object");
          expect( callback.calls.mostRecent().args[2][0]["name"] ).toBe( newUser.name);
          done();
      });

    });

  });

  describe(" UPDATE ----------", function(){
    var gUsers = null;
    var callback = jasmine.createSpy("callback");

    var updatedUser = JSON.parse( JSON.stringify( newUser ) );
    updatedUser.name ="dummyChangedName";
    updatedUser.skype ="dummySkypeInfo";

    beforeAll( function(done){
      gUsers = new Users( conf.gitrep );
      updatedUser.id = newUser.id;
      gUsers.update(updatedUser.id, updatedUser, function(err, res, result){
        callback(err, res, result);
        done();
      })
    });
    
    it("- updating user", function(done){
      expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(200);
      expect( typeof callback.calls.mostRecent().args[2] ).toEqual("object");
      expect( callback.calls.mostRecent().args[2]["name"] ).toBe( updatedUser.name);
      expect( callback.calls.mostRecent().args[2]["username"] ).toBe( updatedUser.username);
      expect( callback.calls.mostRecent().args[2]["email"] ).toBe( updatedUser.email);
      done();
    });

  });

  describe("- Add new SHH keys", function(){
    var gUsers = null;
    var callback  = jasmine.createSpy("callback");
   
    beforeAll( function(done){
      gUsers = new Users( conf.gitrep );
      gUsers.addKey( newUser.id, newKeyObj, function(err, res, result){
        newKeyObj.id = result.id;
        callback(err, res, result);
        done();
      });
    });

    it("- should add new key", function(){
      var err = callback.calls.mostRecent().args[0];
      var response = callback.calls.mostRecent().args[1];      
      expect(err).toBeNull();
      expect(response.statusCode).toBe(201);
    });

  });

  describe("- Get SSH keys.(if any)", function(){

    var gUsers = null;
    var callback = jasmine.createSpy("callback");
   
    beforeAll( function(done){
      gUsers = new Users( conf.gitrep );
      gUsers.listKeys(newUser.id, function(err, res, result){
        callback(err, res, result);
        done();
      });
    });

    it("- should get ssh keys, if any", function(){
      var err = callback.calls.mostRecent().args[0]
      var response = callback.calls.mostRecent().args[1]
      var keys = callback.calls.mostRecent().args[2];
      
      expect(err).toBeNull();
      expect(response.statusCode).toBe(200);
      expect( typeof keys).toBe("object");

      if( keys.length > 0){
        expect( keys[0].id).toBeDefined();
        expect( keys[0].title).toBeDefined();
        expect( keys[0].key).toBeDefined();
      }
    });
  });  

  describe("- Delete SSH keys", function(){
    var gUsers = null;
    var callback =null ;
    
    callback = jasmine.createSpy("callback");
   
    beforeAll( function(done){
      gUsers = new Users( conf.gitrep );
      gUsers.deleteKey( newUser.id, newKeyObj.id, function(err, res, result){
        callback(err, res, result);
        done();
      });
    });

    it("- should delete key", function(){
      var err = callback.calls.mostRecent().args[0]
      var response = callback.calls.mostRecent().args[1]
      
      expect(err).toBeNull();
      expect(response.statusCode).toBe(200);
    });

  });   


  describe(" DELETE ----------", function(){
    var gUsers = null;
    var callback = jasmine.createSpy("callback");

    var delUser = newUser;

    beforeAll( function(done){
      gUsers = new Users( conf.gitrep );
      gUsers.delete(delUser.id, function(err, res, result){
        callback(err, res, result);
        done();
      })
    });
    
    it("- delete a user", function(done){
      expect(callback.calls.mostRecent().args[0]).toBeNull();
      expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(200);
      expect(  callback.calls.mostRecent().args[2]["id"] ).toBe( delUser.id);
      expect(  callback.calls.mostRecent().args[2]["username"] ).toBe( delUser.username);
      expect(  callback.calls.mostRecent().args[2]["email"] ).toBe( delUser.email);
      done();
    });

  });  

});

describe("Current User: ", function(){
  var newKeyObj = { 
       "key": "ssh-dss AAAAB3NzaC1kc3MAAACBAMLrhYgI3atfrSD6KDas1b/3n6R/HP+bLaHHX6oh+L1vg31mdUqK0Ac/NjZoQunavoyzqdPYhFz9zzOezCrZKjuJDS3NRK9rspvjgM0xYR4d47oNZbdZbwkI4cTv/gcMlquRy0OvpfIvJtjtaJWMwTLtM5VhRusRuUlpH99UUVeXAAAAFQCVyX+92hBEjInEKL0v13c/egDCTQAAAIEAvFdWGq0ccOPbw4f/F8LpZqvWDydAcpXHV3thwb7WkFfppvm4SZte0zds1FJ+Hr8Xzzc5zMHe6J4Nlay/rP4ewmIW7iFKNBEYb/yWa+ceLrs+TfR672TaAgO6o7iSRofEq5YLdwgrwkMmIawa21FrZ2D9SPao/IwvENzk/xcHu7YAAACAQFXQH6HQnxOrw4dqf0NqeKy1tfIPxYYUZhPJfo9O0AmBW2S36pD2l14kS89fvz6Y1g8gN/FwFnRncMzlLY/hX70FSc/3hKBSbH6C6j8hwlgFKfizav21eS358JJz93leOakJZnGb8XlWvz1UJbwCsnR2VEY8Dz90uIk1l/UqHkA= loic@call",
       "title": "dummySSHkey"};


  var gUsers = null;
  var callback = jasmine.createSpy("callback");
 
  beforeAll( function(done){
    gUsers = new Users( conf.gitrep );
    gUsers.current( function(err, res, result){
      callback(err, res, result);
      done();
    });
  });

  it("- should get current authenticated user", function(){
    var err = callback.calls.mostRecent().args[0]
    var response = callback.calls.mostRecent().args[1]
    var user = callback.calls.mostRecent().args[2];
    expect(err).toBeNull();
    expect(response.statusCode).toBe(200);
    expect( typeof user).toBe("object");
  })

  describe("- Gets all SSH keys.(if any)", function(){
    var gUsers = null;
    var callback =null ;
    
    callback = jasmine.createSpy("callback");
   
    beforeAll( function(done){
      gUsers = new Users( conf.gitrep );
      gUsers.listKeys( function(err, res, result){
        callback(err, res, result);
        done();
      });
    });

    it("- should get ssh keys, if any", function(){
      var err = callback.calls.mostRecent().args[0]
      var response = callback.calls.mostRecent().args[1]
      var keys = callback.calls.mostRecent().args[2];
      
      expect(err).toBeNull();
      expect(response.statusCode).toBe(200);
      expect( typeof keys).toBe("object");
    });

    it("- should have key properties", function(){
      var keys = callback.calls.mostRecent().args[2];
      if( keys.length > 0){
        expect( keys[0].id).toBeDefined();
        expect( keys[0].title).toBeDefined();
        expect( keys[0].key).toBeDefined();
      }
    });
  });  

  describe("- Add SSH key", function(){
    var gUsers = null;
    var callback = jasmine.createSpy("callback");
   
    beforeAll( function(done){
      gUsers = new Users( conf.gitrep );
      gUsers.addKey( newKeyObj, function(err, res, result){        
        newKeyObj.id = result.id;
        callback(err, res, result);
        done();
      });
    });

    it("- should add new key", function(){
      var err = callback.calls.mostRecent().args[0]
      var response = callback.calls.mostRecent().args[1]
      
      expect(err).toBeNull();
      expect(response.statusCode).toBe(201);
    });

  });

  describe("- Fetch SSH key by id", function(){
    var gUsers = null;
    var callback = jasmine.createSpy("callback");

    beforeAll( function(done){
      gUsers = new Users( conf.gitrep );
      gUsers.getKey( newKeyObj.id , function(err, res, result){
        callback(err, res, result);
        done();
      })
    });
    
    it("- SSH key should be found", function(done){
        expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(200);
        expect( typeof callback.calls.mostRecent().args[2] ).toEqual("object");
        expect( callback.calls.mostRecent().args[2]["title"] ).toBe( newKeyObj.title);
        done();
    });

  });    

  describe("- Delete SSH key", function(){
    var gUsers = null;
    var callback = jasmine.createSpy("callback");
   
    beforeAll( function(done){
      gUsers = new Users( conf.gitrep );
      gUsers.deleteKey( newKeyObj.id, function(err, res, result){
        callback(err, res, result);
        done();
      });
    });

    it("- should delete key", function(){
      var err = callback.calls.mostRecent().args[0]
      var response = callback.calls.mostRecent().args[1]
      
      expect(err).toBeNull();
      expect(response.statusCode).toBe(200);
    });

  });    

});
