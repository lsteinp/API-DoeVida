
import { container } from '../container'
import { ControllerResponse } from '.'
import Container from '../container'
import { AddCampaignDTO } from '../DAO/CampaignDAO'
import { QueryCampaign } from '../Helpers/Interface/QueryCampaign'

export default class CampaignController {
  protected container: Container

  constructor() {
    this.container = container
  }

  fetchCampaigns(query: QueryCampaign): Promise<ControllerResponse> {
  let custom : QueryCampaign
  custom = {}
  if(query.donationEntityId) {
    custom["donationEntityId"] = query.donationEntityId
  }
    return this.container.campaignDAO.fetchCampaigns(custom)
  }

  fetchByUser(userId: string): Promise<ControllerResponse> {
    return this.container.campaignDAO.fetchByUser(userId)
  }

  fetchByCampaignId(campaignId: string): Promise<ControllerResponse> {
    return this.container.campaignDAO.fetchByCampaignId(campaignId)
  }

  addCampaign(donationEntity: AddCampaignDTO): Promise<ControllerResponse> {
    return this.container.campaignDAO.addCampaign(donationEntity)
  }
}
