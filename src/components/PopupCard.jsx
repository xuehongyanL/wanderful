import React from 'react';
import _ from 'lodash';
import {Button, Input, InputGroup, ListGroup, ListGroupItem} from 'reactstrap';

import {featureConfig} from '../config';

class PopupCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    _.forEach(props.validKeys, (key) => {
      this.state[key] = props.feature[key] || featureConfig.default[key];
    });
  }
  _onClosePopup(){
    this.props.closeRef.current.leafletElement.options.leaflet.map.closePopup();
  }
  _onUpdate(){
    console.log(this.state);
  }
  _onDelete(){
    this.props.closeRef.current.leafletElement.options.leaflet.map.closePopup();
  }
  render(){
    return (
      <ListGroup>
        <ListGroupItem>
          <span className={'popupTitle'}>Properties</span>
        </ListGroupItem>
        {
          _.map(this.props.validKeys, (key, idx) => (
            <ListGroupItem key={_.random(0, 10000000)}>
              <InputGroup size={'sm'}>
                <Input value={key} readOnly />
                <Input
                  type={featureConfig.type[key]}
                  value={this.state[key]}
                  onChange={(e)=>{
                    let value = e.target.value;
                    if(featureConfig.type[key] === 'number') value = Number(value);
                    this.setState({[key]: value});
                  }}
                />
              </InputGroup>
            </ListGroupItem>
          ))
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