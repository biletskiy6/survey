import Vue from 'vue';
import Vuesax from 'vuesax';

import Widget from '../utils/widget-plugin';

if (process.browser) {
    Vue.use(Vuesax, {
        theme: {
            colors: {
                primary:'#00C58E',
                success:'rgb(23, 201, 100)',
                danger:'rgb(242, 19, 93)',
                warning:'rgb(255, 130, 0)',
                dark:'#2F495E',
            }
        }
    })
}
Vue.use(Widget);
