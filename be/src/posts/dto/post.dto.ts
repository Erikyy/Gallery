import { Field, ObjectType } from '@nestjs/graphql';
import { PaginatedReponse } from 'src/common/paginated';

@ObjectType()
export class PostDto {
  @Field() id: string;
  @Field() title: string;
  @Field() content: string;
}

@ObjectType()
export class PostConnection extends PaginatedReponse(PostDto) {}
