/**
* @module Users
*
*
*/

var 
	defaults = require("101/defaults")
    , utils  = require("./_utils.js")
    , Agent  = require("./_agent.js")

   ;

/* Users constructor
*
*/
var Users = function(opt){

	if( opt === null || typeof opt !== "object" ){
		throw new Error("Please specify gitlab url and token") ;
	}

	this.defaultOptions = {
		page: 1
	  , per_page	: 10
	}


	//extend opt
	opt = defaults(opt, this.defaultOptions);
	//Create new agent
	this.agent = new Agent(opt);


	return this;
}


/** Get user by :id
*
*/


Users.prototype.all = function( params, callback){
	
	if( arguments.length  === 1){
		params = {};
	}

	if( typeof callback !== "function" || typeof params !== "object"){
		throw new Error("Invalid arguments");
	}


	var self = this;
	
	this.agent.dial({
		"method" : "GET",
		"endpoint" : "users"
	}, params, callback)

}



module.exports  = Users;