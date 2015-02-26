# Gitlab-YAAC( Yet Another Api Client)

Gitlab api client with more control over server response

> WORK-IN-PROGRESS: PLEASE DO NOT USE THIS UNFINISHED PROJECTT UNTIL YOU STOPPED SEEING THIS MESSAGE.


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
- use what you need. eg. `require('gitlab-yaac/users'); ` and you'll get [users](http://doc.gitlab.com/ce/api/users.html) endpoints available only

Example
-------------

``` js
var Users= require("gitlb-yaac/users");

//** Create new gitlab client
var gUsers = new Users({
  url:   'http://example.com',
  token: 'abcdefghij123456'
});

/** List Users
* params {Object} optn Option
* params { Function} callback Callback
*/
gUsers.all(opts, function(err, result){
  if(err){
    //handle error
  }else{
    console.log( result);
  }
});



```


API
-------------

### GitLab API

#### Resources

- Users
- Session
- Projects
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


## Users#listUsers



References
-----------------

- [gitlab official api] (http://doc.gitlab.com/ce/api/)


Roadmap
-----------

- TLS/SSL Protocol support