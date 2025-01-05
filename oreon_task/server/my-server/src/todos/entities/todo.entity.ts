import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

    @Field()
    id: string;

    @Field()
    taskSchedule: string;

    @Field()
    taskName: string;

    @Field()
    taskDescription: string;

    @Field()
    isDone: boolean;

}
