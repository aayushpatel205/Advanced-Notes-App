import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewNote from './pages/NewNote';
import NotePage from './pages/NotePage';
import EditPage from './pages/EditPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new' element={<NewNote/>}/>
        <Route path='/notepage/:id' element={<NotePage/>}/>
        <Route path='/editnote/:id' element={<EditPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
