export type MissionQueryData = {
  mission_id: number
  mission_pid: number
  recruit: number
  title: string
  content: string
  location: string
  action_date: string
  start_time: string
  end_time: string
  children: SubMissionQueryData[]
}

/**
 * 创建任务
 */
export type CreateMissionQueryData = Omit<
  MissionQueryData,
  'mission_id' | 'mission_pid' | 'children'
> & {
  children: Omit<
    MissionQueryData,
    | 'mission_id'
    | 'mission_pid'
    | 'recruit'
    | 'content'
    | 'location'
    | 'action_date'
    | 'children'
  >[]
}

export type SubMissionQueryData = Omit<
  MissionQueryData,
  'recruit' | 'content' | 'location' | 'action_date' | 'children'
>

export type SubMissionChildrenQueryData = Omit<MissionQueryData, 'children'> & {
  children: {
    create: Omit<SubMissionQueryData, 'mission_id'>[]
    update: SubMissionQueryData[]
    delete: number[]
  }
}

/**
 * 编辑时的子任务
 *
 * - mission_id 非必填
 * - date 记录时间选择器的值
 */
export type SubMissionEditQueryData = Omit<
  SubMissionQueryData,
  'mission_id'
> & { mission_id?: number; date?: string[] }

export type DeleteMissionQueryData = {
  mission_id: number
}
