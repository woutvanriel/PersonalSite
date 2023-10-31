
export { AppServerModule } from './app/app.server.module';


import 'localstorage-polyfill'

global['localStorage'] = localStorage;
