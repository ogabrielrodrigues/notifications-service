import { InMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository'
import { NotificationNotFound } from './errors/notificationNotFound'
import { makeNotification } from '@test/factories/notificationFactory'
import { ReadNotification } from './readNotification'

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const readNotification = new ReadNotification(notificationRepository)

    const notification = makeNotification()

    await notificationRepository.create(notification)

    await readNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const readNotification = new ReadNotification(notificationRepository)

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})
