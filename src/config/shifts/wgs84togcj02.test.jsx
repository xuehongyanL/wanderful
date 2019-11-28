import wgs84togcj02 from './wgs84togcj02';

describe('WGS84 to GCJ02', () => {
  const coord1 = [0, 0];
  const coord2 = [180, 90];
  const coord3 = [116.38499169642985, 39.905371277860965];
  it('Normal', () => {
    expect(wgs84togcj02(...coord1)).toEqual(coord1);
    expect(wgs84togcj02(...coord2)).toEqual(coord2);
    expect(wgs84togcj02(...coord3)).toEqual([116.39122830260834, 39.90676864166874]);
  });
});