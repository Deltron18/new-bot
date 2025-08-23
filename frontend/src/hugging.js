// import { prevUser } from "./context/Usercontext";

//  export async function query() {
// 	const response = await fetch(
// 		  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
// 		{
// 			headers: {
// 				        Authorization: `Bearer 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`,

// 				"Content-Type": "application/json",
// 			},
// 			method: "POST",
// 			body: JSON.stringify({ inputs: prevUser.prompt }),
// 		}
// 	);
// 	const result = await response.blob();
// 	return result;
// }


// hugging.js
export async function query(prompt) {
  const response = await fetch("http://localhost:5000/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Image generation failed");
  }

  const blob = await response.blob();
  return blob; // 👈 frontend turns it into an image URL
}
