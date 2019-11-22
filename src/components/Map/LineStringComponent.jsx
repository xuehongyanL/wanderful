import React from 'react';
import _ from 'lodash';
import {Polyline, Popup} from 'react-leaflet';

import {featureConfig} from '../../config';
import PopupCard from './PopupCard';
import randomKey from '../../utils/randomKey';

function createLineStringComponent(feature){
  let closeRef = React.createRef();
  let props = feature.properties;
  return (
    <Polyline
      key={randomKey()}
      positions={_.map(feature.geometry.coordinates, (plot) => [plot[1], plot[0]])}
      {
      ...
      _.zipObject(featureConfig.validKeys['LineString'], _.map(featureConfig.validKeys['LineString'], (key) => {
        return _.isNil(props[key]) ? featureConfig.default[key] : props[key];
      }))
      }
    >
      <Popup closeButton={false} ref={closeRef}>
        <PopupCard
          feature={feature}
          validKeys={featureConfig.validKeys['LineString']}
          closeRef={closeRef}
        />
      </Popup>
    </Polyline>
  );
}

export default createLineStringComponent;