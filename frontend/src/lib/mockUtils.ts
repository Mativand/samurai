import { mockNews, mockAdminStats, type MockNewsArticle } from './mocks';

// Utility functions for managing mock data during development

export const mockUtils = {
  // Get all mock articles
  getAllArticles: () => [...mockNews],
  
  // Get published articles only
  getPublishedArticles: () => mockNews.filter(article => article.status === 'published'),
  
  // Get draft articles only
  getDraftArticles: () => mockNews.filter(article => article.status === 'draft'),
  
  // Get articles by category
  getArticlesByCategory: (category: string) => 
    mockNews.filter(article => article.category === category),
  
  // Get article by ID
  getArticleById: (id: number) => mockNews.find(article => article.id === id),
  
  // Add a new mock article
  addMockArticle: (article: Omit<MockNewsArticle, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newArticle: MockNewsArticle = {
      ...article,
      id: Math.max(...mockNews.map(n => n.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockNews.push(newArticle);
    return newArticle;
  },
  
  // Update mock article
  updateMockArticle: (id: number, updates: Partial<MockNewsArticle>) => {
    const index = mockNews.findIndex(article => article.id === id);
    if (index !== -1) {
      mockNews[index] = { 
        ...mockNews[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      return mockNews[index];
    }
    return null;
  },
  
  // Delete mock article
  deleteMockArticle: (id: number) => {
    const index = mockNews.findIndex(article => article.id === id);
    if (index !== -1) {
      return mockNews.splice(index, 1)[0];
    }
    return null;
  },
  
  // Reset mock data to original state
  resetMockData: () => {
    // This would require re-importing the original mock data
    // For now, just clear and re-add the original articles
    mockNews.length = 0;
    mockNews.push(
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
    );
  },
  
  // Get mock statistics
  getStats: () => ({ ...mockAdminStats }),
  
  // Update mock statistics
  updateStats: (updates: Partial<typeof mockAdminStats>) => {
    Object.assign(mockAdminStats, updates);
    return mockAdminStats;
  },
  
  // Generate sample article for testing
  generateSampleArticle: (overrides: Partial<MockNewsArticle> = {}): MockNewsArticle => ({
    id: Math.max(...mockNews.map(n => n.id)) + 1,
    title: "Sample Article",
    content: "This is a sample article content for testing purposes.",
    excerpt: "Sample excerpt for testing.",
    category: "General",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }),
};

// Console helpers for development
if (process.env.NODE_ENV === 'development') {
  (window as any).mockUtils = mockUtils;
  console.log('Mock utilities available at window.mockUtils');
  console.log('Available methods:', Object.keys(mockUtils));
} 