import PropTypes from 'prop-types'
import { Form } from '../Form/Form'
import './Header.scss'

const Header = ({ addTask }) => (
  <header className='header'>
    <h1>todos</h1>
    <Form addTask={addTask} />
  </header>
)

Header.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default Header
