import Request from '@/scripts/base/Request'

export default class JoinMissionListApi extends Request {
  GetJoinMissions(mission_id: number) {
    return this.request({
      url: '/join-mission',
      method: 'GET',
      params: {
        id: mission_id
      }
    })
  }
}
