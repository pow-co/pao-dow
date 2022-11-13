import React, { useContext, useState } from 'react'
import { useBitcoin } from '../context/BitcoinContext';
import { useRelay } from '../context/RelayContext';

const WalletProviderPopUp = ({ onClose }) => {
  const [seed, setSeed] = useState("");
  const [checked, setChecked] = useState(false)
  const [error,setError] = useState(false)
  const { setWallet, authenticate } = useBitcoin()
  
  const handleTwetchAuth = async () => {
    setWallet("twetch")
    await authenticate()
    onClose();
  }

  const  handleRelayxAuth = async () => {
    setWallet("relayx")
    await authenticate();
    onClose();
  }

  const handleInputSeed = async (e) => {
    setError(false)
   setSeed(e.target.value)
  }

  const handleSubmitSeed = async (e) => {
    e.preventDefault()
    seedAuth(seed,()=>onClose(), ()=>setError(true));
    
  }


  return (
    <div className="fixed inset-0 ">
            <div className="flex flex-col h-screen">
              <div
                onClick={onClose}
                className="grow cursor-pointer"
              />
              <div className="flex ">
                <div
                  onClick={onClose}
                  className="grow cursor-pointer"
                />
                <div className="flex-col max-w-sm w-[310px] p-5 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <p className="text-2xl text-center font-bold text-gray-800 dark:text-gray-200">
                    Select Wallet
                  </p>
                  {/* <p className="text-center text-gray-700 dark:text-gray-300 text-sm mt-3 mb-2">
                    Don&apos;t have a RelayX account yet?{" "}
                    <a target="_blank" rel="noreferrer" href="https://relayx.com/">
                    <span className="text-blue-500 cursor-pointer font-semibold hover:underline">
                      register
                    </span>
                    </a>
                  </p> */}
                  {/* <form className='my-6 max-w-sm'>
                    <div className='py-4 px-3 bg-gray-200 dark:bg-gray-600 rounded-lg'>
                      <textarea autoFocus placeholder='Recovery Phrase' rows={3} className=' text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-600 focus:outline-none h-auto resize-none w-full' value={seed} onChange={handleInputSeed}></textarea>
                    </div>
                    <div className='border border-solid border-gray-300 dark:border-gray-500 rounded-xl py-5 px-2.5 my-5 flex cursor-pointer'>
                      <div onClick={()=>setChecked(!checked)} className='flex flex-col items-center justify-center mr-4 cursor-pointer'>
                        <div className='rounded-sm flex items-center justify-center h-4 w-4 bg-blue-500 p-0.5'>
                          <div className={`h-3.5 w-3.5 rounded-sm flex items-center justify-center ${checked ? "bg-transparent" : "bg-gray-100 dark:bg-gray-800"}`}>
                            {checked && (
                              <svg viewBox="0 0 16 12" fill="none" className="-ml-[0.33px] w-[6.67px] h-[4.71px] fill-white"><path fillRule="evenodd" clipRule="evenodd" d="M5.51948 7.90029L13.4173 0.26042C13.7763 -0.0868472 14.3546 -0.0868472 14.7136 0.26042L15.7308 1.24434C16.0897 1.59161 16.0897 2.15109 15.7308 2.47907L6.17763 11.7395C5.81863 12.0868 5.24026 12.0868 4.88127 11.7395L0.254285 7.26364C-0.0847616 6.93566 -0.0847616 6.37617 0.254285 6.02891L1.29137 5.04499C1.63041 4.69772 2.20879 4.69772 2.56778 5.04499L5.51948 7.90029Z"></path></svg>
                            )}
                          </div>
                        </div>
                      </div>
                      <label className='text-sm cursor-pointer text-gray-900 dark:text-white'>I understand that this product is experimental and not affiliated with Twetch.</label>
                    </div>
                    {error && <p className='mt-1 text-center text-sm text-red-500'>Public key not found</p>}
                    <button onClick={handleSubmitSeed} disabled={seed.length === 0 || !checked} className="w-full mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-500 leading-6 py-1 px-4 font-bold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50 transition duration-500 transform hover:-translate-y-1" >Sign In</button>
                  </form> 
                    <div className='mx-auto mb-6 max-w-sm flex'>
                      <div className='h-0.5 grow bg-gray-300 dark:bg-gray-500 mt-3'/>
                      <p className='mx-2 text-gray-500 dark:text-gray-300'>OR</p>
                      <div className='h-0.5 grow bg-gray-300 dark:bg-gray-500 mt-3'/>
                    </div>*/}
                      
                    <button 
                      onClick={handleTwetchAuth} 
                      className="cursor-pointer bg-gray-200 dark:bg-gray-700 flex w-full mt-8 h-[52px] rounded-full py-2.5 px-5 border-none items-center text-center justify-center font-semibold cursor-pointer">
                      <svg
                        viewBox="0 0 102 110"
                        fill="none"
                        width="24"
                        height="24"
                        className="bg-gray-700 p-1 rounded"
                      >
                        <path
                          d="M3.66391 55.0011C-1.39212 46.1876 -1.04744 35.7272 3.66391 27.5017C8.37755 35.7272 8.72222 46.1876 3.66391 55.0011ZM3.66391 55.0011C-1.04744 63.2266 -1.39212 73.6871 3.66391 82.5006C8.72222 73.6871 8.37755 63.2266 3.66391 55.0011ZM51.0011 0C46.2898 8.22548 45.9451 18.6859 51.0011 27.4994C56.0572 18.6859 55.7125 8.22548 51.0011 0ZM51.0011 27.5017C46.2898 35.7272 45.9451 46.1876 51.0011 55.0011C56.0572 46.1876 55.7125 35.7272 51.0011 27.5017ZM51.0011 55.0011C46.2898 63.2266 45.9451 73.6871 51.0011 82.5006C56.0572 73.6871 55.7125 63.2266 51.0011 55.0011ZM51.0011 82.5006C46.2898 90.7261 45.9451 101.186 51.0011 110C56.0572 101.186 55.7125 90.7261 51.0011 82.5006ZM98.3361 27.5017C93.6247 35.7272 93.2801 46.1876 98.3361 55.0011C103.392 46.1876 103.047 35.7272 98.3361 27.5017ZM98.3361 55.0011C93.6247 63.2266 93.2801 73.6871 98.3361 82.5006C103.392 73.6871 103.047 63.2266 98.3361 55.0011ZM27.3325 13.7497C32.3908 22.5655 41.5647 27.4925 51.0011 27.4994C46.2761 19.2808 37.4469 13.7497 27.3325 13.7497ZM27.3325 13.7497C37.4469 13.7497 46.2761 8.21859 51.0011 0C41.5647 0.00689093 32.3908 4.93621 27.3325 13.7497ZM27.3325 13.7497C22.2765 22.5655 22.6212 33.026 27.3325 41.2514C32.0462 33.026 32.3908 22.5655 27.3325 13.7497ZM3.66619 27.4994C13.1026 27.4925 22.2765 22.5632 27.3325 13.7497C17.2182 13.7497 8.38896 19.2808 3.66619 27.4994ZM74.6675 13.7497C79.7258 22.5655 88.8997 27.4925 98.3361 27.4994C93.611 19.2808 84.7818 13.7497 74.6675 13.7497ZM74.6675 13.7497C69.6114 22.5655 69.9561 33.026 74.6675 41.2514C79.3811 33.026 79.7258 22.5655 74.6675 13.7497ZM51.0011 27.4994C60.4375 27.4925 69.6114 22.5632 74.6675 13.7497C64.5531 13.7497 55.7239 19.2808 51.0011 27.4994ZM51.0011 0C55.7239 8.21859 64.5554 13.7497 74.6675 13.7497C69.6114 4.93621 60.4375 0.00689093 51.0011 0ZM27.3325 41.2491C32.3908 50.0649 41.5647 54.992 51.0011 54.9989C46.2761 46.7803 37.4469 41.2491 27.3325 41.2491ZM27.3325 41.2491C37.4469 41.2491 46.2761 35.718 51.0011 27.4994C41.5647 27.5063 32.3908 32.4356 27.3325 41.2491ZM27.3325 41.2491C22.2765 50.0649 22.6212 60.5254 27.3325 68.7509C32.0462 60.5254 32.3908 50.0649 27.3325 41.2491ZM3.66619 55.0011C13.1026 54.9943 22.2765 50.0649 27.3325 41.2514C17.2182 41.2491 8.38896 46.7803 3.66619 55.0011ZM3.66619 27.4994C8.38896 35.718 17.2205 41.2491 27.3325 41.2491C22.2765 32.4356 13.1003 27.5063 3.66619 27.4994ZM74.6675 41.2491C79.7258 50.0649 88.8997 54.992 98.3361 54.9989C93.611 46.7803 84.7818 41.2491 74.6675 41.2491ZM74.6675 41.2491C84.7818 41.2491 93.611 35.718 98.3361 27.4994C88.8997 27.5063 79.7258 32.4356 74.6675 41.2491ZM74.6675 41.2491C69.6114 50.0649 69.9561 60.5254 74.6675 68.7509C79.3811 60.5254 79.7258 50.0649 74.6675 41.2491ZM51.0011 55.0011C60.4375 54.9943 69.6114 50.0649 74.6675 41.2514C64.5531 41.2491 55.7239 46.7803 51.0011 55.0011ZM51.0011 27.4994C55.7239 35.718 64.5554 41.2491 74.6675 41.2491C69.6114 32.4356 60.4375 27.5063 51.0011 27.4994ZM27.3325 68.7509C32.3908 77.5667 41.5647 82.4937 51.0011 82.5006C46.2761 74.282 37.4469 68.7509 27.3325 68.7509ZM27.3325 68.7509C37.4469 68.7509 46.2761 63.2197 51.0011 55.0011C41.5647 55.008 32.3908 59.9351 27.3325 68.7509ZM27.3325 68.7509C22.2765 77.5667 22.6212 88.0271 27.3325 96.2526C32.0462 88.0248 32.3908 77.5644 27.3325 68.7509ZM3.66619 82.5006C13.1026 82.4937 22.2765 77.5644 27.3325 68.7509C17.2182 68.7509 8.38896 74.282 3.66619 82.5006ZM3.66619 55.0011C8.38896 63.2197 17.2205 68.7509 27.3325 68.7509C22.2765 59.9351 13.1003 55.008 3.66619 55.0011ZM74.6675 68.7509C79.7258 77.5667 88.8997 82.4937 98.3361 82.5006C93.611 74.282 84.7818 68.7509 74.6675 68.7509ZM74.6675 68.7509C84.7818 68.7509 93.611 63.2197 98.3361 55.0011C88.8997 55.008 79.7258 59.9351 74.6675 68.7509ZM74.6675 68.7509C69.6114 77.5667 69.9561 88.0271 74.6675 96.2526C79.3811 88.0248 79.7258 77.5644 74.6675 68.7509ZM51.0011 82.5006C60.4375 82.4937 69.6114 77.5644 74.6675 68.7509C64.5531 68.7509 55.7239 74.282 51.0011 82.5006ZM51.0011 55.0011C55.7239 63.2197 64.5554 68.7509 74.6675 68.7509C69.6114 59.9351 60.4375 55.008 51.0011 55.0011ZM27.3325 96.2503C32.3908 105.066 41.5647 109.993 51.0011 110C46.2761 101.781 37.4469 96.2503 27.3325 96.2503ZM27.3325 96.2503C37.4469 96.2503 46.2761 90.7192 51.0011 82.5006C41.5647 82.5075 32.3908 87.4368 27.3325 96.2503ZM3.66619 82.5006C8.38896 90.7192 17.2205 96.2503 27.3325 96.2503C22.2765 87.4368 13.1003 82.5075 3.66619 82.5006ZM74.6675 96.2503C84.7818 96.2503 93.611 90.7192 98.3361 82.5006C88.8997 82.5075 79.7258 87.4368 74.6675 96.2503ZM51.0011 110C60.4375 109.993 69.6114 105.064 74.6675 96.2503C64.5531 96.2503 55.7239 101.781 51.0011 110ZM51.0011 82.5006C55.7239 90.7192 64.5554 96.2503 74.6675 96.2503C69.6114 87.4368 60.4375 82.5075 51.0011 82.5006Z"
                          fill="white"
                        ></path>
                      </svg>
                      <p className="text-gray-800 dark:text-gray-200 ml-2.5 ">Twetch</p>
                      <div className="grow" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                      
                    <button 
                        onClick={handleRelayxAuth}  
                        className=" bg-gray-200 dark:bg-gray-700 flex w-full mt-8 h-[52px] rounded-full py-2.5 px-5 border-none items-center text-center justify-center font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle cx="12" cy="12" r="12" fill="#2669FF" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.37486 8.02608C5.3852 8.01494 5.39556 8.00383 5.40596 7.99275L5.74275 7.65596C5.62697 7.76465 5.51465 7.87698 5.40596 7.99275L5.37486 8.02608Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.625 10.875C20.625 6.73286 17.2671 3.375 13.125 3.375C10.9683 3.375 9.02415 4.28535 7.65596 5.74275L5.74275 7.65596L5.40596 7.99275C5.39556 8.00383 5.3852 8.01494 5.37486 8.02608C4.13377 9.3642 3.375 11.156 3.375 13.125C3.375 17.2671 6.73286 20.625 10.875 20.625C12.8917 20.625 14.7225 19.829 16.0704 18.5341L18.4578 16.1486C19.7977 14.7938 20.625 12.931 20.625 10.875ZM15.8158 15.8158C15.0166 16.2521 14.0997 16.5 13.125 16.5C10.0184 16.5 7.5 13.9816 7.5 10.875C7.5 9.90027 7.74792 8.98345 8.18415 8.18415C8.98345 7.74793 9.90027 7.5 10.875 7.5C13.9816 7.5 16.5 10.0184 16.5 13.125C16.5 14.0997 16.2521 15.0166 15.8158 15.8158ZM11.0933 5.62812C15.062 5.74155 18.2585 8.93804 18.3719 12.9067C18.6161 12.2765 18.75 11.5914 18.75 10.875C18.75 7.7684 16.2316 5.25 13.125 5.25C12.4086 5.25 11.7235 5.38393 11.0933 5.62812ZM5.25 13.125C5.25 12.4086 5.38393 11.7235 5.62812 11.0933C5.74155 15.062 8.93804 18.2585 12.9067 18.3719C12.2765 18.6161 11.5914 18.75 10.875 18.75C7.7684 18.75 5.25 16.2316 5.25 13.125Z"
                            fill="white"
                          />
                        </svg>
                        <p className="text-gray-800 dark:text-gray-200 ml-2.5 ">RelayX</p>
                        <div className="grow" />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                </div>
                <div
                  onClick={onClose}
                  className="grow cursor-pointer"
                />
              </div>
              <div
                onClick={onClose}
                className="grow cursor-pointer"
              />
            </div>
          </div>
  )
}

export default WalletProviderPopUp