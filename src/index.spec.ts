// tslint:disable: no-unused-expression
import { expect } from 'chai'
import NewRelicLambda from  '.';

describe('NewRelicLambda', function () {

  it('it should return a lambda function', (done) => {
    const lambda = NewRelicLambda.runNewRelicInTheBackground(() => {})
    expect(lambda).not.to.be.null;
    done();
  })

})
