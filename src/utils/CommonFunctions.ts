import axios from "axios";
import { get } from "lodash";
import { MockResponse } from "types/mock_response";

export function generateMessageError<T extends object>(error: unknown): T {
  return <T>{
    ok: false,
    message: get(error, "message", ""),
  };
}

export async function callMockService(): Promise<MockResponse> {
  const githubAPI: string = <string>process.env.MOCK_API_URL;
  const resp = await axios.get(githubAPI)

  return <MockResponse>resp.data;
}
