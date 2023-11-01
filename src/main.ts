import { ActionArgs } from "./action_args.ts";
import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";

export async function rebyte_main({ context, args }: {
  context: any;
  args: ActionArgs;
}) {
  console.log("rebyte main args", args)
  console.log("rebyte main context", context)


  try {
    if (!args.notion_api_key) {
      throw new Error("notion_api_key is required")
    }
    if (!args.parent) {
      throw new Error("parent is required")
    }
    if (!args.properties) {
      throw new Error("properties is required")
    }
    const notion = new Client({
      auth: args.notion_api_key,
    });
    const pageObj = {
      parent: JSON.parse(args.parent),
      properties: JSON.parse(args.properties),
      children: args.children ? JSON.parse(args.children) : undefined,
      icon: args.icon ? JSON.parse(args.icon) : undefined,
      cover: args.cover ? JSON.parse(args.cover) : undefined,
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
    console.error("create notion page error:", e?.message)
    console.error(e)
    return { args }
  }
}

// rebyte_main({
//   context: null, args: {
//     notion_api_key: "secret_Y1iSqdbzZpX5vfCxNTs0DF5lwFFy7fM07OeX51ZXE77",
//     parent: JSON.stringify({
//       type: "page_id",
//       page_id: "8417a19b1b85447f939523414c068fc2",
//     }),
//     properties: JSON.stringify({
//       title: [
//         {
//           type: "text",
//           text: {
//             content: "Tuscan kale"
//           }
//         }
//       ]
//     }),
//     children: JSON.stringify([
//       {
//         object: "block",
//         heading_2: {
//           rich_text: [
//             {
//               text: {
//                 content: "Lacinato kale"
//               }
//             }
//           ]
//         }
//       }
//     ]),
//     cover: JSON.stringify({
//       type: "external",
//       external: {
//         url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg"
//       }
//     }),
//     icon: JSON.stringify({
//       type: "emoji",
//       emoji: "🥬"
//     })
//   }
// })
