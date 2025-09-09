import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { createDirectus, rest, readMe, withToken} from "@directus/sdk";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL).with(
    rest()
  );

  try {
    const data = await client.request(
      withToken(
        session.accessToken,
        readMe({
          fields: ["id", "email", "first_name", "last_name", "avatar"],
        })
      )
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Directus server fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
