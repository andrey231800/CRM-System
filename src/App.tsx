import FilterTabs from './components/FilterTabs'
import { TodosProvider } from './context/TaskContext'
import TodosList from './components/TodosList'
import TodoForm from './components/TodoForm'
// import './styles/App.css'

const App : React.FC = () => {

  return (
    <TodosProvider>
      <div className='app'>
        <TodoForm/>
        <FilterTabs/>
        <TodosList/>
      </div>
    </TodosProvider>
    
  )
}

export default App
