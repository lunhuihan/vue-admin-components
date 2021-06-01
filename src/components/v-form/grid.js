class Grid {
  rows = [];
  cols = [];
  rate = 0;

  create (dataSource = [], itemColsKey = '', max = 1) {
    if (!Array.isArray(dataSource)) {
      throw new Error('生成网格布局的数据源类型需为Array类型！')
    }
    if (typeof itemColsKey !== 'string') {
      throw new Error('请传入数据源中每项包含列数的属性KEY！')
    }
    if (typeof max !== 'number') {
      throw new Error('网格布局中的每行最大列数需为Number类型！')
    }
    this.initData()

    dataSource.forEach((item, index) => {
      const colSpan = parseInt(item[itemColsKey]) || 1
      const perRate = colSpan / max
      if (perRate >= 1) {
        if (this.cols.length) {
          this.finishRow()
        }
        this.cols.push(item)
        this.finishRow()
      } else {
        this.rate += perRate
        if (this.rate <= 1) {
          this.cols.push(item)
          if (this.rate === 1) {
            this.finishRow()
          }
        } else {
          this.finishRow()
          this.cols.push(item)
          this.rate += perRate
        }
      }
    })
    if (this.cols.length) {
      this.finishRow()
    }
    return this.rows
  }
  initData () {
    this.rows = []
    this.cols = []
    this.rate = 0
  }
  finishRow () {
    this.rows.push([...this.cols])
    this.cols = []
    this.rate = 0
  }
}

export default new Grid()
