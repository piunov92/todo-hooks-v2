import Task from '../Task/Task'

import './Tasks.scss'

const Tasks = ({
  data,
  saveTime,
  restartTime,
  done,
  remove,
  edit,
  editTask,
  completed,
  all,
  active,
}) => {
  const list = data.map((task) => (
    <Task
      key={task.id}
      id={task.id}
      seconds={task.seconds}
      saveTime={saveTime}
      launched={task.launched}
      _checked={task._checked}
      _edited={task._edited}
      restartTime={restartTime}
      todo={task.todo}
      done={done}
      remove={remove}
      edit={edit}
      editTask={editTask}
      date={task.date}
      reverse={task.reverse}
      completed={completed}
      all={all}
      active={active}
    />
  ))
  return <span className='tasks'>{list}</span>
}

export default Tasks
