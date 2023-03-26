import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';

describe('StudentService', () => {
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
      ],
    })
    .compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create student', () => {
    //service.create({ fullname: "Test Student", birthDate: "01/01/2000", term: { key: "2022-2023", school: "Some Test School", grade: "MEZUN", field: "SAY" }, contactPhone: "5550001515" })
  })

  it('should find one student')

  it('should find all student')

  it('should update student')

  it('should remove student')

  it('should throw when student not found during find one')

  it('should throw when student not found during update')

  it('should throw when student not found during remove')

});
