import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from ".";
import type { RootState } from "../reducer";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelect : TypedUseSelectorHook<RootState> = useSelector;