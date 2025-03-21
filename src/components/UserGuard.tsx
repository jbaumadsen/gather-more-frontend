// a grid of cards for the team

import useUserContext from "../context/useUserContext";
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