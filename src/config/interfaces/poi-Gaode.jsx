import _ from 'lodash';
import fetchJsonp from 'fetch-jsonp';
import queryString from 'query-string';

async function searchGaode(keyword, limit, offset, key, options){
  key = key || '0a6f1474ba6b1c0ca2026c59f6630b92';
  const params = {
    s: 'rsv3',
    key: key,
    offset: limit,
    page: Math.floor(offset / limit) + 1,
    format: 'json',
    keywords: keyword
  };
  let queryUrl = 'https://restapi.amap.com/v3/place/text?' + queryString.stringify(params);

  let res = await fetchJsonp(queryUrl, {jsonpCallback: 'callback'});
  let json = await res.json();
  let retJson = json['pois'];

  let ret = {
    statusCode: (json['status'] === '1') ? 0 : Number(json['status']),
    message: json['info'],
    total: Number(json['count']),
    limit: limit,
    offset: offset,
    count: retJson.length,
    results: _.map(retJson, parseGaode)
  };
  return ret;
}

function parseGaode(record){
  let name = record['name'] || '';
  let address = record['address'] || '';
  let adname = record['adname'] || '';
  let cityname = record['cityname'] || '';
  let pname = record['pname'] || '';
  let latStr = record.location.split(',')[1];
  let lonStr = record.location.split(',')[0];
  return {
    name: name,
    address: `${name}, ${address}, ${adname}, ${cityname}, ${pname}`,
    latlng: {lat: Number(latStr), lng: Number(lonStr)}
  };
}

export default searchGaode;