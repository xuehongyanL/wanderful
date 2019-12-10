import _ from 'lodash';
import fetchJsonp from 'fetch-jsonp';
import queryString from 'query-string';

async function searchBaidu(keyword, limit, offset, key, options){
  key = key || 'VeNR8U9Y6a29jO6i9ZGztny96YBNsVBr';
  const params = {
    q: keyword,
    region: '全国',
    ak: key,
    page_size: limit,
    page_num: Math.floor(offset / limit),
    output: 'json',
    keywords: keyword
  };
  let queryUrl = 'https://api.map.baidu.com/place/v2/search?' + queryString.stringify(params);

  let res = await fetchJsonp(queryUrl, {jsonpCallback: 'callback'});
  let json = await res.json();
  let retJson = json['results'];

  let ret = {
    statusCode: json['status'],
    message: json['message'],
    total: json['total'],
    limit: limit,
    offset: offset,
    count: retJson.length,
    results: _.map(retJson, parseBaidu)
  };
  return ret;
}

function parseBaidu(record){
  return {
    name: record['name'],
    address: record['address'],
    latlng: record['location']
  };
}

export default searchBaidu;