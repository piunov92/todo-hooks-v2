import { useState } from 'react'
import Header from '../components/Header/Header'
import Tasks from '../components/Tasks/Tasks'
import Footer from '../components/Footer/Footer'
import './App.scss'

const App = () => {
  const [data, setData] = useState([])
  const [hidden, setHidden] = useState(true)
  const [count, setCount] = useState(0)
  // const [filter, setFilter] = useState('all')

  console.log(data)

  const addTask = (todo, seconds, reverse) => {
    const task = {
      id: Math.random().toString(16).slice(2),
      seconds,
      launched: false,
      date: new Date(),
      todo,
      _checked: false,
      _edited: false,
      reverse,
    }
    setData([...data, task])
    setCount((c) => c + 1)
  }

  // редактирование поля
  const editTask = (id, value) => {
    setData(
      data.map((item) => ({
        ...item,
        todo: id === item.id ? value : item.todo,
      })),
    )
  }

  // скрываем список
  // const hideList = (flag) => {
  //   setHidden(flag)
  // }

  // сохранение значения времени
  const saveTime = (id, value) => {
    setData(
      data.map((item) => ({
        ...item,
        seconds: id === item.id ? value : item.seconds,
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
        _checked: id === item.id ? value : item._checked,
      })),
    )
  }

  const remove = (id) => {
    setData(data.filter((item) => item.id !== id))
    setCount((c) => c - 1)
  }

  const clearCompleted = () => {
    setData(
      data.filter((item) => {
        if (item._checked) {
          setCount((c) => c - 1)
        }
        return item._checked === false
      }),
    )
  }

  const edit = (id, value) => {
    setData(
      data.map((item) => ({
        ...item,
        _edited: id === item.id ? value : item._edited,
      })),
    )
  }

  // const completed = () => {
  //     setData(data.filter((item) => item._checked === true))
  // }

  return (
    <section className='app'>
      <Header addTask={addTask} />
      <Tasks
        data={data}
        hidden={hidden}
        saveTime={saveTime}
        restartTime={restartTime}
        done={done}
        remove={remove}
        edit={edit}
        editTask={editTask}
      />
      <Footer count={count} clearCompleted={clearCompleted} />
    </section>
  )
}

export default App
