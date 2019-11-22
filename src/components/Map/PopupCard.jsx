import React from 'react';
import _ from 'lodash';
import {Button, Input, InputGroup, ListGroup, ListGroupItem} from 'reactstrap';

import emitter from '../../ev';
import {featureConfig} from '../../config';
import createEvent from '../../utils/createEvent';

class PopupCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.valid = {};
    this.geometry = props.feature.geometry;
    _.forEach(props.validKeys, (key) => {
      if(_.has(props.feature.properties, key) && featureConfig.validator(props.feature.properties[key], key)){
        this.state[key] = props.feature.properties[key];
      }
      else {
        this.state[key] = featureConfig.default[key];
      }
      if(!_.has(props.feature.properties, key) || featureConfig.validator(props.feature.properties[key], key)){
        this.valid[key] = true;
      }
      else {
        this.valid[key] = false;
      }
    });
  }
  _checkInput(){
    let valid = true;
    _.forEach(this.props.validKeys, (key) => {
      if(!featureConfig.validator(this.state[key], key)) {
        valid = false;
        return false;
      }
    });
    if(valid) return _.pickBy(this.state, (value, key) => (this.state[key] !== featureConfig.default[key]));
    return null;
  }
  _onClosePopup(){
    this.props.closeRef.current.leafletElement.options.leaflet.map.closePopup();
  }
  _onUpdate(){
    let newProperties = this._checkInput();
    if(_.isNil(newProperties)) return;
    emitter.emit('editObj', createEvent({
      'type': 'Feature',
      'properties': newProperties,
      'geometry': this.geometry
    }));
  }
  _onDelete(){
    emitter.emit('deleteObj', createEvent({
      'type': 'Feature',
      'properties': {},
      'geometry': this.geometry
    }));
  }
  render(){
    return (
      <ListGroup>
        <ListGroupItem>
          <span className={'popupTitle'}>Properties</span>
        </ListGroupItem>
        {
          _.map(this.props.validKeys, (key, idx) => {
            let valid = featureConfig.validator(this.state[key], key);
            return (
              <ListGroupItem key={_.random(0, 10000000)}>
                <InputGroup size={'sm'}>
                  <Input value={key} readOnly />
                  <Input
                    invalid={!this.valid[key]}
                    valid={this.valid[key]}
                    type={featureConfig.type[key]}
                    inputkey={key}
                    value={this.state[key]}
                    onChange={(e) => {
                      let value = e.target.value;
                      if(featureConfig.type[key] === 'number') value = Number(value);
                      this.setState({[key]: value});
                      this.valid[key] = featureConfig.validator(value, key);
                    }}
                  />
                </InputGroup>
              </ListGroupItem>
            );
          })
        }
        <ListGroupItem className={'clearfix'}>
          <Button
            outline
            color={'warning'}
            size={'sm'}
            className={'float-left'}
            onClick={this._onUpdate.bind(this)}
          >
            Save
          </Button>
          <Button
            outline
            color={'secondary'}
            size={'sm'}
            className={'float-left'}
            onClick={this._onClosePopup.bind(this)}
          >
            Cancel
          </Button>
          <Button
            outline
            color={'danger'}
            size={'sm'}
            className={'float-right'}
            onClick={this._onDelete.bind(this)}
          >
            Delete
          </Button>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default PopupCard;