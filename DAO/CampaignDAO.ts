import constants from '../config/constants'
import { ControllerResponse } from '../Controllers'
import { Model, Document } from 'mongoose'
import { BloodType, CampaignStatus } from '../models/campaign'
import UsersDAO from './UsersDAO'
import DonationEntityDAO from './DonationEntityDAO'
import { QueryCampaign } from '../Helpers/Interface/QueryCampaign'

export interface AddCampaignDTO {
  userId: string;
  donationEntityId: string;
  receiverName: string;
  bloodType: BloodType;
}

export default class CampaignDAO {
  campaignModel: Model<Document, {}>
  usersDAO: UsersDAO
  donationEntityDAO: DonationEntityDAO

  constructor(campaignModel: Model<Document, {}>, usersDAO: UsersDAO, donationEntityDAO: DonationEntityDAO) {
    this.campaignModel = campaignModel
    this.usersDAO = usersDAO
    this.donationEntityDAO = donationEntityDAO
  }

  async fetchCampaigns(query: QueryCampaign): Promise<ControllerResponse> {
    try {
      let custom = {status: "ACTIVE", ...query}
      const data = await this.campaignModel
        .find(custom)
        .populate('userId')
        .populate({
          path : 'donationEntityId',
          populate : {
            path : 'addressId'
          }
        })
        .exec()

      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err.message, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async fetchByUser(userId: string): Promise<ControllerResponse> {
    try {
      const data = await this.campaignModel
        .find({
          userId: userId
        })
        .populate('userId')
        .populate({
          path : 'donationEntityId',
          populate : {
            path : 'addressId'
          }
        })
        .exec()

      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err.message, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  async fetchByCampaignId(campaignId: string): Promise<ControllerResponse> {
    try {
      const data = await this.campaignModel
        .find({
          _id: campaignId
        })
        .populate('userId')
        .populate({
          path : 'donationEntityId',
          populate : {
            path : 'addressId'
          }
        })
        .exec()

      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err.message, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }

  /**
   * TODO use token to get user ID
   */
  async addCampaign(addCampaignDTO: AddCampaignDTO): Promise<ControllerResponse> {
    try {
      const user = await this.usersDAO.findUser(addCampaignDTO.userId)
      if (!user.data) {
        throw new Error('User not found')
      }

      const donationEntity = await this.donationEntityDAO.findDonationEntity(addCampaignDTO.donationEntityId)
      if (!donationEntity.data) {
        throw new Error('Donation entity not found')
      }

      if (!Object.values(BloodType).includes(addCampaignDTO.bloodType)) {
        throw new Error('Invalid blood type')
      }

      const newCampaign = new this.campaignModel({
        ...addCampaignDTO,
        status: CampaignStatus.ACTIVE
      })
      const data = await newCampaign.save()
      return { data, errorObj: null }
    } catch (err) {
      const errorObj = { statusDesc: err.message, statusCode: constants.notFound }
      return { errorObj, data: null }
    }
  }
}
