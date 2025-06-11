import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

interface UseNoteProps {
  bookId: string;
  page: number;
}

interface NoteDto {
  text: string;
}

const fetchNote = async (
  bookId: string,
  page: number,
  accessToken: string
): Promise<NoteDto> => {
  console.log('Fetching note for bookId:', bookId, 'page:', page);
  const response = await axiosInstance.get<NoteDto>(
    `/api/books/${bookId}/notes/${page}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log('Note fetched:', response.data);
  return response.data;
};

const updateNote = async ({
  bookId,
  page,
  text,
  accessToken,
}: {
  bookId: string;
  page: number;
  text: string;
  accessToken: string;
}): Promise<void> => {
  console.log('Put note for bookId:', bookId, 'page:', page);
  const response = await axiosInstance.put(
    `/api/books/${bookId}/notes/${page}`,
    {
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error('Failed to update note');
  }
};

const useNote = ({ bookId, page }: UseNoteProps) => {
  const queryClient = useQueryClient();
  const [text, setText] = useState('');
  const accessToken = useAuthStore(state => state.accessToken);
  const pageRef = useRef(page); // Store the latest page value

  // Update pageRef whenever page changes
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const { data, isLoading } = useQuery({
    queryKey: ['note', bookId, page],
    queryFn: () => fetchNote(bookId, page, accessToken as string),
    enabled: !!accessToken && !!bookId,
  });

  const mutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note', bookId, page] });
    },
  });

  const debouncedUpdate = useRef(
    debounce((text: string) => {
      console.log(
        'Debounced update for bookId:',
        bookId,
        'page:',
        pageRef.current, // Use the latest page from ref
        'text:',
        text
      );
      mutation.mutate({
        bookId,
        page: pageRef.current, // Use the latest page
        text,
        accessToken: accessToken as string,
      });
    }, 500)
  ).current;

  const handleChange = (newText: string) => {
    setText(newText);
    debouncedUpdate(newText);
  };

  useEffect(() => {
    setText(data?.text ?? '');
  }, [data, page]);

  // Cleanup debouncedUpdate on unmount
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  return {
    text,
    handleChange,
    isLoading,
    isSaving: mutation.isPending,
    error: mutation.error,
  };
};

export default useNote;
