import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { UserForm } from './pages/UserForm';
import { UserList } from './pages/UserList';
import { SnackbarContainer } from './components/SnackbarContainer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  // const basename = import.meta.env.PROD ? '/user-management-app' : '/';
  // or alternatively:
  const basename =
    process.env.NODE_ENV === 'production' ? '/user-management-app' : '/';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={basename}>
        <Container>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
          </Routes>
          <SnackbarContainer />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
