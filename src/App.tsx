import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { UserForm } from './pages/UserForm/UserForm';
import { UserList } from './pages/UserList/UserList';
import { SnackbarProvider } from './context';

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Router>
          <Container>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/new" element={<UserForm />} />
              <Route path="/users/edit/:id" element={<UserForm />} />
            </Routes>
          </Container>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
