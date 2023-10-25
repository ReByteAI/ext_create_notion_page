// src/main.ts
async function rebyte_main({ context, args }) {
  console.log("rebyte main args", args);
  console.log("rebyte main context", context);
  try {
    const response = await fetch(`https://api.openai.com/v1/images/generations`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${args.openaiAPIKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: args.prompt,
        n: args.n,
        size: args.size,
        response_format: "url"
      })
    });
    if (response.ok) {
      const res = await response.json();
      return {
        images: res.data
      };
    } else {
      console.error(`Failed to generae image: ${response.statusText}`);
      throw `Failed to generae image: ${response.statusText}`;
    }
  } catch (err) {
    console.log("error:", err);
  }
  return {
    context,
    args,
    images: []
  };
}
export {
  rebyte_main
};
