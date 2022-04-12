import React from 'react'
import { screen, waitFor, render, fireEvent } from '@testing-library/react'
import { customRender } from 'utils/tests/mocks'
import ConfigurationForm from './ConfigurationForm'
import {
  configurationTypesMock,
  testParametersMock,
  testSourcesMock,
} from './ConfigurationForm.mocks'

jest.unmock('@material-ui/core')
jest.unmock('@material-ui/icons')

// getting rid of material-ui warnings
console.warn = jest.fn()

describe('component: ConfigurationForm', () => {
  it('should display a loader before fetching any data', () => {
    render(
      customRender(
        <ConfigurationForm
          mode="create"
          projectId="83150c3c-239f-4bec-8d0e-973b96ca3c7a"
        />
      )
    )

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(
      screen.queryByText(
        'Select test type and scenario parts to see available parameters list'
      )
    ).not.toBeInTheDocument()
  })

  it('should not display inputs with test parameters when checkboxes load tests and monitoring are not checked', async () => {
    render(
      customRender(
        <ConfigurationForm
          mode="create"
          projectId="83150c3c-239f-4bec-8d0e-973b96ca3c7a"
        />
      )
    )

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    expect(
      screen.getByText(
        'Select test type and scenario parts to see available parameters list'
      )
    ).toBeInTheDocument()

    // all monitoring options
    expect(screen.queryByText('monitoring interval')).not.toBeInTheDocument()
    expect(screen.queryByText('monitoring duration')).not.toBeInTheDocument()

    // all load tests options
    expect(screen.queryByText('time')).not.toBeInTheDocument()
    expect(screen.queryByText('users/second')).not.toBeInTheDocument()
    expect(screen.queryByText('users')).not.toBeInTheDocument()
    expect(screen.queryByText('host')).not.toBeInTheDocument()
  })

  it('should display all monitoring options when monitoring checkbox is checked', async () => {
    render(
      customRender(
        <ConfigurationForm
          mode="create"
          projectId="83150c3c-239f-4bec-8d0e-973b96ca3c7a"
        />,
        [testSourcesMock, testParametersMock, configurationTypesMock]
      )
    )

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    fireEvent.click(
      screen.getByRole('checkbox', {
        name: 'Monitoring',
      })
    )

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Select test type and scenario parts to see available parameters list'
        )
      ).not.toBeInTheDocument()
    })

    expect(screen.getByText('monitoring interval')).toBeInTheDocument()
    expect(screen.getByText('monitoring duration')).toBeInTheDocument()

    expect(screen.queryByText('time')).not.toBeInTheDocument()
    expect(screen.queryByText('users/second')).not.toBeInTheDocument()
    expect(screen.queryByText('users')).not.toBeInTheDocument()
    expect(screen.queryByText('host')).not.toBeInTheDocument()
  })

  it('should display all load tests options when load tests checkbox is checked', async () => {
    render(
      customRender(
        <ConfigurationForm
          mode="create"
          projectId="83150c3c-239f-4bec-8d0e-973b96ca3c7a"
        />,
        [testSourcesMock, testParametersMock, configurationTypesMock]
      )
    )

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    fireEvent.click(
      screen.getByRole('checkbox', {
        name: 'Load Tests',
      })
    )

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Select test type and scenario parts to see available parameters list'
        )
      ).not.toBeInTheDocument()
    })

    expect(screen.getByText('time')).toBeInTheDocument()
    expect(screen.getByText('users/second')).toBeInTheDocument()
    expect(screen.getByText('users')).toBeInTheDocument()
    expect(screen.getByText('host')).toBeInTheDocument()

    expect(screen.queryByText('monitoring interval')).not.toBeInTheDocument()
    expect(screen.queryByText('monitoring duration')).not.toBeInTheDocument()
  })

  it('should display all monitoring and load tests options when both checkboxes are checked', async () => {
    render(
      customRender(
        <ConfigurationForm
          mode="create"
          projectId="83150c3c-239f-4bec-8d0e-973b96ca3c7a"
        />,
        [testSourcesMock, testParametersMock, configurationTypesMock]
      )
    )

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    fireEvent.click(
      screen.getByRole('checkbox', {
        name: 'Load Tests',
      })
    )
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: 'Monitoring',
      })
    )

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Select test type and scenario parts to see available parameters list'
        )
      ).not.toBeInTheDocument()
    })

    expect(screen.getByText('time')).toBeInTheDocument()
    expect(screen.getByText('users/second')).toBeInTheDocument()
    expect(screen.getByText('users')).toBeInTheDocument()
    expect(screen.getByText('host')).toBeInTheDocument()

    expect(screen.getByText('monitoring interval')).toBeInTheDocument()
    expect(screen.getByText('monitoring duration')).toBeInTheDocument()
  })
})
