import { Model } from '@vuex-orm/core'

export class Exchange extends Model {
  static entity = 'exchanges'

  id: string;
  name: string;
  liquidityTokenTicker: string;
  image: any;
  link: string;

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      liquidityTokenTicker: this.string(''),
      image: this.attr(null),
      link: this.string('')
    }
  }
}

export default Exchange
