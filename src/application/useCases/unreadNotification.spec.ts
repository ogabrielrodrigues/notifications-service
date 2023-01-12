import { InMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository'
import { NotificationNotFound } from './errors/notificationNotFound'
import { makeNotification } from '@test/factories/notificationFactory'
import { UnreadNotification } from './unreadNotification'

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const unreadNotification = new UnreadNotification(notificationRepository)

    const notification = makeNotification({
      readAt: new Date(),
    })

    await notificationRepository.create(notification)

    await unreadNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationRepository.notifications[0].readAt).toBeNull()
  })

  it('should not be able to unread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const unreadNotification = new UnreadNotification(notificationRepository)

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})
