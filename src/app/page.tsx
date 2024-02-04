"use client"
// import Image from "next/image";
// import Link from "next/link";
import { useState, useEffect } from 'react'




const API = "http://localhost:3000/api/school-data";
export default function Home() {

  const [schoolData, setSchoolData] = useState({ data: [], meta: {} })
  const [isLoading, setLoading] = useState(true)
  const [hasMoreData, setHasMoreData] = useState(false);
  const [searchText, setSearchText]  = useState('');
  const [filterData, setFilterData] = useState([]);


  let finalData = filterData.length > 0 ? filterData :schoolData.data;
  useEffect(() => {
    setLoading(true);
    const result = fetch(API, { headers: { "Content-Type": "application/json" } })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSchoolData(data)
        if (data.data.length === 10) {
          setHasMoreData(true);
        }

      });
    setLoading(false);
  }, [])

  useEffect(()=>{
    if(searchText !== ''){
      console.log(searchText, schoolData);
      const filterSearchData  = schoolData?.data.filter(item =>  item?.name.includes(searchText))
      setFilterData(filterSearchData);
    }else{
      setFilterData([])
    }
  },[searchText])

  const getNextBatchData = () => {
    setLoading(true);
    const { meta } = schoolData;
    const newPage = parseInt(meta.page) + 1;
    if (!hasMoreData) {
      return null;
      setLoading(false);
    }
    fetch(`${API}?page=${newPage}`, { headers: { "Content-Type": "application/json" } })
      .then(res => res.json())
      .then(newData => {
        console.log(newData);

        if (!newData.data.length) {
          setHasMoreData(false);
        } else {
          const finalData = {
            ...newData,
            data: [
              ...schoolData.data,
              ...newData.data
            ]
          }
          setSchoolData(finalData)
        }
        setLoading(false);
      })
  }







  return (
    <>

      <div className="Search_container">

        {/* <h1 className="  capitalize  mb-5  text-4xl font-semibold mb-5 leading-1 mt-4 text-center">school</h1> */}

        <div className='max-w-md mx-auto mt-8'>
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="search"
              id="search"
              placeholder="Search a school..." 
              onChange={(e) => setSearchText(e.target.value)}/>
          </div>
        </div>

        {isLoading &&
          <div className="loader">
            <div role="status">
              <svg aria-hidden="true" className="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
        {/* card section  */}
        <div className="card grid    grid-flow-row grid-cols-5  mt-5  justify-center gap-5">
          {/* card */}


          {finalData.map((item, index) => (
            <div key={index} className="max-w-lg mt-3 cards w-100 h-fit rounded-md overflow-hidden">
              <img src={item.image} width='auto' height='100' />
              <div className="px-2 py-2 m-4">
                <h1 className=" text-justify   mb-2   font-medium text-xl"> <span className=' text-black  font-bold'>School Name : </span>{item.name}</h1>
                <span>
                  <p className=" text-stone-900  mt-4   text-lg mb-3 mx-1"> <span className=' text-black  font-bold'>Address : </span>{item.address} </p>
                  <p className="text-stone-900  text-lg mb-4  mx-1"> <span className=' text-black  font-bold'> City :   </span>{item.city} </p>
                </span>
              </div>
            </div>
          ))}

          {/* end card*/}
        </div>
        {/* end card section*/}

        <div className="next_btn">
          {hasMoreData &&
            <button onClick={() => getNextBatchData()} className=" text-center">Next</button>
          }
        </div>
      </div>
    </>
  );
}
