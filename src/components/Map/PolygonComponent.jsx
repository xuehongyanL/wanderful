import React from 'react';
import _ from 'lodash';
import {Polygon, Popup} from 'react-leaflet';

import {featureConfig} from '../../config';
import PopupCard from './PopupCard';
import randomKey from '../../utils/randomKey';

function createPolygonComponent(feature, shift){
  let closeRef = React.createRef();
  let props = feature.properties;
  return (
    <Polygon
      key={randomKey()}
      positions={_.map(_.initial(feature.geometry.coordinates[0]), (plot) => _.reverse(_.cloneDeep(shift(...plot))))}
      {
      ...
      _.zipObject(featureConfig.validKeys['Polygon'], _.map(featureConfig.validKeys['Polygon'], (key) => {
        return _.isNil(props[key]) ? featureConfig.default[key] : props[key];
      }))
      }
    >
      <Popup closeButton={false} ref={closeRef}>
        <PopupCard
          feature={feature}
          validKeys={featureConfig.validKeys['Polygon']}
          closeRef={closeRef}
        />
      </Popup>
    </Polygon>
  );
}

export default createPolygonComponent;