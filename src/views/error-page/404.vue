<template>
  <error-page :code="404" />
</template>

<script>
import errorPage from '@/components/error-page'

export default {
  name: 'error404',
  components: { errorPage }
}
</script>
