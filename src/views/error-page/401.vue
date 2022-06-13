<template>
  <error-page :code="401" />
</template>

<script>
import errorPage from '@/components/error-page'

export default {
  name: 'error401',
  components: { errorPage }
}
</script>
