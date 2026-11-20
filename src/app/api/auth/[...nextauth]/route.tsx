import NextAuth, { NextAuthOptions } from "next-auth";
import AuthentikProvider from "next-auth/providers/authentik";

export const authOptions: NextAuthOptions = {
  providers: [
    AuthentikProvider({
      clientId: process.env.AUTHENTIK_CLIENT_ID as string,
      clientSecret: process.env.AUTHENTIK_CLIENT_SECRET as string,
      issuer: process.env.AUTHENTIK_ISSUER as string,
      authorization: {
        params: {
          scope: "openid profile email website-scope", // website-scope holds the authentik user picture link and affiliation
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account, user }) {
      if (user) {
        console.log("AUTHENTIK USER:", user);
      }
      if (account) {
        console.log("AUTHENTIK ACCOUNT:", account);
        if (account.id_token) {
           try {
             const base64Url = account.id_token.split('.')[1];
             const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
             const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
               return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
             }).join(''));
             console.log("ID_TOKEN PAYLOAD:", JSON.parse(jsonPayload));
           } catch (e) {
             console.log("Could not decode id_token");
           }
        }
      }
      if (profile) {
        token.id = profile.sub;
        // Map all desired Authentik claims to the JWT token
        token.nickname = (profile as any).nickname;
        token.given_name = (profile as any).given_name;
        token.groups = (profile as any).groups;
        token.preferred_username = (profile as any).preferred_username;
        token.picture = (profile as any).picture || token.picture;
        token.affiliation = (profile as any).affiliation;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // Expose custom claims to the frontend session
        // @ts-ignore
        session.user.nickname = token.nickname;
        // @ts-ignore
        session.user.given_name = token.given_name;
        // @ts-ignore
        session.user.groups = token.groups;
        // @ts-ignore
        session.user.preferred_username = token.preferred_username;
        // @ts-ignore
        session.user.image = token.picture as string | null | undefined;
        // @ts-ignore
        session.user.affiliation = token.affiliation;
      }
      return session;
    },
  },
  pages: {
    // signIn: '/login',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
