import { Database } from "https://deno.land/x/sqlite3@0.6.1/mod.ts";
import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

function handler(_req: Request) {
	const t = performance.now();
	const db = new Database(new URL("./db/file.db", import.meta.url), { readonly: true, memory: true });
	const statement = db.prepare("SELECT * FROM dict LIMIT 100");
	const items = [];

	for (const row of statement) {
		items.push(row);
	}

	db.close();
	return new Response(
		JSON.stringify({
			elapsedMs: performance.now() - t,
      items,

		}),
		{
			headers: {
				"content-type": "application/json",
			},
		}
	);
}

serve(handler);
