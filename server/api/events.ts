export default defineEventHandler(async ({ context }) => {
  if (!("cloudflare" in context)) return { error: "No CF context" };
  if (!("KVTICKERDATA" in context.cloudflare.env))
    return { error: "No binding" };

  const KVTICKERDATA = context.cloudflare.env.KVTICKERDATA;
  const eventData = await KVTICKERDATA.get("current-events");

  return eventData == null ? {} : JSON.parse(eventData);
});
