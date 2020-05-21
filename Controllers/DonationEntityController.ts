
import { container } from '../container'
import { ControllerResponse } from '.'
import Container from '../container'
import { DonationEntity } from '../models/donationEntity'

export default class DonationEntityController {
  protected container: Container

  constructor() {
    this.container = container
  }

  fetchDonationEntities(addressId?: string): Promise<ControllerResponse> {
    return this.container.donationEntityDAO.fetchDonationEntities(addressId)
  }

  addDonationEntities(donationEntity: DonationEntity): Promise<ControllerResponse> {
    return this.container.donationEntityDAO.addDonationEntity(donationEntity)
  }
}
