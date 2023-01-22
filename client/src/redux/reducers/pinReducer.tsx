import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { http } from '../../utils/setting';
import { AppDispatch } from '../configStore';

export interface PinModel {
  img_id: number;
  user_id: number;
  img_name: string;
  url_path: string;
  desc: string;
}

const initialState: any = {
  arrPin: [],
};

const pinReducer = createSlice({
  name: 'pinReducer',
  initialState,
  reducers: {
    getAllPin: (state, action: PayloadAction<PinModel[]>) => {
      state.arrPin = action.payload;
    },
  },
});

export const { getAllPin } = pinReducer.actions;

export default pinReducer.reducer;

//----------- action thunk ------------
export const getAllPinApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get('/api/image/getImage');
      let arrPin: PinModel[] = result.data.content;
      const action = getAllPin(arrPin);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
