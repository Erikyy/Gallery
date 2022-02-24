import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true }) title?: string;
  @Field({ nullable: true }) content?: string;
}
