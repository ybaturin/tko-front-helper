import { CARD_BINDING } from 'app/components/main/common/components/cardBlock/cardBlock';
import { ButtonsPanelItem } from 'app/components/main/contracts/consumers/components/buttonsPanel/buttonsPanel';
import { CardMixin } from 'app/mixins/cardMixin';
import { BaseObject } from 'app/core/base';
import './templateCard.scss';

class TemplateCard extends CardMixin(BaseObject){
  buttons: ButtonsPanelItem[];

  constructor(
    protected $scope: angular.IScope,
  ) {
    super();

    this.buttons = [{
      priority: 10,
      title: 'Сохранить',
      action: () => this.save(),
    }, {
      priority: 9,
      title: 'Отмена',
      action: () => this.closeCard(),
    }];
  }

  save() {

  }
}

angular.module('tko.main').component('templateCard', {
  bindings: {
    ...CARD_BINDING,
  },
  template: require('./templateCard.html'),
  controller: TemplateCard,
  /** @property { TemplateCard } $templateCard */
  controllerAs: '$templateCard',
});
