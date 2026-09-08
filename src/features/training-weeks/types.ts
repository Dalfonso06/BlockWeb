export interface TrainingWeekCreate {
  training_block_id: number
  week_number: number
  start_date: string
  end_date: string
  name?: string | null
  focus?: string | null
}

export type TrainingWeekUpdate = Partial<TrainingWeekCreate>
