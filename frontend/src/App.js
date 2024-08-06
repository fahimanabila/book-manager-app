import AddBook from "./components/AddBook";
import AddCategory from "./components/AddCategory";
import BookList from "./components/BookList";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import ViewCategory from "./components/ViewCategory";
import ViewBook from "./components/ViewBook";
import EditBook from "./components/EditBook";
import EditCategory from "./components/EditCategory";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<><Navbar /><Dashboard /><BookList/></>}/>
        <Route path="/addbook" element={<><Navbar /><AddBook /></>}/>
        <Route path="/addcategory" element={<><Navbar /><AddCategory /></>}/>
        <Route path="/viewbook" element={<><Navbar /><ViewBook /></>}/>
        <Route path="/viewcategory" element={<><Navbar /><ViewCategory /></>}/>
        <Route path="/editbook/:id" element={<><Navbar /><EditBook /></>}/>
        <Route path="/editcategory/:id" element={<><Navbar /><EditCategory /></>}/>

{/* 
        <Route path="/viewbook" element={<><Navbar /><ViewBook /></>}/>
        <Route path="/viewcategory" element={<><Navbar /><ViewCategory /></>}/>

        
        

        <Route path="/editbook/:id" element={<><Navbar /><EditBook /></>}/>
        <Route path="/editcategory/:id" element={<><Navbar /><EditCategory /></>}/>


        <Route path="/add" element={<><Navbar /><AddProduct/></>}/>
        <Route path="/edit/:id" element={<><Navbar /><EditProduct/></>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
