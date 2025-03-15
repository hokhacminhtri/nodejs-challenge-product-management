import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  price: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  category: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  subcategory: string;
}
