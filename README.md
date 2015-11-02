# logeek
A better way to logging Javascript messages in node or browser.

##Why not using native log?
Native log is good, but you almost always delete it after you finish your work. One reason can be logs are for developers so it's better to remove them after finishing the job. The other reason is that when team working comes in, everyone try to get the upper hand in logging. You see any kind of funny delimiter like ---------- My Name --------  or trying to change the color of messages. Finally the team end up with a huge mess that no body can easily find their logs in it. logeek will fix all these issues in a very simple manner. Now that you know why using the native log is a bad idea you see the rest of logeek document to fix that issue.

#Installation
You can install it using ```bower``` or ```npm``` depending on your project type. 
```
  npm install logeek
```
or
```
  bower install logeek
```
make sure to include the ```dist/logeek.js``` in your HTML or your Node application after you download it.

#Usage
Suppose you are working on a sync module and you want to log some message:
```javascript
  logeek.show('sync');
  logeek('communicating with server @ sync'); //logs communicating with...
  logeek('starting initial sync @ sync');    //logs starting...
  if ( db.notReady() ) {
    logeek('building db @ database');        //logs nothing! because current scope is 'sync'
  }
```

#Nested Scopes
Scopes are powerful ways to group your log message together and disable or enable them at a certain point. Not only you can create different groups, you can also nest these groups to create a relation between multiple groups and controll them much easier. 
```javascript
  logeek.show('sync/db/*');
  logeek('communicating with server @ sync'); //logs nothing! current scope is sync/db/*
  logeek('pulling data for sync @ sync/db'); //logs pulling...
  logeek('Oops! there is not data in db @ sync/db/error'); //logs Oops!...
  
  //You can also set reverse filters
  logeek.show('*/error');
  logeek('creating database @ db');               //logs nothing!
  logeek('inserting new data @ db/data');         //logs nothing!
  logeek('error in insert @ db/data/error');     //logs error in...
  logeek('syncing data to server @ sync');        //logs nothing!
  logeek('server is not available @ sync/error'); //logs server is not...
```
