import { InMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository'
import { CountRecipientNotifications } from './countRecipientNotifications'
import { makeNotification } from '@test/factories/notificationFactory'

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const countRecipientNotifications = new CountRecipientNotifications(
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

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-recipient-id',
    })

    expect(count).toEqual(2)
  })
})
