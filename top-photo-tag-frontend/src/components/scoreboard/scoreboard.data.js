export async function loader({ request }) {
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

    // get user_id from params
    const url = new URL(request.url);
    const userId = url.searchParams.get("id");
    const current_user = data.find((user) => user.id === parseInt(userId));

    // Return the data or redirect
    return { scoreboard: data, current_user: current_user };
  } catch (error) {
    console.error("scoreboard fetching error:", error);
    throw error;
  }
}
