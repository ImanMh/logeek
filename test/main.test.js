//you can test isBrowser variable to run browser specific tests

describe('Test framework is setted up', function () {
  it('should pass', function () {
    expect(1).to.equal(1);
  });

  it('should find loggify global', function () {
    expect(typeof loggify).to.not.equal('undefined');
  });
});

describe('Simple logging', function () {
  it('should simply call log when passed a single argument without delimiter', function () {
    sinon.spy(console, 'log');

    loggify('msg1');

    expect(console.log.calledOnce).to.be.true;
    expect(console.log.firstCall.calledWith('msg1')).to.be.true;

    loggify('msg2');

    expect(console.log.calledTwice).to.be.true;
    expect(console.log.secondCall.calledWith('msg2')).to.be.true;

    console.log.restore();
  });


  it('first argument array, must log messages with space in between', function () {
    sinon.spy(console, 'log');

    loggify(['one', 'tow', 'three']);

    expect(console.log.firstCall.calledWith('one', 'tow', 'three')).to.be.true;

    console.log.restore();
  });

});

describe('Scopped loggs', function () {
  it('should\'t log the messages in other scopes', function () {
    sinon.spy(console, 'log');

    loggify.show('nothing');
    loggify('msg1');
    loggify('nothing');
    loggify(['m', 's', 'g', '1']);
    loggify.show('_global_');

    expect(console.log.callCount).to.equal(0);

    console.log.restore();
  });

  it('should log the messages in their scope', function () {
    sinon.spy(console, 'log');

    loggify.show('myScope');
    loggify('msg1 @ myScope');
    loggify('msg2 @ hisScope');

    expect(console.log.callCount).to.equal(1);
    expect(console.log.calledWith('msg1')).to.be.true;

    loggify.show('_global_');
    console.log.restore();
  });

  it('should detect nested scopes', function () {
    sinon.spy(console, 'log');
    
    loggify.show('myScope/*');
    loggify('msg1 @ myScope');
    loggify('msg2 @ myScope/subScope');
    loggify('msg3 @ myScope/a/b/c/d');
    loggify('msg4 @ X/myScope/subScope/X');
    loggify('msg5 @ myScope//');
    
    expect(console.log.callCount).to.equal(3);
    expect(console.log.calledWith('msg1')).to.be.true;
    expect(console.log.calledWith('msg2')).to.be.true;
    expect(console.log.calledWith('msg3')).to.be.true;
    
    loggify.show('_global_');
    console.log.restore();
  });
  
  it('should detect reverse filter expressions', function () {
    sinon.spy(console, 'log');

    loggify.show('*/myScope');
    loggify('msg1 @ myScope');
    loggify('msg2 @ parent/myScope');
    loggify('msg3 @ a/b/c/d/myScope');
    loggify('msg4 @ X/myScope/subScope/X');
    loggify('msg5 @ myScope//');
    
    expect(console.log.callCount).to.equal(3);
    expect(console.log.calledWith('msg1')).to.be.true;
    expect(console.log.calledWith('msg2')).to.be.true;
    expect(console.log.calledWith('msg3')).to.be.true;
    
    loggify.show('_global_');
    console.log.restore();
  });
});
