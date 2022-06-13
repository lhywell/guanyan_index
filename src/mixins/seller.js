import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['isEditor', 'isSeller']),
    ...mapState('user', ['sellerId', 'sellerName']),
  },
}
