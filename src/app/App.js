import { useState } from 'react'
import Header from '../components/Header/Header'
import Tasks from '../components/Tasks/Tasks'
import Footer from '../components/Footer/Footer'
import './App.scss'

const App = () => {
  const [data, setData] = useState([])
  const [hidden, setHidden] = useState(true)
  const [, setFormData] = useState({
    todo: '',
    min: '',
    sec: '',
  })

  // console.log(data)

  const addTask = (todo) => {
    const task = {
      id: Math.random().toString(16).slice(2),
      count: 0,
      launched: false,
      todo,
      check: false,
    }
    setData([...data, task])
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

  const done = (id, value) => {
    setData(
      data.map((item) => ({
        ...item,
        check: id === item.id ? value : item.check,
      })),
    )
  }

  return (
    <section className='app'>
      <Header addTask={addTask} setFormData={setFormData} />
      <Tasks
        data={data}
        hidden={hidden}
        saveTime={saveTime}
        restartTime={restartTime}
        done={done}
      />
      <Footer hideList={hideList} hidden={hidden} />
    </section>
  )
}

export default App
