import PropTypes from 'prop-types'
import Filters from '../Filters/Filters'
import './Footer.scss'

const Footer = ({ count, clearCompleted, setAll, setActive, setCompleted }) => (
  <div className='footer'>
    <span className='footer__count-task'>{count} items left</span>
    <Filters
      setAll={setAll}
      setActive={setActive}
      setCompleted={setCompleted}
    />
    <button
      className='footer__clear-completed'
      type='button'
      onClick={clearCompleted}
    >
      <span>Clear completed</span>
    </button>
  </div>
)

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}

export default Footer
