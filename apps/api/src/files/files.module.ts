import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Note } from './entities/note.entity';
import { PatientsModule } from '../patients/patients.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), PatientsModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
