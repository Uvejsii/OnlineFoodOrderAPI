import React, { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext({});

function AuthorizeView(props) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const emptyUser = { email: "" };
  const [user, setUser] = useState(emptyUser);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    const delay = 1000;

    function wait(delay) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }

    async function fetchWithRetry(url, options) {
      try {
        let response = await fetch(url, options);
        if (response.status === 200) {
          let json = await response.json();
          setUser({ email: json.email });
          setAuthorized(true);
          return response;
        } else if (response.status === 401) {
          console.log("Unauthorized");
          return response;
        } else {
          throw new Error("" + response.status);
        }
      } catch (error) {
        retryCount++;
        if (retryCount > maxRetries) {
          throw error;
        } else {
          await wait(delay);
          return fetchWithRetry(url, options);
        }
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
  } else {
    return null;
  }
}

export default AuthorizeView;
