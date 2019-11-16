import positiveValidator from './positiveValidator';

describe('Positive validator', () => {
  it('Correct', () => {
    expect(positiveValidator(0.5)).toEqual(true);
    expect(positiveValidator(0)).toEqual(true);
    expect(positiveValidator(1)).toEqual(true);
    expect(positiveValidator(0.0)).toEqual(true);
    expect(positiveValidator(10)).toEqual(true);
    expect(positiveValidator(10000000000000000000000000)).toEqual(true);
    expect(positiveValidator(-0)).toEqual(true);
    expect(positiveValidator(-0.0)).toEqual(true);
  });
  it('Incorrect', () => {
    expect(positiveValidator(-0.00001)).toEqual(false);
    expect(positiveValidator('0.5')).toEqual(false);
  });
});