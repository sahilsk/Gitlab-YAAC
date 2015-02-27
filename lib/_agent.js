/** agent that make remote calls
*
* @module @utils
*
*/

var 
	request = require("superagent")
	, util = require("util")
	, url = require('url')
	, querystring = require('querystring')
	, debug	= require("debug")("request")
	, defaults  = require("101/defaults")
	;


var Agent = function(opt){

	this.options = {
		  url:  opt.url
		, headers : {
			'PRIVATE-TOKEN' : opt.token
		   ,'User-Agent': 'Gitlab-YAAC'
		}
		, method: 'GET'
		, json: true
	}

	debug( "Gitlab Url: '%s'", this.options.url);

	if( this.options['url'].indexOf("/api/v3") === -1){
		this.options.url = url.resolve(this.options.url , "/api/v3/" );
	}

}



Agent.prototype.dial = function( optn, payload, callback){

	var reqObj = defaults(optn, this.options);
	delete reqObj.headers; 

	reqObj.url = url.resolve(this.options.url, reqObj.path)  

	debug("%s  %s", reqObj.method.toUpperCase(), reqObj.url);
	debug("payload: ", payload );

	debug("request fired...");	
	var req = request( reqObj.method , reqObj.url);

//attach data
	req.send( payload);

//Set headers
	req
		.set('PRIVATE-TOKEN', this.options.headers['PRIVATE-TOKEN'])
		.set('Accept', 'application/json')
		;

//Fire request
	req
		.end( function(error, response){
			if(!error){
				callback(error, response, response.body);
			}else{
				callback(error, response, null);
			}
		});
}

module.exports = Agent;