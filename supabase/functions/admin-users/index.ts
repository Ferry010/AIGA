import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify caller is authenticated admin
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const anonClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace("Bearer ", "");
  const { data: claimsData, error: claimsError } =
    await anonClient.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const callerId = claimsData.claims.sub;

  // Check admin role
  const { data: isAdmin } = await anonClient.rpc("has_role", {
    _user_id: callerId,
    _role: "admin",
  });
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Service role client for admin operations
  const adminClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { action, ...params } = await req.json();

  try {
    let result;

    switch (action) {
      case "list": {
        const { data } = await adminClient.auth.admin.listUsers();
        const { data: roles } = await adminClient
          .from("user_roles")
          .select("user_id, role");
        const rolesMap: Record<string, string[]> = {};
        (roles || []).forEach((r: { user_id: string; role: string }) => {
          if (!rolesMap[r.user_id]) rolesMap[r.user_id] = [];
          rolesMap[r.user_id].push(r.role);
        });
        result = (data?.users || []).map((u) => ({
          id: u.id,
          email: u.email,
          created_at: u.created_at,
          roles: rolesMap[u.id] || [],
        }));
        break;
      }

      case "create": {
        const { email, password, full_name, role } = params;
        const { data: userData, error: createError } =
          await adminClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: full_name || "" },
          });
        if (createError) throw createError;
        if (role) {
          await adminClient
            .from("user_roles")
            .insert({ user_id: userData.user.id, role });
        }
        result = { id: userData.user.id };
        break;
      }

      case "delete": {
        const { user_id } = params;
        if (user_id === callerId) throw new Error("Cannot delete yourself");
        await adminClient.from("user_roles").delete().eq("user_id", user_id);
        const { error: delError } =
          await adminClient.auth.admin.deleteUser(user_id);
        if (delError) throw delError;
        result = { success: true };
        break;
      }

      case "set_role": {
        const { user_id, role } = params;
        await adminClient
          .from("user_roles")
          .upsert({ user_id, role }, { onConflict: "user_id,role" });
        result = { success: true };
        break;
      }

      case "remove_role": {
        const { user_id, role } = params;
        await adminClient
          .from("user_roles")
          .delete()
          .eq("user_id", user_id)
          .eq("role", role);
        result = { success: true };
        break;
      }

      default:
        throw new Error("Unknown action");
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
