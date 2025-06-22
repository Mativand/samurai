import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest, getQueryFn } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/header";
import MediaManager from "@/components/media-manager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Save, Eye, Image, Video } from "lucide-react";

export default function Admin() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "General News",
    status: "draft",
    imageUrl: "",
    mediaUrls: [] as string[],
    mediaTypes: [] as string[],
  });
  
  const [mediaItems, setMediaItems] = useState<Array<{ url: string; type: 'image' | 'video' }>>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: adminNews, isLoading: newsLoading } = useQuery({
    queryKey: ["/api/admin/news"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
  });

  const { data: adminStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
  });

  const createNewsMutation = useMutation({
    mutationFn: async (newsData: unknown) => {
      await apiRequest("POST", "/api/admin/news", newsData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "News article created successfully!",
      });
      setNewArticle({
        title: "",
        content: "",
        excerpt: "",
        category: "General News",
        status: "draft",
        imageUrl: "",
        mediaUrls: [],
        mediaTypes: [],
      });
      setMediaItems([]);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create news article",
        variant: "destructive",
      });
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: async (newsId: number) => {
      await apiRequest("DELETE", `/api/admin/news/${newsId}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "News article deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete news article",
        variant: "destructive",
      });
    },
  });

  const publishNewsMutation = useMutation({
    mutationFn: async (newsId: number) => {
      await apiRequest("PATCH", `/api/admin/news/${newsId}`, { status: "published" });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "News article published successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to publish news article",
        variant: "destructive",
      });
    },
  });

  if (isLoading || newsLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-samurai-deep flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!(user as any)?.isAdmin) {
    return (
      <div className="min-h-screen bg-samurai-deep flex items-center justify-center">
        <Card className="samurai-card p-6">
          <CardContent className="text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h1>
            <p className="text-gray-300">You do not have admin privileges.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCreateNews = () => {
    if (!newArticle.title || !newArticle.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    const excerpt = newArticle.excerpt || newArticle.content.substring(0, 150) + "...";
    const mediaUrls = mediaItems.map(item => item.url);
    const mediaTypes = mediaItems.map(item => item.type);
    
    createNewsMutation.mutate({ 
      ...newArticle, 
      excerpt,
      mediaUrls,
      mediaTypes
    });
  };

  const handlePublishNews = (status: string) => {
    const updatedArticle = { ...newArticle, status };
    if (!updatedArticle.title || !updatedArticle.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    const excerpt = updatedArticle.excerpt || updatedArticle.content.substring(0, 150) + "...";
    const mediaUrls = mediaItems.map(item => item.url);
    const mediaTypes = mediaItems.map(item => item.type);
    
    createNewsMutation.mutate({ 
      ...updatedArticle, 
      excerpt,
      mediaUrls,
      mediaTypes
    });
  };

  return (
    <div className="min-h-screen bg-samurai-deep text-white">
      <Header />
      
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl samurai-heading text-white mb-6">
            ADMIN <span className="text-samurai-gold">PANEL</span>
          </h1>
          <div className="katana-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Command center for platform management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Admin Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="samurai-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-xl samurai-heading text-samurai-gold">TOTAL NEWS</CardTitle>
                  <Edit className="text-samurai-gold text-2xl" />
                </div>
                <div className="text-3xl font-bold text-white">
                  {(adminStats as any)?.totalNews || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="samurai-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-xl samurai-heading text-samurai-gold">SPONSORS</CardTitle>
                  <Eye className="text-samurai-gold text-2xl" />
                </div>
                <div className="text-3xl font-bold text-white">
                  {(adminStats as any)?.totalSponsors || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="samurai-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-xl samurai-heading text-samurai-gold">DONATIONS</CardTitle>
                  <Save className="text-samurai-gold text-2xl" />
                </div>
                <div className="text-3xl font-bold text-white">
                  ${(adminStats as any)?.totalDonations || "0.00"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* News Management */}
          <div className="lg:col-span-2">
            <Card className="samurai-card h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl samurai-heading text-samurai-gold">NEWS MANAGEMENT</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {(adminNews as any[])?.map((news: any) => (
                    <div key={news.id} className="bg-samurai-dark p-4 angular-cut border border-samurai-border">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">{news.title}</h4>
                          <p className="text-gray-400 text-sm">
                            {new Date(news.createdAt).toLocaleDateString()}
                          </p>
                          <Badge 
                            variant={news.status === "published" ? "default" : "secondary"}
                            className="mt-2"
                          >
                            {news.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          {news.status === "draft" && (
                            <Button
                              size="sm"
                              onClick={() => publishNewsMutation.mutate(news.id)}
                              className="text-green-400 hover:text-green-300 bg-transparent p-1"
                              disabled={publishNewsMutation.isPending}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => deleteNewsMutation.mutate(news.id)}
                            className="text-red-400 hover:text-red-300 bg-transparent p-1"
                            disabled={deleteNewsMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add News Form */}
        <Card className="samurai-card">
          <CardHeader>
            <CardTitle className="text-2xl samurai-heading text-samurai-gold">ADD NEW ARTICLE</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Article Title *</label>
                <Input
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  className="samurai-input"
                  placeholder="Enter article title"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Category</label>
                <Select value={newArticle.category} onValueChange={(value: string) => setNewArticle({ ...newArticle, category: value })}>
                  <SelectTrigger className="samurai-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General News">General News</SelectItem>
                    <SelectItem value="Training Updates">Training Updates</SelectItem>
                    <SelectItem value="Sponsor Spotlight">Sponsor Spotlight</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Excerpt (Optional)</label>
              <Textarea
                value={newArticle.excerpt}
                onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                className="samurai-input resize-none"
                rows={3}
                placeholder="Brief excerpt for article preview..."
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Featured Image URL (Optional)</label>
              <Input
                value={newArticle.imageUrl}
                onChange={(e) => setNewArticle({ ...newArticle, imageUrl: e.target.value })}
                className="samurai-input"
                placeholder="https://example.com/featured-image.jpg"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Article Content *</label>
              <Textarea
                value={newArticle.content}
                onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                className="samurai-input resize-none"
                rows={8}
                placeholder="Write your article content here..."
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                <Image className="w-4 h-4" />
                <Video className="w-4 h-4" />
                Photos & Videos
              </label>
              <MediaManager
                mediaItems={mediaItems}
                onMediaChange={setMediaItems}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={handleCreateNews}
                disabled={createNewsMutation.isPending}
                className="samurai-button-outline"
              >
                <Save className="w-4 h-4 mr-2" />
                SAVE DRAFT
              </Button>
              <Button
                onClick={() => handlePublishNews("published")}
                disabled={createNewsMutation.isPending}
                className="samurai-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                PUBLISH NOW
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
