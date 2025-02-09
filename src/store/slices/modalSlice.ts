import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    visible: boolean,
    content: string | null,
    title: string | null,
    buttonType: string
}
  
const initialState: ModalState = {
    visible: false,
    content: null,
    title: null,
    buttonType: 'default'
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        open(state, action: PayloadAction<{content: string, title?: string, buttonType?: string}>) {
            state.visible = true;
            state.content = action.payload.content;
            state.title = action.payload.title || null;
            state.buttonType = action.payload.buttonType || 'default';

        },
        close(state) {
            state.visible = false;
            state.content = null;
            state.title = null;
        }
       
    }
})

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;