import React from 'react'
import PropTypes from 'prop-types'

import { Add } from '@material-ui/icons'
import { Button } from '~components'
import { NoDataPlaceholder as NoDataPlaceholderImage } from '~assets/icons'
import SectionPlaceholder from '../SectionPlaceholder'

function NoDataPlaceholder({
  title = 'No Data',
  description,
  buttonUrl,
  buttonLabel = 'Add',
  ...sectionPlaceholderProps
}) {
  return (
    <SectionPlaceholder
      {...sectionPlaceholderProps}
      title={title}
      description={description}
      topImage={<NoDataPlaceholderImage height={78} />}
      actions={
        Boolean(buttonLabel && buttonUrl) && (
          <Button icon={Add} variant="contained" color="secondary" href={buttonUrl}>
            {buttonLabel}
          </Button>
        )
      }
    />
  )
}
NoDataPlaceholder.propTypes = {
  actions: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string,
}

export default NoDataPlaceholder
