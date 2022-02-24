import { Type } from '@nestjs/common';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PageInfo } from './pageinfo';

export function PaginatedReponse<TItem>(TItemClass: Type<TItem>) {
  @ObjectType(`${TItemClass.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => TItemClass)
    node: TItem;
  }

  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: Array<EdgeType>;

    @Field((type) => [TItemClass], { nullable: true })
    nodes: Array<TItem>;

    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field(() => Int)
    totalCount: number;
  }
  return PaginatedType;
}
