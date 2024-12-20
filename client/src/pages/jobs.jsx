import React, { useState } from 'react'

const SearchJobs = () => {
    const [search, setSearch] = useState('');
    const [submittedSearch, setSubmittedSearch] = useState('');

    const handleClick = () => {
        setSubmittedSearch(search);
    };

    const searchWords = search.split(' ');

    const Indeed = searchWords.length >= 5
        ? `https://in.indeed.com/jobs?q=${searchWords[0]}+${searchWords[1]}+${searchWords[2]}+${searchWords[3]}+${searchWords[4]}`
        : searchWords.length === 4
            ? `https://in.indeed.com/jobs?q=${searchWords[0]}+${searchWords[1]}+${searchWords[2]}+${searchWords[3]}`
            : searchWords.length >= 3
                ? `https://in.indeed.com/jobs?q=${searchWords[0]}+${searchWords[1]}+${searchWords[2]}`
                : searchWords.length === 2
                    ? `https://in.indeed.com/jobs?q=${searchWords[0]}+${searchWords[1]}`
                    : searchWords.length === 1
                        ? `https://in.indeed.com/jobs?q=${searchWords[0]}`
                        : '';


    const Naukri = searchWords.length >= 5
        ? `https://www.naukri.com/${searchWords[0]}-${searchWords[1]}-${searchWords[2]}-${searchWords[3]}-${searchWords[4]}-jobs`
        : searchWords.length === 4
            ? `https://www.naukri.com/${searchWords[0]}-${searchWords[1]}-${searchWords[2]}-${searchWords[3]}-jobs`
            : searchWords.length >= 3
                ? `https://www.naukri.com/${searchWords[0]}-${searchWords[1]}-${searchWords[2]}-jobs`
                : searchWords.length === 2
                    ? `https://www.naukri.com/${searchWords[0]}-${searchWords[1]}-jobs`
                    : searchWords.length === 1
                        ? `https://www.naukri.com/${searchWords[0]}-jobs`
                        : '';

    const Unstop = searchWords.length >= 5
        ? `https://unstop.com/jobs?searchTerm=${searchWords[0]}%20${searchWords[1]}%20${searchWords[2]}%20${searchWords[3]}%20${searchWords[4]}`
        : searchWords.length === 4
            ? `https://unstop.com/jobs?searchTerm=${searchWords[0]}%20${searchWords[1]}%20${searchWords[2]}%20${searchWords[3]}`
            : searchWords.length >= 3
                ? `https://unstop.com/jobs?searchTerm=${searchWords[0]}%20${searchWords[1]}%20${searchWords[2]}`
                : searchWords.length === 2
                    ? `https://unstop.com/jobs?searchTerm=${searchWords[0]}%20${searchWords[1]}`
                    : searchWords.length === 1
                        ? `https://unstop.com/jobs?searchTerm=${searchWords[0]}`
                        : '';


    return (
        <div>
            <p className='font-semibold text-center text-zinc-950 p-4 text-3xl mt-5'>Search Jobs</p>
            <div className='flex flex-row  justify-end mr-4 gap-4 '>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className="border border-slate-600 p-1" type="text" placeholder='Enter Role' />
                <p onClick={handleClick} className='text-zinc-950 border px-4 py-1 cursor-pointer hover:scale-105 hover:bg-blue-600 bg-blue-500'>Search</p>
            </div>

            {/* Job Lists */}

            {
                submittedSearch && (
                    <>
                        <div className='flex flex-col border bg-neutral-200 mt-10 p-7'>
                            <div className='flex flex-row items-center'>
                                <div>
                                    <p className='font-semibold text-zinc-950 text-2xl'>Jobs For: {submittedSearch}</p>
                                    <p className='text-gray-700 text-lg mt-5'>
                                        Discover the latest job openings for <strong>{submittedSearch}</strong> on Unstop! Don't miss out – be the first to grab the opportunity and apply today.
                                    </p>
                                </div>
                                <button onClick={() => window.open(Unstop, '_blank')} className='bg-blue-500 text-white px-6 py-2 rounded-3xl hover:scale-105 hover:bg-blue-600 ml-auto'>
                                    Apply Now
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col border bg-neutral-200 mt-5 p-7'>
                            <div className='flex flex-row items-center'>
                                <div>
                                    <p className='font-semibold text-zinc-950 text-2xl'>Jobs For: {submittedSearch}</p>
                                    <p className='text-gray-700 text-lg mt-5'>
                                        Discover the latest job openings for <strong>{submittedSearch}</strong> on Indeed! Don't miss out – be the first to grab the opportunity and apply today.
                                    </p>
                                </div>
                                <button onClick={() => window.open(Indeed, '_blank')} className='bg-blue-500 text-white px-6 py-2 rounded-3xl hover:scale-105  hover:bg-blue-600 ml-auto'>
                                    Apply Now
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col border bg-neutral-200 mt-5 p-7'>
                            <div className='flex flex-row items-center'>
                                <div>
                                    <p className='font-semibold text-zinc-950 text-2xl'>Jobs For: {submittedSearch}</p>
                                    <p className='text-gray-700 text-lg mt-5'>
                                        Discover the latest job openings for <strong>{submittedSearch}</strong> on Naukri! Don't miss out – be the first to grab the opportunity and apply today.
                                    </p>
                                </div>
                                <button onClick={() => window.open(Naukri, '_blank')} className='bg-blue-500 text-white px-6 py-2 rounded-3xl hover:scale-105  hover:bg-blue-600 ml-auto'>
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default SearchJobs
