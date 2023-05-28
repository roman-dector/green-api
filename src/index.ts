import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
)

window.addEventListener('unhandledrejection', e => {
  console.log(`${e.reason}`)
})
