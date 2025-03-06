// a grid of cards for the team

import useUserContext from "../hooks/useUserContext";
import RegisterPage from "../pages/RegisterPage";

const UserGuard = ({children}: {children: React.ReactNode}) => {
  const { user } = useUserContext();

  return (
    <>
      {user ? children : <RegisterPage />}
    </>
  );
};

export default UserGuard;