import { BrowserRouter } from "react-router"
import AppRoutes from "./routes/AppRoutes"
import AppModal from "./components/AppModal/AppModal"

const App : React.FC = () => {

  return (
     <BrowserRouter>
      <AppRoutes/>
      <AppModal/>
     </BrowserRouter>
    
  )
}

export default App
