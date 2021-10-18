class Grid {
  rows = [];
  cols = [];
  rate = 0;

  create (dataSource = [], max = 1) {
    if (!Array.isArray(dataSource)) {
      throw new Error('生成网格布局的数据源类型需为Array类型！')
    }
    if (typeof max !== 'number') {
      throw new Error('网格布局中的每行最大列数需为Number类型！')
    }
    this.initData()

    dataSource.forEach((item, index) => {

      const perRate = this.calPerRate(item, max)
      if (perRate >= 1) {
        if (this.cols.length) {
          this.finishRow()
        }
        this.cols.push(this.getArrItem(item))
        this.finishRow()
      } else {
        this.rate += perRate
        if (this.rate <= 1) {
          this.cols.push(this.getArrItem(item))
          if (this.rate === 1) {
            this.finishRow()
          }
        } else {
          this.finishRow()
          this.cols.push(this.getArrItem(item))
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
  calPerRate (data, max) {
    let colSpan = 1
    if (!Array.isArray(data)) {
      colSpan = parseFloat(data.colSpan) || 1
    } else {
      let colSpanList = data.map((item) => {
        return parseFloat(item.colSpan) || 1
      })
      colSpan = Math.max(...colSpanList)
    }
    return colSpan / max
  }
  getArrItem (item) {
    return Array.isArray(item) ? item : [item]
  }
}

export default new Grid()
