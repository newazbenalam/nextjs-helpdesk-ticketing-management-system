export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard =
        request.nextUrl.pathname.startsWith("/dashboard") ||
        request.nextUrl.pathname.startsWith("/admin");
      console.log(
        "isLoggedIn: " + isLoggedIn,
        "isOnDashboard: " + isOnDashboard
      );
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (
        (request.nextUrl.pathname.startsWith("/login") ||
          request.nextUrl.pathname.startsWith("/signup")) &&
        isLoggedIn
      ) {
        return Response.redirect(new URL("/dashboard", request.nextUrl.origin));
      }
      return true;
    },
  },
};
