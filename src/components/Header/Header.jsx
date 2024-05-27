import Form from '../Form/Form'
import './Header.scss'

const Header = ({ addTask }) => (
  <header className='header'>
    <h1>todos</h1>
    <button type='button' onClick={addTask}>
      Add todo
    </button>
    <Form />
  </header>
)

export default Header
