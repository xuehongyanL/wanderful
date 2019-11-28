import {TileLayer} from 'react-leaflet';
import React from 'react';
import {noShift, gcj02towgs84, wgs84togcj02} from './shifts';

const mapConfig = {
  OpenStreetMap: {
    attribution: '©OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    shift: noShift,
    unshift: noShift
  },
  GoogleMap: {
    attribution: '©Google',
    url: 'https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
    shift: wgs84togcj02,
    unshift: gcj02towgs84
  },
  GaodeMap: {
    attribution: '©高德软件',
    url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    shift: wgs84togcj02,
    unshift: gcj02towgs84
  }
};

export default mapConfig;