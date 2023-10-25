import { ActionArgs } from "./action_args.ts";

export async function rebyte_main({context, args}: {
  context: any;
  args: ActionArgs;
}) {
  console.log("rebyte main args", args)
  console.log("rebyte main context", context)

  return {
    args
  }
}
