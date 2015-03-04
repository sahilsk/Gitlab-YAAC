var 
	Projects =  require("../lib/projects")
  , conf = require("./helpers/testConf")
	;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;


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

  it("- should list projects iwth params", function(){
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.mostRecent().args[0]).toBeNull();
    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");

  });
});


// Projects List Owned Projects


describe(" Projects: list owned projects", function(){

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


describe(" Projects: list ALL projects", function(){

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



var projectIdentifier = 70;


// Get Single project

describe("Projects: Get single project", function(){
 
  var gProjects = null;
  var callback = jasmine.createSpy("callback");
 
  beforeAll( function(done){
    gProjects = new Projects( conf.gitrep );
    gProjects.find( projectIdentifier, function(err, res, result){
      callback(err, res, result);
      done();
    });
  });

  it("- should fetch single project", function(){
    expect( callback).toHaveBeenCalled();
    expect( callback.calls.mostRecent().args[0]).toBeNull();
    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");
    if( callback.calls.mostRecent().args[2].length > 0 ){
    	expect( callback.calls.mostRecent().args[2][0]["project_id"]).toBeDefined();
    }

  });
});



var projectIdentifier = 70;
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


// Create project

var newProject = {
	name : "dummyProject-007",
	description : "dummy project will be deleted soon",
	issues_enabled  : false,
	merge_requests_enabled : false,
	wiki_enabled : false,
	snippets_enabled :false,
	public : false,
	visibility_level : 20
}

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
	    	console.log( result);
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


    describe(": UPDATe", function(){

	  var gProjects = null;
	  var callback = jasmine.createSpy("callback");
	  beforeAll( function(done){
	    gProjects = new Projects( conf.gitrep );
	    newProject.name = "dummyPorject-008";
	    newProject.description = "updated dummyPorject-008";

	    gProjects.update( newProject.id, {description:"updated dummyPorject-008"}, function(err, res, result){
	     console.log( "updating ", err, result);
	      callback(err, res, result);
	      done();
	    });
	  });

	  it("- should update project", function(){
	    expect( callback).toHaveBeenCalled();
	    expect( callback.calls.mostRecent().args[0]).toBeNull();
	    expect( typeof callback.calls.mostRecent().args[2]).toBe("object");
	    	expect( callback.calls.mostRecent().args[2]["name"]).toBe( newProject.name);
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
    
    it("- delete a user", function(done){
      expect(callback.calls.mostRecent().args[0]).toBeNull();
      expect( callback.calls.mostRecent().args[1]["statusCode"]).toEqual(200);
      expect(  callback.calls.mostRecent().args[2]["id"] ).toBe( newProject.id);
      done();
    });

  }); 


  describe(" CREATE FOR -------", function(){
	var gProjects = null;
	var callback = jasmine.createSpy("callback");

	beforeAll( function(done){
		gProjects = new Projects( conf.gitrep );
		gProjects.createFor( 4, newProject,  function(err, res, result){
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
		expect( callback.calls.mostRecent().args[1]["statusCode"]).toBe(201);
		expect( project["name"]).toEqual( newProject.name);
	});
  });

});