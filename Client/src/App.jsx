import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <>
      <h1>The eCommerce Brick-and-Mortar store</h1>

      <div>
        <Nav />
      </div>
      
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
