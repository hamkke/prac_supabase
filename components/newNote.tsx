'use client';

import { supabase } from '@/utils/supabaseClient';
import { ChangeEvent, useState } from 'react';

interface INewNoteProps {
  fetchNotes: () => Promise<void>;
  setIsCreating: (value: boolean) => void;
  setActiveNoteId: (value: number) => void;
}
export default function NewNote({
  setIsCreating,
  fetchNotes,
  setActiveNoteId,
}: INewNoteProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const onSave = async () => {
    if (!title || !content) {
      alert('빈칸 ㄴㄴ');
      return;
    }

    const { data, error } = await supabase
      .from('note')
      .insert({
        title,
        content,
      })
      .select();
    if (error) {
      alert(error.message);
      return;
    }
    fetchNotes();
    setActiveNoteId(data[0].id);
    setIsCreating(false);
  };

  return (
    <div className='p-2 flex flex-col w-3/4 gap-2 absolute top-0 bottom-0 right-0'>
      <div className='flex w-full justify-start'>
        <button
          type='button'
          className='border border-green-400 rounded-lg  font-bold py-1 px-2 text-sm hover:bg-green-400 hover:text-white transition-all duration-300'
          onClick={onSave}
        >
          SAVE
        </button>
      </div>
      <input
        className='border border-green-400 rounded-lg text-xl font-bold py-3 px-2'
        placeholder='Please enter the title'
        type='text'
        value={title}
        onChange={handleTitle}
      />
      <textarea
        className='grow border border-green-400 rounded-lg py-3 px-2'
        value={content}
        onChange={handleContent}
        placeholder='Please enter the contents'
      />
    </div>
  );
}
