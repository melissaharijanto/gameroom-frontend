import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './compiler/context/Authentication';
import ProtectedRoute from './components/ProtectedRoute';
import CommunityPage from './pages/CommunityPage';
import CreatePostPage from './pages/CreatePostPage';
import CommunityPostPage from './pages/CommunityPostPage';
import SearchPage from './pages/SearchPage';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" index element={<LandingPage />}/>
                    <Route path="login" element={<LoginPage />}/>
                    <Route path="signup" element={<SignUpPage />}/>
                    <Route path="dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                        }
                    />
                    <Route path="community/:id">
                        <Route index element={
                            <ProtectedRoute>
                                <CommunityPage/>
                            </ProtectedRoute>
                        }/>
                        <Route path="posts">
                            <Route path="new" element={
                                <ProtectedRoute>
                                    <CreatePostPage/>
                                </ProtectedRoute>
                            }/>
                            <Route path=":postid" element={
                                <ProtectedRoute>
                                    <CommunityPostPage/>
                                </ProtectedRoute>
                            }/>
                        </Route>
                    </Route>
                    <Route path="search/:keyword" element={
                        <ProtectedRoute>
                            <SearchPage/>
                        </ProtectedRoute>
                    }/>
                    <Route element={<LandingPage/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
  );
}

export default App;
