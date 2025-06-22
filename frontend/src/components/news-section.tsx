import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import ArticleMedia from "@/components/article-media";
import { useLocale } from "@/contexts/LocaleContext";
import { getQueryFn } from "@/lib/queryClient";

export default function NewsSection() {
  const { t, locale } = useLocale();
  const { data: news, isLoading } = useQuery({
    queryKey: ["/api/news"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
  });

  if (isLoading) {
    return (
      <section id="news" className="py-20 bg-samurai-black relative">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-20 bg-samurai-black relative">
      <div className="texture-overlay absolute inset-0 opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl samurai-heading text-white mb-6">
            {t('news.title')} <span className="text-samurai-gold">{t('news.titleHighlight')}</span>
          </h2>
          <div className="katana-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('news.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news && (news as any[]).length > 0 ? (
            (news as any[]).slice(0, 3).map((article: any) => (
              <Card key={article.id} className="samurai-card overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                {article.imageUrl ? (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-48 object-cover" 
                  />
                ) : article.mediaUrls && article.mediaUrls.length > 0 ? (
                  <div className="w-full h-48">
                    <ArticleMedia 
                      mediaUrls={article.mediaUrls.slice(0, 1)} 
                      mediaTypes={article.mediaTypes?.slice(0, 1)} 
                      className="h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400">{t('news.noImage')}</span>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center text-samurai-gold text-sm mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(article.createdAt).toLocaleDateString(locale === 'es' ? 'es-PE' : 'en-US')}</span>
                  </div>
                  <h3 className="text-xl samurai-heading font-bold mb-3 text-white">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {article.excerpt || article.content.substring(0, 150) + "..."}
                  </p>
                  
                  {/* Show media count if available */}
                  {article.mediaUrls && article.mediaUrls.length > 0 && (
                    <div className="mb-4">
                      <ArticleMedia 
                        mediaUrls={article.mediaUrls} 
                        mediaTypes={article.mediaTypes} 
                        className="mb-2"
                      />
                    </div>
                  )}
                  
                  <button className="text-samurai-gold hover:text-white transition-colors duration-300 font-semibold">
                    {t('news.readMore')} <ArrowRight className="inline ml-2 w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              <p>{t('news.noArticles')}</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button className="samurai-button-outline">
            {t('news.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
}
