import Request from '@/scripts/base/Request'
import {
  CreateMissionQueryData,
  DeleteMissionQueryData,
  SubMissionChildrenQueryData
} from '@/views/Mission/List'

export default class MissionListApi extends Request {
  GetMissions() {
    return this.request({
      url: '/mission',
      method: 'GET'
    })
  }

  CreateMission(data: CreateMissionQueryData) {
    return this.request({
      url: '/mission',
      method: 'POST',
      data
    })
  }

  UpdateMission(data: SubMissionChildrenQueryData) {
    return this.request({
      url: `/mission/${data.mission_id}`,
      method: 'PATCH',
      data
    })
  }

  DeleteMission(data: DeleteMissionQueryData) {
    return this.request({
      url: `/mission/${data.mission_id}`,
      method: 'DELETE'
    })
  }
}
