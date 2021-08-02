import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";

import Page from "@/components/next/Page";
import { jsonFetcher } from "@/utils";

export default function LandingPage({ initialData }) {
  const { data, loading } = useSWR(
    `${process.env.NEXT_PUBLI_SITE_URL}/api/data`,
    jsonFetcher,
    {
      initialData,
    }
  );

  if (loading) return <Spinner />;
  return (
    <>
      <Page title='Test Render' />
      {data && <div>{JSON.stringify(data, null, 2)}</div>}
    </>
  );
}

export async function getStaticProps(ctx) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`);
  const data = await response.json();
  if (data) return { props: { initialData: data || "What is this" } };
}
