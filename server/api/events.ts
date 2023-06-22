export default defineEventHandler(async ({ context }) => {
  if (!("cloudflare" in context)) throw createError("No CF context");
  if (!("KVTICKERDATA" in context.cloudflare.env))
    throw createError("No CF binding");

  const KVTICKERDATA = context.cloudflare.env.KVTICKERDATA;
  return await KVTICKERDATA.get("current-events");
});
