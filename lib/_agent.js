/** agent that make remote calls
*
* @module @utils
*
*/

var 
	request = require("request")
	, util = require("util")
	, url = require('url')
	, defaults  = require("101/defaults")
	;


var Agent = function(opt){

	this.options = {
		  url:  opt.url
		, headers : {
			'PRIVATE-TOKEN' : opt.token
//		   ,'User-Agent': 'request'
		}
		, method: 'GET'
		, json: true
	}

//	request.call(this);
}

//util.inherits(Agent, request);

/*Agent.prototype.post = function( obj, function(e,r,result){


	payload = defaults(obj, this.options);
	payload.method = "POST";
	//fire request
	
	this.fire( payload, callback );

})*/


Agent.prototype.dial = function( req, payload, callback){

	var reqObj = defaults(req, this.options);
	reqObj.url = url.resolve(this.options.url, reqObj.endpoint)  
	delete reqObj.endpoint; 

	//attach payload
	reqObj.qs = payload;
	
	request(reqObj, callback);
}

module.exports = Agent;