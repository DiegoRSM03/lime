import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Note } from './entities/note.entity';
import { PatientsModule } from '../patients/patients.module';
import { TranscriptionModule } from '../transcription/transcription.module';
import { SummaryModule } from '../summary/summary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    PatientsModule,
    TranscriptionModule,
    SummaryModule,
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
