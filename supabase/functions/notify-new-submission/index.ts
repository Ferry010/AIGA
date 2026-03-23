import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/slack/api";
const SLACK_CHANNEL_NAME = "aiga-requests";
const NOTIFICATION_EMAIL = "robbert@speakersacademy.nl";

async function findChannelId(
  channelName: string,
  lovableKey: string,
  slackKey: string
): Promise<string | null> {
  let cursor = "";
  do {
    const url = `${GATEWAY_URL}/conversations.list?types=public_channel&limit=200${cursor ? `&cursor=${cursor}` : ""}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": slackKey,
      },
    });
    const data = await res.json();
    if (!data.ok) {
      console.error("Slack conversations.list error:", data.error);
      return null;
    }
    const found = data.channels?.find(
      (c: { name: string }) => c.name === channelName
    );
    if (found) return found.id;
    cursor = data.response_metadata?.next_cursor || "";
  } while (cursor);
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, naam, organisatie, email, telefoon, extra } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const SLACK_API_KEY = Deno.env.get("SLACK_API_KEY");
    if (!SLACK_API_KEY) throw new Error("SLACK_API_KEY is not configured");

    const datum = new Date().toLocaleString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Build Slack message
    const typeLabels: Record<string, string> = {
      contact: "📬 Contact",
      masterclass: "🎓 Masterclass",
      risicoscan: "📊 Risicoscan",
    };
    const label = typeLabels[type] || type;

    let slackText = `*Nieuwe ${label} aanvraag*\n\n`;
    slackText += `*Naam:* ${naam}\n`;
    slackText += `*Organisatie:* ${organisatie}\n`;
    slackText += `*E-mail:* ${email}\n`;
    if (telefoon) slackText += `*Telefoon:* ${telefoon}\n`;
    if (extra) slackText += `*Details:* ${extra}\n`;
    slackText += `*Datum:* ${datum}`;

    // Find channel
    const channelId = await findChannelId(
      SLACK_CHANNEL_NAME,
      LOVABLE_API_KEY,
      SLACK_API_KEY
    );

    if (channelId) {
      const slackRes = await fetch(`${GATEWAY_URL}/chat.postMessage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": SLACK_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: channelId,
          text: slackText,
          username: "AIGA Formulieren",
          icon_emoji: ":incoming_envelope:",
        }),
      });
      const slackData = await slackRes.json();
      if (!slackData.ok) {
        console.error("Slack postMessage error:", slackData.error);
      }
    } else {
      console.error(
        `Slack channel #${SLACK_CHANNEL_NAME} not found. Message not sent.`
      );
    }

    // Email notification via Supabase (if transactional email is set up later, this is a placeholder)
    // For now we log the email intent
    console.log(
      `Email notification would be sent to ${NOTIFICATION_EMAIL} for ${type} from ${naam} (${email})`
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in notify-new-submission:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
