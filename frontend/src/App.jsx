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
