/**
*  `Session` Resource module
*
* @module Session
*
*/
'use strict';

var 
	defaults = require("101/defaults")
    , utils  = require("./lib/_utils.js")
    , Agent  = require("./lib/_agent.js")
    , debug = require("debug")("Session")

   ;



/* Session constructor
*
*/
var Session = function(opt){

	if( opt === null || typeof opt !== "object" ){
		debug("No gitlab url and token specified");
		throw new Error("Please specify gitlab url and token") ;
	}

	//Create new agent
	this.agent = new Agent( opt );

	return this;
}


/** login to get private token
*
* @param {Object} credObj: Credentails object with "login", "email" and "password" keys
* @param { requestCallback } callback: Callback
*
*/
Session.prototype.create = function ( credObj, callback){

	var optionF = {
		"method" : "POST",
		"path" : "session"
	}

	if( arguments.length < 2 || 
			typeof credObj.login === "undefined" || 
				typeof credObj.password === "undefined"){
	
		throw new Error("Invalid arguments");
	}



	debug("retrieving priviate token:---------------- ");
	this.agent.dial(optionF, credObj, callback);


}


/** Callback
*
* @callback requestCallback
* @param {Object} error :  Error 
* @param {Object} response: Reponse object
* @param { ( Object | Object[] ) } result: Result(s)
*/

module.exports = Session;