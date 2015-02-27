/**
* @module Users
*
*
*/

'use strict';

var 
	defaults = require("101/defaults")
    , utils  = require("./_utils.js")
    , Agent  = require("./_agent.js")
    , debug = require("debug")("users")

   ;



/* Users constructor
*
*/
var Users = function(opt){

	if( opt === null || typeof opt !== "object" ){
		debug("No gitlab url and token specified");
		throw new Error("Please specify gitlab url and token") ;
	}

	this.defaultOptions = {
		page: 1
	  , per_page	: 10
	  , admin: false
	}


	//extend opt
	this.optionsFinal =  defaults(opt, this.defaultOptions);

	//Create new agent
	this.agent = new Agent( this.optionsFinal );

	return this;
}


/** 
* Get all users
*
* @params { Object } params : Paramter object
* @params { Function} callback: Callback 
*/
Users.prototype.find = function( params, callback){
	var args = Array.prototype.slice.call( arguments);

	var optionF = {
		"method" : "GET",
		"path" : "users"
	}

	if( arguments.length  === 1){
		if( typeof args[0] === "function" ){
			callback = args[0];
			params = {};
		}
	}

	if( typeof callback !== "function" || typeof params === "undefined"){
		throw new Error("Invalid arguments");
	}

// params :string
	if( typeof params === "string"){
		optionF["path"] = "users?search=" + params;
	}else if( typeof params === "number" ){
		optionF["path"] = "users/" + params;
		params = {};
	}


	debug("Fetch all users:---------------- ");
	this.agent.dial(optionF, params, callback);

}

/** Creates a new user. Note only administrators can create new users.
*
* @params { Object } params : Paramter object
* @params { Function} callback: Callback 
*/

Users.prototype.create = function ( params, callback){

	var optionF = {
		"method" : "POST",
		"path" : "users"
	}

	if( typeof callback !== "function" || typeof params !== "object"){
		throw new Error("Invalid arguments");
	}


	if(  !this.optionsFinal.admin ){
		//throw new Error("Only admin can create user");
		console.log("Only admin can create user");
		debug("Only admin can create user...ignored and trying");
	}



	debug("creating new user:---------------- ");
	this.agent.dial(optionF, params, callback);


}


module.exports  = Users;