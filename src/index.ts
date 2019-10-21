
import * as newrelic from 'newrelic';

const TEST_TRANS = 'TEST_TRANS_1';

export default class NewLambdaHandler {
  static setLambdaHandler(lambdaFunc: any): Function {
    return async (...args: any) => newrelic.setLambdaHandler(lambdaFunc(args));
  }

  static runNewRelicInTheBackground(lambdaFunc: any): Function {
    return async (event: any, context: any) =>
      newrelic.startBackgroundTransaction(
        event && event.source ? event.source : TEST_TRANS, // Transaction name
        async () => {
          // Promise to return
          try {
            return await lambdaFunc(event, context);
          } catch (error) {
            newrelic.noticeError(error); // catch errors that escape startBackgroundTransaction handler
            throw error;
          }
        }
      );
  }
}
