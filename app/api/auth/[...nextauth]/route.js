import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createDirectus, rest, authentication, readMe } from "@directus/sdk";

const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL)
  .with(rest())
  .with(
    authentication("cookie", {
      credentials: "include",
    })
  );

async function refreshAccessToken(token) {
  try {
    // Call Directus to refresh the token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: token.refreshToken }),
      }
    );
    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.data.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.data.expires * 1000, // adjust if needed
      refreshToken: refreshedTokens.data.refresh_token ?? token.refreshToken, // fallback to old refresh token
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter Password",
        },
      },
      async authorize(credentials) {
        try {
          const response = await client.login(
            credentials.email,
            credentials.password
          );
          if (response.access_token) {
            const userResponse = await client.request(
              readMe({
                fields: ["id", "email", "first_name", "last_name"],
              })
            );
            console.log("User response:", userResponse);
            return {
              id: userResponse.id,
              email: userResponse.email,
              name: userResponse.first_name || userResponse.email,
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
              expires: response.expires,
            };
          }
          return null;
        } catch (error) {
          console.error("Login failed:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: { secret: process.env.JWT_SECRET, encryption: true },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign-in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expires = user.expires;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/info",
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
