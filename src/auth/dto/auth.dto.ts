import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
  })
  @IsString()
  @MinLength(8)
  password: string;
}

export class SignUpResponse {
  @ApiProperty({
    type: String,
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    type: Number,
    description: 'User id',
  })
  userId: number;
}

export class LoginResponse {
  @ApiProperty({
    type: String,
    description: 'Access token',
  })
  access_token: string;
}
