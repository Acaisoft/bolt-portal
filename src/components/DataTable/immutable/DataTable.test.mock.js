import React from 'react'
import Immutable from 'immutable'
import { Column } from './DataTable'

const FakeRecord = Immutable.Record({ id: null, name: null, age: 0 }, 'FakeRecord')

export const checkboxKey = jest.fn()
export const children = [
  <Column key="id" render={x => x.get('id')} title="ID" />,
  <Column key="name" render={x => x.get('name')} title="Name" />,
  <Column key="age" render={x => x.get('age')} title="Age" />,
]

export const data = Immutable.List([
  new FakeRecord({ id: 1, name: 'Jane Doe', age: 30 }),
  new FakeRecord({ id: 2, name: 'Steven Bush', age: 36 }),
])

export const onSelect = jest.fn()
