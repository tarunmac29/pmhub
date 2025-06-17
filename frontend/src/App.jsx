import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/AuthPages/Login';
import Register from './pages/AuthPages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects'; // ✅ Add this
import PrivateRoute from './components/PrivateRoute';
import ForYou from './components/sidebarComponent/ForYou';
import Layout from './layout/Layout';
import TenantCreate from './pages/TenantCreate'; // ✅ Add this
import ProjectDashboard from './pages/Project/ProjectDashboard';
import TeamsPage from './components/Team-Management/TeamsPage';
import TeamManage from './components/Team-Management/TeamManage';
import ListView from './pages/Project/List/ListView'; // ✅ Add this


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/project/:projectId/list-view" 
          element={
            <PrivateRoute>
              <Layout>
                <ListView />
              </Layout >
            </PrivateRoute>
          }
        />
      
        


        <Route
          path="/projectdashboard/:projectId"
          element={
            <PrivateRoute>
              <Layout>
                <ProjectDashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/TeamManage/:teamId"
          element={
            <PrivateRoute>
              <Layout>
                <TeamManage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route 
          path="/teams"
          element={
            <PrivateRoute>
              <Layout>
                <TeamsPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Layout>
                <Projects />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/foryou"
          element={
            <PrivateRoute>
              <Layout>
                <ForYou />
              </Layout>
             
            </PrivateRoute>
          }
        />

        <Route
            path="/tenant/create"
            element={
                    <Layout>
                      <TenantCreate />
                    </Layout>
            }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
