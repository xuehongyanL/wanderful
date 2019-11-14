import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-worker';

configure({adapter: new Adapter()});
window.Worker = global.Worker;