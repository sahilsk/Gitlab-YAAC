var 
	Projects =  require("../projects")
  , conf = require("./helpers/testConf")
	;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

var  existingUserId = 4;
var projectIdentifier = 70;

var newProject = {
  name : "dummyProject-007",
  description : "dummy project will be deleted soon",
  issues_enabled  : false,
  merge_requests_enabled : false,
  wiki_enabled : false,
  snippets_enabled :false,
  public : false,
  visibility_level : 20
};

describe(" Projects: list projects", function(){

  var gProjects = null;
  var callback = jasmine.createSpy("callback");
 
  beforeAll( function(done){
    gProjects = new Projects( conf.gitrep );
    gProjects.list( function(err, res, result){
      callback(err, res, result);
      done();
    });
  });

  it("- should list projects", function(){
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.count()).toBe(1);
    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");
  });
});

describe("Projects: List projects with params", function(){

  var gProjects = null;
  var callback = jasmine.createSpy("callback");
  var params = {
  	archived: true,
  	order_by: "last_activity_at ",
  	sort: "asc"
  };
 
  beforeAll( function(done){
    gProjects = new Projects( conf.gitrep );
    gProjects.list(params, function(err, res, result){
      callback(err, res, result);
      done();
    });
  });

  it("- should list projects with params", function(){
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.mostRecent().args[0]).toBeNull();
    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");

  });
});


describe("Projects: Search project", function(){
  var gProjects = new Projects( conf.gitrep );
  var callback = jasmine.createSpy("callback");
  var searchObj = { query: "orchestrate"};

  beforeAll( function(done){
    gProjects.search( searchObj, function(err, res, result){
      callback(err, res, result);
      done();
    });
  });

  it("- should search project", function(){
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.mostRecent().args[0]).toBeNull();
    expect( callback.calls.mostRecent().args[1]["statusCode"]).toBe(200);
    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");
  }); 

})


// Projects List Owned Projects
describe("Projects: list owned projects", function(){

  var gProjects = null;
  var callback = jasmine.createSpy("callback");
 
  beforeAll( function(done){
    gProjects = new Projects( conf.gitrep );
    gProjects.listOwned( function(err, res, result){
      callback(err, res, result);
      done();
    });
  });

  it("- should list owned projects", function(){
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.count()).toBe(1);
    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");
  });
});

describe("Projects: List projects with params", function(){

  var gProjects = null;
  var callback = jasmine.createSpy("callback");
  var params = {
  	archived: true,
  	order_by: "last_activity_at ",
  	sort: "asc"
  };
 
  beforeAll( function(done){
    gProjects = new Projects( conf.gitrep );
    gProjects.listOwned(params, function(err, res, result){
      callback(err, res, result);
      done();
    });
  });

  it("- should list projects filtered by params", function(){
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.mostRecent().args[0]).toBeNull();
    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");

  });
});

// Projects List ALL Projects
describe("Projects: list ALL projects", function(){

  var gProjects = null;
  var callback = jasmine.createSpy("callback");
 
  beforeAll( function(done){
    gProjects = new Projects( conf.gitrep );
    gProjects.listAll( function(err, res, result){
      callback(err, res, result);
      done();
    });
  });

  it("- should list all projects", function(){
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.count()).toBe(1);
    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");
  });
});

describe("Projects: List projects with params", function(){

  var gProjects = null;
  var callback = jasmine.createSpy("callback");
  var params = {
  	archived: true,
  	order_by: "last_activity_at ",
  	sort: "asc"
  };
 
  beforeAll( function(done){
    gProjects = new Projects( conf.gitrep );
    gProjects.listAll(params, function(err, res, result){
      callback(err, res, result);
      done();
    });
  });

  it("- should list project filtered by input params", function(){
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.mostRecent().args[0]).toBeNull();
    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");

  });
});





// Create project

//  Projects CRUD
describe("Projects:  Create , READ, UPDATE", function(){
 
  var gProjects = null;
  var callback = jasmine.createSpy("callback");
 
  beforeAll( function(done){
    gProjects = new Projects( conf.gitrep );
    gProjects.create( newProject,  function(err, res, result){
      newProject.id = result.id;
      callback(err, res, result);
      done();
    });
  });

  it("- should fetch project events", function(){
  	var project = callback.calls.mostRecent().args[2];
  	newProject.id = project.id;
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.mostRecent().args[0]).toBeNull();
    expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(201);
   	expect( project["name"]).toEqual( newProject.name);
  });

  describe("-:  READ", function(){
	 
	  var gProjects = null;
	  var callback = jasmine.createSpy("callback");
	  beforeAll( function(done){
	    gProjects = new Projects( conf.gitrep );
	    gProjects.find( newProject.id, function(err, res, result){
	      callback(err, res, result);
	      done();
	    });
	  });

	  it("- should fetch single project", function(){
	    expect( callback).toHaveBeenCalled();
	    expect( callback.calls.mostRecent().args[0]).toBeNull();
	    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");
	    	expect( callback.calls.mostRecent().args[2]["name"]).toBe( newProject.name);
	  });

	});

  describe(": UPDATE", function(){

	  var gProjects = null;
	  var callback = jasmine.createSpy("callback");
	  beforeAll( function(done){
	    gProjects = new Projects( conf.gitrep );
	    newProject.name = "dummyProject-008";
	    newProject.description = "updated dummyProject-008";

	    gProjects.update( newProject.id, {issues_enabled : true}, function(err, res, result){
	     console.log( "updating ",  newProject.id, err, result);
	      callback(err, res, result);
	      done();
	    });
	  });

	  it("- should update project", function(){
	    expect( callback).toHaveBeenCalled();
      expect( callback.calls.mostRecent().args[0]).toBeNull();
	    expect( callback.calls.mostRecent().args[1]['statusCode']).toBe(200);
	    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");
	  });

  });

  // Get project events
  describe("Projects: Get project events", function(){
   
    var gProjects = null;
    var callback = jasmine.createSpy("callback");
   
    beforeAll( function(done){
      gProjects = new Projects( conf.gitrep );
      gProjects.events( projectIdentifier, function(err, res, result){
        callback(err, res, result);
        done();
      });
    });

    it("- should fetch project events", function(){
      expect( callback).toHaveBeenCalled();
      expect( callback.calls.mostRecent().args[0]).toBeNull();
      expect( typeof callback.calls.mostRecent().args[2]).toBe("object");
      if( callback.calls.mostRecent().args[2].length > 0 ){
        expect( callback.calls.mostRecent().args[2][0]["action_name"]).toBeDefined();
      }
    });
    
  });  

  describe(" DELETE ----------", function(){
    var gProjects = null;
    var callback = jasmine.createSpy("callback");

    beforeAll( function(done){
      gProjects = new Projects( conf.gitrep );
      gProjects.delete(newProject.id, function(err, res, result){
        callback(err, res, result);
        done();
      })
    });
    
    it("- delete project", function(done){
      expect(callback.calls.mostRecent().args[0]).toBeNull();
      expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(200);
      expect(  callback.calls.mostRecent().args[2]["id"] ).toBe( newProject.id);
      done();
    });

  }); 

});


/**
*  Create a new project
    - fork
    - hooks
*
*/

describe(" Create Project: ", function(){

  var gProjects = null;
  var callback = jasmine.createSpy("callback");

  beforeAll( function(done){
    gProjects = new Projects( conf.gitrep );
    gProjects.createFor( existingUserId, newProject,  function(err, res, result){
      newProject.id = result.id;
      callback(err, res, result);
      done();
    });
  });

  afterAll( function(done){
    gProjects = new Projects( conf.gitrep );
    gProjects.delete(newProject.id, function(err, res, result){
      callback(err, res, result);
      done();
    })
  });
    

  it("- should create project project for specified user", function(){
    var project = callback.calls.mostRecent().args[2];
    newProject.id = project.id;
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.mostRecent().args[0]).toBeNull();
    expect( callback.calls.mostRecent().args[1]["statusCode"]).toBe(201);
    expect( project["name"]).toEqual( newProject.name);
  });

});

// Fork project
describe(" fork project", function(){

  var gProjects = null;
  var callback = jasmine.createSpy("callback");
  var forkedProject = {};

  beforeAll( function(done){
    gProjects = new Projects( conf.gitlab );
    gProjects.fork( "gitlab-org/omnibus-gitlab",  function(err, res, result){
      forkedProject = result;
      callback(err, res, result);
      done();
    });
  });

  afterAll( function(done){
    gProjects = new Projects( conf.gitlab );
    gProjects.delete(forkedProject.id, function(err, res, result){
      callback(err, res, result);
      done();
    });
  });


  it("- should fork project", function(){
    var project = callback.calls.mostRecent().args[2];
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.mostRecent().args[0]).toBeNull();
    expect( callback.calls.mostRecent().args[1]["statusCode"]).toBe(201);
  });
});


// list project members
describe(" list project members", function(){
  var gProjects =  new Projects( conf.gitrep );
  var callback = jasmine.createSpy("callback");

  var memberToQuery = {};
  var existingProject = {};

  beforeAll( function(done){
    gProjects.list( function(err, res, result){
      existingProject= result[4];
      done();
    });
  });

  it("- should list member", function(done){
    gProjects.members( existingProject.id,  function(err, res, result){
      memberToQuery =  result[0];
      expect( res["statusCode"]).toBe(200);
      expect(  result.length).toBeGreaterThan(0);
      done();
    });
  });

  it("- should list  queried member", function(done){
    gProjects.members( existingProject.path_with_namespace, {query: memberToQuery.username},
     function(err, res, result){
      expect(err).toBeNull();
      expect( result[0]['username']).toBe(memberToQuery["username"]);
      done();
    });
  });

  it("- should get project member by uid", function(done){
    gProjects.getMember( memberToQuery.id, existingProject.path_with_namespace, 
      function(err, res, result){
       expect(err).toBeNull();
       expect( result['username']).toBe(memberToQuery.username);
       done();
    });
  });

  it("- should add project member",function(done){
    var user_obj = { user_id: existingUserId, access_level: 30};
    gProjects.addMember( user_obj, existingProject.id, 
      function(err, res, result){
       expect(err).toBeNull();
       expect(res.statusCode).toBe(201);
       done();
    });    
  });

  it("- should update project member",function(done){
    gProjects.updateMember( existingUserId, existingProject.path_with_namespace, {access_level:10}
        , function(err, res, result){
           expect(err).toBeNull();
           expect(res.statusCode).toBe(200);
           done();
    });    
  })  

  it("- should remove project member",function(done){
    gProjects.removeMember( existingUserId, existingProject.path_with_namespace, 
      function(err, res, result){
       expect(err).toBeNull();
       expect(res.statusCode).toBe(200);
       done();
    });    
  });

});


// hooks
describe(" HOOKS: ", function(){
  var gProjects =  new Projects( conf.gitrep );
  var callback = jasmine.createSpy("callback");

  var memberToQuery = {};
  var existingProject = {};
  var hook_obj = { url: "http://dymmyhookgoeshere", push_events:true, issues_events: true};

  beforeAll( function(done){
    gProjects.list( function(err, res, result){
      existingProject= result[4];
      done();
    });
  });

  it("- should list hooks", function(done){
    gProjects.hooks( existingProject.id,  function(err, res, result){
      memberToQuery =  result[0];
      expect( res["statusCode"]).toBe(200);
      expect(  typeof result).toBe("object");
      done();
    });
  });

  it("- should add project hook",function(done){
    gProjects.addHook( hook_obj, existingProject.id, 
      function(err, res, result){
       hook_obj = result;
       expect(err).toBeNull();
       expect(res.statusCode).toBe(201);
       done();
    });    
  });

  it("- should get project hook", function(done){
    gProjects.getHook( hook_obj.id, existingProject.id, 
      function(err, res, result){
       expect(err).toBeNull();
       expect(res.statusCode).toBe(200);
       expect(result.url).toBe(hook_obj.url);
       done();
    }); 

  })

  it("- should update project hook",function(done){
    hook_obj["merge_requests_events"] = true;
    gProjects.updateHook(  hook_obj, hook_obj.id, existingProject.path_with_namespace
        , function(err, res, result){
           expect(err).toBeNull();
           expect(res.statusCode).toBe(200);
           done();
    });    
  })  

  it("- should remove project hook",function(done){
    gProjects.deleteHook( hook_obj.id, existingProject.path_with_namespace, 
      function(err, res, result){
       expect(err).toBeNull();
       expect(res.statusCode).toBe(200);
       done();
    });    
  });

});


// Branch
describe(" BRANCH: ", function(){
  var gProjects =  new Projects( conf.gitrep );
  var callback = jasmine.createSpy("callback");

  var foundBranch = {};
  var existingProject = {};

  beforeAll( function(done){
    gProjects.list( function(err, res, result){
      existingProject= result[17];
      done();
    });
  });

  it("- should list branches", function(done){
    gProjects.branches( existingProject.id,  function(err, res, result){
      foundBranch = result[2];
      expect( res["statusCode"]).toBe(200);
      //expect(result.length).toBeGreaterThan(0);
      expect(  typeof result).toBe("object");
      done();
    });
  });

  it("- should get project branch",function(done){
    gProjects.getBranch( foundBranch.name, existingProject.id, 
      function(err, res, result){
       expect(err).toBeNull();
       expect(res.statusCode).toBe(200);
       done();
    });    
  });

  it("- should protect project branch",function(done){
    gProjects.protectBranch(  foundBranch.name, existingProject.path_with_namespace
        , function(err, res, result){
           expect(err).toBeNull();
           expect(res.statusCode).toBe(200);
           done();
    });    
  })  

  it("- should unprotect project branch",function(done){
    gProjects.unprotectBranch( foundBranch.name, existingProject.path_with_namespace, 
      function(err, res, result){
       expect(err).toBeNull();
       expect(res.statusCode).toBe(200);
       done();
    });    
  });

});