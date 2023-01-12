import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { SendNotification } from '@application/useCases/sendNotification'
import { CreateNotificationDTO } from '../dtos/createNotificationDTO'
import { NotificationViewModel } from '../view-models/notificationViewModel'
import { CancelNotification } from '@application/useCases/cancelNotification'
import { ReadNotification } from '@application/useCases/readNotification'
import { UnreadNotification } from '@application/useCases/unreadNotification'
import { CountRecipientNotifications } from '@application/useCases/countRecipientNotifications'
import { GetRecipientNotifications } from '@application/useCases/getRecipientNotifications'

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    })

    return {
      notification: NotificationViewModel.toHttp(notification),
    }
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    })

    return { count }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    })

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    })
  }
}
