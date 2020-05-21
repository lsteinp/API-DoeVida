import UsersDAO from '../DAO/UsersDAO'
import DonationEntityDAO from '../DAO/DonationEntityDAO'
import models from '../models'
import AddressDAO from '../DAO/AddressDAO'
import CampaignDAO from '../DAO/CampaignDAO'

export interface ContainerProperties {
  usersDAO: UsersDAO;
  addressDAO: AddressDAO;
  donationEntityDAO: DonationEntityDAO;
  campaignDAO: CampaignDAO;
}

export default class Container {
  usersDAO: UsersDAO;
  donationEntityDAO: DonationEntityDAO;
  campaignDAO: CampaignDAO;

  constructor(containerProperties: ContainerProperties) {
    this.usersDAO = containerProperties.usersDAO
    this.donationEntityDAO = containerProperties.donationEntityDAO
    this.campaignDAO = containerProperties.campaignDAO
  }
}

const usersDAO = new UsersDAO(models.User)
const addressDAO = new AddressDAO(models.Address)
const donationEntityDAO = new DonationEntityDAO(models.DonationEntity, addressDAO)
const campaignDAO = new CampaignDAO(models.Campaign, usersDAO, donationEntityDAO)

export const container = new Container({
  usersDAO,
  addressDAO,
  donationEntityDAO,
  campaignDAO,
})