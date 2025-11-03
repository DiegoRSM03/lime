import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import { UploadAudioDto } from './dto/upload-audio.dto';
import { UploadTextDto } from './dto/upload-text.dto';
import { NoteResponseDto } from './dto/note-response.dto';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('audio')
  @UseInterceptors(FileInterceptor('audio'))
  @ApiOperation({
    summary: 'Upload audio recording',
    description:
      'Uploads an audio file to S3 and stores metadata in the database',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        audio: {
          type: 'string',
          format: 'binary',
          description: 'Audio file (MP3, WAV, M4A)',
        },
        patientUuid: {
          type: 'string',
          format: 'uuid',
          description: 'The UUID of the patient',
        },
        dateOfFile: {
          type: 'string',
          format: 'date',
          description: 'The date of the file',
        },
      },
      required: ['audio', 'patientUuid', 'dateOfFile'],
    },
  })
  @ApiCreatedResponse({
    description: 'Audio file uploaded successfully',
    type: NoteResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid file or request data',
  })
  async uploadAudio(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }), // 50MB
          new FileTypeValidator({ fileType: /(mp3|wav|m4a|webm|mpeg)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() uploadAudioDto: UploadAudioDto,
  ): Promise<NoteResponseDto> {
    if (!file) {
      throw new BadRequestException('Audio file is required');
    }

    return this.filesService.uploadAudio(file, uploadAudioDto);
  }

  @Post('text')
  @ApiOperation({
    summary: 'Upload text notes',
    description: 'Saves text notes for a patient in the database',
  })
  @ApiCreatedResponse({
    description: 'Text notes saved successfully',
    type: NoteResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data',
  })
  async uploadText(
    @Body() uploadTextDto: UploadTextDto,
  ): Promise<NoteResponseDto> {
    return this.filesService.uploadText(uploadTextDto);
  }
}
