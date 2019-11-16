import colorValidator from './colorValidator';

describe('Color validator', () => {
  it('Correct', () => {
    expect(colorValidator('#123456')).toEqual(true);
    expect(colorValidator('#abcdef')).toEqual(true);
    expect(colorValidator('#ABCDEF')).toEqual(true);
  });
  it('Incorrect', () => {
    expect(colorValidator(' #123456')).toEqual(false);
    expect(colorValidator('123456')).toEqual(false);
    expect(colorValidator('#abcgef')).toEqual(false);
    expect(colorValidator('#ABCDEFF')).toEqual(false);
  });
});