import type { AppDispatch } from ".";
import type { RootState }   from "../reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelect : TypedUseSelectorHook<RootState> = useSelector;