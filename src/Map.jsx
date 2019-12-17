import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Map.scss';

import React from 'react';
import _ from 'lodash';
import {Map, CircleMarker, Popup, TileLayer, ZoomControl, FeatureGroup} from 'react-leaflet';
import {EditControl} from 'react-leaflet-draw';
import CustomControl from '@skyeer/react-leaflet-custom-control';

import emitter from './ev';
import {geojsonParse} from './geojson';
import {mapConfig} from './config';
import SearchBar from './components/Toolbar/SearchBar';

class MapComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      jsonObj: {type: 'FeatureCollection', features: []},
      center: [39.90677249, 116.39123275],
      zoom: 13,
      showMarker: true,
      markers: [],
      mapConfig: mapConfig['map-OSM']
    };
  }
  componentDidMount(){
    let self = this;
    emitter.on('json', (jsonObj) => {
      self.setState({jsonObj: _.cloneDeep(jsonObj)});
    });
    emitter.on('map', (key) => {
      self.setState({mapConfig: mapConfig[key]});
    });
    emitter.on('locate', (latlng, zoom, options) => {
      self.setState({
        center: [latlng.lat, latlng.lng],
        zoom: zoom
      });
      if(options['marker'] === true){
        self.setState({
          showMarker: true,
          markers: (options['clearPrev'] === true) ? [
            {latlng: [latlng.lat, latlng.lng], popup: options['popup']}
          ] : [
            ...this.state.markers,
            {latlng: [latlng.lat, latlng.lng], popup: options['popup']}
          ]
        });
      };
    });
  }
  _onEdited(e){
    console.log(e);
    emitter.emit('editObj', e, this.state.mapConfig.shift, this.state.mapConfig.unshift);
  }
  _onCreated(e){
    console.log(e);
    emitter.emit('createObj', e, this.state.mapConfig.unshift);
    let createId = e.layer._leaflet_id;
    let layerContainer = this.refs.edit.leafletElement.options.edit.featureGroup;
    layerContainer.removeLayer(layerContainer._layers[createId]);
  }
  _onDeleted(e){
    console.log(e);
    emitter.emit('deleteObj', e, this.state.mapConfig.shift);
  }
  render(){
    return (
      <Map
        center={this.state.center}
        zoom={this.state.zoom}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <CustomControl position="topleft">
          <SearchBar />
        </CustomControl>
        <TileLayer
          attribution={this.state.mapConfig.attribution}
          url={this.state.mapConfig.url}
        />
        <FeatureGroup>
          {
            _.isNil(this.props.test) ? (<EditControl
              ref='edit'
              position='topright'
              onEdited={this._onEdited.bind(this)}
              onCreated={this._onCreated.bind(this)}
              onDeleted={this._onDeleted.bind(this)}
              xxx={JSON.stringify(this.state.jsonObj)}
              draw={{
                circle: false,
                marker: false,
              }}
            />) : null
          }
          {
            _.map(this.state.jsonObj.features, (feature) => (
              this.props.parser(feature, this.state.mapConfig.shift)
            ))
          }
        </FeatureGroup>
        <FeatureGroup>
          {this.state.showMarker ? (
            _.map(this.state.markers, (marker, idx) => (
              <CircleMarker key={idx} center={marker.latlng} ref={(ref) => {if(ref) ref.leafletElement.openPopup();}}>
                <Popup closeButton={false}>
                  <div style={{
                    // width: '20rem',
                    height: 1.4 * 290 / marker.popup.length,
                    textAlign: 'center',
                    margin: 'auto',
                    fontSize: 290 / marker.popup.length
                  }}>
                    {marker.popup}
                  </div>
                </Popup>
              </CircleMarker>
            ))
          ) : null}
        </FeatureGroup>
      </Map>
    );
  }
}

export default MapComponent;