// Substack API Service
export interface SubstackPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  likes: number;
  comments: number;
  shares: number;
  url: string;
  tags: string[];
  featuredImage?: string;
}

// Parse HTML content and extract text
const parseHtmlContent = (html: string): string => {
  // Remove HTML tags and decode entities
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

// Calculate reading time
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Extract post ID from Substack URL
const extractPostId = (url: string): string => {
  const match = url.match(/\/p\/([^\/\?]+)/);
  return match ? match[1] : 'unknown';
};

// Convert XML to JSON-like structure
const xmlToJson = (xml: string): any => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    
    const result: any = {};
    
    // Parse channel info
    const channel = xmlDoc.querySelector('channel');
    if (channel) {
      result.channel = {
        title: channel.querySelector('title')?.textContent || '',
        description: channel.querySelector('description')?.textContent || '',
        link: channel.querySelector('link')?.textContent || '',
        lastBuildDate: channel.querySelector('lastBuildDate')?.textContent || ''
      };
    }
    
    // Parse items
    const items = xmlDoc.querySelectorAll('item');
    result.items = Array.from(items).map((item, index) => {
      const getTextContent = (selector: string) => {
        const element = item.querySelector(selector);
        return element?.textContent || '';
      };
      
      const getAttribute = (selector: string, attr: string) => {
        const element = item.querySelector(selector);
        return element?.getAttribute(attr) || '';
      };
      
      return {
        id: index + 1,
        title: getTextContent('title'),
        description: getTextContent('description'),
        link: getTextContent('link'),
        guid: getTextContent('guid'),
        creator: getTextContent('dc\\:creator'),
        pubDate: getTextContent('pubDate'),
        content: getTextContent('content\\:encoded'),
        enclosure: {
          url: getAttribute('enclosure', 'url'),
          type: getAttribute('enclosure', 'type'),
          length: getAttribute('enclosure', 'length')
        }
      };
    });
    
    return result;
  } catch (error) {
    console.error('Error converting XML to JSON:', error);
    return { items: [] };
  }
};

// Parse Substack RSS feed with JSON conversion
export const parseSubstackRSS = async (rssText: string): Promise<SubstackPost[]> => {
  try {
    const jsonData = xmlToJson(rssText);
    const posts: SubstackPost[] = [];
    
    if (jsonData.items && jsonData.items.length > 0) {
      jsonData.items.forEach((item: any, index: number) => {
        
        const title = item.title || `Post ${index + 1}`;
        const link = item.link || '';
        const description = item.description || '';
        const pubDate = item.pubDate || new Date().toISOString();
        const author = item.creator || 'Alekhya';
        const content = item.content || description;
        const featuredImage = item.enclosure?.url || undefined;
        
        posts.push({
          id: extractPostId(link),
          title: title.trim(),
          content: content,
          excerpt: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
          author: author.trim(),
          publishedAt: pubDate,
          readTime: calculateReadingTime(parseHtmlContent(content)),
          likes: Math.floor(Math.random() * 100), // Random for demo
          comments: Math.floor(Math.random() * 20),
          shares: Math.floor(Math.random() * 15),
          url: link,
          tags: [], // Would need to be extracted from content
          featuredImage
        });
      });
    }

    return posts;
  } catch (error) {
    console.error('Error parsing Substack RSS:', error);
    return [];
  }
};

// Alternative: Use JSON RSS service
const fetchRSSAsJSON = async (rssUrl: string): Promise<any> => {
  try {
    // Method 1: Use rss2json.com service
    const jsonServiceUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(jsonServiceUrl);
    const jsonData = await response.json();
    
    if (jsonData.status === 'ok' && jsonData.items) {
      return jsonData;
    } else {
      return null;
    }
  } catch (error) {
    console.log('JSON RSS service error:', error);
    return null;
  }
};

// Fetch all Substack posts - SIMPLIFIED VERSION
export const fetchAllSubstackPosts = async (): Promise<SubstackPost[]> => {
  try {
    try {
      const jsonData = await fetchRSSAsJSON('https://alekhyakakunuri.substack.com/feed');
      if (jsonData && jsonData.items) {
        return convertJsonRSSToPosts(jsonData);
      }
    } catch (jsonError) {
      console.log('❌ JSON RSS service failed, trying XML method:', jsonError);
    }
    
  } catch (error) {
    console.error('❌ Error fetching all Substack posts:', error);
    return [];
  }
};

// Convert JSON RSS format to our post format
const convertJsonRSSToPosts = (jsonData: any): SubstackPost[] => {
  const posts: SubstackPost[] = [];
  
  if (jsonData.items && jsonData.items.length > 0) {
    jsonData.items.forEach((item: any, index: number) => {      
      posts.push({
        id: extractPostId(item.link),
        title: item.title || `Post ${index + 1}`,
        content: item.content || item.description || '',
        excerpt: item.description || '',
        author: item.author || 'Alekhya',
        publishedAt: item.pubDate || new Date().toISOString(),
        readTime: calculateReadingTime(parseHtmlContent(item.content || item.description || '')),
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 15),
        url: item.link || '',
        tags: [],
        featuredImage: item.thumbnail || undefined
      });
    });
  }
  
  return posts;
};

