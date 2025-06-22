// Mock data for development/testing
export const MOCK_ENABLED = process.env.NODE_ENV === 'development' && process.env.VITE_ENABLE_MOCKS === 'true';

// Mock data types
export interface MockNewsArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'published';
  imageUrl?: string;
  mediaUrls?: string[];
  mediaTypes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MockAdminStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
  recentActivity: Array<{
    id: number;
    action: string;
    timestamp: string;
    articleTitle?: string;
  }>;
}

// Mock data
export const mockNews: MockNewsArticle[] = [
  {
    id: 1,
    title: "New Samurai Training Techniques Discovered",
    content: "Ancient scrolls have revealed previously unknown samurai training methods that combine traditional techniques with modern understanding of human physiology. These techniques, dating back to the Edo period, show remarkable sophistication in their approach to physical conditioning and mental discipline. The discovery was made in a remote temple in the mountains of Japan, where monks have preserved these teachings for generations. Researchers believe these methods could revolutionize modern martial arts training and provide new insights into the legendary abilities of historical samurai warriors.",
    excerpt: "Ancient scrolls reveal sophisticated training methods that could revolutionize modern martial arts.",
    category: "Training",
    status: "published",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    mediaUrls: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    ],
    mediaTypes: ["image", "image"],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "The Art of Katana Maintenance",
    content: "Proper katana maintenance is crucial for preserving both the weapon's functionality and its historical value. This comprehensive guide covers everything from daily cleaning routines to seasonal maintenance procedures. Learn about the traditional methods used by master swordsmiths and how to apply them to your own blade. We'll explore the importance of proper storage conditions, the right cleaning materials, and the techniques for maintaining the blade's edge and polish. Whether you're a collector or a practitioner, this knowledge is essential for anyone who owns a katana.",
    excerpt: "Essential techniques for maintaining your katana's edge and preserving its beauty for generations.",
    category: "Equipment",
    status: "published",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:20:00Z"
  },
  {
    id: 3,
    title: "Bushido: The Way of the Warrior",
    content: "Bushido, the samurai code of conduct, represents one of the most sophisticated ethical systems ever developed. This article explores the seven virtues of Bushido: rectitude, courage, benevolence, respect, honesty, honor, and loyalty. We examine how these principles were applied in daily life and how they continue to influence modern Japanese culture and business practices. The article also discusses the historical development of Bushido and its evolution from a practical warrior code to a comprehensive philosophy of life.",
    excerpt: "Exploring the seven virtues of Bushido and their relevance in modern times.",
    category: "Philosophy",
    status: "published",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    mediaUrls: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop"
    ],
    mediaTypes: ["image", "image"],
    createdAt: "2024-01-05T09:15:00Z",
    updatedAt: "2024-01-05T09:15:00Z"
  },
  {
    id: 4,
    title: "Advanced Iaido Techniques",
    content: "Iaido, the art of drawing the sword, requires years of dedicated practice to master. This article presents advanced techniques that build upon fundamental principles. We cover complex drawing sequences, multiple opponent scenarios, and the mental discipline required for effective iaido practice. Each technique is explained with detailed step-by-step instructions and accompanied by insights into the historical context and practical applications. Whether you're an intermediate practitioner or an advanced student, these techniques will challenge and improve your skills.",
    excerpt: "Master advanced iaido techniques with detailed instructions and historical context.",
    category: "Training",
    status: "draft",
    createdAt: "2024-01-20T16:45:00Z",
    updatedAt: "2024-01-20T16:45:00Z"
  },
  {
    id: 5,
    title: "The History of Samurai Armor",
    content: "Samurai armor evolved over centuries, reflecting changes in warfare, technology, and social status. This comprehensive history traces the development from early lamellar armor to the sophisticated yoroi of the late medieval period. We examine the materials used, construction techniques, and the symbolic significance of different armor components. The article also explores how armor was maintained, stored, and passed down through generations. Richly illustrated with historical examples and modern reproductions.",
    excerpt: "A comprehensive history of samurai armor from its origins to its peak development.",
    category: "History",
    status: "published",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    createdAt: "2024-01-12T11:30:00Z",
    updatedAt: "2024-01-12T11:30:00Z"
  }
];

export const mockAdminStats: MockAdminStats = {
  totalArticles: 15,
  publishedArticles: 12,
  draftArticles: 3,
  totalViews: 2847,
  recentActivity: [
    {
      id: 1,
      action: "Article published",
      timestamp: "2024-01-20T14:30:00Z",
      articleTitle: "Advanced Iaido Techniques"
    },
    {
      id: 2,
      action: "Article created",
      timestamp: "2024-01-19T10:15:00Z",
      articleTitle: "The History of Samurai Armor"
    },
    {
      id: 3,
      action: "Article deleted",
      timestamp: "2024-01-18T16:45:00Z",
      articleTitle: "Outdated Training Methods"
    },
    {
      id: 4,
      action: "Article published",
      timestamp: "2024-01-17T09:20:00Z",
      articleTitle: "Bushido: The Way of the Warrior"
    }
  ]
};

// Mock API responses
export const mockApiResponses = {
  "/api/news": mockNews.filter(article => article.status === "published"),
  "/api/admin/news": mockNews,
  "/api/admin/stats": mockAdminStats,
  "/api/user/profile": {
    id: 1,
    username: "admin_user",
    email: "admin@academia-samurai.com",
    isAdmin: true,
    createdAt: "2024-01-01T00:00:00Z"
  }
};

// Mock delay function to simulate network latency
export const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API handler
export async function handleMockRequest(url: string, method: string = 'GET', data?: unknown) {
  await mockDelay();
  
  const path = url.replace(/^https?:\/\/[^\/]+/, '');
  
  switch (method) {
    case 'GET':
      if (path === '/api/news') {
        return mockApiResponses['/api/news'];
      }
      if (path === '/api/admin/news') {
        return mockApiResponses['/api/admin/news'];
      }
      if (path === '/api/admin/stats') {
        return mockApiResponses['/api/admin/stats'];
      }
      if (path === '/api/user/profile') {
        return mockApiResponses['/api/user/profile'];
      }
      break;
      
    case 'POST':
      if (path === '/api/admin/news') {
        const newArticle = {
          id: Math.max(...mockNews.map(n => n.id)) + 1,
          ...(data as Partial<MockNewsArticle>),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockNews.push(newArticle as MockNewsArticle);
        return { message: 'Article created successfully' };
      }
      break;
      
    case 'PATCH':
      if (path.match(/^\/api\/admin\/news\/\d+$/)) {
        const id = parseInt(path.split('/').pop()!);
        const articleIndex = mockNews.findIndex(n => n.id === id);
        if (articleIndex !== -1) {
          mockNews[articleIndex] = { ...mockNews[articleIndex], ...(data as Partial<MockNewsArticle>) };
          return { message: 'Article updated successfully' };
        }
      }
      break;
      
    case 'DELETE':
      if (path.match(/^\/api\/admin\/news\/\d+$/)) {
        const id = parseInt(path.split('/').pop()!);
        const articleIndex = mockNews.findIndex(n => n.id === id);
        if (articleIndex !== -1) {
          mockNews.splice(articleIndex, 1);
          return { message: 'Article deleted successfully' };
        }
      }
      break;
  }
  
  throw new Error(`404: Mock endpoint not found: ${method} ${path}`);
}

// Mock fetch function
export const mockFetch = async (url: string, options: RequestInit = {}) => {
  if (!MOCK_ENABLED) {
    throw new Error('Mocks are not enabled');
  }
  
  try {
    const data = await handleMockRequest(url, options.method, options.body ? JSON.parse(options.body as string) : undefined);
    
    return {
      ok: true,
      status: 200,
      json: async () => data,
      text: async () => JSON.stringify(data),
    } as Response;
  } catch (error) {
    return {
      ok: false,
      status: 404,
      json: async () => ({ message: (error as Error).message }),
      text: async () => (error as Error).message,
    } as Response;
  }
}; 