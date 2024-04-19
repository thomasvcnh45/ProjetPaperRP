import { createReducer } from '@reduxjs/toolkit';
import { addNote } from '../actions/addNote';

interface NoteState {
  isAdding: boolean;
  error: string | null;
}

// État initial des notes
export const initialState: NoteState = {
  isAdding: false,
  error: null,
};

// Reducer pour gérer les actions liées aux notes
const NoteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addNote.pending, (state) => {
      state.isAdding = true;
      state.error = null;
    })
    .addCase(addNote.fulfilled, (state) => {
      state.isAdding = false;
      state.error = null;
    })
    .addCase(addNote.rejected, (state, action) => {
      state.isAdding = false;
      state.error = action.payload as string;
    });
});

export default NoteReducer;
