import { useState, useRef, useEffect } from 'react'

import './Task.scss'

const Task = ({
  id,
  count,
  saveTime,
  launched,
  restartTime,
  hidden,
  todo,
  done,
  check,
}) => {
  const currentTimer =
    (new Date().getHours() * 60 + new Date().getMinutes()) * 60 +
    new Date().getSeconds()

  const [isRunningTimer, setIsRunningTimer] = useState(launched)
  const [checked, setChecked] = useState(check)
  const [timer, setTimer] = useState(
    !isRunningTimer && hidden ? count : currentTimer - count,
  )
  const interval = useRef(null)

  const start = () => {
    if (!isRunningTimer) {
      setIsRunningTimer(true)
    }
  }

  const stop = () => {
    if (isRunningTimer) {
      setIsRunningTimer(false)
      // сохраняем таймер без вычитания текущего времени
      saveTime(id, timer)
    }
    if (interval.current) {
      clearInterval(interval.current)
    }
  }

  // console.log(checked)

  useEffect(() => {
    done(id, checked)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, checked])

  // сохранение значения таймера
  useEffect(() => {
    if (isRunningTimer) {
      saveTime(id, currentTimer - timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, timer])

  useEffect(() => {
    restartTime(id, isRunningTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isRunningTimer])

  useEffect(() => {
    if (isRunningTimer) {
      interval.current = setInterval(() => {
        setTimer((t) => t + 1)
      }, 1000)
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunningTimer])

  useEffect(() => {
    if (check) {
      setTimer(0)
      saveTime(id, 0)
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, check])

  // console.log('render component Timer')
  return (
    <div className='task'>
      <input
        type='radio'
        id={id}
        onChange={() => setChecked(true)}
        checked={check}
      />
      <label htmlFor={id}>
        <span>{todo}</span>
      </label>
      <div className='task__buttons'>
        <button
          className='play'
          type='button'
          aria-label='play'
          onClick={start}
        />
        <button
          className='pause'
          type='button'
          aria-label='pause'
          onClick={stop}
        />
        <span>{timer}</span>
      </div>
      <span>created 17 seconds ago</span>
      <div className='task__buttons'>
        <button
          className='edit'
          type='button'
          aria-label='edit'
          onClick={() => console.log('edit click')}
        />
        <button
          className='remove'
          type='button'
          aria-label='remove'
          onClick={() => console.log('remove click')}
        />
      </div>
    </div>
  )
}

export default Task
