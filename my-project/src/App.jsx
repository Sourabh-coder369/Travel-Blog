import './App.css';
import './index.css'
import Layout from "./Layout.jsx"
import Postlist from './Pages/home.jsx'
import Login from './Pages/login.jsx'
import Register  from './Pages/register.jsx';
import { Routes,Route } from 'react-router-dom';
import { UserProvider } from './usercontext.jsx';
import { Newpost } from './Pages/createPost.jsx';
import { Postpage } from './Pages/postpage.jsx';
import { EditPage } from './Pages/editPage.jsx';
import HomeInterface from "./Pages/homeInterface.jsx";
import SearchProvider from "./searchContext.jsx";
import Search from "./Pages/search.jsx";


function App() {
    return (
        <UserProvider>
            <SearchProvider>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<HomeInterface/>}></Route>
                        <Route path='/blogs' element={<Postlist/>}></Route>
                        <Route path='/login' element={<Login/>}></Route>
                        <Route path='/register' element={<Register/>}></Route>
                        <Route path='/newpost' element={<Newpost/>}></Route>
                        <Route path='/posts/:id' element={<Postpage/>}></Route>
                        <Route path='/editpost/:id' element={<EditPage/>}></Route>
                        <Route path='/search' element={<Search/>}></Route>
                    </Route>
                </Routes>
            </SearchProvider>
        </UserProvider>
    );
}

export default App;
