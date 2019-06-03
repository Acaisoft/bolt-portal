import React from 'react'
import { render, cleanup, fireEvent, act } from '@testing-library/react'

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

  test('put the text into a readonly input', () => {
    const { getByLabelText } = render(<CopyToClipboard label={label} text={text} />)

    const input = getByLabelText(label)

    expect(input).toHaveAttribute('readonly')
    expect(input).toHaveAttribute('value', text)
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

    expect(getByTestId('copy-button')).toBeVisible()
    expect(queryByTestId('copied-button')).not.toBeInTheDocument()
  })
})
