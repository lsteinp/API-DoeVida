import sinon from 'sinon'
import CampaignDAO from '../../DAO/CampaignDAO'
import { BloodType } from '../../models/campaign'
import UsersDAO from '../../DAO/UsersDAO'
import DonationEntityDAO from '../../DAO/DonationEntityDAO'

const campaign1 = {
  id: '1',
  donationEntity: 'Hospital de Clinicas',
  user: 'Larissa',
  receiverName: 'Lucas',
  bloodType: 'A+',
  status: 'Ativo',
}
const campaign2 = {
  id: '2',
  donationEntity: 'Hospital Mãe de Deus',
  user: 'Ricardo',
  receiverName: 'Ramon',
  bloodType: 'O+',
  status: 'Inativo',
}

class FakeCampaignModel {
  save() {
    return {}
  }

  find(): any {
    return {
      populate: () => ({
        populate: () => ({
          exec: () => [campaign1, campaign2]
        })
      })
    }
  }
}

describe('CampaignDAO', () => {
  let usersDAO: UsersDAO
  let donationEntityDAO: DonationEntityDAO

  describe('sucess', () => {
    beforeEach(() => {
      // @ts-ignore
      usersDAO = {
        findUser: sinon.fake.resolves({ data: {} })
      }

      // @ts-ignore
      donationEntityDAO = {
        findDonationEntity: sinon.fake.resolves({ data: {} })
      }
    })

    it('Should add campaign', async () => {
      // @ts-ignore
      const campaignDAO = new CampaignDAO(FakeCampaignModel, usersDAO, donationEntityDAO)

      const addCampaignDTO = {
        userId: '1',
        donationEntityId: '1',
        receiverName: 'ana',
        bloodType: BloodType.A_POSITIVE
      }

      const result = await campaignDAO.addCampaign(addCampaignDTO)

      expect(result.errorObj).toBeFalsy()
    })

    it('Should fetch campaigns', async () => {

      const fakeCampaignModel = new FakeCampaignModel()
      // @ts-ignore
      const campaignDAO = new CampaignDAO(fakeCampaignModel, usersDAO, donationEntityDAO)

      const result = await campaignDAO.fetchCampaigns()
      expect(result.data.length).toEqual(2)
    })
  })
})
