// /pages/api/signatureCheck.ts
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export default async function handler(
  req,
  res
) {
  try {
    const body = req.body;
    const valid = await publicClient.verifyMessage({
      address: body.address,
      message: "test message for WTF-DApp demo",
      signature: body.signature,
    });
    res.status(200).json({ data: valid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}