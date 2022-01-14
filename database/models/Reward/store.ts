import Reward from '~/database/models/Reward/index'

export default {
  getters: {
    rewards () {
      return Reward.query().withAll().all()
    }
  }
}
