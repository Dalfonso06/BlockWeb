export interface ActivityCreate {
  workout_type_id: number
  name?: string | null
  started_at: string
  elapsed_duration_seconds: number
  notes?: string | null
  source_id: number
}
