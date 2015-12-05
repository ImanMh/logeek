//you can test isBrowser variable to run browser specific tests

describe('Test framework is setted up', function () {
  it('should pass', function () {
    expect(1).to.equal(1);
  });

  it('should find logeek global', function () {
    expect(typeof logeek).to.not.equal('undefined');
  });
});

describe('Simple logging', function () {
  it('should simply call log when passed a single argument without delimiter', function () {
    sinon.spy(console, 'log');

    logeek('msg1');

    expect(console.log.calledOnce).to.be.true;
    expect(console.log.firstCall.calledWith('msg1')).to.be.true;

    logeek('msg2');

    expect(console.log.calledTwice).to.be.true;
    expect(console.log.secondCall.calledWith('msg2')).to.be.true;

    console.log.restore();
  });


  it('first argument array, must log messages with space in between', function () {
    sinon.spy(console, 'log');

    logeek(['one', 'tow', 'three']);

    expect(console.log.firstCall.calledWith('one', 'tow', 'three')).to.be.true;

    console.log.restore();
  });

});

describe('Scopped loggs', function () {
  it('should\'t log the messages in other scopes', function () {
    sinon.spy(console, 'log');

    logeek.show('nothing');
    logeek('msg1');
    logeek('nothing');
    logeek(['m', 's', 'g', '1']);
    logeek.show('_global_');

    expect(console.log.callCount).to.equal(0);

    console.log.restore();
  });

  it('should log the messages in their scope', function () {
    sinon.spy(console, 'log');

    logeek.show('myScope');
    logeek('msg1 @ myScope');
    logeek('msg2 @ hisScope');

    expect(console.log.callCount).to.equal(1);
    expect(console.log.calledWith('msg1')).to.be.true;

    logeek.show('_global_');
    console.log.restore();
  });

  it('should detect nested scopes', function () {
    sinon.spy(console, 'log');
    
    logeek.show('myScope/*');
    logeek('msg1 @ myScope');
    logeek('msg2 @ myScope/subScope');
    logeek('msg3 @ myScope/a/b/c/d');
    logeek('msg4 @ X/myScope/subScope/X');
    logeek('msg5 @ myScope//');
    
    expect(console.log.callCount).to.equal(3);
    expect(console.log.calledWith('msg1')).to.be.true;
    expect(console.log.calledWith('msg2')).to.be.true;
    expect(console.log.calledWith('msg3')).to.be.true;
    
    logeek.show('_global_');
    console.log.restore();
  });
  
  it('should detect reverse filter expressions', function () {
    sinon.spy(console, 'log');

    logeek.show('*/myScope');
    logeek('msg1 @ myScope');
    logeek('msg2 @ parent/myScope');
    logeek('msg3 @ a/b/c/d/myScope');
    logeek('msg4 @ X/myScope/subScope/X');
    logeek('msg5 @ myScope//');
    
    expect(console.log.callCount).to.equal(3);
    expect(console.log.calledWith('msg1')).to.be.true;
    expect(console.log.calledWith('msg2')).to.be.true;
    expect(console.log.calledWith('msg3')).to.be.true;
    
    logeek.show('_global_');
    console.log.restore();
  });
});

describe('async calls', function () {
  
  it('should log when called async', function (done) {
    sinon.spy(console, 'log');
    
    logeek.show('myScope');
    
    setTimeout(function () {
      logeek('a-msg1 @ myScope');

      expect(console.log.calledWith('a-msg1')).to.be.true;
      done();

      logeek.show('_global_');
      console.log.restore();
    }, 1);
      
  });
  
  it('should be able to work when called indirectly', function (done) {
    sinon.spy(console, 'log');
    
    logeek.show('myScope');
    var sampleFunc = function (msg, done) {
      setTimeout(function () {
        logeek(msg + ' @ myScope');
        
        expect(console.log.calledWith('a-msg1')).to.be.true;
        done();
        
        logeek.show('_global_');
        console.log.restore();
      }, 1);
    };
    
    sampleFunc('a-msg1', done);
  });
  
});
