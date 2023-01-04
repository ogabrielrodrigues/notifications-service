import { Body, Controller, Get, Post } from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import { CreateNotificationDTO } from './createNoticationDTO'
import { PrismaService } from './prisma.service'

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany()
  }

  @Post()
  create(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body

    return this.prisma.notification.create({
      data: {
        id: randomUUID(),
        recipientId,
        content,
        category,
      },
    })
  }
}
