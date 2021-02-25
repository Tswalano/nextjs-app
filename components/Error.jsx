import React from 'react'
import Link from 'next/link'

export const Error = () => {
    return (
        <div>
            <h1 className="text-4xl mb-2 text-center capitalize">Error Loading Context</h1>
            <p className="items-center">
                <Link href="/" >
                    <a className="px-4 py-2 rounded-md bg-red-100 text-red-700 w-auto">
                        Back
                            </a>
                </Link>
            </p>
        </div>
    )
}
