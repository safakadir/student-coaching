import { Test, TestingModule } from '@nestjs/testing'
import { CreateStudentDto } from './dto/create-student.dto'
import { StudentsController } from './students.controller'
import { StudentsService } from './students.service'

const testCreateDao: CreateStudentDto = {
  fullName: 'Test Student',
  term: { key: '2022-2023', field: 'EA', grade: 'MEZUN' },
}
const testStudent = {
  _id: 'testid',
  ...testCreateDao,
}

const testStudents = [
  testStudent,
  { ...testStudent, _id: 'testid2' },
  { ...testStudent, _id: 'testid3' },
]

const testUpdateDto = { fullName: 'Changed Name' }
const updatedTestStudent = { ...testStudent, ...testUpdateDto }

describe('StudentController', () => {
  let controller: StudentsController
  let service: StudentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn().mockResolvedValue(testStudent),
            findOne: jest.fn().mockResolvedValue(testStudent),
            findAll: jest.fn().mockResolvedValue(testStudents),
            update: jest.fn().mockResolvedValue(updatedTestStudent),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<StudentsController>(StudentsController)
    service = module.get<StudentsService>(StudentsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should handle create student', async () => {
    const result = await controller.create(testCreateDao)
    expect(service.create).toBeCalledWith(testCreateDao)
    expect(result).toEqual(testStudent)
  })

  it('should handle findOne student', async () => {
    const result = await controller.findOne('testid')
    expect(service.findOne).toBeCalledWith('testid')
    expect(result).toEqual(testStudent)
  })

  it('should handle findAll student', async () => {
    const result = await controller.findAll()
    expect(service.findAll).toBeCalled()
    expect(result).toEqual(testStudents)
  })

  it('should handle update student', async () => {
    const result = await controller.update('testid', testUpdateDto)
    expect(service.update).toBeCalledWith('testid', testUpdateDto)
    expect(result).toEqual(updatedTestStudent)
  })

  it('should handle remove student', async () => {
    await controller.remove('testid')
    expect(service.remove).toBeCalledWith('testid')
  })
})
