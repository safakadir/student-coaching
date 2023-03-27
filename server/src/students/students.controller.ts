import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { StudentsService } from './students.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.create(createStudentDto)
  }

  @Get()
  async findAll() {
    return await this.studentService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.studentService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentService.update(id, updateStudentDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // removing await cause problems for exception handling. but happy scenario keeps working as returned promise is resolved by nest itself.
    await this.studentService.remove(id)
  }
}
