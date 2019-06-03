import React from 'react'
import { cleanup, fireEvent, render, act } from '@testing-library/react'

import { ExpandablePanel } from './ExpandablePanel'

jest.unmock('@material-ui/core')
jest.unmock('@material-ui/icons')

afterEach(cleanup)

describe('ExpandablePanel', () => {
  test('render expandable panel with children', () => {
    const { queryAllByTestId, queryAllByText, queryByTestId } = render(
      <ExpandablePanel>Test label</ExpandablePanel>
    )
    const expansionPanelSummary = queryByTestId('expansion-panel-summary')

    expect(queryAllByTestId('expansion-panel')).toHaveLength(1)
    expect(queryAllByText('Test label')).toHaveLength(1)
    expect(expansionPanelSummary).toHaveAttribute('aria-expanded', 'false')
  })
  test('render expandable panel with title', () => {
    const { queryAllByTestId, queryAllByText } = render(
      <ExpandablePanel title="Test title">Test label</ExpandablePanel>
    )

    expect(queryAllByTestId('expansion-panel')).toHaveLength(1)
    expect(queryAllByText('Test label')).toHaveLength(1)
    expect(queryAllByText('Test title')).toHaveLength(1)
  })
  test('render expandable panel with defaultExpanded', () => {
    const { queryAllByTestId, queryAllByText, queryByTestId } = render(
      <ExpandablePanel defaultExpanded>Test label</ExpandablePanel>
    )
    const expansionPanelSummary = queryByTestId('expansion-panel-summary')

    expect(queryAllByTestId('expansion-panel')).toHaveLength(1)
    expect(queryAllByText('Test label')).toHaveLength(1)
    expect(expansionPanelSummary).toHaveAttribute('aria-expanded', 'true')
  })
  test('show/hide content on click', () => {
    const { queryByTestId } = render(<ExpandablePanel>Test label</ExpandablePanel>)
    const expansionPanelSummary = queryByTestId('expansion-panel-summary')

    expect(expansionPanelSummary).toHaveAttribute('aria-expanded', 'false')
    act(() => {
      fireEvent.click(expansionPanelSummary)
    })
    expect(expansionPanelSummary).toHaveAttribute('aria-expanded', 'true')
    act(() => {
      fireEvent.click(expansionPanelSummary)
    })
    expect(expansionPanelSummary).toHaveAttribute('aria-expanded', 'false')
  })
})
