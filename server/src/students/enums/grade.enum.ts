const GRADE_VALUES = [
  '7.SINIF',
  '8.SINIF',
  '9.SINIF',
  '10.SINIF',
  '11.SINIF',
  '12.SINIF',
  'MEZUN',
] as const
export const GRADES = Object.values(GRADE_VALUES)
export type Grade = (typeof GRADE_VALUES)[number]
