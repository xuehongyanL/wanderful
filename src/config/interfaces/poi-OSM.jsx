import _ from 'lodash';
import fetchJsonp from 'fetch-jsonp';
import queryString from 'query-string';

async function searchOSM(keyword, limit, offset, key, options){
  const params = {
    q: keyword,
    format: 'json'
  };
  let queryUrl = 'https://nominatim.openstreetmap.org/search?' + queryString.stringify(params);

  let res = await fetchJsonp(queryUrl, {jsonpCallback: 'json_callback'});
  let json = await res.json();
  let retJson = json.slice(offset, offset + limit);

  let ret = {
    statusCode: 0,
    message: 'ok',
    total: json.length,
    limit: limit,
    offset: offset,
    count: retJson.length,
    results: _.map(retJson, parseOSM)
  };
  return ret;
}

function parseOSM(record){
  let addressList = _.map(record['display_name'].split(','), (item) => item.trim());
  return {
    name: addressList[0],
    address: _.tail(addressList).join(', '),
    latlng: {lat: record['lat'], lng: record['lon']}
  };
}

export default searchOSM;