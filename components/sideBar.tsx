'use client';
import { INote, IsetIsCreating } from '@/types/note';
import { ChangeEvent } from 'react';

interface INewNote {
  notes: INote[];
  setIsCreating: (value: boolean) => void;
  activeNoteId: number | null;
  setActiveNoteId: (value: number | null) => void;
  search: string;
  setSearch: (value: string) => void;
}

export default function Sidebar({
  notes,
  setIsCreating,
  activeNoteId,
  setActiveNoteId,
  search,
  setSearch,
}: INewNote) {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const deleteSearch = () => {
    setSearch('');
  };

  return (
    <aside className='p-4 absolute top-0 left-0 bottom-0 w-1/4 overflow-y-scroll scrollbar-hide border-r border-green-400'>
      <button
        onClick={() => {
          setIsCreating(true);
          setActiveNoteId(null);
        }}
        className=' p-2 text-lg font-bold border border-green-400 rounded-lg w-full'
      >
        👉🏻 New note 👈🏻
      </button>

      <div className='w-full relative'>
        <input
          type='text'
          placeholder='노트 검색'
          value={search}
          onChange={handleSearch}
          className='my-4 p-2 pr-10 text-lg font-bold w-full border border-green-400 rounded-lg '
        />
        <button
          className='absolute top-0 bottom-0 right-4 font-bold'
          onClick={deleteSearch}
        >
          X
        </button>
      </div>
      <ul className='flex flex-col gap-2 font-bold'>
        {notes.map((item) => {
          return (
            <li
              key={item.id}
              className={`${
                activeNoteId === item.id ? 'text-green-400' : 'text-black'
              }`}
            >
              <button
                type='button'
                onClick={() => {
                  setActiveNoteId(item.id);
                  setIsCreating(false);
                }}
                className='w-full text-left hover:text-green-400'
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
