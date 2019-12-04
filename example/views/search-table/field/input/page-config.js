export default {
  total: 80,
  pageSize: 30,
  pageSizeOpts: [15, 30],
  showTotal: true,
  showElevator: true,
  showSizer: true,
  className: 'custom',
  onChange (page, pageConfig, search) { 
    console.log('page:', page)
    console.log('pageConfig:', pageConfig)
    console.log('search:', search)
  }
}