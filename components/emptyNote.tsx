'use client';

import { ChangeEvent, useState } from 'react';

export default function EmptyNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  return (
    <div className='p-2 flex flex-col w-3/4 gap-2 absolute top-0 bottom-0 right-0 justify-center items-center font-bold text-2xl'>
      새로운 노트를 만들어 주세요 🦖
    </div>
  );
}
