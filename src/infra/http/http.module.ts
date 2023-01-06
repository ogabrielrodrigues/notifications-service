import { Module } from '@nestjs/common'
import { SendNotification } from 'src/application/useCases/sendNotification'
import { DatabaseModule } from '../database/database.module'
import { NotificationController } from './controllers/notification.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotification],
})
export class HttpModule {}
