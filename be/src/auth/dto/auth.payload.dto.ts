import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayloadDto {
  @Field() access_token: string;
  @Field() user: string;
  @Field() expiresIn: string;
}
