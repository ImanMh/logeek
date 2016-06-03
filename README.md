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
Logeek uses '@' as the default delimiter for separating the message and the scope. The general format of logging message with logeek is:
```javascript
  logeek('M @ S');
```
This means that message 'M' will be shown when scope 'S' is visible. Suppose you are working on a copy module and you want to log some message:
```javascript
  logeek.show('copy');                              //setting the visible scope
  logeek('reading the list of files form db @ db');
  logeek('investigating authentication @ auth');
  logeek('starting copy @ copy');                   //logs starting copy
  logeek('50% done @ copy');                        //logs 50% done
  lopeek('A file was skipped @ copy/skip');
  logeek('100% done @ copy');                       //logs 100% done
  logeek('saving state in database @ db');
```

This is what you'll see in your console: 
```
```

If you used ```logeek.show('copy/*')``` your console would be like:
```
starting copy
50% done
A file was skipped
100% done
```

#Nested Scopes
Scopes are powerful ways to group your log message together and disable or enable them at a certain point. Not only you can create different groups, you can also nest these groups to create a relation between multiple groups and control them much easier. 
```javascript
  logeek.show('sync/db/*');
  logeek('communicating with server @ sync');     //logs nothing! current scope is sync/db/*
  logeek('pulling data for sync @ sync/db');      //logs pulling...
  logeek('Oops! there is not data in db @ sync/db/error'); //logs Oops!...
  
  //You can also set reverse filters
  logeek.show('*/error');
  logeek('creating database @ db');               //logs nothing!
  logeek('inserting new data @ db/data');         //logs nothing!
  logeek('error in insert @ db/data/error');      //logs error in...
  logeek('syncing data to server @ sync');        //logs nothing!
  logeek('server is not available @ sync/error'); //logs server is not...
```
