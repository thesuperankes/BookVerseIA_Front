const API_BASE_URL = "http://localhost:8000/api";

const aiService = {
  generateStory: async (storyParams) => {
    const response = await fetch(`${API_BASE_URL}/story/introduction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storyParams),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error generando la historia");
    }

    return await response.json();
  },
};

export default aiService;
