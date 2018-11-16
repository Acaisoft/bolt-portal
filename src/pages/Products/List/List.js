import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Button, IconButton } from '@material-ui/core'
import { Info, Edit } from '@material-ui/icons'
import DataTable from '~components/DataTable'

import fakeProducts from '../productsData.mock'

export class List extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { match } = this.props

    return (
      <div>
        <div>Products list</div>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`${match.url}/create`}
        >
          Create a new product
        </Button>
        <DataTable data={fakeProducts}>
          <DataTable.Column key="id" render={x => x.id} title="ID" />
          <DataTable.Column key="name" render={x => x.name} title="Name" />
          <DataTable.Column key="actions" render={this.renderActions} />
        </DataTable>
      </div>
    )
  }

  renderActions = row => {
    const { match } = this.props
    return (
      <div>
        <IconButton
          component={Link}
          to={`${match.url}/${row.id}/details`}
          aria-label="Show details"
        >
          <Info />
        </IconButton>
        <IconButton
          component={Link}
          to={`${match.url}/${row.id}/edit`}
          aria-label="Edit product"
        >
          <Edit />
        </IconButton>
      </div>
    )
  }
}

export default List
