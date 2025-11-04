import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { NoteResponseDto } from './dto/note-response.dto';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all notes',
    description: 'Retrieve all notes with patient information',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all notes',
    type: [NoteResponseDto],
  })
  async findAll(): Promise<NoteResponseDto[]> {
    return this.notesService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Get a note by UUID',
    description:
      'Retrieve a specific note with patient information by its UUID',
  })
  @ApiParam({
    name: 'uuid',
    description: 'The UUID of the note',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'The note with the specified UUID',
    type: NoteResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Note not found',
  })
  async findOne(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<NoteResponseDto> {
    return this.notesService.findOne(uuid);
  }
}
