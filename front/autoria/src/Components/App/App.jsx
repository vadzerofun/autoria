import './App.css';
import { Login } from '../Auth/Login/Login';
import useToken from '../../Hooks/useToken';

function App() {

  // IMPORTANT! Use in admin dashboard (e.g. AdminLayout)
  // const { token, setToken } = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <>
      <div>
        App
      </div>
    </>
  );
}

export default App;
