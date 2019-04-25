import React from 'react'
import { Column } from './DataTable'

export const checkboxKey = jest.fn()
export const children = [
  <Column key="id" render={x => x.id} title="ID" />,
  <Column key="name" render={x => x.name} title="Name" />,
  <Column key="age" render={x => x.age} title="Age" />,
]

export const data = [
  { id: 1, name: 'Jane Doe', age: 30 },
  { id: 2, name: 'Steven Bush', age: 36 },
]

export const columnSettings = [
  {
    key: 'name',
    title: 'Name',
    render: item => item.name,
  },
  {
    key: 'age',
    title: 'Age',
    render: item => item.age,
    renderFooter: () => (
      <div>Total age: {data.reduce((acc, v) => acc + v.age, 0)}</div>
    ),
  },
]

export const onSelect = jest.fn()
