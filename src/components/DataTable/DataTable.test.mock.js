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

export const onSelect = jest.fn()
