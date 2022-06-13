export default {
  data() {
    return { TABLEHEIGHT: '' }
  },
  mounted() {
    setTimeout(() => {
      this.initTableHeight()
    }, 700)
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.tableSort.doLayout()
    })
  },
  methods: {
    initTableHeight() {
      const refTable = this.$refs.tableList?.$el || this.$refs.tableSort?.$el
      // refTable = document.getElementById('tableList')
      const { innerHeight } = window
      if (refTable) {
        const { top } = refTable.getBoundingClientRect()
        // const refPaging = document.getElementById('paging')
        const refPaging = this.$refs.paging?.$el
        if (refPaging) {
          const pagHeight = refPaging.getBoundingClientRect().height
          this.TABLEHEIGHT = innerHeight - top - pagHeight - 30
          // console.log(this.$route?.path, this.TABLEHEIGHT)
          return
        }
        this.TABLEHEIGHT = innerHeight - top - 30
      }
    },
  },
}
