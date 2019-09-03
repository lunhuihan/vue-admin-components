export default {
  onSelectionChange (selection) { 
    this.selection = selection
  },
  columns: [
    {
      type: 'selection',
      width: 50,
      align: 'center'
    },
    {
      title: '交易时间',
      minWidth: 150,
      align: 'center',
      slot: 'transTime'
    },
    {
      title: '类型',
      minWidth: 80,
      align: 'center',
      key: 'statusDesc'
    },
    {
      title: '流水号',
      minWidth: 150,
      align: 'center',
      key: 'logId'
    },
    {
      title: '对方信息',
      minWidth: 150,
      align: 'center',
      key: 'transName'
    },
    {
      title: '交易金额',
      minWidth: 120,
      align: 'center',
      slot: 'transMoney'
    },
    {
      title: '交易状态',
      minWidth: 100,
      align: 'center',
      slot: 'transStatus'
    },
    {
      title: '操作',
      minWidth: 180,
      align: 'center',
      slot: 'action',
      fixed: 'right'
    }
  ]
}