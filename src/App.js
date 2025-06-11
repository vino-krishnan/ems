import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './components/counter';
import Loginpage from './components/loginpage';
import ManagerDashboard from './components/managerDashboard'
import EmployeeDashboard from './components/employeeDashboard';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      {/* <Counter /> */}
        <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard  />} />
      </Routes>
    </Provider>
  );
}

export default App;
