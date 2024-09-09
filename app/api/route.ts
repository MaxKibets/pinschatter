import Ably from "ably";
import { CHANNEL_NAME } from "../room/utils/channelName";

// ensure Vercel doesn't cache the result of this route,
// as otherwise the token request data will eventually become outdated
// and we won't be able to authenticate on the client side
export const revalidate = 0;

export async function GET() {
  const client = new Ably.Rest(process.env.ABLY_API_KEY!);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: CHANNEL_NAME,
  });
  return Response.json(tokenRequestData);
}
