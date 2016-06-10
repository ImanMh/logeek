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
    expect(console.log.firstCall.calledWith('m1')).to.be.true;
    expect(console.log.secondCall.calledWith('m2 ')).to.be.true;
    expect(console.log.calledTwice).to.be.true;
    
    tearedown();
  });
  
  it('Should not trim log messages', function () {
    setup();
    
    logeek('m  @ s');
    logeek('   a   ').at('s');
    expect(console.log.firstCall.calledWith('m  ')).to.be.true;
    expect(console.log.secondCall.calledWith('   a   ')).to.be.true;
    expect(console.log.calledTwice).to.be.true;
    
    tearedown();
  });
  
});

describe('Scoped logs', function () {
  it('should not log messages out of scope', function () {
    setup();
    
    logeek.show('X');
    logeek('m').at('s');
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
    expect(console.log.calledTwice).to.be.true;
    
    tearedown();
  });
  
  it('should log when wildcard are used for matching child scopes', function () {
    setup();
    
    logeek.show('x/*');
    logeek('a').at('x/y');
    logeek('b @ x/y');
    expect(console.log.firstCall.calledWith('a')).to.be.true;
    expect(console.log.secondCall.calledWith('b ')).to.be.true;
    expect(console.log.calledTwice).to.be.true;
    
    tearedown();
  });
  
  it('should also log parent scope when nested scopes are set to be visible', function () {
    setup();

    logeek.show('x/*');
    
    logeek('a').at('x');
    logeek('b').at('x/m/n');
    logeek('c @ x');
    expect(console.log.firstCall.calledWith('a')).to.be.true;
    expect(console.log.secondCall.calledWith('b')).to.be.true;
    expect(console.log.thirdCall.calledWith('c ')).to.be.true;
    expect(console.log.calledThrice).to.be.true;

    tearedown();
  });
  
  it('should not be called when deep scope doesn\'t match', function () {
    setup();
    
    logeek.show('x/*');
    
    logeek('a').at('a/x');
    logeek('b').at(' a/x/b  ');
    logeek('c').at(' a/b/x  ');
    expect(console.log.notCalled).to.be.true;
    
    tearedown();
  });
  
  it('scopes must be trimmed before beeing tested', function () {
    setup();
    
    logeek.show('  x/* ');
    
    logeek('a').at(' x  ');
    expect(console.log.firstCall.calledWith('a')).to.be.true;
    expect(console.log.calledOnce).to.be.true;
    
    tearedown();
  });
  
  it('reverse scopes should work', function () {
    setup();
    
    logeek.show('  */x ');
    
    logeek('a').at(' a/x  ');
    logeek('b').at(' a/b/x  ');
    expect(console.log.firstCall.calledWith('a')).to.be.true;
    expect(console.log.secondCall.calledWith('b')).to.be.true;
    expect(console.log.calledTwice).to.be.true;
    
    tearedown();
  });
  
  it('should not be called when reverse scope is wrong', function () {
    setup();
    
    logeek.show('  */x ');
    
    logeek('a').at(' a/b  ');
    logeek('b').at(' a/x/b  ');
    logeek('c').at(' x/a/b  ');
    expect(console.log.notCalled).to.be.true;
    
    tearedown();
  });
  
  it('should support array input', function () {
    setup();
    
    logeek.show('s/*');
    
    logeek(['a', 'b']).at('s');
    logeek(['c', 'd']).at('s/m');

    expect(console.log.firstCall.args[0] === 'a').to.be.true;
    expect(console.log.firstCall.args[1] === 'b').to.be.true;
    expect(console.log.secondCall.args[0] === 'c').to.be.true;
    expect(console.log.secondCall.args[1] === 'd').to.be.true;
    expect(console.log.callCount === 2).to.be.true;
    
    tearedown();
  });
});

describe('async calls', function () {
  
  it('should log when called async', function (done) {
    setup();
    
    logeek.show('s');
    
    setTimeout(function () {
      logeek('a @ s');
      logeek('b').at('s');

      expect(console.log.firstCall.calledWith('a ')).to.be.true;
      expect(console.log.secondCall.calledWith('b')).to.be.true;
      done();

      tearedown();
    }, 1);
      
  });
  
  it('should be able to work when called indirectly', function (done) {
    setup();
    
    logeek.show('s');
    var sampleFunc = function (msg, done) {
      setTimeout(function () {
        logeek(msg + ' @ s');
        
        expect(console.log.firstCall.calledWith('a ')).to.be.true;
        done();
        
        logeek.show('_global_');
        tearedown();
      }, 1);
    };
    
    sampleFunc('a', done);
  });
  
});
