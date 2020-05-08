// default widgets


import AppWidgets from './widgets';


var widgets
var widgetStyle = {}

const install = (Vue, config = {}) => {

  if (install.installed) return



  widgets = Object.assign({}, {}, {
    ...AppWidgets,
  });

  // if(window.location.href.indexOf("constructor/text-only") != -1){
  //     widgets = Object.assign({}, {}, {
  //         [braidTxt.name]: braidTxt,
  //     });
  // }
  //
  //
  // if(window.location.href.indexOf("constructor/promo") != -1){
  //     widgets = Object.assign({}, {}, {
  //         [braidTxt.name]: braidTxt,
  //         [braidVideo.name]: braidVideo,
  //         [braidPic.name]: braidPic
  //     });
  // }
  //
  // if(window.location.href.indexOf("constructor/menu") != -1){
  //     widgets = Object.assign({}, {}, {
  //         ...customWidget
  //     });
  // }


  // console.log(widgets);

  Object.keys(widgets).forEach(key => {
    Vue.component(key, widgets[key])
    Vue.component(key, Vue.extend(widgets[key]))
    // style panel
    if (widgets[key]['panel']) {
      let panel = Object.assign({}, widgets[key]['panel'], {
        type: key
      })
      Vue.component(panel.name, Vue.extend(panel))
      widgetStyle[panel.name] = panel
      // remove panel from object
      delete widgets[key]['panel']
    }
  })
}

export default {
  install,
  getWidgets() {
    return widgets
  },
  getWidgetStyle() {
    return widgetStyle
  }
}
