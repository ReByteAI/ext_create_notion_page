import { ActionArgs } from "./action_args.ts";
import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";

export async function rebyte_main({ context, args }: {
  context: any;
  args: ActionArgs;
}) {
  console.log("rebyte main args", args)
  console.log("rebyte main context", context)

  const notion = new Client({
    auth: args.notion_api_key,
  })

  try {
    const pageObj = {
      cover: args.cover,
      icon: args.icon,
      parent: args.parent,
      properties: args.properties,
    }
    console.log("create notion page, pageObj:", pageObj)
    const response = await notion.pages.create(pageObj)
    if (response?.id) {
      console.log("create notion page success, page_id:", response.id)
      return {
        args,
        page_id: response.id,
      }
    } else {
      console.log("create notion page failed", response)
      return {
        args
      }
    }
  } catch (e) {
    console.error("create notion page error", e)
    return { args }
  }
}
