import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Map.scss';

import React from 'react';
import _ from 'lodash';
import {Map, TileLayer, ZoomControl, FeatureGroup} from 'react-leaflet';
import {EditControl} from 'react-leaflet-draw';

import emitter from './ev';
import {geojsonParse} from './geojson';
import {mapConfig} from './config';

class MapComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      jsonObj: {type: 'FeatureCollection', features: []},
      mapConfig: mapConfig['OpenStreetMap']
    };
  }
  componentDidMount() {
    let self = this;
    emitter.on('json', (jsonObj) => {
      self.setState({jsonObj: _.cloneDeep(jsonObj)});
    });
    emitter.on('map', (key) => {
      self.setState({mapConfig: mapConfig[key]});
    });
  }
  _onEdited(e){
    console.log(e);
    emitter.emit('editObj', e);
  }
  _onCreated(e){
    console.log(e);
    emitter.emit('createObj', e);
    let createId = e.layer._leaflet_id;
    let layerContainer = this.refs.edit.leafletElement.options.edit.featureGroup;
    layerContainer.removeLayer(layerContainer._layers[createId]);
  }
  _onDeleted(e){
    console.log(e);
    emitter.emit('deleteObj', e);
  }
  render() {
    const position = [51.505, -0.09];
    return (
      <Map center={position} zoom={13} zoomControl={false}>
        <ZoomControl position="topright" />
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
              this.props.parser(feature)
            ))
          }
        </FeatureGroup>
      </Map>
    );
  }
}

export default MapComponent;