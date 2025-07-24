/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FileService } from './file.service';

class MockFileModel {
  _id = 'mocked-id-123'; // fixed mock id

  constructor(private data: any) {
    Object.assign(this, data);
  }
  save = jest.fn().mockResolvedValue(this);
}

const mockElasticClient = {
  index: jest.fn().mockResolvedValue({ result: 'created' }),
  search: jest.fn().mockResolvedValue({
    hits: {
      hits: [
        {
          _id: '123',
          _source: {
            filename: 'file1.pdf',
            content: 'some content',
            size: 10,
          },
          highlight: { content: ['highlighted text'] },
        },
      ],
    },
  }),
};

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: getModelToken('File'),
          useValue: MockFileModel,
        },
        {
          provide: 'ELASTIC_CLIENT',
          useValue: mockElasticClient,
        },
      ],
    }).compile();

    service = moduleRef.get<FileService>(FileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should upload a file', async () => {
    const createDto = {
      originalName: 'test.txt',
      filename: 'test.txt',
      mimetype: 'text/plain',
      content: 'file content',
      size: 5,
    };

    const result = await service.uploadFile(createDto);

    expect(result.filename).toBe(createDto.filename);

    expect(mockElasticClient.index).toHaveBeenCalledWith(
      expect.objectContaining({
        index: 'file',
        id: 'mocked-id-123', // now id is defined here
        document: expect.objectContaining({
          filename: createDto.filename,
          content: createDto.content,
          size: createDto.size,
        }),
        refresh: true,
      }),
    );
  });

  it('should search files', async () => {
    const results = await service.searchFiles('some query');

    expect(results).toHaveLength(1);
    expect(results[0].filename).toBe('file1.pdf');
    expect(results[0].highlights).toContain('highlighted text');
    expect(mockElasticClient.search).toHaveBeenCalledWith(
      expect.objectContaining({
        index: 'file',
        query: { match: { content: 'some query' } },
        highlight: { fields: { content: {} } },
      }),
    );
  });
});
