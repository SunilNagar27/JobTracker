import React, { useState } from 'react';
import Loader from '../components/Loader'; // Import your Loader component

const SearchJobs = () => {
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state

  const handleClick = () => {
    setLoading(true); // Start loading
    setSubmittedSearch(''); // Clear previous search results
    setTimeout(() => {
      setSubmittedSearch(search); // Set the search after 1 second
      setLoading(false); // Stop loading
    }, 1000); // 1 second delay
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
    <div className="px-6 py-8">
      <p className='text-teal-500 font-semibold text-4xl text-center mb-6'>Search Jobs</p>
      <div className='flex flex-col sm:flex-row justify-end sm:mr-4 gap-4 p-4'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 placeholder-gray-400 text-white border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
          type="text"
          placeholder='Enter Role'
        />
        <p
          onClick={handleClick}
          className="bg-teal-500 hover:bg-teal-600 text-zinc-950 px-6 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transform"
        >
          Search
        </p>
      </div>
      {
        
      }

      {loading && <Loader />} {/* Display the loader while loading */}

      {submittedSearch && !loading ? (
        <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-6">
          <div className="overflow-auto max-h-[70vh] w-full sm:w-10/12 flex flex-col gap-6">
            <div className="flex flex-col border-black shadow-teal-700 shadow-sm rounded-xl bg-primary p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <div>
                  <p className="font-semibold text-neutral-200 text-2xl">Jobs For: {submittedSearch}</p>
                  <p className="text-neutral-300 text-md mt-5">
                    Discover the latest job openings for <strong>{submittedSearch}</strong> on Unstop! Don't miss out – be the first to grab the opportunity and apply today.
                  </p>
                </div>
                <button
                  onClick={() => window.open(Unstop, '_blank')}
                  className="bg-teal-500 text-zinc-950 hover:bg-teal-600 px-6 py-2 rounded-3xl hover:scale-105 mt-4 sm:mt-0 sm:ml-auto"
                >
                  Apply Now
                </button>
              </div>
            </div>

            <div className="flex flex-col border-black shadow-teal-700 shadow-sm rounded-xl bg-primary p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <div>
                  <p className="font-semibold text-neutral-200 text-2xl">Jobs For: {submittedSearch}</p>
                  <p className="text-neutral-300 text-md mt-5">
                    Discover the latest job openings for <strong>{submittedSearch}</strong> on Indeed! Don't miss out – be the first to grab the opportunity and apply today.
                  </p>
                </div>
                <button
                  onClick={() => window.open(Indeed, '_blank')}
                  className="bg-teal-500 text-zinc-950 hover:bg-teal-600 px-6 py-2 rounded-3xl hover:scale-105 mt-4 sm:mt-0 sm:ml-auto"
                >
                  Apply Now
                </button>
              </div>
            </div>

            <div className="flex flex-col border-black shadow-teal-700 shadow-sm rounded-xl bg-primary p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <div>
                  <p className="font-semibold text-neutral-200 text-2xl">Jobs For: {submittedSearch}</p>
                  <p className="text-neutral-300 text-md mt-5">
                    Discover the latest job openings for <strong>{submittedSearch}</strong> on Naukri! Don't miss out – be the first to grab the opportunity and apply today.
                  </p>
                </div>
                <button
                  onClick={() => window.open(Naukri, '_blank')}
                  className="bg-teal-500 text-zinc-950 hover:bg-teal-600 px-6 py-2 rounded-3xl hover:scale-105 mt-4 sm:mt-0 sm:ml-auto"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ):
      (
        <div>
          <p className='text-center text-neutral-300 mt-20 text-xl font-semibold'>Explore Job Listings for Your Ideal Role</p>
          </div>
      )}
    </div>
  );
};

export default SearchJobs;
