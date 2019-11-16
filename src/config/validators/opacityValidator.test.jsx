import opacityValidator from './opacityValidator';

describe('Opacity validator', () => {
  it('Correct', () => {
    expect(opacityValidator(0.5)).toEqual(true);
    expect(opacityValidator(0)).toEqual(true);
    expect(opacityValidator(1)).toEqual(true);
    expect(opacityValidator(0.0)).toEqual(true);
    expect(opacityValidator(1.0)).toEqual(true);
    expect(opacityValidator(-0)).toEqual(true);
    expect(opacityValidator(-0.0)).toEqual(true);
  });
  it('Incorrect', () => {
    expect(opacityValidator(-0.00001)).toEqual(false);
    expect(opacityValidator(1.00001)).toEqual(false);
    expect(opacityValidator('0.5')).toEqual(false);
  });
});