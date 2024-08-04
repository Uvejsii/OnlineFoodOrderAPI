import React, { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext({});

function AuthorizeView(props) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ email: "", roles: [] });

  useEffect(() => {
    async function fetchWithRetry(url, options) {
      try {
        let response = await fetch(url, options);
        if (response.status === 200) {
          let json = await response.json();
          setUser({ email: json.email, roles: json.roles });
          setAuthorized(true);
          return response;
        } else if (response.status === 401) {
          console.log("Unauthorized");
          return response;
        } else {
          throw new Error("" + response.status);
        }
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    }

    fetchWithRetry("http://localhost:5071/pingauth", {
      method: "GET",
      credentials: "include",
    })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    if (authorized && !loading) {
      const isAdmin = user.roles.includes("Admin");
      if (props.requiredRole === "Admin" && !isAdmin) {
        return <Navigate to="/" />;
      }

      return (
        <UserContext.Provider value={user}>
          {props.children}
        </UserContext.Provider>
      );
    } else {
      return <Navigate to="/login" />;
    }
  }
}

export function AuthorizedUser(props) {
  const user = React.useContext(UserContext);

  if (props.value === "email") {
    return <>{user.email}</>;
  } else if (props.value === "roles") {
    return <>{user.roles.join(", ")}</>;
  } else {
    return null;
  }
}

export default AuthorizeView;
