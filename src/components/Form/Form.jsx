import { useForm } from 'react-hook-form'
import './Form.scss'
import { useEffect } from 'react'

const Form = ({ setFormData, addTask }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      todo: '',
      min: '',
      sec: '',
    },
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      clearErrors()
      reset()
    }
  }, [isSubmitSuccessful, reset, clearErrors])

  const submit = (data) => {
    setFormData(data)
    addTask(data.todo)
  }

  // console.log('render form component')
  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
      <input
        className='form__task'
        placeholder='What needs to be done?'
        {...register('todo', {
          required: true,
        })}
      />
      <input
        name='minutes'
        className={`form__timer ${errors.min ? 'form__timer-error' : ''}`}
        placeholder='Min'
        {...register('min', {
          maxLength: 4,
          pattern: /^[0-9+]*$/,
        })}
      />
      <input
        className={`form__timer ${errors.sec ? 'form__timer-error' : ''}`}
        placeholder='Sec'
        {...register('sec', {
          maxLength: 2,
          pattern: /^[0-9+]*$/,
        })}
      />
      <input type='submit' style={{ display: 'none' }} />
    </form>
  )
}

export default Form
