import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, Video, Play, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ArticleMediaProps {
  mediaUrls?: string[];
  mediaTypes?: string[];
  className?: string;
}

export default function ArticleMedia({ mediaUrls = [], mediaTypes = [], className = "" }: ArticleMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: string } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!mediaUrls.length || !mediaTypes.length) {
    return null;
  }

  const mediaItems = mediaUrls.map((url, index) => ({
    url,
    type: mediaTypes[index] || 'image',
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setSelectedMedia(mediaItems[index]);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const nextMedia = () => {
    const nextIndex = (currentIndex + 1) % mediaItems.length;
    setCurrentIndex(nextIndex);
    setSelectedMedia(mediaItems[nextIndex]);
  };

  const prevMedia = () => {
    const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    setCurrentIndex(prevIndex);
    setSelectedMedia(mediaItems[prevIndex]);
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const isVimeoUrl = (url: string) => {
    return url.includes('vimeo.com');
  };

  const getVimeoVideoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  return (
    <>
      <div className={`grid gap-4 ${className}`}>
        {mediaItems.length <= 3 ? (
          <div className={`grid ${mediaItems.length === 1 ? 'grid-cols-1' : mediaItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
            {mediaItems.map((item, index) => (
              <MediaItem
                key={index}
                item={item}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems.map((item, index) => (
              <MediaItem
                key={index}
                item={item}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white border-0"
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Navigation Buttons */}
            {mediaItems.length > 1 && (
              <>
                <Button
                  onClick={prevMedia}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white border-0"
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={nextMedia}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white border-0"
                  size="sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Media Content */}
            <div className="w-full h-full flex items-center justify-center">
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.url}
                  alt="Full size media"
                  className="max-w-full max-h-full object-contain"
                />
              ) : selectedMedia.type === 'video' ? (
                isYouTubeUrl(selectedMedia.url) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedMedia.url)}`}
                    className="w-full h-full max-w-4xl max-h-3xl"
                    frameBorder="0"
                    allowFullScreen
                  />
                ) : isVimeoUrl(selectedMedia.url) ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${getVimeoVideoId(selectedMedia.url)}`}
                    className="w-full h-full max-w-4xl max-h-3xl"
                    frameBorder="0"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={selectedMedia.url}
                    controls
                    className="max-w-full max-h-full"
                    autoPlay
                  />
                )
              ) : null}
            </div>

            {/* Counter */}
            {mediaItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded">
                {currentIndex + 1} / {mediaItems.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

interface MediaItemProps {
  item: { url: string; type: string };
  index: number;
  onClick: () => void;
}

function MediaItem({ item, index, onClick }: MediaItemProps) {
  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
  };

  const isVimeoUrl = (url: string) => {
    return url.includes('vimeo.com');
  };

  return (
    <Card 
      className="samurai-card overflow-hidden cursor-pointer hover:ring-2 hover:ring-samurai-gold transition-all duration-200 group"
      onClick={onClick}
    >
      <CardContent className="p-0 relative">
        <div className="aspect-video bg-gray-800 flex items-center justify-center relative overflow-hidden">
          {item.type === 'image' ? (
            <img
              src={item.url}
              alt={`Media ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"><rect fill="%23374151" width="200" height="150"/><text x="50%" y="50%" text-anchor="middle" fill="%239CA3AF" dy=".3em">Image</text></svg>';
              }}
            />
          ) : item.type === 'video' ? (
            isYouTubeUrl(item.url) ? (
              <div className="relative w-full h-full">
                <img
                  src={getYouTubeThumbnail(item.url) || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"><rect fill="%23374151" width="200" height="150"/><text x="50%" y="50%" text-anchor="middle" fill="%239CA3AF" dy=".3em">Video</text></svg>'}
                  alt={`Video ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>
            ) : isVimeoUrl(item.url) ? (
              <div className="relative w-full h-full bg-gray-700 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <Video className="w-16 h-16 text-gray-400" />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={item.url}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>
            )
          ) : (
            <div className="w-16 h-16 text-gray-400">
              <Image className="w-full h-full" />
            </div>
          )}
        </div>
        
        <div className="absolute top-2 left-2">
          <Badge variant={item.type === 'image' ? 'default' : 'secondary'} className="text-xs">
            {item.type === 'image' ? (
              <Image className="w-3 h-3 mr-1" />
            ) : (
              <Video className="w-3 h-3 mr-1" />
            )}
            {item.type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}