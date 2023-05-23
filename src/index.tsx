import './index.css'
import ReactDOM from 'react-dom'
import App from './views/App/App'

ReactDOM.render(<App />, document.getElementById('root'))

window.addEventListener('unhandledrejection', e => {
  console.log(`${e.reason}`)
})
