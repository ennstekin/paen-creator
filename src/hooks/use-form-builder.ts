"use client";

import { useReducer, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import type { FormField, FieldType } from "@/lib/types/form";
import { FIELD_TYPE_CONFIG } from "@/lib/constants";

interface FormBuilderState {
  title: string;
  slug: string;
  description: string;
  fields: FormField[];
}

type Action =
  | { type: "SET_META"; payload: Partial<Pick<FormBuilderState, "title" | "slug" | "description">> }
  | { type: "ADD_FIELD"; payload: FieldType }
  | { type: "REMOVE_FIELD"; payload: string }
  | { type: "UPDATE_FIELD"; payload: { id: string; updates: Partial<FormField> } }
  | { type: "MOVE_FIELD_UP"; payload: string }
  | { type: "MOVE_FIELD_DOWN"; payload: string }
  | { type: "LOAD"; payload: FormBuilderState };

function reorder(fields: FormField[]): FormField[] {
  return fields.map((f, i) => ({ ...f, order: i }));
}

function reducer(state: FormBuilderState, action: Action): FormBuilderState {
  switch (action.type) {
    case "SET_META":
      return { ...state, ...action.payload };

    case "ADD_FIELD": {
      const config = FIELD_TYPE_CONFIG[action.payload];
      const newField: FormField = {
        id: uuidv4(),
        type: action.payload,
        label: config.label,
        placeholder: config.defaultPlaceholder,
        required: false,
        options: config.hasOptions ? ["Seçenek 1", "Seçenek 2"] : undefined,
        order: state.fields.length,
      };
      return { ...state, fields: [...state.fields, newField] };
    }

    case "REMOVE_FIELD":
      return {
        ...state,
        fields: reorder(state.fields.filter((f) => f.id !== action.payload)),
      };

    case "UPDATE_FIELD":
      return {
        ...state,
        fields: state.fields.map((f) =>
          f.id === action.payload.id ? { ...f, ...action.payload.updates } : f
        ),
      };

    case "MOVE_FIELD_UP": {
      const idx = state.fields.findIndex((f) => f.id === action.payload);
      if (idx <= 0) return state;
      const newFields = [...state.fields];
      [newFields[idx - 1], newFields[idx]] = [newFields[idx], newFields[idx - 1]];
      return { ...state, fields: reorder(newFields) };
    }

    case "MOVE_FIELD_DOWN": {
      const idx = state.fields.findIndex((f) => f.id === action.payload);
      if (idx < 0 || idx >= state.fields.length - 1) return state;
      const newFields = [...state.fields];
      [newFields[idx], newFields[idx + 1]] = [newFields[idx + 1], newFields[idx]];
      return { ...state, fields: reorder(newFields) };
    }

    case "LOAD":
      return action.payload;

    default:
      return state;
  }
}

const initialState: FormBuilderState = {
  title: "",
  slug: "",
  description: "",
  fields: [],
};

export function useFormBuilder(initial?: FormBuilderState) {
  const [state, dispatch] = useReducer(reducer, initial || initialState);

  const setMeta = useCallback(
    (meta: Partial<Pick<FormBuilderState, "title" | "slug" | "description">>) =>
      dispatch({ type: "SET_META", payload: meta }),
    []
  );

  const addField = useCallback(
    (type: FieldType) => dispatch({ type: "ADD_FIELD", payload: type }),
    []
  );

  const removeField = useCallback(
    (id: string) => dispatch({ type: "REMOVE_FIELD", payload: id }),
    []
  );

  const updateField = useCallback(
    (id: string, updates: Partial<FormField>) =>
      dispatch({ type: "UPDATE_FIELD", payload: { id, updates } }),
    []
  );

  const moveFieldUp = useCallback(
    (id: string) => dispatch({ type: "MOVE_FIELD_UP", payload: id }),
    []
  );

  const moveFieldDown = useCallback(
    (id: string) => dispatch({ type: "MOVE_FIELD_DOWN", payload: id }),
    []
  );

  const load = useCallback(
    (data: FormBuilderState) => dispatch({ type: "LOAD", payload: data }),
    []
  );

  return {
    state,
    setMeta,
    addField,
    removeField,
    updateField,
    moveFieldUp,
    moveFieldDown,
    load,
  };
}
