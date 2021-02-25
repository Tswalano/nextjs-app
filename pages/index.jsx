import Layout from './../components/Layout';
import Link from 'next/link'
import { Error } from './../components/Error';

export default function Home({ pokemon, error }) {
  return (
    <Layout title={error ? "500 Server Error" : "Pokedex Application"}>


      <>
        {error ? <Error /> :
          (<>
            <h1 className="text-4xl mb-8 text-center">
              Welcome to Next.js App!
        </h1>

            <ul>
              {pokemon.map((res, idx) => (
                <li key={idx}>
                  <Link href={`/pokemon?id=${idx + 1}`}>
                    <a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-blue-100 rounded-md">
                      <img className="w-20 h-20 mr-3" src={res.image} alt={res.name} />
                      <span className="mr-2 font-bold">{idx + 1} .</span>
                      {res.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </>)}

      </>
    </Layout>
  )
}


export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const { results } = await res.json();
    const pokemon = results.map((pokeman, index) => {
      const paddedId = ('00' + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokeman, image };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        error: true,
        message: JSON.parse(JSON.stringify(err))
      }
    };
  }
}