import { ChatCompletionResponseMessage, Configuration, OpenAIApi } from 'openai';

class OpenAI {
  public client: OpenAIApi;

  constructor(apiKey: string, organization: string) {
    const configuration = new Configuration({ 
      organization: organization,
      apiKey: apiKey
    });
    this.client = new OpenAIApi(configuration);
  }

  async chat(message: string): Promise<ChatCompletionResponseMessage | undefined> {
    console.log("question:")
    console.log(message);
    console.log("response")
    const completion = await this.client.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message}],
    });
    console.log(completion.data.choices[0].message);
    return completion.data.choices[0].message
  }
}

export default OpenAI;
