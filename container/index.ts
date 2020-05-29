import UsersDAO from '../DAO/UsersDAO'
import DonationEntityDAO from '../DAO/DonationEntityDAO'
import models from '../models'
import AddressDAO from '../DAO/AddressDAO'
import CampaignDAO from '../DAO/CampaignDAO'
import DonationRegistryDAO from '../DAO/DonationRegistryDAO'

export interface ContainerProperties {
  usersDAO: UsersDAO;
  addressDAO: AddressDAO;
  donationEntityDAO: DonationEntityDAO;
  campaignDAO: CampaignDAO;
  donationRegistryDAO: DonationRegistryDAO;
}

export default class Container {
  usersDAO: UsersDAO;
  donationEntityDAO: DonationEntityDAO;
  campaignDAO: CampaignDAO;
  donationRegistryDAO: DonationRegistryDAO;

  constructor(containerProperties: ContainerProperties) {
    this.usersDAO = containerProperties.usersDAO
    this.donationEntityDAO = containerProperties.donationEntityDAO
    this.campaignDAO = containerProperties.campaignDAO
    this.donationRegistryDAO = containerProperties.donationRegistryDAO;
  }
}

const usersDAO = new UsersDAO(models.User)
const addressDAO = new AddressDAO(models.Address)
const donationEntityDAO = new DonationEntityDAO(models.DonationEntity, addressDAO)
const campaignDAO = new CampaignDAO(models.Campaign, usersDAO, donationEntityDAO)
const donationRegistryDAO = new DonationRegistryDAO(models.DonationRegistry)

export const container = new Container({
  usersDAO,
  addressDAO,
  donationEntityDAO,
  campaignDAO,
  donationRegistryDAO,
})