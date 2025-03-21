
import useUserContext from "../context/useUserContext";

const AdminGuard = ({children}: {children: React.ReactNode}) => {
  const { user } = useUserContext();
// display a message that they are not authorized
  return (
    <>
      {user && user?.roles?.includes('admin') ? children : <div>You are not authorized to access this page</div>}
    </>
  );
};

export default AdminGuard;