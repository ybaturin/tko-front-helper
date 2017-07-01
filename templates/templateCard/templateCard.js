import { CARD_BINDING, CARD_EVENTS } from 'app/components/main/common/components/cardBlock/cardBlock';
import './templateCard.scss';

class TemplateCard {
  constructor() {
    this.buttons = [{
      priority: 10,
      title: 'Сохранить',
      action: () => this.save(),
    }, {
      priority: 9,
      title: 'Отмена',
      action: () => this.cancel(),
    }];
  }

  save() {

  }

  cancel() {
    this.$scope.$broadcast(CARD_EVENTS.CLOSE_CARD);
  }
}

angular.module('tko.main').component('templateCard', {
  bindings: {
    ...CARD_BINDING,
  },
  template: require('./templateCard.html'),
  controller: TemplateCard,
});