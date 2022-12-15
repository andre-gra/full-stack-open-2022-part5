import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

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

  test('after clicking the like button, event handler is called twice', async () => {

    const mockHandler = jest.fn()

    render(
      <BlogForm
        author={blog.author}
        title={blog.title}
        url={blog.url}
        handleSubmit={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getAllByTestId('create-button')
    const title = screen.getByPlaceholderText('write title here')
    const author = screen.getByPlaceholderText('write author here')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
    await user.click(button[0])

    expect(mockHandler.mock.calls.length).toBe(1)
  })

})
