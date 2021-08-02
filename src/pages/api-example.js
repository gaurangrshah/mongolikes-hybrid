import { Code } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <h1>API Example</h1>
      <p>The examples below show responses from the example API endpoints.</p>
      <p>
        <em>You must be signed in to see responses.</em>
      </p>
      <h2>Session</h2>
      <p>/api/examples/session</p>
      <Code as='iframe' src='/api/z_examples/session' />
      <Code as='iframe' src='/api/posts' />
      <h2>JSON Web Token</h2>
      <p>/api/examples/jwt</p>
      <Code as='iframe' src='/api/z_examples/jwt' />
    </>
  );
}
