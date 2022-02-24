import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [PostsResolver, PostsService, PrismaService],
})
export class PostsModule {}
