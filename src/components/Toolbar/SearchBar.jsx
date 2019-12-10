import React from 'react';
import _ from 'lodash';
import {
  Button, ButtonGroup,
  Col,
  Card, CardBody, CardText, CardTitle,
  DropdownItem, DropdownMenu, DropdownToggle,
  Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown,
  ListGroup, ListGroupItem
} from 'reactstrap';
import i18n from 'i18next';
import {withTranslation} from 'react-i18next';
import fetchJsonp from 'fetch-jsonp';
import emitter from '../../ev';

import poiConfig from '../../config/poiConfig';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dropdownOpen: false,
      customApiKey: null,
      poiSource: 'poi-OSM',
      poiKeyword: '',
      poiDisplay: false,
      poiLimit: 5,
      poiOffset: 0,
      poiTotal: 0,
      poiResults: []
    };
  }
  componentDidMount(){
    emitter.on('keyword', (value) => {
      this.setState({
        poiKeyword: value,
        poiDisplay: false
      });
    });
  }
  changePoiSource(key){
    this.setState({
      poiSource: key,
      poiDisplay: false
    });
  }
  async search(limit, offset){
    let res = await poiConfig.sources[this.state.poiSource].search(this.state.poiKeyword, limit, offset, this.state.customApiKey, null);
    if(res.statusCode === 0){
      this.setState({
        poiDisplay: true,
        poiLimit: res['limit'],
        poiOffset: res['offset'],
        poiTotal: res['total'],
        poiResults: res['results']
      });
    }
  }
  render(){
    const {t} = this.props;
    return (
      <div style={{width: '30vw'}}>
        <InputGroup>
          <InputGroupButtonDropdown
            addonType="prepend"
            isOpen={this.state.dropdownOpen}
            toggle={() => {this.setState({dropdownOpen: !this.state.dropdownOpen});}}
          >
            <DropdownToggle size="sm" caret>{t(this.state.poiSource)}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>{t('PoiSource')}</DropdownItem>
              {_.map(_.keys(poiConfig.sources), (key, idx) => (
                <DropdownItem key={idx} onClick={(() => {this.changePoiSource(key);})}>
                  {t(key)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input 
            placeholder={`${t('Search')} ${t(this.state.poiSource)}`} 
            onChange={(e) => {emitter.emit('keyword', e.target.value);}}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="secondary"
              size="sm"
              onClick={() => {
                this.search(5, 0);
              }}
            >
              {t('Search')}
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <ListGroup>
          {
            this.state.poiDisplay ? (
              _.map(this.state.poiResults, (record, idx) => (
                <ListGroupItem key={idx} style={{padding: 0, border: 0}}>
                  <Card
                    style={{cursor: 'pointer'}}
                    onClick={() => {}}
                  >
                    <CardBody>
                      <CardTitle tag="h4">{record['name']}</CardTitle>
                      <CardText>{record['address']}</CardText>
                    </CardBody>
                  </Card>
                </ListGroupItem>
              ))
            ) : null
          }
          {
            this.state.poiDisplay ? (
              <ListGroupItem style={{padding: 0, border: 0}}>
                <Col md={{size: 8, offset: 2}}>
                  <ButtonGroup className="text-center" style={{width: '100%'}}>
                    <Button 
                      outline 
                      disabled={this.state.poiOffset <= 0}
                      onClick={() => {this.search(this.state.poiLimit, this.state.poiOffset - this.state.poiLimit);}}
                    >
                      ←
                    </Button>
                    <Button outline>
                      {`${Math.floor(this.state.poiOffset / this.state.poiLimit) + 1} / ${Math.ceil(this.state.poiTotal / this.state.poiLimit)}`}
                    </Button>
                    <Button 
                      outline 
                      disabled={this.state.poiOffset + this.state.poiLimit > this.state.poiTotal}
                      onClick={() => {this.search(this.state.poiLimit, this.state.poiOffset + this.state.poiLimit);}}
                    >
                      →
                    </Button>
                  </ButtonGroup>
                </Col>
              </ListGroupItem>
            ) : null
          }
        </ListGroup>
      </div>
    );
  }
}

export default withTranslation()(SearchBar);
export {SearchBar as SearchBarUnwrapped};