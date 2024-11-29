import { BrowserRouter } from "react-router"
import AppRoutes from "./routes/AppRoutes"

const App : React.FC = () => {

  return (
     <BrowserRouter>
      <AppRoutes/>
     </BrowserRouter>
    
  )
}

export default App
