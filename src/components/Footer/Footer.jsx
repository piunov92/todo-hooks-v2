const Footer = ({ hideList, hidden }) => (
  <div className='footer'>
    <button type='button' onClick={() => hideList(!hidden)}>
      {hidden ? <span>Скрыть список</span> : <span>Показать список</span>}
    </button>
  </div>
)

export default Footer
