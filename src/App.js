import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const HomePage = () => {
    return <h1>Welcome to Blogify</h1>;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
