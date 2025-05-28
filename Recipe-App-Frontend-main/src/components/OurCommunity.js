import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Renders a video element with the specified video source.
 * @param {Object} props - The component props.
 * @param {string} props.video - The video name.
 * @returns {JSX.Element} The VideoSection component.
 */
const VideoSection = ({ video }) => {
  return (
    <div>
      <video
        className="rounded-3xl lg:h-[600px]"
        width="320"
        height="240"
        muted={true}
        controls
        autoPlay
        loop
      >
        <source src={`./videos/${video}video.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

/**
 * Represents the "Our Community" section of the website.
 * @returns {JSX.Element} The OurCommunity component.
 */
const OurCommunity = () => {
  const videos = ["cake", "pasta", "meat"];

  return (
    <section className="lg:mt-9 md:max-w-6xl mx-auto">
      <div className="px-6 py-10 overflow-hidden shadow-xl rounded-3xl bg-cool-indigo-600 font-display">
        <div className="">
          <h2 className="text-4xl font-extrabold text-black tracking-tight sm:text-4.5xl font-display">
            Our Community
          </h2>
          <p className="font-extrabold max-w-2xl mx-auto mt-3 mb-6 text-lg text-cool-indigo-100">
            Follow us to stay up to date on all things Recipes For Everyone
          </p>
        </div>
        <section className="flex flex-col h-fit justify-evenly items-center bg-video content-center md:grid md:grid-cols-3">
          {videos.map((video, index) => (
            <article key={index} className="flex flex-col justify-center items-center m-3">
              <VideoSection video={video} />
              <img src="./images/blackarrow.gif" alt="blackarrow" className="ml-auto hidden md:block" />
              <NavLink
                to={`category/${video}`}
                className="justify-center btn bg-orange-500 text-white rounded-lg py-3 px-6 shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-bold uppercase text-1xl text-center leading-none mt-4 md:mt-0 lg:mt-0"
              >
                {video} Recipes
              </NavLink>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
};

export default OurCommunity;
