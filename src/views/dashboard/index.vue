<template>
  <div class="container">
    <img src="51837.jpg" alt="" style="width: 100%" />
    <img src="63858.png" alt="" style="width: 100%" />
  </div>
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
  created() {},
}
</script>
<style>
.container {
  overflow: hidden;
}
</style>
