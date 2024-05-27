import { useForm } from 'react-hook-form'
import './Form.scss'

const Form = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      todo: '',
      min: '',
      sec: '',
    },
  })

  const onSubmit = (data) => console.log(data)

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input
        className='form__task'
        placeholder='What needs to be done?'
        {...register('todo')}
      />
      <input className='form__timer' placeholder='Min' {...register('min')} />
      <input className='form__timer' placeholder='Sec' {...register('sec')} />
      <input type='submit' />
    </form>
  )
}

export default Form
