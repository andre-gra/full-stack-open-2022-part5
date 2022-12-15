import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', async () => {
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

  render(<Blog blog={blog} />)

  const title = screen.getByText('Component testing is done with react-testing-library', { exact: false })
  const author = screen.getByText('Someone', { exact: false })
  const divToggable = screen.getAllByTestId('toggableContent')
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(divToggable[0]).toHaveStyle('display: none')
})