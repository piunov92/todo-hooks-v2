import { useState, useRef, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { EditForm } from '../Form/Form'

import './Task.scss'

const Task = ({
  id,
  seconds,
  saveTime,
  launched,
  restartTime,
  todo,
  done,
  _checked,
  remove,
  _edited,
  edit,
  editTask,
  date,
  reverse,
  completed,
  all,
  active,
}) => {
  const currentTime =
    (new Date().getHours() * 60 + new Date().getMinutes()) * 60 +
    new Date().getSeconds()

  const [isRunningTimer, setIsRunningTimer] = useState(launched)
  const initTimer = () => {
    let init = null
    if (reverse) {
      if (!isRunningTimer) {
        init = seconds
      } else if (seconds - currentTime < 0) {
        init = 1
      } else {
        init = seconds - currentTime
      }
    } else if (!isRunningTimer) {
      init = seconds
    } else {
      init = currentTime - seconds
    }
    return init
  }
  const [checked, setChecked] = useState(_checked)
  const [edited, setEdited] = useState(_edited)
  const [timer, setTimer] = useState(initTimer())
  const interval = useRef(null)
  const s = () => `0${timer % 60}`.slice(-2)
  const m = () => Math.floor((timer / 60) % 60)
  const h = () => Math.floor((timer / 3600) % 24)

  const start = () => {
    if (!isRunningTimer && !checked) {
      setIsRunningTimer(true)
    }
  }

  const stop = () => {
    if (isRunningTimer) {
      setIsRunningTimer(false)
      saveTime(id, timer)
    }
    if (interval.current) {
      clearInterval(interval.current)
    }
  }

  useEffect(() => {
    done(id, checked)
  }, [id, checked])

  useEffect(() => {
    edit(id, edited)
  }, [id, edited])

  // сохранение значения таймера
  useEffect(() => {
    if (isRunningTimer) {
      if (reverse) {
        saveTime(id, currentTime + timer)
      } else {
        saveTime(id, currentTime - timer)
      }
    }
  }, [id, timer])

  useEffect(() => {
    restartTime(id, isRunningTimer)
  }, [id, isRunningTimer])

  useEffect(() => {
    if (isRunningTimer) {
      interval.current = setInterval(() => {
        if (reverse) {
          setTimer((t) => t - 1)
        } else {
          setTimer((t) => t + 1)
        }
      }, 1000)
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [isRunningTimer])

  useEffect(() => {
    if (reverse && !timer) setChecked(true)
  }, [timer, reverse])

  useEffect(() => {
    if (_checked) {
      setTimer(0)
      saveTime(id, 0)
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [id, _checked])

  const render = () =>
    !_checked && _edited ? (
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
          <span>{`${h()}:${m()}:${s()}`}</span>
        </div>
        <span>{`created ${formatDistanceToNow(date, {
          includeSeconds: true,
          addSuffix: true,
        })}`}</span>
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

  const layout = () => {
    if (all) {
      return render()
    }
    if (completed && checked) {
      return render()
    }
    if (active && !checked) {
      return render()
    }
  }

  return layout()
}

export default Task
