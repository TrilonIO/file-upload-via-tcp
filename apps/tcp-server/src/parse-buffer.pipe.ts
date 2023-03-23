import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

export const ParseBufferPipe = (property: string, isArray: boolean = false) => {
  @Injectable()
  class ParseBufferPipeMixin implements PipeTransform {
    transform(
      value: Record<string, string> | Array<Record<string, string>>,
      _metadata: ArgumentMetadata,
    ) {
      if (isArray && Array.isArray(value)) {
        return value.map((val) => ({
          ...val,
          buffer: Buffer.from(val[property]),
        }));
      }
      return { ...value, buffer: Buffer.from(value[property]) };
    }
  }

  return ParseBufferPipeMixin;
};
