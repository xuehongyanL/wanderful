import React from 'react';
import _ from 'lodash';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown
} from 'reactstrap';
import i18n from 'i18next';
import {withTranslation} from 'react-i18next';

import poiConfig from '../../config/poiConfig';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dropdownOpen: false,
      poiSource: 'poi-OSM'
    };
  }
  changePoiSource(key){
    this.setState({poiSource: key});
  }
  render(){
    const {t} = this.props;
    return (
      <InputGroup>
        <InputGroupButtonDropdown 
          addonType="prepend" 
          isOpen={this.state.dropdownOpen}
          toggle={() => {this.setState({dropdownOpen: !this.state.dropdownOpen});}}
        >
          <DropdownToggle size="sm" caret>{t(this.state.poiSource)}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>{t('PoiSource')}</DropdownItem>
            {_.map(_.keys(poiConfig), (key, idx) => (
              <DropdownItem key={idx} onClick={(() => {this.changePoiSource(key);})}>
                {t(key)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </InputGroupButtonDropdown>
        <Input placeholder={`${t('Search')} ${t(this.state.poiSource)}`} />
        <InputGroupAddon addonType="append">
          <Button color="secondary" size="sm">{t('Search')}</Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

export default withTranslation()(SearchBar);
export {SearchBar as SearchBarUnwrapped};