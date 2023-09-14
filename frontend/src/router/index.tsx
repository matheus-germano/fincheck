import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path='/sign-in' element={<h1>Login</h1>} />
          <Route path='/sign-up' element={<h1>Register</h1>} />
        </Route>

        <Route element={<AuthGuard isPrivate={true} />}>
          <Route path='/' element={<h1>Dashboard</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}