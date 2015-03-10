# Gitlab-YAAC( Yet Another Api Client)

Gitlab api client with more control over server response


Motivation
-------------

Why one more gitlab api client? Though other project works and return the result as expected but due to poor implementation,  less or no control over server response and few other reasons, didn't scale them well. 
Design differences also makes this project different. 
In the end i need this for my current project.

Features
------------

- asynchronous calls i.e no blocking
- fetches server response as well
- standard callback function argumnets:   `function( error, response, result){ ... } `
- use what you need. eg. `require('gitlab-yaac/users'); ` and you'll get [users](http://doc.gitlab.com/ce/api/users.html) resource available only


Installation
----------------

	
	npm install gitlab-yaac


Example
-------------

``` js
var Users= require("gitlb-yaac/users");

//** Create new gitlab client
var gUsers = new Users({
  url:   'http://example.com',
  token: 'abcdefghij123456',
  admin: true
});


// find all users
gUsers.find( function(err,response, results){})
...

//search for users by email or username with: /users?search=John
gUsers.find("john", function(err, response,results){ });

...
//find user by id
gUsers.find(4, function(err, response,result){ 
	if( response.statusCode !== 404 ){
		console.log("user found: ", result);
	}
}
});

// with pagination
gUsers.find( {page: 1, per_page: 2}, function(err,res,result){...});
// Or
gUsers.find( "username/email", {page:1, per_page: 2}, function(err, res, result){...})

```

Documentation
-------------------

find it on [wiki](https://github.com/sahilsk/Gitlab-YAAC/wiki)

API
-------------

### GitLab API

>  Not all resources are implemented yet. Only highlighted ones are currently implemented.

Currently implemented resources are:

- Users
- Session
- Projects

#### Resources

- [Users](http://doc.gitlab.com/ce/api/users.html)
- [Session](http://doc.gitlab.com/ce/api/session.html)
- [Projects](http://doc.gitlab.com/ce/api/projects.html)
- Project Snippets
- Repositories
- Repository Files
- Commits
- Branches
- Merge Requests
- Issues
- Labels
- Milestones
- Notes (comments)
- Deploy Keys
- System Hooks
- Groups


References
-----------------

- [gitlab official api] (http://doc.gitlab.com/ce/api/)


Roadmap
-----------

- TLS/SSL Protocol support
- add more resources


License
----------

MIT