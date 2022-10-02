
import React, { ReactElement} from 'react';
import Widget from '../components/Widget';
import styles from "../styles/default.css";
import * as utils from '../utils';
import { useLoaderData } from '@remix-run/react';
import { Data } from '../utils/types';

export function links() {
    return [
      {
        rel: "stylesheet",
        href: styles,
      },
    ];
  }

  export async function loader({ params }): Promise<Data> {
    const place = utils.api.places.find(
      ({ city }) => utils.toSlug(city) === params.name,
  );

  if (!place) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return {
            name: place.city,
            cities: utils.api.places.map(({ city }) => city),
            weather: await utils.api.fetch(`${place.city}, ${place.country}`),
        };
  }

export default function Home(): ReactElement {
  const data = useLoaderData<Data>();

    return (
        <section className="container">
            <Widget data={data}  />
        </section>
    );
}
