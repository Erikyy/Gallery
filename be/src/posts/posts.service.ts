import {
  Connection,
  Edge,
  findManyCursorConnection,
} from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostInput: CreatePostInput) {
    return await this.prisma.post.create({
      data: {
        content: createPostInput.content,
        title: createPostInput.title,
      },
    });
  }

  async findAll(take: number): Promise<Connection<Post, Edge<Post>>> {
    const result = await findManyCursorConnection(
      (args) => this.prisma.post.findMany(args),
      () => this.prisma.post.count(),
      {
        first: take,
      },
    );

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
