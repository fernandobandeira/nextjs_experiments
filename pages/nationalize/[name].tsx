import { GetStaticProps, GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

type Params = {
  name: string;
};

type Result = {
  name: string;
  country: [
    {
      country_id: string;
      probability: number;
    }
  ];
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params as Params;

  const res = await fetch(`https://api.nationalize.io/?name=${name}`);
  if (!res.ok) return { notFound: true };

  const result = (await res.json()) as Result;
  return { props: { result } };
};

export default function Nationalize({ result }: { result: Result }) {
  if (!result) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{result.name}</h1>
      <ul>
        {result.country.map((country) => (
          <li key={country.country_id}>
            {country.country_id}: {country.probability}
          </li>
        ))}
      </ul>
    </div>
  );
}
