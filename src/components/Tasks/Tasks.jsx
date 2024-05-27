import Task from '../Task/Task'

const Tasks = ({ data, hidden, saveTime, restartTime }) => {
  const list = data.map((task) => (
    <Task
      key={task.id}
      id={task.id}
      count={task.count}
      saveTime={saveTime}
      launched={task.launched}
      restartTime={restartTime}
      hidden={hidden}
    />
  ))
  return hidden && <span>{list}</span>
}

export default Tasks
