import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <h1>App.js parent page</h1>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
