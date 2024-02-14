import { createClient } from '@supabase/supabase-js';

// GET /api/notes
export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Retrieve all notes
    const { data: notes, error } = await createClient.from('Food').select('*');
    if (error) {
      console.error('Error fetching notes:', error.message);
      return res.status(500).json({ error: 'Error fetching notes' });
    }
    return res.status(200).json(notes);
  } else if (req.method === 'POST') {
    // Create a new note
    const { fruit } = req.body;
    const { data: note, error } = await createClient.from('Food').upsert({ id, fruit, price }).single();
    if (error) {
      console.error('Error creating note:', error.message);
      return res.status(500).json({ error: 'Error creating note' });
    }
    return res.status(201).json(note);
  } else {
    // Handle other HTTP methods
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
