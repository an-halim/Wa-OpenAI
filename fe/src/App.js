import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className='h-screen bg-slate-900'>
      <div className='max-w-4xl mx-auto px-8 py-8 sm:px-6 md:px-8 lg:px-10'>
        <ol className='relative border-l border-gray-200 dark:border-gray-700'>
          {/* <li className='mb-10 ml-6'>
            <span className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900'>
              <svg
                aria-hidden='true'
                className='w-3 h-3 text-blue-600 dark:text-blue-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <h3 className='flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
              Flowbite Application UI v2.0.0{" "}
              <span className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
                Latest
              </span>
            </h3>
            <time className='block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
              Released on January 13th, 2022
            </time>
            <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
              Get access to over 20+ pages including a dashboard layout, charts,
              kanban board, calendar, and pre-order E-commerce &amp; Marketing
              pages.
            </p>
            <a
              href='#'
              className='inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700'>
              <svg
                className='mr-2 w-4 h-4'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z'
                  clipRule='evenodd'
                />
              </svg>{" "}
              Download ZIP
            </a>
          </li> */}
          <li className='mb-10 ml-6'>
            <span className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900'>
              <svg
                aria-hidden='true'
                className='w-3 h-3 text-blue-600 dark:text-blue-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <h3 className='mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
              Web base v1.0.0{" "}
              <span className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
                Latest
              </span>
            </h3>
            <time className='block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
              Released on December 19, 2022
            </time>
            <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
              This is the first version of the web base. It is still in beta,
              its only display update log, next update will be the full version.
            </p>
          </li>
          <li className='ml-6'>
            <span className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900'>
              <svg
                aria-hidden='true'
                className='w-3 h-3 text-blue-600 dark:text-blue-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <h3 className='mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
              WhatsApp Bot v1.0.0
            </h3>
            <time className='block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
              Released on December 15, 2022
            </time>
            <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
              Implement OpenAI's GPT-3 API to build a WhatsApp bot that can chat
              with you. this is first versions that only supports terminal UI
            </p>
            <a
              href={'https://wa.me/6285155355177?text=Hi%20I%20want%20to%20use%20your%20bot'}
              className='inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700'>
              <img width={30} height={30} alt='chat' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADaklEQVR4nO2a+2uOYRjHP9jGjJm1XxxCk+NCJEVSyj9Aw2bzkx8soyXllMRPKMnwE4U0yWHI+Uzvi5XktDGHpuQ0pNCwOWy667t6sufZ+77b+7zPvXo/9fyw57qf677u977v67ru6x4kSWI9g4G5wBagErgH1AEf9NTp3TG1yQcGYQnDgY3AI6DF4/mix0v+ANgA5AYxgOnAOeCvwyDza28HCoFJQJbLd1mSmTblwH3H90bXGWBqIgZgfrXTjs7NclkJDO2EzmHAauClQ+9JvY873YAy4Ls6eqr90D2OfRhdBcAz9dEAlMZRPxnAYSn/AawCUvCPVGAt8FN9HpINnaI/UOWYhbEkjnHAc/V9y2PPRUUf4K4UXQMySTz9gBuy4U5HZqaHPIhRcAHoRXCkA5dly6lY9+UafWjcY1+CJxN4KJuMl4yK8cAv4JsCni2MkCdrAvKi+eCSRl6CfSyVbecjNZyhhtXaJ7aRAjyWjSa78OSoGi2IoDDcTu7U2Sccoe9iR3zx3FBmb9QDaQEOJBSh757AR6BRIaIN+VK0B/vZK1vnuAm3STgP+ymQrVvdhK1BZxT2M0a2XnQT1kpokjbbSZOtT9yE7xRw/Nzc4Q7oDnvYZI4Ub90Eb5Sm+zmQUAd0h2IdSLU+DDJBjMvSat3sJqfp0pt9s4RF2E9he+53toS7sZ99stXY3IYMea3PAaco4ShSlE8607umKIaDUlZoca61UO2MrZ6Y4lmzCg02pvGpjsA9LVLjE2q4DPsok21no60mNijgjMQeRsumRrnfqCjVyKtVkgmaLKBGNq2ItUS631HTMiWZoOgtG1q07GMu0xoXfEUKbgLZBDMTIdlQpUF1iHRH9d0UlyeSOCYALxyxJTMeLm+XFDYloEyUCqzTpjZ9VnRmJtyYL8Um3fcDE7eKHLNgCoSL/ehooDq4HWe9ubpGeCX9zbqDHILPB/6dHvISFTAWAZOBHJdjc7ZkxdLjvHv8o5uqKfhMa3V+lkv1r7yd3MkEsa/tyM3d43q/rtr+ZwDwW9Pv9OMm8l+XQe9VSjLV8gPyNDU6jtbrvtHccRwBNikFN3oTyg4Zu0R/5+hQ06T3tUohrCZPBpslshw47nCNrem057nAJq66rOtmLamZdCEqgNf6D4VKzUpXqEYmSUIc+Af+05ebWLVawwAAAABJRU5ErkJggg=='></img>{" "}
               Chat with bot
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default App;
