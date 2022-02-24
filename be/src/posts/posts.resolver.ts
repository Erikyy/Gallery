import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Public } from 'src/common/public.decorator';
import { Connection, Edge } from '@devoxa/prisma-relay-cursor-connection';
import { Post } from '@prisma/client';
import { PostConnection, PostDto } from './dto/post.dto';

@Resolver(() => PostDto)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Mutation(() => PostDto)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<PostDto> {
    return await this.postsService.create(createPostInput);
  }

  @Public()
  @Query(() => PostConnection, { name: 'posts' })
  async findAllPosts(): Promise<Connection<Post, Edge<Post>>> {
    return await this.postsService.findAll(5);
  }
}
