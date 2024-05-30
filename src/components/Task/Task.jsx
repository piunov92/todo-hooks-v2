import { useState, useRef, useEffect } from 'react'
import { EditForm } from '../Form/Form'

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
  _checked,
  remove,
  _edited,
  edit,
  editTask,
}) => {
  const currentTimer =
    (new Date().getHours() * 60 + new Date().getMinutes()) * 60 +
    new Date().getSeconds()

  const [isRunningTimer, setIsRunningTimer] = useState(launched)
  const [checked, setChecked] = useState(_checked)
  const [edited, setEdited] = useState(_edited)
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

  useEffect(() => {
    done(id, checked)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, checked])

  useEffect(() => {
    edit(id, edited)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, edited])

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
        // console.log('run timer')
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
    if (_checked) {
      setTimer(0)
      saveTime(id, 0)
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, _checked])

  // console.log('render component Timer')
  return !_checked && _edited ? (
    <EditForm todo={todo} editTask={editTask} id={id} setEdited={setEdited} />
  ) : (
    <div className='task'>
      <input
        type='radio'
        id={id}
        onChange={() => setChecked(true)}
        checked={_checked}
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
          onClick={() => {
            setEdited(true)
          }}
        />
        <button
          className='remove'
          type='button'
          aria-label='remove'
          onClick={() => remove(id)}
        />
      </div>
    </div>
  )
}

export default Task
