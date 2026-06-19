export async function loader() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/scoreboard`, {
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
          : "Failed to fetch scores",
      };
    }
    const data = await res.json();

    // Return the data or redirect
    return data;
  } catch (error) {
    console.error("scoreboard fetching error:", error);
    throw error;
  }
}