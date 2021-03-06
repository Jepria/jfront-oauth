import { UserState } from "./types"
import {
  UserActionTypes,
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  IS_USER_IN_ROLES,
  IS_USER_IN_ROLES_SUCCESS,
  IS_USER_IN_ROLES_FAILURE,
} from "./actions"

export function reducer(state: UserState, action: UserActionTypes): UserState {
  switch (action.type) {
    case GET_CURRENT_USER: {
      return {
        ...state,
        isUserLoading: true,
      }
    }
    case GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.user,
        roles: {},
        isUserLoading: false,
      }
    }
    case GET_CURRENT_USER_FAILURE: {
      return {
        ...state,
        isUserLoading: false,
      }
    }
    case IS_USER_IN_ROLES: {
      return {
        ...state,
        isRoleLoading: true,
      }
    }
    case IS_USER_IN_ROLES_SUCCESS: {
      return {
        ...state,
        roles: {
          ...state.roles,
          ...action.result,
        },
        isRoleLoading: false,
      }
    }
    case IS_USER_IN_ROLES_FAILURE: {
      return {
        ...state,
        isRoleLoading: false,
      }
    }
  }
}
