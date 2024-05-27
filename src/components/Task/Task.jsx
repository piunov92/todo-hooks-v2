import { useState, useRef, useEffect } from 'react'

const Task = ({ id, count, saveTime, launched, restartTime, hidden }) => {
  const currentTimer =
    (new Date().getHours() * 60 + new Date().getMinutes()) * 60 +
    new Date().getSeconds()

  const [isRunningTimer, setIsRunningTimer] = useState(launched)
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

  // console.log('render component Timer')
  return (
    <div className='task'>
      <span>Timer</span>
      <span>{id}</span>
      <span>{timer}</span>
      <div className='task__buttons'>
        <button type='button' onClick={start}>
          Start
        </button>
        <button type='button' onClick={stop}>
          Stop
        </button>
      </div>
    </div>
  )
}

export default Task
