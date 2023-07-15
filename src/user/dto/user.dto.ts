import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: Number,
    description: 'User id',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'User email',
  })
  email: string;
}
