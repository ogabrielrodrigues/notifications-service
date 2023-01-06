import { Body, Controller, Post } from '@nestjs/common'
import { SendNotification } from 'src/application/useCases/sendNotification'
import { CreateNotificationDTO } from '../dtos/createNoticationDTO'

@Controller('notifications')
export class NotificationController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    })

    return { notification }
  }
}
