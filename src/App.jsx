import './App.css';
import MenuBar from './components/MenuBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { defaultRoutes, adminWorkspaceRoutes, facultyWorkspaceRoutes, loginRoutes, studentWorkspaceRoutes } from './reducers/Routes';
import { useEffect } from 'react';
import axios from 'axios';
import { SAVE_VISITOR } from './reducers/ApiEndPoints';
import Cookies from 'js-cookie';

function App() {

  useEffect(() => {
    if (Cookies.get("visitor_saved") === "1")
      return

    const details = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      vendor: navigator.vendor,
    }

    navigator.geolocation.getCurrentPosition((position) => {
      details.latitude = position.coords.latitude
      details.longitude = position.coords.longitude
      axios({
        method: "post",
        url: SAVE_VISITOR,
        data: {
          details: JSON.stringify(details),
        }
      }).then(() => {
        Cookies.set("visitor_saved", "1")
      })
    })
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
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
