'use client';

import { INote } from '@/types/note';
import { supabase } from '@/utils/supabaseClient';
import { ChangeEvent, useEffect, useState } from 'react';

interface IEditNoteProps {
  fetchNotes: () => Promise<void>;
  note: INote | undefined;
  setActiveNoteId: (value: number | null) => void;
}

export default function EditNote({
  note,
  fetchNotes,
  setActiveNoteId,
}: IEditNoteProps) {
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTitle(note?.title);
    setContent(note?.content);
    setIsEditing(false);
  }, [note]);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const onEditComplete = async () => {
    const { data, error } = await supabase
      .from('note')
      .update({
        title,
        content,
      })
      .eq('id', note!.id);

    if (error) {
      alert(error.message);
      return;
    }
    setIsEditing(false);
    fetchNotes();
  };

  const onDelete = async () => {
    const { data, error } = await supabase
      .from('note')
      .delete()
      .eq('id', note!.id);

    if (error) {
      alert(error.message);
      return;
    }
    setIsEditing(false);
    fetchNotes();
    setActiveNoteId(null);
  };

  if (!note) {
    return (
      <div className='flex w-3/4 absolute top-0 bottom-0 right-0 font-bold text-5xl justify-center items-center'>
        검색 중
      </div>
    );
  }
  return (
    <div className='p-2 flex flex-col w-3/4 gap-2 absolute top-0 bottom-0 right-0'>
      <div className='flex w-full justify-start my-2'>
        {isEditing ? (
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={onEditComplete}
              className='border border-green-400 rounded-lg  font-bold py-1 px-2 text-sm hover:bg-green-400 hover:text-white transition-all duration-300'
            >
              SAVE
            </button>
            <button
              type='button'
              onClick={onDelete}
              className='ring-1 ring-rose-400 rounded-lg  font-bold py-1 px-2 text-sm hover:bg-rose-400 hover:text-white transition-all duration-300'
            >
              DELETE
            </button>
          </div>
        ) : (
          <button
            type='button'
            className='border border-green-400 rounded-lg  font-bold py-1 px-2 text-sm hover:bg-green-400 hover:text-white transition-all duration-300'
            onClick={() => setIsEditing(true)}
          >
            EDIT
          </button>
        )}
      </div>
      {isEditing ? (
        <>
          <input
            className='ring-1 ring-rose-400 focus:ring-4 rounded-lg text-xl font-bold py-3 px-2 out-line-none'
            placeholder='Please enter the title'
            type='text'
            value={title}
            onChange={handleTitle}
          />
          <textarea
            className='grow ring-1 ring-rose-400 focus:ring-4 rounded-lg py-3 px-2 out-line-none'
            value={content}
            onChange={handleContent}
            placeholder='Please enter the contents'
          />
        </>
      ) : (
        <>
          <h2 className='border border-green-400 rounded-lg text-xl font-bold py-3 px-2 cursor-not-allowed'>
            {title}
          </h2>
          <p className='grow border border-green-400 rounded-lg py-3 px-2 cursor-not-allowed'>
            {content}
          </p>
        </>
      )}
    </div>
  );
}
