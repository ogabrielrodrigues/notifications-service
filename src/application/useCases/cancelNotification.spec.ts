import { InMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository'
import { CancelNotification } from './cancelNotification'
import { NotificationNotFound } from './errors/notificationNotFound'
import { makeNotification } from '@test/factories/notificationFactory'

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const cancelNotification = new CancelNotification(notificationRepository)

    const notification = makeNotification()

    await notificationRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const cancelNotification = new CancelNotification(notificationRepository)

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})
