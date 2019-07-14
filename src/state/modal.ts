import { createReducer, createAction } from 'redux-starter-kit';

interface ModalState {
  modalId: string;
}

const initialState: ModalState = {
  modalId: '',
};

export const showModal = createAction('MODAL/SHOW');
export const hideModal = createAction('MODAL/CLOSE');

const modal = createReducer(initialState, {
  // @ts-ignore
  [showModal]: (state, action) => {
    state.modalId = action.payload;
  },
  // @ts-ignore
  [hideModal]: state => {
    state.modalId = '';
  },
});

export default modal;
