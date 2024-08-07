import React, { useEffect } from "react";
import { Person } from "react-bootstrap-icons";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userLogout, setLoading } from "../features/users/usersSlice";

function AuthorizeView(props) {
  const dispatch = useDispatch();
  const { user, status, authorized } = useSelector((state) => state.users);

  useEffect(() => {
    async function fetchWithRetry(url, options) {
      dispatch(setLoading(true));
      try {
        let response = await fetch(url, options);
        if (response.status === 200) {
          let json = await response.json();
          dispatch(setUser({ email: json.email, roles: json.roles }));
        } else if (response.status === 401) {
          dispatch(userLogout());
        } else {
          throw new Error("" + response.status);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    }

    if (!authorized) {
      fetchWithRetry("http://localhost:5071/pingauth", {
        method: "GET",
        credentials: "include",
      }).catch((error) => {
        console.log(error.message);
      });
    }
  }, [dispatch, authorized]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (authorized) {
    const isAdmin = user?.roles?.includes("Admin");
    if (props.requiredRole === "Admin" && !isAdmin) {
      return <Navigate to="/" />;
    }
    return <>{props.children}</>;
  } else {
    if (props.requiredRole) {
      return (
        <Link to="/login" className="text-light">
          <Person className="fs-3" />
        </Link>
      );
    }
    return <>{props.children}</>;
  }
}

export function AuthorizedUser(props) {
  const { user } = useSelector((state) => state.users);

  if (props.value === "email") {
    return <>{user?.email}</>;
  } else if (props.value === "roles") {
    return <>{user?.roles?.join(", ")}</>;
  } else {
    return null;
  }
}

export default AuthorizeView;
