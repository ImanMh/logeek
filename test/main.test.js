//you can test isBrowser variable to run browser specific tests

describe('Test framework is working properly', function () {
  it('should pass', function () {
    expect(1).to.equal(1);
  });
});

describe('Loggify is loaded correctly', function () {
  it('should find loggify global', function () {
    expect(typeof loggify).to.not.equal('undefined');
  });
});
