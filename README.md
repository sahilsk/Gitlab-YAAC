# Gitlab-YAAC( Yet Another Api Client)

Gitlab api client with more control over server response

Motivation
-------------

Why one more gitlab api client? [node-gitlab](https://github.com/node-gitlab/node-gitlab) is the robust gitlab client available for javascript at the moment. Though it works and return the result without server error or response code.
Design differences also makes this project different from Gitlab-YAAC.
In the end i need this for my current project.

Example
-------------

``` js
var Gitlab = require("gitlb-yaac");

//** Create new gitlab client
var gCli = new Gitlab({
  url:   'http://example.com',
  token: 'abcdefghij123456'
});

/** List Users
* params {Object} optn Option
* params { Function} callback Callback
*/
gCli.getUsers(opts, function(err, result){
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
