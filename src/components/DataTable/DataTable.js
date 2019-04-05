import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  withStyles,
} from '@material-ui/core'
import { Loading } from '~components'

import { areArraysEqual } from '~utils/collections'

import styles from './DataTable.styles'

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
    // Re-renders only on children change.
    // If set to `true` the table will be re-rendered only if any of the columns change.
    // If set to `false` will re-render always (like any other component).
    pure: PropTypes.bool,
    responsive: PropTypes.bool,
    onSelect: PropTypes.func,
    rowKey: PropTypes.func,
    striped: PropTypes.bool,
  }

  static defaultProps = {
    checkboxKey: row => row.id,
    initialSelected: new Set(),
    onSelect: () => {},
    pure: false,
    responsive: true,
    rowKey: row => row.id,
    striped: false,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {}
    if (
      (nextProps.pure &&
        (!prevState.columnNodes ||
          haveColumnsChanged(nextProps.children, prevState.columnNodes))) ||
      !nextProps.pure
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
    const { classes, responsive } = this.props

    return (
      <div className={classNames({ [classes.responsiveContainer]: responsive })}>
        <Table>
          {this.renderHeader()}
          {this.renderBody()}
        </Table>
      </div>
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
          {columns.map(({ key, title, width }) => (
            <TableCell key={key} width={width}>
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  renderBody = () => {
    const {
      classes,
      checkboxes,
      checkboxKey,
      data,
      isLoading,
      rowKey,
      striped,
    } = this.props
    const { columns, selected } = this.state

    if (isLoading) {
      return (
        <TableBody>
          <TableRow className={classNames({ [classes.striped]: striped })}>
            <TableCell colSpan={columns.length}>
              <Loading />
            </TableCell>
          </TableRow>
        </TableBody>
      )
    }

    return (
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={rowKey(row)}
            className={classNames({
              // Indices are zero-based, so we need to shift by one.
              [classes.stripedOdd]: striped && index % 2 === 0,
              [classes.stripedEven]: striped && index % 2 === 1,
            })}
          >
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

export default withStyles(styles, { name: 'DataTable' })(DataTable)
