import { GetStaticProps } from "next";
import useSWR from "swr";

type Result = {
  chartName: string;
  time: {
    updated: string;
  };
  bpi: {
    USD: {
      code: string;
      rate: number;
    };
    GBP: {
      code: string;
      rate: number;
    };
    EUR: {
      code: string;
      rate: number;
    };
  };
};

const fetcher = async (): Promise<Result> => {
  const res = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);
  return res.json();
};

export const getStaticProps: GetStaticProps = async () => {
  const result = await fetcher();
  return { props: { result }, revalidate: 60 };
};

export default function Bitcoin({ result }: { result: Result }) {
  const { data } = useSWR("/bitcoin", fetcher, {
    initialData: result,
    refreshInterval: 1000,
  });

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{data.chartName}</h1>
      <h2>{data.time.updated}</h2>
      <ul>
        <li>
          {data.bpi.USD.code}: ${data.bpi.USD.rate}
        </li>
        <li>
          {data.bpi.GBP.code}: ${data.bpi.GBP.rate}
        </li>
        <li>
          {data.bpi.EUR.code}: ${data.bpi.EUR.rate}
        </li>
      </ul>
    </div>
  );
}
