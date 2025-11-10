import { useCallback } from 'react';
import mediaProvider from '../api/mediaProvider';

export default function useMedia() {
  const listMedia = useCallback(() => mediaProvider.list(), []);
  const uploadMedia = useCallback((file) => mediaProvider.upload(file), []);
  const updateMedia = useCallback((id, data) => mediaProvider.update(id, data), []);
  const deleteMedia = useCallback((id) => mediaProvider.delete(id), []);

  return { listMedia, uploadMedia, updateMedia, deleteMedia };
}
