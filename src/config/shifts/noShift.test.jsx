import noShift from './noshift';

describe('No shift', () => {
  const coord1 = [0, 0];
  const coord2 = [180, 90];
  const coord3 = [116.39123275, 39.90677249];
  it('Normal', () => {
    expect(noShift(...coord1)).toEqual(coord1);
    expect(noShift(...coord2)).toEqual(coord2);
    expect(noShift(...coord3)).toEqual(coord3);
  });
});