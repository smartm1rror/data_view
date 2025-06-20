export type PageData = {
  level: string;
  text: string;
  mindset: string;
};

export const getPageData = async (slug: string): Promise<PageData> => {
  // slug에 따라 다르게 반환 가능
  return {
    level: "Beginner",
    text: "Hello, world!",
    mindset: "Positive",
  };
};
