export default {
  data() {
    return { height: '', TABLEHEIGHT: '' }
  },
  mounted() {
    this.initTableHeight()
  },
  methods: {
    initHeight() {
      const queryform = document.querySelector('.el-form')
      // window.console.log(queryform)
      let searchHeight = 50
      if (queryform) {
        searchHeight = queryform.clientHeight
      }

      this.height = document.documentElement.clientHeight - 207 - searchHeight
    },
    initHeight2() {
      const queryform = document.querySelector('.vab-query-form')
      let searchHeight = 50
      if (queryform) {
        searchHeight = queryform.clientHeight
      }

      this.height = window.innerHeight - 185 - searchHeight
    },
    initTableHeight() {
      const refTable = this.$refs.tableList
      const { innerHeight } = window
      if (refTable && refTable.$el) {
        const { top } = refTable.$el.getBoundingClientRect()
        const refPaging = this.$refs.paging
        if (refPaging && refPaging.$el) {
          const pagHeight = refPaging.$el.getBoundingClientRect().height
          this.TABLEHEIGHT = innerHeight - top - pagHeight - 35
          return
        }
        this.TABLEHEIGHT = innerHeight - top - 35
      }
    },
  },
}
