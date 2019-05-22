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

let label
let text

describe('CopyToClipboard', () => {
  beforeEach(() => {
    label = 'Fake Label'
    text = 'value to copy'
  })

  test('render proper input label', () => {
    const { getByTestId } = render(<CopyToClipboard label={label} />)

    expect(getByTestId('label')).toHaveTextContent(label)
  })

  test('render a readonly text input', () => {
    const { getByLabelText } = render(<CopyToClipboard label={label} text={text} />)

    expect(getByLabelText(label)).toHaveAttribute('readonly')
  })

  test('put the text into the input', () => {
    const { getByTestId } = render(<CopyToClipboard label={label} text={text} />)

    expect(getByTestId('input')).toHaveAttribute('value', text)
  })

  test('clicking should copy and switch icons', () => {
    const { getByTestId, queryByTestId } = render(
      <CopyToClipboard label={label} text={text} timeout={100} />
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
