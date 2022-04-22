import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import moment from 'moment'
import { customRender } from 'utils/tests/mocks'
import CompareResults from './CompareResults'
import {
  configurationsListMock,
  executionsListMock,
  mockedConfigurationsList,
  selectedConfigId,
  selectedExecutionId,
  mockedHideConfigList,
  hideConfigMock,
  mockedExecutionsList,
} from './CompareResults.mocks'
import { getFilteredConfigurations } from './CompareResults.utils'

jest.unmock('@material-ui/core')
jest.unmock('@material-ui/icons')

console.warn = jest.fn()

const renderWithRoute = (
  configsMock = configurationsListMock,
  executionsMock = executionsListMock
) =>
  customRender(
    <Routes>
      <Route
        path="/projects/:projectId/configs/:configurationId/runs/:executionId"
        element={<CompareResults />}
      />
    </Routes>,
    [configsMock, executionsMock],
    [
      `/projects/83150c3c-239f-4bec-8d0e-973b96ca3c7a/configs/${selectedConfigId}/runs/${selectedExecutionId}`,
    ]
  )

async function loadForm() {
  await waitFor(() => {
    expect(screen.queryByText('Loading data to compare...')).not.toBeInTheDocument()
  })
}

function showSelectOptions(name) {
  fireEvent.mouseDown(
    screen.getByRole('button', {
      name: new RegExp(name, 'i'),
      hidden: true,
    })
  )
}

async function waitForEnabledTestRunSelect() {
  await waitFor(() => {
    expect(
      screen.getByRole('button', {
        name: /test run/i,
        hidden: true,
      })
    ).not.toHaveAttribute('aria-disabled')
  })
}

function selectScenario() {
  const { name } = mockedConfigurationsList.configurations[0]
  fireEvent.click(screen.getByText(name))

  return name
}

describe('component: CompareResults', () => {
  it('should display a loader while data is loading', () => {
    render(
      customRender(<CompareResults />, [configurationsListMock, executionsListMock])
    )

    expect(screen.getByText('Loading data to compare...')).toBeInTheDocument()
  })

  it('should display whole compare form when data are loaded', async () => {
    render(renderWithRoute())

    await loadForm()

    expect(
      screen.getByRole('button', {
        name: 'Compare',
      })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Scenario')).toBeInTheDocument()
    expect(screen.getByLabelText('Test Run')).toBeInTheDocument()
  })

  it('test run compare button should be disabled when no scenario and test run are selected', async () => {
    render(renderWithRoute())

    await loadForm()

    expect(
      screen.getByRole('button', {
        name: 'Compare',
      })
    ).toBeDisabled()
  })

  it('test run select should be disabled when no scenario is selected', async () => {
    render(renderWithRoute())

    await loadForm()

    expect(
      screen.getByRole('button', {
        name: /test run/i,
        hidden: true,
      })
    ).toHaveAttribute('aria-disabled', 'true')
  })

  it('should show all scenarios with test runs different than the current one in scenario select', async () => {
    render(renderWithRoute())

    await loadForm()
    showSelectOptions('scenario')

    expect(screen.getByRole('listbox')).toBeInTheDocument()

    const presentConfigs = getFilteredConfigurations(
      mockedConfigurationsList.configurations,
      selectedExecutionId
    )
    const filteredOutConfigs = mockedConfigurationsList.configurations.filter(
      config => !presentConfigs.includes(config)
    )

    presentConfigs.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
    filteredOutConfigs.forEach(({ name }) => {
      expect(screen.queryByText(name)).not.toBeInTheDocument()
    })
  })

  it('should not show current scenario in scenario select when current test run is the only one in it', async () => {
    render(renderWithRoute(hideConfigMock))

    await loadForm()
    showSelectOptions('scenario')

    const configWithCurrentExecution = mockedHideConfigList.configurations.find(
      ({ executions }) => {
        return executions.findIndex(({ id }) => id === selectedExecutionId) !== -1
      }
    )

    expect(configWithCurrentExecution.executions).toHaveLength(1)
    expect(
      screen.queryByText(configWithCurrentExecution.name)
    ).not.toBeInTheDocument()
  })

  it('test run select should not be disabled when scenario is selected', async () => {
    render(renderWithRoute())

    await loadForm()
    showSelectOptions('scenario')
    const name = selectScenario()

    expect(
      screen.getByRole('button', {
        name: /scenario/i,
        hidden: true,
      })
    ).toHaveTextContent(name)
    await waitForEnabledTestRunSelect()
  })

  it('test run select should show all test runs from the chosen scenario, excluding a current test run', async () => {
    render(renderWithRoute())

    await loadForm()
    showSelectOptions('scenario')

    const { name } = mockedConfigurationsList.configurations.find(
      ({ executions }) => {
        return executions.findIndex(({ id }) => id === selectedExecutionId) !== -1
      }
    )
    fireEvent.click(screen.getByText(name))

    await waitForEnabledTestRunSelect()
    showSelectOptions('test run')

    const visibleExecutions = mockedExecutionsList.executions.filter(
      ({ id }) => id !== selectedExecutionId
    )
    const notVisibleExecutions = mockedExecutionsList.executions.filter(
      ({ id }) => id === selectedExecutionId
    )

    visibleExecutions.forEach(({ start }) => {
      const formattedDate = moment(start).format('YYYY-MM-DD HH:mm')
      expect(screen.getByText(formattedDate)).toBeInTheDocument()
    })
    notVisibleExecutions.forEach(({ start }) => {
      const formattedDate = moment(start).format('YYYY-MM-DD HH:mm')
      expect(screen.queryByText(formattedDate)).not.toBeInTheDocument()
    })
  })

  it('submit button should be enabled when both scenario and test run are selected', async () => {
    render(renderWithRoute())

    await loadForm()
    showSelectOptions('scenario')
    selectScenario()
    await waitForEnabledTestRunSelect()
    showSelectOptions('test run')

    const { start } = mockedExecutionsList.executions[1]
    const formattedDate = moment(start).format('YYYY-MM-DD HH:mm')
    fireEvent.click(screen.getByText(formattedDate))

    expect(
      screen.getByRole('button', {
        name: 'Compare',
      })
    ).not.toBeDisabled()
  })

  it('selected test run should reset when different scenario was selected', async () => {
    render(renderWithRoute())

    await loadForm()
    showSelectOptions('scenario')
    selectScenario()
    await waitForEnabledTestRunSelect()
    showSelectOptions('test run')

    const { start } = mockedExecutionsList.executions[1]
    const formattedDate = moment(start).format('YYYY-MM-DD HH:mm')
    fireEvent.click(screen.getByText(formattedDate))

    const { name: newName } = mockedConfigurationsList.configurations[1]
    showSelectOptions('scenario')
    fireEvent.click(screen.getByText(newName))

    expect(screen.queryByText(formattedDate)).not.toBeInTheDocument()
  })
})
