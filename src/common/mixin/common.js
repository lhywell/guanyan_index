import dayjs from 'dayjs'

export default {
  data() {
    return {
      typeOptions: [
        {
          label: '一转',
          value: 1,
        },
        {
          label: '二转',
          value: 2,
        },
      ],
      payOptions: [
        {
          label: '大羽有赞',
          value: 1,
        },
        {
          label: '大羽微店',
          value: 2,
        },
        {
          label: '大羽支付宝',
          value: 3,
        },
        {
          label: '大羽微信',
          value: 4,
        },
        {
          label: '大羽银行卡',
          value: 5,
        },
        {
          label: '观言对公',
          value: 6,
        },
        {
          label: '海风吹对公',
          value: 7,
        },
      ],
    }
  },
  mounthed() {},
  methods: {
    getTableProps() {
      this.listLoading = false
      this.layout = 'total, sizes, prev, pager, next, jumper'
      this.total = 0
      this.background = true
      this.elementLoadingText = '正在加载...'
    },
    getPickOption() {
      this.pickerOptions = {
        shortcuts: [
          {
            text: '本周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              // console.log(start.getDay(), start.getDate(), 'start')
              const thisDay = start.getDay() - 1
              const thisDate = start.getDate()
              if (thisDay !== 0) {
                start.setDate(thisDate - thisDay)
              }
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '上周',
            onClick(picker) {
              const oDate = new Date()
              oDate.setTime(oDate.getTime() - 3600 * 1000 * 24 * 7)

              const day = oDate.getDay() - 1

              const start = new Date()
              const end = new Date()
              if (day === 0) {
                start.setDate(oDate.getDate())
                end.setDate(oDate.getDate() + 6)
              } else {
                start.setTime(oDate.getTime() - 3600 * 1000 * 24 * day)
                end.setTime(oDate.getTime() + 3600 * 1000 * 24 * (6 - day))
              }
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setDate(1)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '上月',
            onClick(picker) {
              const oDate = new Date()
              let year = oDate.getFullYear()
              const month = oDate.getMonth()
              let start
              let end
              if (month === 0) {
                year--
                start = new Date(year, 11, 1)
                end = new Date(year, 11, 31)
              } else {
                start = new Date(year, month - 1, 1)
                end = new Date(year, month, 0)
              }

              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '今年至今',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 6)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      }
    },
    getIndex($index, pageNo, pageSize) {
      return $index + (pageNo - 1) * pageSize + 1
    },
    getDate(date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
  },
}
