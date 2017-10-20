import './templateComponent.scss';

class TemplateComponent {
  constructor() {

  }

  $onInit() {

  }

  $onDestroy() {

  }
}

angular.module('tko.main').component('templateComponent', {
  bindings: {

  },
  template: require('./templateComponent.html'),
  controller: TemplateComponent,
});
