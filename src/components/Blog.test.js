import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Someone',
    url: 'some/url',
    likes: '3',
    user: {
      username: 'admin'
    },
    loggedBlogappUser: {
      username: 'admin'
    }
  }

  test('renders content', async () => {
    render(<Blog blog={blog} />)

    const title = screen.getByText(
      'Component testing is done with react-testing-library',
      { exact: false }
    )
    const author = screen.getByText('Someone', { exact: false })
    const divToggable = screen.getAllByTestId('toggableContent')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(divToggable[0]).toHaveStyle('display: none')
  })

  test('after clicking show button, toggable are displayed', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view', { exact: false })
    await user.click(button)

    const divToggable = screen.getAllByTestId('toggableContent')

    expect(divToggable[0]).toHaveStyle('display: block')
  })

  test('after clicking the like button, event handler is called twice', async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} addLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getAllByTestId('like-button')
    await user.click(button[0])
    await user.click(button[0])

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
