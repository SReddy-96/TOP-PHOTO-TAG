import { redirect } from "react-router-dom";

export async function loader() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/character`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      return {
        error: errorData.errors
          ? errorData.errors[0].msg
          : "Failed to fetch characters",
      };
    }
    const data = await res.json();

    // Return the data or redirect
    return data;
  } catch (error) {
    console.error("character fetching error:", error);
    throw error;
  }
}

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/character`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: formData.get("user_id"),
        character_id: formData.get("tagName"),
        x: formData.get("x"),
        y: formData.get("y"),
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
    if (data.status === "all found") {
      return redirect(`/scoreboard?id=${data.user_id}`);
    } else {
      return data;
    }
  } catch (error) {
    console.error("character error:", error);
    throw error;
  }
}
