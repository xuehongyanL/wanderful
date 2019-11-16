import _JSON from './json';

describe('Json', () => {
  it('Stringify custom', () => {
    const dummyData = [
      {'id': 1, 'ip_address': '221.248.43.120'},
      {'id': 2, 'first_name': 'Grady', 'gender': 'Male', 'ip_address': '237.93.67.112'},
      {'id': 3, 'first_name': 'Thedrick', 'last_name': 'Counsell', 'email': 'tcounsell2@berkeley.edu'},
      {'id': 4, 'first_name': 'Nickie', 'last_name': 'Unger', 'email': 'nunger3@intel.com'},
      {},
      {'id': 6, 'first_name': 'Jacinthe', 'last_name': 'Daville', 'ip_address': '121.46.198.29'},
      {'id': 7, 'first_name': 'Pam', 'last_name': 'Westnedge', 'ip_address': '26.25.182.172'},
      {'id': 8, 'first_name': 'Ashlin', 'ip_address': '186.143.20.134'},
      {'id': 9, 'ip_address': '28.99.37.112'},
      {'first_name': 'Binni', 'last_name': 'Penhallurick'}
    ];
    expect(_JSON.stringify(dummyData)).toEqual(JSON.stringify(dummyData, null, 2));
  });
});