/* eslint-disable jsx-a11y/label-has-associated-control */
import './Filters.scss'

const Filters = () => {
  console.log('render filters component')
  return (
    <div className='filters'>
      <div className='filters__item'>
        <input
          id='radio-1'
          type='radio'
          name='radio'
          value='1'
          onChange={() => {
            console.log('radio-1')
          }}
          defaultChecked
        />
        <label htmlFor='radio-1'>All</label>
      </div>
      <div className='filters__item'>
        <input
          id='radio-2'
          type='radio'
          name='radio'
          value='2'
          onChange={() => {
            console.log('radio-2')
          }}
        />
        <label htmlFor='radio-2'>Active</label>
      </div>
      <div className='filters__item'>
        <input
          id='radio-3'
          type='radio'
          name='radio'
          value='3'
          onChange={() => {
            console.log('radio-3')
          }}
        />
        <label htmlFor='radio-3'>Completed</label>
      </div>
    </div>
  )
}

export default Filters
