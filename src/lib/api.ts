import axios from "axios";

interface ScrapedUseCase {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  aiTypes: string[];
  image: string;
  source: string;
}

// HackerNews API to get latest AI-related stories
export const fetchHNStories = async (): Promise<ScrapedUseCase[]> => {
  const response = await axios.get(
    "https://hn.algolia.com/api/v1/search_by_date?query=artificial%20intelligence&tags=story",
  );
  return response.data.hits.slice(0, 6).map((hit: any, index: number) => ({
    id: index + 1,
    title: hit.title,
    description: hit.story_text || "No description available",
    source: "news.ycombinator.com",
    techStack: ["AI", "Machine Learning"], // Default tech stack
    aiTypes: ["General AI"], // Default AI type
    image: `https://source.unsplash.com/featured/?technology,${encodeURIComponent(hit.title)}`,
  }));
};

// Reddit API to get latest AI posts
export const fetchRedditPosts = async (): Promise<ScrapedUseCase[]> => {
  const response = await axios.get(
    "https://www.reddit.com/r/artificial/hot.json",
  );
  return response.data.data.children
    .slice(0, 6)
    .map((post: any, index: number) => ({
      id: index + 1,
      title: post.data.title,
      description: post.data.selftext || "No description available",
      source: "reddit.com/r/artificial",
      techStack: ["AI", "Machine Learning"], // Default tech stack
      aiTypes: ["General AI"], // Default AI type
      image:
        post.data.thumbnail && post.data.thumbnail.startsWith("http")
          ? post.data.thumbnail
          : `https://source.unsplash.com/featured/?technology,${encodeURIComponent(post.data.title)}`,
    }));
};

// Combine multiple sources
export const fetchLatestAIUseCases = async (): Promise<ScrapedUseCase[]> => {
  try {
    // Try HackerNews first
    const stories = await fetchHNStories();
    if (stories.length > 0) return stories;

    // If HN fails, try Reddit
    const posts = await fetchRedditPosts();
    if (posts.length > 0) return posts;

    throw new Error("No data sources available");
  } catch (error) {
    console.error("Error fetching AI use cases:", error);
    throw error;
  }
};
