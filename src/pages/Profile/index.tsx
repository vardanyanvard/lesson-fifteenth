import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { handleVerify } from "../../lib/api";
import { IViewUser, IWideUser } from "../../lib/types";

function Profile() {
  const navigate = useNavigate();
  const [account, setAccount] = useState<IWideUser | null>(null);
  const [viewUser, setViewUser] = useState<IViewUser | null>(null);

  useEffect(() => {
    handleVerify().then((response) => {
      if (!response.user) {
        navigate("/login");
      } else {
        setAccount(response.user);
      }
    });
  }, []);

  return (
    account && (
      <>
        <nav>
          <NavLink end to="/profile">
            Profile
          </NavLink>
          {!viewUser && <NavLink to="/profile/settings">Settings</NavLink>}
          <NavLink to="/profile/search">Search</NavLink>
          {(!viewUser || (viewUser && !viewUser.isPrivate)) && (
            <NavLink to="/profile/posts">Posts</NavLink>
          )}
          <NavLink to="/profile/followers">Followers</NavLink>
          <NavLink to="/profile/followings">Followings</NavLink>
          <button>Logout</button>
        </nav>
        <Outlet context={{ viewUser, setViewUser, account, setAccount }} />
      </>
    )
  );
}

export default Profile;
