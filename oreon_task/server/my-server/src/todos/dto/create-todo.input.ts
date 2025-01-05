import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {

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
