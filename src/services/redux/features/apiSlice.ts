import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IpersonalQuestionsdata } from '../../../types';

export interface PersonalQuestionState {
  value:any
}

const initialState: PersonalQuestionState = {
  value: []
}

const apiSlice = createSlice({
  name: 'json',
  initialState,
  reducers: {
    personalQtnStore: (state, action: PayloadAction<IpersonalQuestionsdata>) => {
      state.value.push(action?.payload);
    },
  
  },
});

export const {personalQtnStore} =
  apiSlice.actions;
export default apiSlice.reducer;