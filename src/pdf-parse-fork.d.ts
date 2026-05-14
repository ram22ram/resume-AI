declare module "pdf-parse-fork" {
    export interface PdfParseResult {
        text: string;
        info?: Record<string, unknown>;
        metadata?: Record<string, unknown>;
        version?: string;
        pages?: number;
    }

    function pdfParse(buffer: Buffer): Promise<PdfParseResult>;

    export default pdfParse;
}