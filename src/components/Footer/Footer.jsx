import Filters from '../Filters/Filters'
import './Footer.scss'

const Footer = ({ count, hideList, hidden }) => (
  <div className='footer'>
    <span className='footer__count-task'>{count} items left</span>
    <Filters />
    <button
      className='footer__clear-completed'
      type='button'
      onClick={() => hideList(!hidden)}
    >
      {hidden ? <span>Скрыть список</span> : <span>Показать список</span>}
    </button>
  </div>
)

export default Footer
