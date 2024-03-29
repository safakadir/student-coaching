import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument } from './schemas/student.schema';

@Injectable()
export class StudentsService {

  constructor(@InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const studentCreated = await this.studentModel.create(createStudentDto);
    return studentCreated
  }

  async findAll(): Promise<StudentDocument[]> {
    return this.studentModel.find()
  }

  async findOne(id: string): Promise<StudentDocument> {
    return this.findExistingById(id)
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<StudentDocument> {
    const existing = await this.findExistingById(id)
    Object.assign(existing, updateStudentDto)
    return existing.save()
  }

  async remove(id: string) {
    const removed = await this.studentModel.findByIdAndDelete(id)
    if(!removed) this.throwStudentNotFound()
  }

  private async findExistingById(id: string) {
    const student = await this.studentModel.findById(id)
    if (!student) {
      this.throwStudentNotFound()
    }
    return student
  }

  private throwStudentNotFound() {
    throw new NotFoundException("Ogrenci bulunamadı.")
  }
}
