import { useEffect, useRef, useState } from 'react'
import './App.scss'

const App = () => {
  const [data, setData] = useState([])
  const [hidden, setHidden] = useState(true)

  const newTimer = () => {
    const timer = {
      id: Math.random().toString(16).slice(2),
      count: 0,
      launched: false,
    }
    setData([...data, timer])
  }

  // скрываем список
  const hideList = (flag) => {
    setHidden(flag)
  }

  // сохранение значения времени
  const saveTime = (id, value) => {
    setData(
      data.map((item) => ({
        ...item,
        count: id === item.id ? value : item.count,
      })),
    )
  }

  // перезапуск времени
  const restartTime = (id, value) => {
    setData(
      data.map((item) => ({
        ...item,
        launched: id === item.id ? value : item.launched,
      })),
    )
  }

  return (
    <div className='app'>
      <Header addTimer={newTimer} />
      <Timers
        data={data}
        hidden={hidden}
        saveTime={saveTime}
        restartTime={restartTime}
      />
      <Footer hideList={hideList} hidden={hidden} />
    </div>
  )
}

const Header = ({ addTimer }) => (
  <div className='header'>
    <h2>TIMERS</h2>
    <button type='button' onClick={addTimer}>
      Add timer
    </button>
  </div>
)

const Timers = ({ data, hidden, saveTime, restartTime }) => {
  const list = data.map((timer) => (
    <Timer
      key={timer.id}
      id={timer.id}
      count={timer.count}
      saveTime={saveTime}
      launched={timer.launched}
      restartTime={restartTime}
      hidden={hidden}
    />
  ))
  return hidden && <span>{list}</span>
}

const Timer = ({ id, count, saveTime, launched, restartTime, hidden }) => {
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
    <div className='timer'>
      <span>Timer</span>
      <span>{id}</span>
      <span>{timer}</span>
      <div className='timer__buttons'>
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

const Footer = ({ hideList, hidden }) => (
  <div className='footer'>
    <button type='button' onClick={() => hideList(!hidden)}>
      {hidden ? <span>Скрыть список</span> : <span>Показать список</span>}
    </button>
  </div>
)

export default App
