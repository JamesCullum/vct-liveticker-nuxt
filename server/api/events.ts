export default defineEventHandler(async ({ context }) => {
  if (!("cloudflare" in context)) throw createError("No CF context");
  if (!("KVTICKERDATA" in context.cloudflare.env))
    throw createError("No CF binding");

  const data = await context.cloudflare.env.KVTICKERDATA.get("current-events");

  return data ?? {};
});
