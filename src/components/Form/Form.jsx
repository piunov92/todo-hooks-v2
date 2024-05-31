import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import './Form.scss'

export const Form = ({ addTask }) => {
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
    console.log(data)
    let reverse = false
    if (data.min || data.sec) {
      reverse = true
    }
    addTask(data.todo, data.min * 60 + Number(data.sec), reverse)
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

export const EditForm = ({ todo, editTask, id, setEdited }) => {
  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: {
      value: todo,
    },
  })

  useEffect(() => {
    setFocus('value')
  }, [setFocus])

  const submit = (data) => {
    editTask(id, data.value)
    setEdited(false)
  }

  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
      <input
        className='form__task form__edit'
        {...register('value', {
          required: true,
        })}
      />
    </form>
  )
}
