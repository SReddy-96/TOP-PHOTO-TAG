import { redirect } from "react-router-dom";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      return {
        error: errorData.errors
          ? errorData.errors[0].msg
          : "Failed to start game. Please try again.",
      };
    }
    const data = await res.json();

    // Return the data or redirect
    return redirect(`/game?id=${data.id}`);
  } catch (error) {
    console.error("user error:", error);
    throw error;
  }
}
