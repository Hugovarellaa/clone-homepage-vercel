import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.news</title>
      </Head>

      <main className={styles.cotainer}>
        <section className={styles.hero}>
          <span>
            👏 <strong>Hey, welcome</strong>
          </span>
          <h1>
            News about <br />
            the <span>React </span>world
          </h1>
          <p>
            Get acess to all the publications
            <br /> <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1JsSzEH6aihmDxYbnis4Pjbe");

  const product = {
    priceId: price.id,
    amount: Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  console.log(product);

  return {
    props: { product },
    revalidate: 60 * 24 * 24,
  };
};
