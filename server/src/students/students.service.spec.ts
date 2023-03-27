import { NotFoundException } from '@nestjs/common'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Model } from 'mongoose'
import { CreateStudentDto } from './dto/create-student.dto'
import { Student, StudentDocument } from './schemas/student.schema'
import { StudentsService } from './students.service'

const testCreateDao: CreateStudentDto = {
  fullName: 'Test Student',
  term: { key: '2022-2023', field: 'EA', grade: 'MEZUN' },
}
const testStudent = {
  _id: 'testid',
  fullName: 'Test Student',
  contactPhone: '05435435432',
}

const testStudents = [
  testStudent,
  { ...testStudent, _id: 'testid2' },
  { ...testStudent, _id: 'testid3' },
]

const testUpdateDto = { fullName: 'Changed Name' }
const updatedTestStudent = { ...testStudent, ...testUpdateDto }

describe('StudentService', () => {
  let service: StudentsService
  let model: Model<StudentDocument>
  let saveOnFoundMock: jest.Mock

  beforeEach(async () => {
    saveOnFoundMock = jest.fn().mockResolvedValue(updatedTestStudent)
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getModelToken(Student.name),
          useValue: {
            create: jest.fn((dto) => ({
              ...dto,
              _id: 'generatedid',
            })),
            find: jest.fn().mockResolvedValue(testStudents),
            findById: jest.fn((id) => {
              const found = testStudents.find((s) => s._id === id)
              if (!found) return null
              return { ...found, save: saveOnFoundMock }
            }),
            findByIdAndDelete: jest.fn((id) => {
              const found = testStudents.find((s) => s._id === id)
              return found
            }),
          },
        },
      ],
    }).compile()

    service = module.get<StudentsService>(StudentsService)
    model = module.get<Model<StudentDocument>>(getModelToken(Student.name))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create student', async () => {
    const created = await service.create(testCreateDao)
    expect(model.create).toBeCalled()
    expect(created).toEqual({ ...testCreateDao, _id: 'generatedid' })
  })

  it('should find one student', async () => {
    const found = await service.findOne('testid')
    expect(model.findById).toBeCalledWith('testid')
    expect(found._id).toEqual(testStudent._id)
    expect(found.fullName).toEqual(testStudent.fullName)
    expect(found.contactPhone).toEqual(testStudent.contactPhone)
  })

  it('should find all student', async () => {
    const found = await service.findAll()
    expect(model.find).toBeCalled()
    expect(found.length).toBe(3)
  })

  it('should update student', async () => {
    const updated = await service.update('testid', {
      fullName: 'Changed Name',
    })
    expect(model.findById).toBeCalledWith('testid')
    expect(saveOnFoundMock).toBeCalled()

    expect(updated._id).toEqual(updatedTestStudent._id)
    expect(updated.fullName).toEqual(updatedTestStudent.fullName)
    expect(updated.contactPhone).toEqual(updatedTestStudent.contactPhone)
  })

  it('should remove student', async () => {
    await service.remove('testid')
    expect(model.findByIdAndDelete).toBeCalledWith('testid')
  })

  it('should throw for findOne when not found', () => {
    expect(async () => {
      await service.findOne('notexisting')
    }).rejects.toThrow(NotFoundException)
  })

  it('should throw for update when not found', () => {
    expect(async () => {
      await service.update('notexisting', {})
    }).rejects.toThrow(NotFoundException)
  })

  it('should throw for remove when not found', () => {
    expect(async () => {
      await service.remove('notexisting')
    }).rejects.toThrow(NotFoundException)
  })
})
