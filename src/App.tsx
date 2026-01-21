import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import OverviewPage from './pages/OverviewPage';
import TechStackPage from './pages/TechStackPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import ProfileAdmin from './pages/admin/ProfileAdmin';
import TechStackAdmin from './pages/admin/TechStackAdmin';
import Login from './pages/admin/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicLayout from './components/layout/PublicLayout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout><OverviewPage /></PublicLayout>} />
              <Route path="/tech-stack" element={<PublicLayout><TechStackPage /></PublicLayout>} />
              <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
              <Route path="/experience" element={<PublicLayout><ExperiencePage /></PublicLayout>} />

              {/* Admin Login (Public) */}
              <Route path="/admin/login" element={<Login />} />

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="projects" element={<ProjectsAdmin />} />
                  <Route path="profile" element={<ProfileAdmin />} />
                  <Route path="techstack" element={<TechStackAdmin />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

