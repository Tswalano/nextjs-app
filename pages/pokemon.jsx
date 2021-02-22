import Link from 'next/Link'
import React from 'react'
import { Error } from '../components/Error';
import Layout from '../components/Layout'
// import Link from 'next/link'

export default function Pokemon({ pokeman, error }) {
    return (
        <Layout title={error ? "500 Server Error" : pokeman.name}>

            {error ? <Error /> : (

                <>
                    <div className="grid grid-flow-col grid-cols-2 gap-2">
                        <p className="items-center">
                            <Link href="/" >
                                <a className="px-4 py-2 rounded-md bg-red-100 text-red-700 w-auto">
                                    Back
                            </a>
                            </Link>
                        </p>
                        <h1 className="text-4xl mb-2 capitalize">{pokeman.name}</h1>
                    </div>
                    <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />

                    <div class="grid grid-flow-col grid-cols-2 gap-2">
                        <div className="shadow-lg p-5 rounded bg-blue-100">
                            <p><span className="font-bold mr-2">Weight: </span> {pokeman.weight}</p>
                            <p><span className="font-bold mr-2">Height: </span> {pokeman.height}</p>
                        </div>
                        <div className="shadow-lg p-5 rounded bg-blue-100 flex items-center">
                            <h2 className="font-bold mr-2">Types</h2>
                            <div>
                                {pokeman.types.map((type, index) => (
                                    <p key={index}>{type.type.name}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    )
}


export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedId = ('00' + id).slice(-3);
        pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return {
            props: { pokeman },
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
