import Form from '../Form/Form'
import './Header.scss'

const Header = ({ addTask, setFormData }) => (
  <header className='header'>
    <h1>todos</h1>
    <Form setFormData={setFormData} addTask={addTask} />
  </header>
)

export default Header
