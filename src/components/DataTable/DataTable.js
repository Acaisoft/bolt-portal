import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { Loading } from '~components'

import { areArraysEqual } from '~utils/collections'

export const Column = () => null
Column.propTypes = {
  render: PropTypes.func.isRequired,
  title: PropTypes.string,
}
Column.displayName = 'Column'

export const haveColumnsChanged = (prevColumnNodes, nextColumnNodes) => {
  const prevKeys = React.Children.map(prevColumnNodes, child => child && child.key)
  const nextKeys = React.Children.map(nextColumnNodes, child => child && child.key)

  return !areArraysEqual(prevKeys, nextKeys)
}

export const calculateColumnSettings = children =>
  React.Children.toArray(children).map(column => ({
    ...column.props,
    key: column.key,
  }))

export class DataTable extends Component {
  static Column = Column

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    checkboxes: PropTypes.bool,
    checkboxKey: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object.isRequired),
    initialSelected: PropTypes.instanceOf(Set),
    isLoading: PropTypes.bool,
    multiselect: PropTypes.bool,
    onSelect: PropTypes.func,
    rowKey: PropTypes.func,
  }

  static defaultProps = {
    checkboxKey: row => row.id,
    initialSelected: new Set(),
    onSelect: () => {},
    rowKey: row => row.id,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {}

    if (
      !prevState.columnNodes ||
      haveColumnsChanged(nextProps.children, prevState.columnNodes)
    ) {
      nextState.columnNodes = nextProps.children
      nextState.columns = calculateColumnSettings(nextProps.children)
    }

    return Object.keys(nextState).length > 0 ? nextState : null
  }

  constructor(props) {
    super(props)

    this.state = {
      columns: [],
      selected: props.initialSelected,
    }
  }

  render() {
    return (
      <Table>
        {this.renderHeader()}
        {this.renderBody()}
      </Table>
    )
  }

  renderHeader = () => {
    const { checkboxes, data, multiselect } = this.props
    const { columns, selected } = this.state

    return (
      <TableHead>
        <TableRow>
          {checkboxes && (
            <TableCell key="_checkbox" padding="checkbox">
              {multiselect && (
                <Checkbox
                  indeterminate={!!selected.size && selected.size < data.length}
                  checked={selected.size === data.length}
                  onChange={this.handleSelectAll}
                />
              )}
            </TableCell>
          )}
          {columns.map(({ key, title }) => (
            <TableCell key={key}>{title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  renderBody = () => {
    const { checkboxes, checkboxKey, data, isLoading, rowKey } = this.props
    const { columns, selected } = this.state

    if (isLoading) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Loading />
            </TableCell>
          </TableRow>
        </TableBody>
      )
    }

    return (
      <TableBody>
        {data.map(row => (
          <TableRow key={rowKey(row)}>
            {checkboxes && (
              <TableCell key="_checkbox" padding="checkbox">
                <Checkbox
                  checked={selected.has(checkboxKey(row))}
                  onChange={this.handleSelect(checkboxKey(row))}
                />
              </TableCell>
            )}
            {columns.map(({ render, title, ...cellProps }) => (
              <TableCell {...cellProps}>{render(row)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    )
  }

  handleSelectAll = () => {
    const { checkboxKey, data, onSelect } = this.props
    const { selected } = this.state

    let newSelected
    if (selected.size > 0) {
      newSelected = new Set()
    } else {
      newSelected = new Set(data.map(checkboxKey))
    }

    this.setState({ selected: newSelected })

    onSelect(newSelected)
  }

  handleSelect = id => () => {
    const { multiselect, onSelect } = this.props
    const { selected } = this.state

    let newSelected = new Set([...selected])
    if (multiselect) {
      if (newSelected.has(id)) {
        newSelected.delete(id)
      } else {
        newSelected.add(id)
      }
    } else {
      if (newSelected.size === 0) {
        newSelected.add(id)
      } else {
        if (newSelected.has(id)) {
          newSelected.delete(id)
        } else {
          newSelected.clear()
          newSelected.add(id)
        }
      }
    }

    this.setState({ selected: newSelected })

    onSelect(newSelected)
  }
}

export default DataTable
