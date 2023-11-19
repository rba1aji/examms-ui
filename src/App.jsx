import './App.css';
import MenuBar from './components/MenuBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { defaultRoutes, adminWorkspaceRoutes, facultyWorkspaceRoutes, loginRoutes, studentWorkspaceRoutes } from './reducers/Routes';

function App() {

  return (
    <div style={{
      minHeight: '100vh',
    }}
    >
      <BrowserRouter>
        <MenuBar />
        <br />
        <br />
        <Routes>
          {[...defaultRoutes, ...loginRoutes]
            .map((item, index) => (
              <Route
                key={index}
                path={item.path}
                exact
                element={item.component}
              ></Route>
            ))}
          {
            // userRole === 'faculty' &&
            [...facultyWorkspaceRoutes]
              .map((item, index) => {
                return <Route
                  key={index}
                  path={item.path}
                  exact
                  element={item.component}
                ></Route>
              })}
          {
            // userRole === 'admin' && 
            [...adminWorkspaceRoutes]
              .map((item, index) => {
                return <Route
                  key={index}
                  path={item.path}
                  exact
                  element={item.component}
                ></Route>
              })}
          {[...studentWorkspaceRoutes]
            .map((item, index) => {
              return <Route
                key={index}
                path={item.path}
                exact
                element={item.component}
              ></Route>
            })}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
