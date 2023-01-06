import { InMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository'
import { SendNotification } from './sendNotification'

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const sendNotification = new SendNotification(notificationRepository)

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'Nova notificação',
      recipientId: 'example-recipient-id',
    })

    expect(notificationRepository.notifications).toBeTruthy()
    expect(notificationRepository.notifications[0]).toEqual(notification)
  })
})
