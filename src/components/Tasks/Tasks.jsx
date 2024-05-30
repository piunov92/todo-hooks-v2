import Task from '../Task/Task'

import './Tasks.scss'

const Tasks = ({
  data,
  hidden,
  saveTime,
  restartTime,
  done,
  remove,
  edit,
  editTask,
}) => {
  const list = data.map((task) => (
    <Task
      key={task.id}
      id={task.id}
      count={task.count}
      saveTime={saveTime}
      launched={task.launched}
      _checked={task._checked}
      _edited={task._edited}
      restartTime={restartTime}
      hidden={hidden}
      todo={task.todo}
      done={done}
      remove={remove}
      edit={edit}
      editTask={editTask}
    />
  ))
  return hidden && <span className='tasks'>{list}</span>
}

export default Tasks
