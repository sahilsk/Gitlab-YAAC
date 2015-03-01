/**
*  `Users` Resource module
*
* @module Users
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
* @param { Object } params : Paramter object
* @param { requestCallback} callback: Callback 
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
* @param { Object } params : Paramter object
* @param { requestCallback} callback: Callback 
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

/** Modify a user
*
* @param { Number} uid:  user id
* @param { Object} newInfo : Information to update
* @param { requestCallback } callback: Callback
*
*/

Users.prototype.update = function (uid, newInfo, callback){

	if( typeof callback !== "function" ||  typeof uid !== "number"){
		throw new Error("Invalid arguments");
	}

	var optionF = {
		"method" : "PUT",
		"path" : "users/" + uid
	}



	if(  !this.optionsFinal.admin ){
		//throw new Error("Only admin can create user");
		console.log("Only admin can create user");
		debug("Only admin can create user...ignored and trying");
	}


	debug("Modifying user:---------------- ");
	this.agent.dial(optionF, newInfo, callback);


}


/** Delete user
*
* @param { Number} user id
* @param { Object} newInfo : Information to update
* @param { requestCallback } callback: Callback
*
*/

Users.prototype.delete = function (id, callback){

	if( typeof callback !== "function" ||  typeof id !== "number"){
		throw new Error("Invalid arguments");
	}

	var optionF = {
		"method" : "DELETE",
		"path" : "users/" + id
	}



	if(  !this.optionsFinal.admin ){
		//throw new Error("Only admin can create user");
		console.log("Only admin can create user");
		debug("Only admin can create user...ignored and trying");
	}


	debug("deleting user:---------------- ");
	this.agent.dial(optionF, callback);


}

/** Get current authenticated user
*
* @param { requestCallback } callback: Callback
*
*/

Users.prototype.current = function ( callback){

	if( typeof callback !== "function" ){
		throw new Error("Invalid arguments");
	}

	var optionF = {
		"method" : "GET",
		"path" : "user"
	}

	debug("finding current user:---------------- ");
	this.agent.dial(optionF, callback);

}

Users.prototype.me = Users.prototype.current;

/** Get user keys of current user or speicified user
*
* @param { number} [uid] : uid of user
* @param { requestCallback } callback: Callback
*
*/

Users.prototype.listKeys = function ( uid, callback){
	var args  = Array.prototype.slice.call(arguments);


	if( arguments.length < 1){
		throw new Error("Invalid arguments");	
	}

	if( arguments.length === 1){
		callback = args[0];
		uid = null;
	}

	if( typeof callback !== "function" ){
		throw new Error("Invalid arguments");
	}

	if( uid){
		if( typeof uid !== "number"){
			throw new Error("Invalid user id");
		}
	}	

	var optionF = {
		"method" : "GET",
		"path" : "user/keys"
	}

	if(uid)
		optionF.path = "users/" +uid + "/keys";
	

	debug("finding keys:---------------- ");
	this.agent.dial(optionF, callback);

}

/** Get single key of current user or specified user
*
* @param { number} [uid] : id of user
* @param { number} keyid : SSH key id 
* @param { requestCallback } callback: Callback
*
* NOTE : Used only to get current authenticated user key only.
*/
Users.prototype.getKey = function ( keyId, callback){
	var args  = Array.prototype.slice.call(arguments);

	if( arguments.length < 2 || arguments.length > 2){
		throw new Error("Invalid arguments");	
	}

	if( typeof callback !== "function" || typeof keyId !== "number" ){
		throw new Error("Invalid arguments");
	}


	var optionF = {
		"method" : "GET",
		"path" : "user/keys/" + keyId
	}

	debug("finding key:---------------- ");
	this.agent.dial(optionF, callback);

}


/** Add single key for current user or specified user
*
* @param { number} [uid] : uid of user
* @param { number} keyObj : SSH key object to add
* @param { requestCallback } callback: Callback
*
*/

Users.prototype.addKey = function ( uid, keyObj, callback){
	var args  = Array.prototype.slice.call(arguments);

	if( arguments.length < 2){
		throw new Error("Invalid arguments");	
	}

	if( arguments.length === 2){
		keyObj = args[0];
		callback = args[1];
		uid = null;

	}

	if( typeof callback !== "function" || typeof keyObj !== "object" ){
		throw new Error("Invalid arguments");
	}

	if( uid){
		if( typeof uid !== "number"){
			throw new Error("Invalid user id");
		}
	}


	var optionF = {
		"method" : "POST",
		"path" : "user/keys"
	}

	if(uid)
		optionF.path = "users/" +uid + "/keys"  ;
	

	debug("adding key:---------------- ");
	this.agent.dial(optionF, keyObj, callback);

}

/** Delete SSH Key by if of current user or specified user
*
* @param { number} [uid] : id of user
* @param { number} keyid : SSH key id to delete
* @param { requestCallback } callback: Callback
*
*/

Users.prototype.deleteKey = function ( uid, keyId, callback){
	var args  = Array.prototype.slice.call(arguments);

	if( arguments.length < 2){
		throw new Error("Invalid arguments");	
	}

	if( arguments.length === 2){
		keyId = args[0];
		callback = args[1];
		uid = null;
	}

	if( typeof callback !== "function" || typeof keyId !== "number" ){
		throw new Error("Invalid arguments");
	}

	if( uid){
		if( typeof uid !== "number"){
			throw new Error("Invalid user id");
		}
	}


	var optionF = {
		"method" : "DELETE",
		"path" : "user/keys/" + keyId
	}

	if(uid)
		optionF.path = "users/" +uid + "/keys/" + keyId ;
	

	debug("deleting key:---------------- ");
	this.agent.dial(optionF, callback);

}


/** Callback
*
* @callback requestCallback
* @param {Object} error :  Error 
* @param {Object} response: Reponse object
* @param { ( Object | Object[] ) } result: Result(s)
*/

module.exports  = Users;