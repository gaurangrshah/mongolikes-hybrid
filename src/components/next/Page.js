import Head from "next/head";

export default function Page({ description, title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      {children}
    </>
  );
}
