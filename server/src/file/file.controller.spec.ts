import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import * as pdfParse from 'pdf-parse';

jest.mock('pdf-parse', () => jest.fn());

describe('FileController', () => {
  let controller: FileController;
  let service: FileService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        {
          provide: FileService,
          useValue: {
            uploadFile: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<FileController>(FileController);
    service = moduleRef.get<FileService>(FileService);
  });

  it('should parse and upload file', async () => {
    (pdfParse as jest.Mock).mockResolvedValue({ text: 'parsed content' });

    const mockFile = {
      buffer: Buffer.from('dummy pdf data'),
      originalname: 'dummy.pdf',
      mimetype: 'application/pdf',
    };

    const result = await controller.uploadFile(mockFile as any);

    expect(pdfParse).toHaveBeenCalledWith(mockFile.buffer);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.uploadFile).toHaveBeenCalledWith(
      expect.objectContaining({
        originalName: mockFile.originalname,
        content: 'parsed content',
      }),
    );
    expect(result).toBe(true);
  });
});
