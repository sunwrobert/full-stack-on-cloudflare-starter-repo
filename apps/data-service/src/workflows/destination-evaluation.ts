import {
  WorkflowEntrypoint,
  type WorkflowEvent,
  type WorkflowStep,
} from "cloudflare:workers";

export class DestinationEvaluationWorkflow extends WorkflowEntrypoint<
  Env,
  unknown
> {
  async run(_event: Readonly<WorkflowEvent<unknown>>, step: WorkflowStep) {
    const collectedData = await step.do(
      "Collect rendered destination page data",
      async () => {
        console.log("Collecting rendered destination page data");
        return {
          dummydata: "dummydata",
        };
      }
    );
    console.log(collectedData);
  }
}
