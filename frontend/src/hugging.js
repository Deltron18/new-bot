


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
