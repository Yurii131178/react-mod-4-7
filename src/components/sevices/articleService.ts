import axios from 'axios';
import { Article } from '../../types/articles';

interface ArticleHttpResponse {
  hits: Article[];
}

// HTTP-функція запиту статей

export const fetchArticles = async (topic: string): Promise<Article[]> => {
  const response = await axios.get<ArticleHttpResponse>(
    `https://hn.algolia.com/api/v1/search?query=${topic}`
  );

  return response.data.hits;
};
