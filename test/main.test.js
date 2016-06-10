//you can test isBrowser variable to run browser specific tests

var setup = function () {
  sinon.spy(console, 'log');
};

var tearedown = function () {
  console.log.restore();
};

describe('Testing environment', function () {
  it('should pass', function () {
    expect(1).to.equal(1);
  });

  it('should find logeek global', function () {
    expect(typeof logeek).to.not.equal('undefined');
  });
});

describe('simple logging', function () {
  it('should log everything by default', function () {
    setup();
    
    logeek('m1').at('s1');
    logeek('m2 @ s2');
    expect(console.log.calledTwice).to.be.true;
    expect(console.log.firstCall.calledWith('m1')).to.be.true;
    expect(console.log.secondCall.calledWith('m2 ')).to.be.true;
    
    tearedown();
  });
  
  it('Should not trim log messages', function () {
    setup();
    
    logeek('m  @ s');
    logeek('   a   ').at('s');
    expect(console.log.calledTwice).to.be.true;
    expect(console.log.firstCall.calledWith('m  ')).to.be.true;
    expect(console.log.secondCall.calledWith('   a   ')).to.be.true;
    
    tearedown();
  });
  
});

describe('Scoped logs', function () {
  it('should not log messages out of scope', function () {
    setup();
    
    logeek.show('X');
    logeek('m').at('s');
    expect(console.log.notCalled).to.be.true;
    
    tearedown();
  });
  
  it('should not log messages out of scope [compact style]', function () {
    setup();
    
    logeek.show('X');
    logeek('m @ s');
    expect(console.log.notCalled).to.be.true;
    
    tearedown();
  });
  
  it('should not log msg if scope is a descendant child of current scope', function () {
    setup();
    
    logeek.show('x');
    logeek('m @ x/y');
    logeek('m').at('x/y');
    expect(console.log.notCalled).to.be.true;
    
    tearedown();
  });
  
  it('should log when deep scope is used', function () {
    setup();
    
    logeek.show('x/y');
    logeek('m').at('x/y');
    logeek('m @ x/y');
    expect(console.log.firstCall.calledWith('m')).to.be.true;
    expect(console.log.secondCall.calledWith('m ')).to.be.true;
    
    console.log.restore();
  });
  
  it('should log when wildcard are used for matching child scopes', function () {
    setup();
    
    logeek.show('x/*');
    logeek('a').at('x/y');
    logeek('b @ x/y');
    expect(console.log.firstCall.calledWith('a')).to.be.true;
    expect(console.log.secondCall.calledWith('b ')).to.be.true;
    
    console.log.restore();
  });
  
  it('should also log parent scope when nested scopes are set to be visible', function () {
    setup();

    logeek.show('x/*');
    
    logeek('a').at('x');
    logeek('b @ x');
    expect(console.log.firstCall.calledWith('a')).to.be.true;
    expect(console.log.secondCall.calledWith('b ')).to.be.true;

    console.log.restore();
  });
  
  it('scopes must be trimmed before beeing tested', function () {
    setup();
    
    logeek.show('  x/* ');
    
    logeek('a').at(' x  ');
    expect(console.log.firstCall.calledWith('a')).to.be.true;
    
  });
});

// describe('Scopped loggs', function () {
//   it('should\'t log the messages in other scopes', function () {
//     sinon.spy(console, 'log');
// 
//     logeek.show('nothing');
//     logeek('msg1');
//     logeek('nothing');
//     logeek(['m', 's', 'g', '1']);
//     logeek.show('_global_');
// 
//     expect(console.log.callCount).to.equal(0);
// 
//     console.log.restore();
//   });
// 
//   it('should log the messages in their scope', function () {
//     sinon.spy(console, 'log');
// 
//     logeek.show('myScope');
//     logeek('msg1 @ myScope');
//     logeek('msg2 @ hisScope');
// 
//     expect(console.log.callCount).to.equal(1);
//     expect(console.log.calledWith('msg1')).to.be.true;
// 
//     logeek.show('_global_');
//     console.log.restore();
//   });
// 
//   it('should detect nested scopes', function () {
//     sinon.spy(console, 'log');
//     
//     logeek.show('myScope/*');
//     logeek('msg1 @ myScope');
//     logeek('msg2 @ myScope/subScope');
//     logeek('msg3 @ myScope/a/b/c/d');
//     logeek('msg4 @ X/myScope/subScope/X');
//     logeek('msg5 @ myScope//');
//     
//     expect(console.log.callCount).to.equal(3);
//     expect(console.log.calledWith('msg1')).to.be.true;
//     expect(console.log.calledWith('msg2')).to.be.true;
//     expect(console.log.calledWith('msg3')).to.be.true;
//     
//     logeek.show('_global_');
//     console.log.restore();
//   });
//   
//   it('should detect reverse filter expressions', function () {
//     sinon.spy(console, 'log');
// 
//     logeek.show('*/myScope');
//     logeek('msg1 @ myScope');
//     logeek('msg2 @ parent/myScope');
//     logeek('msg3 @ a/b/c/d/myScope');
//     logeek('msg4 @ X/myScope/subScope/X');
//     logeek('msg5 @ myScope//');
//     
//     expect(console.log.callCount).to.equal(3);
//     expect(console.log.calledWith('msg1')).to.be.true;
//     expect(console.log.calledWith('msg2')).to.be.true;
//     expect(console.log.calledWith('msg3')).to.be.true;
//     
//     logeek.show('_global_');
//     console.log.restore();
//   });
// });
// 
// describe('async calls', function () {
//   
//   it('should log when called async', function (done) {
//     sinon.spy(console, 'log');
//     
//     logeek.show('myScope');
//     
//     setTimeout(function () {
//       logeek('a-msg1 @ myScope');
// 
//       expect(console.log.calledWith('a-msg1')).to.be.true;
//       done();
// 
//       logeek.show('_global_');
//       console.log.restore();
//     }, 1);
//       
//   });
//   
//   it('should be able to work when called indirectly', function (done) {
//     sinon.spy(console, 'log');
//     
//     logeek.show('myScope');
//     var sampleFunc = function (msg, done) {
//       setTimeout(function () {
//         logeek(msg + ' @ myScope');
//         
//         expect(console.log.calledWith('a-msg1')).to.be.true;
//         done();
//         
//         logeek.show('_global_');
//         console.log.restore();
//       }, 1);
//     };
//     
//     sampleFunc('a-msg1', done);
//   });
//   
// });
