import gcj02towgs84 from './gcj02towgs84';

describe('GCJ02 to WGS84', () => {
  const coord1 = [0, 0];
  const coord2 = [180, 90];
  const coord3 = [116.39123275, 39.90677249];
  it('Normal', () => {
    expect(gcj02towgs84(...coord1)).toEqual(coord1);
    expect(gcj02towgs84(...coord2)).toEqual(coord2);
    expect(gcj02towgs84(...coord3)).toEqual([116.38499169642985, 39.905371277860965]);
  });
});