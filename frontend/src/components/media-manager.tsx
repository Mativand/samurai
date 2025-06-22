import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

interface MediaManagerProps {
  mediaItems: MediaItem[];
  onMediaChange: (items: MediaItem[]) => void;
}

export default function MediaManager({ mediaItems, onMediaChange }: MediaManagerProps) {
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const { toast } = useToast();

  const addMedia = () => {
    if (!newMediaUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a media URL",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(newMediaUrl);
    } catch {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    const newItem: MediaItem = {
      url: newMediaUrl.trim(),
      type: newMediaType,
    };

    onMediaChange([...mediaItems, newItem]);
    setNewMediaUrl("");
  };

  const removeMedia = (index: number) => {
    const updatedItems = mediaItems.filter((_, i) => i !== index);
    onMediaChange(updatedItems);
  };

  const isImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
  };

  const isVideoUrl = (url: string) => {
    return /\.(mp4|webm|ogg|mov|avi)$/i.test(url) || 
           url.includes('youtube.com') || 
           url.includes('youtu.be') || 
           url.includes('vimeo.com');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex gap-2 flex-1">
          <Button
            type="button"
            variant={newMediaType === 'image' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setNewMediaType('image')}
            className="flex items-center gap-1"
          >
            <Image className="w-4 h-4" />
            Photo
          </Button>
          <Button
            type="button"
            variant={newMediaType === 'video' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setNewMediaType('video')}
            className="flex items-center gap-1"
          >
            <Video className="w-4 h-4" />
            Video
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          value={newMediaUrl}
          onChange={(e) => setNewMediaUrl(e.target.value)}
          placeholder={`Enter ${newMediaType} URL (e.g., https://example.com/${newMediaType === 'image' ? 'photo.jpg' : 'video.mp4'})`}
          className="samurai-input flex-1"
          onKeyPress={(e) => e.key === 'Enter' && addMedia()}
        />
        <Button
          type="button"
          onClick={addMedia}
          className="samurai-button"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {mediaItems.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Media Files ({mediaItems.length})</h4>
          <div className="grid gap-3">
            {mediaItems.map((item, index) => (
              <Card key={index} className="samurai-card p-3">
                <CardContent className="p-0">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {item.type === 'image' ? (
                        <Image className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Video className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={item.type === 'image' ? 'default' : 'secondary'}>
                          {item.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-300 break-all">
                        {item.url}
                      </p>
                      
                      {/* Preview for images */}
                      {item.type === 'image' && isImageUrl(item.url) && (
                        <div className="mt-2">
                          <img
                            src={item.url}
                            alt="Preview"
                            className="max-w-32 max-h-20 object-cover rounded border border-gray-600"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Preview for videos */}
                      {item.type === 'video' && isVideoUrl(item.url) && !item.url.includes('youtube') && !item.url.includes('vimeo') && (
                        <div className="mt-2">
                          <video
                            src={item.url}
                            className="max-w-32 max-h-20 object-cover rounded border border-gray-600"
                            controls={false}
                            muted
                          />
                        </div>
                      )}
                    </div>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedia(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-400 space-y-1">
        <p>• Supported image formats: JPG, PNG, GIF, WebP, SVG</p>
        <p>• Supported video formats: MP4, WebM, YouTube, Vimeo links</p>
        <p>• Make sure URLs are publicly accessible</p>
      </div>
    </div>
  );
}