import pdfParse from 'pdf-parse';

type PDFParseResult = {
  numpages: number;
  numrender: number;
  info: any;
  metadata: any;
  version: string;
  text: string;
};

export const typedPdfParse = pdfParse as (
  dataBuffer: Buffer,
) => Promise<PDFParseResult>;
