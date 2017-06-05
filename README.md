# Logeek
*A log framework for geeks!*
Logeek adds control and joy to your console log messages. It's a high performance, light weight tool for logging Javascript messages in node or browser. It can be combined with other tools such as Chalk to  extend it's powers even more.


![Builder package.json size](https://badges.herokuapp.com/size/github/ImanMh/logeek/master/dist/logeek.min.js)
![Victory size](https://badges.herokuapp.com/size/github/ImanMh/logeek/master/dist/logeek.min.js?gzip=true)
![Travis build status](https://img.shields.io/travis/ImanMh/logeek.svg?maxAge=2592000&style=flat-square)
![npm downloads](https://img.shields.io/npm/dt/logeek.svg?maxAge=2592000&style=flat-square)


![Logeek benchmark results](http://j71.imgup.net/ScreenShot2cef.png)

## Why not using native log?
Native log is good, but you almost always delete it after you finish your work. One reason can be logs are for developers so it's better to remove them after finishing the job. The other reason is that when team working comes in, everyone try to get the upper hand in logging. You might have seen funny delimiters like ---------- My Name --------  or red color messages all over your console. Finally the team end up with a huge mess that no body can easily find their logs in it. logeek will fix all these issues in a very simple manner. Now that you know why using the native log is a bad idea, read the rest of this document to find the solution.

## Installation
You can install it using ```bower``` or ```npm``` depending on your project type. 
```
npm install logeek --save
```
or
```
bower install logeek --save
```
make sure to include the ```dist/logeek.js``` in your HTML or your Node application after you download it.

## Usage
Logeek is easy to use, All you need to do is to include it and tell logeek which messages you want to be logged: 

```javascript
var logeek = require('logeek');

logeek.show('S');

logeek('M').at('S');
```

This means that message 'M' will be shown when scope 'S' is visible. Suppose you are working on a copy module and you want to log some message:

```javascript
var logeek = require('logeek');

logeek.show('copy');                                  //setting the visible scope

logeek('reading the list of files form db').at('db');
logeek('investigating authentication').at('auth');
logeek('starting copy').at('copy');                   //logs starting copy
logeek('50% done').at('copy');                        //logs 50% done
logeek('A file was skipped').at('copy/skip');
logeek('100% done').at('copy');                       //logs 100% done
logeek('saving state in database').at('db');
```

This is what you'll see in your console: 
```
starting copy
50% done
100% done
```

If you used ```logeek.show('copy/*')``` your console would be like:
```
starting copy
50% done
A file was skipped
100% done
```

## Nested Scopes
Scopes are powerful ways to group your log message together and disable or enable them at a certain point. Not only you can create different groups, you can also nest these groups to create a relation between them  and control them much easier. 

```javascript
logeek.show('sync/db/*');
logeek('communicating with server').at('sync');
logeek('pulling data for sync').at('sync/db');      //logs pulling...
logeek('Oops! there is not data in db').at('sync/db/error'); //logs Oops!...

//You can also set reverse filters
logeek.show('*/error');
logeek('creating database').at('db');
logeek('inserting new data').at('db/data');
logeek('error in insert').at('db/data/error');      //logs error in...
logeek('syncing data to server').at('sync');
logeek('server is not available').at('sync/error'); //logs server is not...
```

## compact mode
Writing a long list of log messages can be a boring job. That's why logeek allows you to use an easier way of defining your message and scope at once. logeek uses '@' as the default delimiter for separating the message and the scope. The general format of compact message logging with logeek is:

```javascript
logeek.show('db');

logeek('M @ S');

//these two are the same
logeek('creating database').at('db');
logeek('creating database @ db');

//these two are the same
logeek('inserting new data').at('db/data');
logeek('inserting new data @ db/data');
  
```

## Chalk Integration
Logeek plays well with other standard libraries such as Chalk. Here is an example of using Logeek with Chalk to control the console logs like a pro: 

```javascript
var chalk = require('chalk'),
    logeek = require('logeek');

logeek.show('copy/*');
logeek(chalk.gray('copy started')).at('copy');
logeek(chalk.green('50% done')).at('copy');
logeek(chalk.gray('making md5 comparison')).at('md5');
logeek(chalk.yellow('one file skipped')).at('copy/skip');
logeek(chalk.red('error occured during coppy')).at('copy/error');
logeek(chalk.gray('logging into db')).at('db');
logeek(chalk.red('copy aborted') + '@ copy');
```

And this is what you see in your console: 

![Logeek Console Log](http://m08.imgup.net/ScreenShoteedf.png)

## And more...
[![NPM](https://nodei.co/npm-dl/logeek.png?months=6&height=2)](https://nodei.co/npm/logeek/)
