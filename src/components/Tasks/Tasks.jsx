import Task from '../Task/Task'

import './Tasks.scss'

const Tasks = ({ data, hidden, saveTime, restartTime, done }) => {
  const list = data.map((task) => (
    <Task
      key={task.id}
      id={task.id}
      count={task.count}
      saveTime={saveTime}
      launched={task.launched}
      check={task.check}
      restartTime={restartTime}
      hidden={hidden}
      todo={task.todo}
      done={done}
    />
  ))
  return hidden && <span className='tasks'>{list}</span>
}

export default Tasks
