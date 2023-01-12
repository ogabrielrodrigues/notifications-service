import { InMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository'
import { CountRecipientNotifications } from './countRecipientNotifications'
import { makeNotification } from '@test/factories/notificationFactory'
import { GetRecipientNotifications } from './getRecipientNotifications'

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationRepository,
    )

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id' }),
    )

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id' }),
    )

    await notificationRepository.create(
      makeNotification({ recipientId: 'other-recipient-id' }),
    )

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-recipient-id',
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
      ]),
    )
  })
})
