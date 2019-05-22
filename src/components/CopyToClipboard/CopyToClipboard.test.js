import React from 'react'
import { render, cleanup, fireEvent, act } from 'react-testing-library'

import { copyValueFromInput } from '~utils/browser'
import { CopyToClipboard } from './CopyToClipboard'

jest.mock('~utils/browser', () => ({
  copyValueFromInput: jest.fn(),
}))

jest.unmock('@material-ui/core')
jest.unmock('@material-ui/icons')

jest.useFakeTimers()

afterEach(cleanup)

describe('CopyToClipboard', () => {
  test('render proper input label', () => {
    const { getByText } = render(<CopyToClipboard label="Fake Label" />)

    const label = getByText('Fake Label')

    expect(label.tagName).toBe('LABEL')
  })

  test('render a readonly text input', () => {
    const { getByLabelText } = render(
      <CopyToClipboard label="Fake Label" text="value to copy" />
    )

    const input = getByLabelText('Fake Label')
    expect(input).toHaveAttribute('readonly')
  })

  test('render copy icon initially', () => {
    const { getByTestId, queryByTestId } = render(
      <CopyToClipboard label="Fake Label" text="value to copy" />
    )

    const iconButton = getByTestId('copy-button')
    expect(iconButton).toHaveAttribute('aria-label', 'Copy to clipboard')

    const icon = queryByTestId('copy-icon')
    expect(icon).toBeVisible()
  })

  test('clicking should copy and switch icons', () => {
    const { getByTestId, queryByTestId } = render(
      <CopyToClipboard label="Fake Label" text="value to copy" timeout={100} />
    )

    // Before clicking
    expect(getByTestId('copy-button')).toBeVisible()
    expect(queryByTestId('copied-button')).not.toBeInTheDocument()

    // Clicking to copy
    act(() => {
      fireEvent.click(getByTestId('copy-button'))
    })

    // After clicking
    expect(copyValueFromInput).toHaveBeenCalled()
    expect(queryByTestId('copy-button')).not.toBeInTheDocument()
    expect(getByTestId('copied-button')).toBeVisible()

    // After timeout
    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(queryByTestId('copy-button')).toBeVisible()
    expect(queryByTestId('copied-button')).not.toBeInTheDocument()
  })
})
