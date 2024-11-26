'use client';

import NewNote from '@/components/newNote';
import Header from '@/components/header';
import Sidebar from '@/components/sideBar';
import EmptyNote from '@/components/emptyNote';
import EditNote from '@/components/editNote';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { Database } from '@/types_db';

export default function Ui() {
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState<
    Database['public']['Tables']['note']['Row'][] | undefined
  >([]);

  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('note')
      .select('*')
      // 원하는 colunm의 오름 또는 내림차순
      .order('created_at', { ascending: true })
      .ilike('title', `%${search}%`);

    if (error) {
      alert(error.message);
      return;
    }
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [search]);

  if (!notes) {
    return 'WRONG';
  }

  return (
    <main className='w-full h-screen flex flex-col'>
      <Header />
      <div className='grow relative'>
        <Sidebar
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          setIsCreating={setIsCreating}
          notes={notes}
          search={search}
          setSearch={setSearch}
        />
        {/* mainContents */}
        {isCreating ? (
          <NewNote
            setActiveNoteId={setActiveNoteId}
            fetchNotes={fetchNotes}
            setIsCreating={setIsCreating}
          />
        ) : activeNoteId ? (
          <EditNote
            fetchNotes={fetchNotes}
            setActiveNoteId={setActiveNoteId}
            note={notes.find((n) => n.id === activeNoteId)}
          />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
}
