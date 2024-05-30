import React, { useState, useEffect } from 'react';
import { logOut } from '@/app/(core)/lib/actions';

function useLogout() {
  const [isLoggedOut, setIsLoggedOut] = useState(logOut);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        setIsLoggedOut(); // Set isLoggedOut to true if the logout was successful
        return new Response(null, {
          status: 302,
          headers: {
            Location: new URL("/login", request.nextUrl.origin).toString(),
          },
        });
      } catch (error) {
        setIsLoggedOut(); // Set isLoggedOut to false if the logout was unsuccessful
        console.error(error); // Log any errors to the console
        }
    };

    handleLogout();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return { error }; // Return the logout status and any error
}

export default useLogout;