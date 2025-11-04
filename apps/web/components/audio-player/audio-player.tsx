'use client';

import { useState, useEffect } from 'react';
// Actions
import { getAudioUrl } from '@/actions/files';

interface AudioPlayerProps {
  url: string;
  className?: string;
}

const AudioPlayer = ({ url, className }: AudioPlayerProps) => {
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getPresignedUrl = async () => {
      const presignedUrl = await getAudioUrl(url);
      setAudioUrl(presignedUrl);
    };

    getPresignedUrl();
  }, [url]);

  return <audio src={audioUrl} controls className={className ?? 'w-full'} />;
};

export default AudioPlayer;
