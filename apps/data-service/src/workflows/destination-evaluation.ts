import {
  WorkflowEntrypoint,
  type WorkflowEvent,
  type WorkflowStep,
} from "cloudflare:workers";
import puppeteer from "@cloudflare/puppeteer";
export class DestinationEvaluationWorkflow extends WorkflowEntrypoint<
  Env,
  unknown
> {
  async run(
    event: Readonly<WorkflowEvent<DestinationStatusEvaluationParams>>,
    step: WorkflowStep
  ) {
    const browser = await puppeteer.launch(this.env.VIRTUAL_BROWSER);
    const page = await browser.newPage();
    const response = await page.goto(event.payload.destinationUrl);

    await page.waitForNetworkIdle();

    const bodyText = (await page.$eval(
      "body",
      (el) => el.textContent
    )) as string;

    const html = await page.content();
    const status = response ? response.status() : 0;
    await browser.close();

    return {
      status,
      bodyText,
      html,
    };
  }
}
