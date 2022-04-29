import React from 'react'
import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from 'react-final-form'

import { FormValue } from './FormValue'

afterEach(cleanup)

describe('FormValue', () => {
  it('should re-render on each value change', async () => {
    const user = userEvent.setup()
    const { getByTestId, getByText } = render(
      <Form
        initialValues={{
          firstName: 'John',
          lastName: 'Doe',
        }}
        onSubmit={jest.fn()}
      >
        {form => (
          <React.Fragment>
            <button onClick={() => form.form.change('lastName', 'Williams')}>
              Change name
            </button>
            <FormValue data-something="1" name="lastName">
              {lastName => <div data-testid="last-name-value">{lastName}</div>}
            </FormValue>
          </React.Fragment>
        )}
      </Form>
    )
    const lastNameDiv = getByTestId('last-name-value')
    expect(lastNameDiv.textContent).toEqual('Doe')

    const button = getByText('Change name')
    await user.click(button)

    expect(lastNameDiv.textContent).toEqual('Williams')
  })
})
