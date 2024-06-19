import Image from "next/image";

import NFTFrame from "./components/NFTComponent";
 

export default function Home() {
    //This should be the path to the media file
    let mediaName = "/car.mp4";
    //override the media type, can pass video or image
    let mediaType = "video";
    //This will allow us to load different NFT Frames
    let frameType = "newFrameBox";
    //We're not using aspect ratio for now, but logic is in place. You should keep this as 9x16 for now
    let aspectRatio = "9x16";

  return (



      <div>
       

       {/* This is our basic modal, You could replace this. Our Component targets the ID of the content-layer to display the media. It adds makeModal to it to apply the trasition after the cube has finished its animation. */}

       <div
               id="content-layer"
               className="absolute top-0 left-0 w-full h-full flex items-center justify-center invisible"
               >
               <div className="w-auto h-full max-w-full max-h-full flex items-center justify-center relative">
                 <div className="self-center flex items-center justify-center p-4 m-4  max-h-full">
                    <div className="tl-box corners">  </div>
                     <div className="tr-box corners">  </div>
                         {mediaType === "video" && (
                           <video className="max-w-full max-h-full w-auto h-auto self-center" controls autoPlay loop muted playsInline>
                             <source src={mediaName} type="video/mp4" />
                           </video>
                         )}
                         {mediaType === "image" && (
                           <Image
                             src={mediaName}
                             alt=""
                             width={1200}
                             height={1200}
                             className="max-w-full max-h-full w-auto h-auto self-center"
                           />
                         )}
                    <div className="bl-box corners">  </div>
                     <div className="br-box corners">  </div>
                   <div id="closeModal" className="absolute w-full h-full top-0 bottom-0">  </div>
                  </div>
               </div>
               </div>
       

       
              {/* This is our main component It has some basic tailwind to provide some structure. You might want to adjust / fix the heght of the canvasWrap */}

       
           <main className="flex w-full flex-col items-center justify-between">
           <div id="canvasWrap" className='w-full h-[500px] relative bg-black animate-in'>
               <NFTFrame mediaName={mediaName} mediaType={mediaType} frameType={frameType} />
            </div>
           </main>
       
       

       
       </div>






//sample interface below:


// <div className="w-[414px] h-[816px] border border-gray-600 mx-auto grid grid-rows-2 relative">
       
//        <div
//                id="content-layer"
//                className="absolute top-0 left-0 w-full h-full flex items-center justify-center invisible"
//                >
//                <div className="w-auto h-full max-w-full max-h-full flex items-center justify-center relative">
//                  <div className="self-center flex items-center justify-center p-4 m-4  ">
//                     <div className="tl-box corners">  </div>
//                      <div className="tr-box corners">  </div>
//                          {mediaType === "video" && (
//                            <video className="max-w-full max-h-full self-center" controls autoPlay loop muted playsInline>
//                              <source src={mediaName} type="video/mp4" />
//                            </video>
//                          )}
//                          {mediaType === "image" && (
//                            <Image
//                              src={mediaName}
//                              alt=""
//                              width={1200}
//                              height={1200}
//                              className="max-w-full max-h-full w-auto h-auto"
//                            />
//                          )}
//                     <div className="bl-box corners">  </div>
//                      <div className="br-box corners">  </div>
//                    <div id="closeModal" className="absolute w-full h-full top-0 bottom-0">  </div>
//                   </div>
//                </div>
//                </div>
       
//            <div className="bg-gray-900 w-full h-full">
       
       
       
//            <main className="flex w-full flex-col items-center justify-between">
//                <NFTFrame mediaName={mediaName} mediaType={mediaType} frameType={frameType} />
//            </main>
       
       
       
//              </div>
//              <div className="bg-gray-700 w-full h-full">
                   
//                      <Image
//                        src="/sample-interface.png"
//                        alt=""
//                        width={1200}
//                        height={1200}
//                        className="max-w-full max-h-full w-full h-auto"
//                      />
//            </div>
       
//        </div>




  
)}
