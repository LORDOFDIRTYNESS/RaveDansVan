const STORYBLOK_BASE_URL = "https://api.storyblok.com/v2/cdn";

const getToken = () => import.meta.env.VITE_STORYBLOK_TOKEN;
const getVersion = () => import.meta.env.VITE_STORYBLOK_VERSION || "published";

export const fetchStory = async (slug, options = {}) => {
  const token = getToken();
  if (!token) {
    throw new Error("Missing VITE_STORYBLOK_TOKEN");
  }

  const params = new URLSearchParams({
    token,
    version: options.version || getVersion(),
  });

  const response = await fetch(`${STORYBLOK_BASE_URL}/stories/${slug}?${params}`);
  if (!response.ok) {
    throw new Error(`Storyblok request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.story;
};
