import { OAuthState } from "../types";
import { OAuthActionTypes } from "./actions";
/**
 * Базовый редьюсер OAuth.
 * @param state
 * @param action
 */
export declare const OAuthReducer: (state: OAuthState, action: OAuthActionTypes) => OAuthState;
