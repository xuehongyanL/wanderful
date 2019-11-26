import {TileLayer} from 'react-leaflet';
import React from 'react';

const mapConfig = {
  OpenStreetMap: {
    attribution: '©OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  GoogleMap: {
    attribution: '©Google',
    url: 'https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
  },
  GaodeMap: {
    attribution: '©高德软件',
    url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
  }
};

export default mapConfig;