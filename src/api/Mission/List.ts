import Request from '@/scripts/base/Request'
import { SubMissionChildrenQueryData } from '@/views/Mission/List'

export default class MissionListApi extends Request {
  GetMissions() {
    return this.request({
      url: '/mission',
      method: 'GET'
    })
  }

  UpdateMission(data: SubMissionChildrenQueryData) {
    return this.request({
      url: `/mission/${data.mission_id}`,
      method: 'PATCH',
      data
    })
  }
}
