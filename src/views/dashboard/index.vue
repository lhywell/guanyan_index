<template>
  <!-- <component :is="currentRole" /> -->
  <div class="abc">sdfasdfasdfasdfasdfsdf</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['roles']),
  },
  watch: {},
  created() {
    window.console.log(111)
  },
}
</script>
