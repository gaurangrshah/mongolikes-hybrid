import { Code } from "@chakra-ui/react";
import { Protected } from "@/components/auth";

export default function ApiStatusPage() {
  return (
    <>
      <h1>API Example</h1>
      <p>The examples below show responses from the example API endpoints.</p>

      <Protected>
        <h2>Session</h2>
        <p>/api/examples/session</p>
        <Code
          as='iframe'
          filter='invert(1)'
          w='full'
          rounded='sm'
          border='1px solid #ccc'
          h='10rem'
          src='/api/z_examples/session'
        />
        <p>/api/posts</p>

        <Code
          as='iframe'
          filter='invert(1)'
          w='full'
          rounded='sm'
          border='1px solid #ccc'
          h='10rem'
          src='/api/posts'
        />
        <h2>JSON Web Token</h2>
        <p>/api/examples/jwt</p>
        <Code
          as='iframe'
          filter='invert(1)'
          w='full'
          rounded='sm'
          border='1px solid #ccc'
          h='10rem'
          src='/api/z_examples/jwt'
        />
      </Protected>
    </>
  );
}
