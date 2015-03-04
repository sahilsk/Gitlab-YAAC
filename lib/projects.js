/**
*  `Projects` Resource module
*
* @module Projects
*
*/

'use strict';

var 
	defaults = require("101/defaults")
    , utils  = require("./_utils.js")
    , Agent  = require("./_agent.js")
    , debug = require("debug")("users")
    , Qs = require('qs')

   ;



/* Projects constructor
*
*/
var Projects = function(opt){

	if( opt === null || typeof opt !== "object" ){
		debug("No gitlab url and token specified");
		throw new Error("Please specify gitlab url and token") ;
	}

	if( typeof opt.url === "undefined" || typeof opt.token === "undefined"){
		throw new Error("Please specify gitlab url and token") ;
	}

	this.defaultOptions = {
	   admin: false
	}


	//extend opt
	this.optionsFinal =  defaults(opt, this.defaultOptions);

	//Create new agent
	this.agent = new Agent( this.optionsFinal );

	return this;
}


/** 
* Get a list of projects accessible by the authenticated user.
*
* @param { Object } [params] : Paramter object
* - archived (optional) - if passed, limit by archived status
* - order_by (optional) - Return requests ordered by id, name, path, created_at, updated_at or last_activity_at fields. Default is created_at
* - sort (optional) - Return requests sorted in asc or desc order. Default is desc
* - search (optional) - Return list of authorized projects according to a search criteria
* @param { requestCallback} callback: Callback 
*/
Projects.prototype.list = function( params, callback){
	var args = Array.prototype.slice.call( arguments);

	var optionF = {
		"method" : "GET",
		"path" : "projects"
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

	optionF["path"] = optionF["path"] + "?" + Qs.stringify( params);

	debug("List projects:---------------- ");
	this.agent.dial(optionF, callback);

}

/** 
* Get a list of projects which are owned by the authenticated user.
*
* @param { Object } [params] : Paramter object
* - archived (optional) - if passed, limit by archived status
* - order_by (optional) - Return requests ordered by id, name, path, created_at, updated_at or last_activity_at fields. Default is created_at
* - sort (optional) - Return requests sorted in asc or desc order. Default is desc
* - search (optional) - Return list of authorized projects according to a search criteria
* @param { requestCallback} callback: Callback 
*/
Projects.prototype.listOwned = function( params, callback){
	var args = Array.prototype.slice.call( arguments);

	var optionF = {
		"method" : "GET",
		"path" : "projects/owned"
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

	optionF["path"] = optionF["path"] + "?" + Qs.stringify( params);

	debug("List projects:---------------- ");
	this.agent.dial(optionF, callback);

}

/** 
* Get a list of all GitLab projects (admin only).
*
* @param { Object } [params] : Paramter object
* - archived (optional) - if passed, limit by archived status
* - order_by (optional) - Return requests ordered by id, name, path, created_at, updated_at or last_activity_at fields. Default is created_at
* - sort (optional) - Return requests sorted in asc or desc order. Default is desc
* - search (optional) - Return list of authorized projects according to a search criteria
* @param { requestCallback} callback: Callback 
*/
Projects.prototype.listAll = function( params, callback){
	var args = Array.prototype.slice.call( arguments);

	var optionF = {
		"method" : "GET",
		"path" : "projects/all"
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

	if(  !this.optionsFinal.admin ){
		//throw new Error("Only admin can create user");
		console.log("Only admin can fetch projects");
		debug("Only admin can fetch projects...ignored and trying");
	}

	optionF["path"] = optionF["path"] + "?" + Qs.stringify( params);


	debug("List projects:---------------- ");
	this.agent.dial(optionF, callback);

}

/** 
* Get single project
* 
* @param { number | string } project identified by project ID or NAMESPACE/PROJECT_NAME
* @param { requestCallback} callback: Callback 
*/
Projects.prototype.find = function( projectIdentifier, callback){
	var args = Array.prototype.slice.call( arguments);
	var extraQs = null;

	var optionF = {
		"method" : "GET",
		"path" : "projects"
	}

	if( typeof callback !== "function" || typeof projectIdentifier === "undefined" ){
		throw new Error("Invalid arguments");
	}

	// If project namespace/projectname then URI encode
	if( typeof projectIdentifier === "string"){
		 projectIdentifier = encodeURIComponent( projectIdentifier);
	}

	optionF["path"] = optionF["path"] + "/" + projectIdentifier;

	debug("finding project by identifier:---------------- ");
	this.agent.dial(optionF, callback);

}


/**  Get project events
* 
* @param { number | string } project identified by project ID or NAMESPACE/PROJECT_NAME
* @param { requestCallback} callback: Callback 
*/
Projects.prototype.events = function( projectIdentifier, callback){
	var args = Array.prototype.slice.call( arguments);
	var extraQs = null;

	var optionF = {
		"method" : "GET",
		"path" : "projects"
	}

	if( typeof callback !== "function" || typeof projectIdentifier === "undefined" ){
		throw new Error("Invalid arguments");
	}

	// If project namespace/projectname then URI encode
	if( typeof projectIdentifier === "string"){
		 projectIdentifier = encodeURIComponent( projectIdentifier);
	}

	optionF["path"] = optionF["path"] + "/" + projectIdentifier + "/events";

	debug("finding project by identifier:---------------- ");
	this.agent.dial(optionF, callback);

}


/** Creates a new project owned by the authenticated user.
*
* @param { Object } params : Paramter object
* @param { requestCallback} callback: Callback 
*/

Projects.prototype.create = function ( params, callback){

	var optionF = {
		"method" : "POST",
		"path" : "projects"
	}

	if( typeof callback !== "function" || typeof params !== "object"){
		throw new Error("Invalid arguments");
	}


	debug("creating new project:---------------- ");
	this.agent.dial(optionF, params, callback);

}

/** Creates a new project owned by the specified user. Available only for admins.
*
* @param { number }  uid : user id; should be a integer
* @param { Object } params : Paramter object
* @param { requestCallback} callback: Callback 
*/

Projects.prototype.createFor = function ( uid, params, callback){

	var optionF = {
		"method" : "POST",
		"path" : "projects/user"
	}

	if( typeof uid !== "number" || typeof callback !== "function" || typeof params !== "object"){
		throw new Error("Invalid arguments");
	}

	optionF["path"] = optionF["path"] + "/" + uid;


	debug("creating new project for '%s':---------------- ", uid);
	this.agent.dial(optionF, params, callback);

}



/** Updates an existing project
*
* @param { projectIdentifier }  project Id or namespace/name
* @param { Object } params : Paramter object
* @param { requestCallback} callback: Callback 
*/

Projects.prototype.update = function ( projectIdentifier, params, callback){

	var optionF = {
		"method" : "PUT",
		"path" : "projects"
	}

	if( typeof callback !== "function" || typeof params !== "object" || typeof projectIdentifier === "undefined"){
		throw new Error("Invalid arguments");
	}


	// If project namespace/projectname then URI encode
	if( typeof projectIdentifier === "string"){
		 projectIdentifier = encodeURIComponent( projectIdentifier);
	}

	optionF["path"] = optionF["path"] + "/" + projectIdentifier;

	debug("updating project '%s':---------------- ", projectIdentifier);
	this.agent.dial(optionF, params, callback);

}



/** Delete project
*
* @param { Number} project id
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.delete = function (projectID, callback){

	if( typeof callback !== "function" ||  typeof projectID !== "number"){
		throw new Error("Invalid arguments");
	}

	var optionF = {
		"method" : "DELETE",
		"path" : "projects/" + projectID
	}


	debug("deleting project: '%s'---------------- ", projectID);
	this.agent.dial(optionF, callback);

}


/** Callback
*
* @callback requestCallback
* @param {Object} error :  Error 
* @param {Object} response: Reponse object
* @param { ( Object | Object[] ) } result: Result(s)
*/

module.exports  = Projects;