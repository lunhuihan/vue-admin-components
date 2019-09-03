export default {
  border: true,
  columns: [
    {
      title: 'Name',
      key: 'name',
      align: 'center',
      width: 200,
      fixed: 'left',
      filters: [
        {
          label: 'Joe',
          value: 1
        },
        {
          label: 'John',
          value: 2
        }
      ],
      filterMultiple: false,
      filterMethod(value, row) {
        if (value === 1) {
          return row.name === 'Joe'
        } else if (value === 2) {
          return row.name === 'John Brown'
        }
      }
    },
    {
      title: 'Other',
      align: 'center',
      children: [
        {
          title: 'Age',
          key: 'age',
          align: 'center',
          width: 200,
          sortable: true
        },
        {
          title: 'Address',
          align: 'center',
          children: [
            {
              title: 'Street',
              key: 'street',
              align: 'center',
              width: 200
            },
            {
              title: 'Block',
              align: 'center',
              children: [
                {
                  title: 'Building',
                  key: 'building',
                  align: 'center',
                  width: 200,
                  sortable: true
                },
                {
                  title: 'Door No.',
                  key: 'door',
                  align: 'center',
                  width: 200
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'Company',
      align: 'center',
      children: [
        {
          title: 'Company Address',
          key: 'caddress',
          align: 'center',
          width: 200
        },
        {
          title: 'Company Name',
          key: 'cname',
          align: 'center',
          width: 200
        }
      ]
    },
    {
      title: 'Gender',
      key: 'gender',
      align: 'center',
      width: 200,
      fixed: 'right'
    }
  ]
}
