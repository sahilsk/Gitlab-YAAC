/**
*  `Projects` Resource module
*
* @module Projects
*
*/

'use strict';

var 
	defaults = require("101/defaults")
    , utils  = require("./lib/_utils.js")
    , Agent  = require("./lib/_agent.js")
    , debug = require("debug")("projects")
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

	if(  !this.optionsFinal.admin ){
		//throw new Error("Only admin can create user");
		console.log("Only admin can create project for others");
		debug("Only admin can create project for others...ignored and trying");
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

	if( typeof callback !== "function" ||  typeof projectID === "undefined"){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}
	var optionF = {
		"method" : "DELETE",
		"path" : "projects/" + projectID
	}

	debug("deleting project: '%s'---------------- ", projectID);
	this.agent.dial(optionF, callback);

}

/** Forks a project into the user namespace of the authenticated user.
*
* @param { Number} project id
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.fork = function (projectID, callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined"){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}

	var optionF = {
		"method" : "POST",
		"path" : "projects/fork/" + projectID
	}


	debug("forking project: '%s'---------------- ", projectID);
	this.agent.dial(optionF, callback);

}

/** Get a list of a project's team members.
*
* @param { Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { Number} [params]:  { query: Query string to search for members }
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.members = function (projectID, params, callback){
	var args = Array.prototype.slice.call( arguments);

	if(  arguments.length === 2){
		projectID = args[0];
		callback = args[1];
		params = {};
	}

	if( typeof callback !== "function" ||  typeof projectID === "undefined"){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}	

	var optionF = {
		"method" : "GET",
		"path" : "projects/" + projectID + "/members"
	}

	optionF["path"] = optionF["path"] + "?" + Qs.stringify( params);

	debug("listing project members: '%s'---------------- ", projectID);
	this.agent.dial(optionF, params, callback);

}

/** Gets a project team member.
*
* @param { Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { Number} user_id: The ID of a user
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.getMember = function (user_id, projectID,  callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof user_id !== "number"){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}

	var optionF = {
		"method" : "GET",
		"path" : "projects/" + projectID + "/members/" + user_id
	}



	debug("fetching project member: '%s'---------------- ", user_id);
	this.agent.dial(optionF, callback);

}

/** Adds a user to a project team. 
*
* @param { Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { Number} userObj: {user_id: user id to add, access_level: project access level eg. 20-> developer}
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.addMember = function (userObj, projectID,  callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof userObj !== "object"){
		throw new Error("Invalid arguments");
	}

	var optionF = {
		"method" : "POST",
		"path" : "projects/" + projectID + "/members"
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}

	debug("adding project member: '%s'---------------- ", userObj);
	this.agent.dial(optionF,userObj, callback);

}

/** Updates a project team member to a specified access level.
* @param { Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { Number} user_id: The ID of a user
* @param { Object} params: { access_level : Project access leve}
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.updateMember = function (user_id, projectID, params, callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof user_id !== "number" || typeof params !== "object" ){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}

	var optionF = {
		"method" : "PUT",
		"path" : "projects/" + projectID + "/members/" + user_id 
	}


	debug("edit project member: '%s'---------------- ", user_id);
	this.agent.dial(optionF, params, callback);

}

/** Removes a user from a project team.
*
* @param { Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { Number} user_id: The ID of a user
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.removeMember = function (user_id, projectID, callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof user_id !== "number" || typeof params === "object" ){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}

	var optionF = {
		"method" : "DELETE",
		"path" : "projects/" + projectID + "/members/" + user_id 
	}



	debug("delete project member: '%s'---------------- ", user_id);
	this.agent.dial(optionF, callback);

}

/** Get a list of project hooks.
*
* @param { Number|string} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.hooks = function ( projectID, callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" ){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}
	var optionF = {
		"method" : "GET",
		"path" : "projects/" + projectID + "/hooks"
	}


	debug("list project hooks ---------------- ");
	this.agent.dial(optionF,  callback);

}

/** Get project hook
*
* @param { Number} hook_id: The ID of a project hook
* @param { Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.getHook = function (hook_id, projectID,  callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof hook_id !== "number"){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}

	var optionF = {
		"method" : "GET",
		"path" : "projects/" + projectID + "/hooks/" + hook_id
	}



	debug("fetching project hook: '%s'---------------- ", hook_id);
	this.agent.dial(optionF, callback);

}

/** Adds a hook to a specified project.
*
* @param { object} hook : the hook object to add
* -id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
* -url (required) - The hook URL
* -push_events - Trigger hook on push events
* -issues_events - Trigger hook on issues events
* - merge_requests_events - Trigger hook on merge_requests events
* - tag_push_events - Trigger hook on push_tag events
* @param { Number|string} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.addHook = function (hook, projectID, callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof hook !== "object" ){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}
	var optionF = {
		"method" : "POST",
		"path" : "projects/" + projectID + "/hooks"
	}



	debug("adding hook to a project ---------------- ");
	this.agent.dial(optionF, hook, callback);

}

/** Edits a hook for a specified project.
*
* @param { object} hookObj : the hook object to edit
* -id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
* -url (required) - The hook URL
* -push_events - Trigger hook on push events
* -issues_events - Trigger hook on issues events
* - merge_requests_events - Trigger hook on merge_requests events
* - tag_push_events - Trigger hook on push_tag events
* @param { Number} hook_id : the hook id to edit
* @param { Number|string} projectID : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.updateHook = function (hookObj, hook_id, projectID, callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof hook_id !== "number" || typeof hookObj !== "object" ){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}
	var optionF = {
		"method" : "PUT",
		"path" : "projects/" + projectID + "/hooks/" + hook_id
	}

	debug("editing hook  ---------------- ");
	this.agent.dial(optionF, hookObj, callback);

}

/** Removes a hook from a project
*
* @param { Number} hook_id : the hook id to edit
* @param { Number|string} projectID : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.deleteHook = function ( hook_id, projectID, callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof hook_id !== "number" ){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}

	var optionF = {
		"method" : "DELETE",
		"path" : "projects/" + projectID + "/hooks/" + hook_id
	}

	debug("Deleting hook  ---------------- ");
	this.agent.dial(optionF, callback);

}

/** Lists all branches of a project.
*
* @param { Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/
Projects.prototype.branches = function (projectID, callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined"){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}
	var optionF = {
		"method" : "GET",
		"path" : "projects/" + projectID + "/repository/branches"
	}



	debug("listing project branches: '%s'---------------- ", projectID);
	this.agent.dial(optionF, callback);

}

/** Lists a specific branch of a project.
*
* @param { string} branch: The name of branch
* @param { Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.getBranch = function (branch, projectID,  callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof branch !== "string"){
		throw new Error("Invalid arguments");
	}


	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}
	var optionF = {
		"method" : "GET",
		"path" : "projects/" + projectID + "/repository/branches/" + branch
	}



	debug("fetching project branch: '%s'---------------- ", branch);
	this.agent.dial(optionF, callback);

}

/** Protects a single branch of a project.
*
* @param { string} branch: The name of branch
* @param { Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.protectBranch = function (branch, projectID,  callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof branch !== "string"){
		throw new Error("Invalid arguments");
	}


	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}
	var optionF = {
		"method" : "PUT",
		"path" : "projects/" + projectID + "/repository/branches/" + branch + "/protect"
	}


	debug("protect project branch---------------- ");
	this.agent.dial(optionF, callback);

}

/** Unprotects a single branch of a project.
*
* @param { string} branch: The name of branch
* @param { Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.unprotectBranch = function (branch, projectID,  callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof branch !== "string"){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}
	var optionF = {
		"method" : "PUT",
		"path" : "projects/" + projectID + "/repository/branches/" + branch + "/unprotect"
	}



	debug("unprotect project branch----------------");
	this.agent.dial(optionF, callback);

}


/** Allows modification of the forked relationship between existing projects
*
* @param { string|Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { string|Number} forked_from_id: The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.createForkFromRelation = function (projectID, forked_from_id, callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined" || typeof forked_from_id === "undefined"){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}

	// If project forked_from_id then URI encode
	if( typeof forked_from_id === "string"){
		 forked_from_id = encodeURIComponent( forked_from_id);
	}		

	var optionF = {
		"method" : "POST",
		"path" : "projects/" + projectID + "/fork/" + forked_from_id
	}

	if(  !this.optionsFinal.admin ){
		//throw new Error("Only admin can create user");
		console.log("Only admin can create fork relation");
		debug("Only admin can create fork relation...ignored and trying");
	}


	debug("create forked relation---------------- ");
	this.agent.dial(optionF, callback);

}

/** Delete an existing forked from relationship
*
* @param { string|Number} project id : The ID or NAMESPACE/PROJECT_NAME of a project
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.deleteForkFromRelation = function (projectID, callback){

	if( typeof callback !== "function" ||  typeof projectID === "undefined"){
		throw new Error("Invalid arguments");
	}

	// If project projectID then URI encode
	if( typeof projectID === "string"){
		 projectID = encodeURIComponent( projectID);
	}
	var optionF = {
		"method" : "DELETE",
		"path" : "projects/" + projectID + "/fork"
	}



	debug("delete existing forked relation---------------- ");
	this.agent.dial(optionF, callback);

}

/** Search for projects by name which are accessible to the authenticated user.
*
* @param { object} searchObj: The search object
* - query (required) - A string contained in the project name
* - per_page (optional) - number of projects to return per page
* - page (optional) - the page to retrieve
* - order_by (optional) - Return requests ordered by id, name, created_at or 
* - last_activity_at fields
* - sort (optional) - Return requests sorted in asc or desc order
* @param { requestCallback } callback: Callback
*
*/

Projects.prototype.search = function (searchObj, callback){

	if( typeof callback !== "function" ||  typeof searchObj !== "object"){
		throw new Error("Invalid arguments");
	}

	var optionF = {
		"method" : "GET",
		"path" : "projects/search/" + searchObj.query
	}

	delete searchObj.query;

	debug("search project ---------------- ");
	this.agent.dial(optionF, searchObj, callback);

}

/** Callback
*
* @callback requestCallback
* @param {Object} error :  Error 
* @param {Object} response: Reponse object
* @param { ( Object | Object[] ) } result: Result(s)
*/

module.exports  = Projects;