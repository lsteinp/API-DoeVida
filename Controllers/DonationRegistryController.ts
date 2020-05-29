
import { container } from '../container'
import { ControllerResponse } from '.'
import Container from '../container'
import { donationRegistry } from '../models/donationRegistry'

export default class DonationRegistryController {
  protected container: Container

  constructor() {
    this.container = container
  }

  fetchDonationRegistries(): Promise<ControllerResponse> {
    return this.container.donationRegistryDAO.fetchDonationRegistries()
  }

  addDonationRegistry(donationRegistry: donationRegistry): Promise<ControllerResponse> {
    return this.container.donationRegistryDAO.addDonationRegistry(donationRegistry)
  }
}