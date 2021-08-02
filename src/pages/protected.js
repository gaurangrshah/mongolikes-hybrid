import { Protected } from "@/components/auth";

export default function ProtectedPageExample() {
  return (
    <>
      <Protected>
        <h1>Restricted Content Accessed</h1>
        <p>
          <strong>{"\u00a0"}</strong>
        </p>
      </Protected>
    </>
  );
}
