import React from 'react'
import { render, cleanup } from 'react-testing-library'

import { ClassesProxy } from '~utils/tests/mocks'
import { NoDataPlaceholder } from './NoDataPlaceholder'

jest.unmock('@material-ui/core')

let label, description, actions

describe('component: NoDataPlaceholder', () => {
  afterEach(cleanup)

  describe('rendering', () => {
    beforeEach(() => {
      actions = <div className="mockedActions">Test actions</div>
      label = 'Test label'
      description = 'Test description'
    })

    test('render description', () => {
      const { getByText } = render(
        <NoDataPlaceholder
          classes={ClassesProxy}
          label={label}
          description={description}
        />
      )
      const descriptionEl = getByText(description)

      expect(descriptionEl).toBeVisible()
    })

    test('render provided actions', () => {
      const { getByText } = render(
        <NoDataPlaceholder classes={ClassesProxy} label={label} actions={actions} />
      )
      const actionsEl = getByText('Test actions')

      expect(actionsEl).toBeVisible()
      expect(actionsEl).toHaveClass('mockedActions')
    })

    test('render NoData icon', () => {
      const { getByTitle } = render(
        <NoDataPlaceholder classes={ClassesProxy} label={label} />
      )
      const icon = getByTitle('no-data-icon').parentNode
      expect(icon).toBeVisible()
    })

    test('render CircularProgress spinner', () => {
      const { getByTestId } = render(
        <NoDataPlaceholder classes={ClassesProxy} label={label} />
      )
      const icon = getByTestId('circular-progress-spinner')
      expect(icon).toBeVisible()
    })

    test("set the container's height", () => {
      const { getByTestId } = render(
        <NoDataPlaceholder classes={ClassesProxy} label={label} height="20vh" />
      )

      const container = getByTestId('no-data-container')
      expect(container).toHaveStyle('height: 20vh')
    })
  })
})
