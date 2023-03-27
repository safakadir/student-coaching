const FIELD_VALUES = ['SAY', 'EA', 'SOZ'] as const
export const FIELDS = Object.values(FIELD_VALUES)
export type Field = (typeof FIELD_VALUES)[number]
