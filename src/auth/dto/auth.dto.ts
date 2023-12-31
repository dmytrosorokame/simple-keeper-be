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
export class AuthResponse {
  @ApiProperty({
    type: String,
    description: 'Access token',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    description: 'Refresh token',
  })
  refreshToken: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    type: String,
    description: 'User email',
  })
  @IsEmail()
  email: string;
}

export class ResetPasswordResponse {
  @ApiProperty({
    type: String,
    description: 'Message',
  })
  message: string;
}
