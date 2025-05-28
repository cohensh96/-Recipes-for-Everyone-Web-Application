
/**
 * Component representing the About Us page.
 *
 * @returns {JSX.Element} About Us page component.
 */
const AboutUsPage = () => {

    return (
<section>
        <div className="bg-orange-500">
        <div className="flex items-center justify-center">
            <div className="py-14 text-center px-5 sm:px-0">
                <h2 className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
                    <span className="block">About Recipes For Everyone</span>
                    <span className="block">Start cooking today.</span>
                </h2>
                <h2 className="text-gray-50 mt-5 tracking-wide text-sm sm:text-base">
                    <span className="block">Join to us for amazing cooking experience.</span>
                    
                </h2>
            </div>
        </div>
    </div>


    <div className="container max-w-5xl mx-auto m-8">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          About Us
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>

        <div className="flex flex-wrap align-center content-center">

          <div className="w-5/6 sm:w-1/2 p-6">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
            Who We Are
            </h3>
            <p className="text-gray-600 mb-8 font-bold">
            Rcipes For Everynne is here to help you cook delicious meals with less stress and more joy. We offer recipes and cooking advice for home cooks, by home cooks. Helping create “kitchen wins” is what we’re all about.
            </p>
          </div>
          <div className="w-full sm:w-1/2 p-6">
            <img src="/images/cook2.png" alt="cooking chef"  className="w-full sm:h-80 mx-auto" viewBox="0 0 1177 598.5" >
            </img>
          </div>
        </div>

        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-1/2 p-6 mt-6">
            <img src="/images/cook.png"  alt="cooking chef" className="w-full sm:h-80  mx-auto" viewBox="0 0 1176.60617 873.97852" >
            </img>
          </div>
          <div className="w-full sm:w-1/2 p-6 mt-6">
            <div className="align-middle">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              Recipe Development & Testing
              </h3>
              <p className="text-gray-600 mb-8 font-bold">
              Our recipes primarily use fresh, unprocessed ingredients but we also believe there is a time and a place for canned, frozen, and other prepared ingredients.
              There are three things we think about when deciding if a recipe is good enough to go on Simply Recipes:
              First, does it work? Recipes need to be easy to follow and provide reliable results, every time.
              Second, is it delicious? Does the dish make us smile inside and out? Do we want to eat the whole batch by ourselves? 
              Third, is it worth the effort? Do we want to make it again (and again and again)?
            </p>
            </div>
          </div>
          <p className="text-gray-600 mb-8 font-bold">
          To make sure each of these standards is met, we start by working with expert recipe developers  — people with the experience and knowledge to not only develop a good recipe in their own kitchens, but to make sure that recipe works in yours. Next, we thoroughly review and edit every recipe in-house line by line. Finally, each new recipe is run by our team of recipe testers working in home kitchens with the same pots, pans, and tools that you use in yours. Only after all this is the recipe shared on Simply Recipes.
              Additionally, at Simply Recipes, we aspire to provide the highest quality content produced by humans, for humans. It is against our guidelines to publish automatically generated content using AI (artificial intelligence) writing tools such as ChatGPT.   
          </p>
        </div>
      </div>

    <div className="container max-w-5xl mx-auto m-8 flex flex-wrap pt-4 pb-12">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          MEET THE TEAM
        </h2>

        <div className="w-full mb-4 items-center content-center">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>

        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <div className="w-full font-bold text-xl text-gray-800 px-6">
                Shir Cohen
              </div>
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                EDITORIAL DIRECTOR, NEWS, FOOD, & DRINK
              </p>
          </div>
          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-start">
              <img src="/images/shir.png" alt="shir" className="mx-auto lg:mx-0 hover:underline gradient font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              </img>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <div className="w-full font-bold text-xl text-gray-800 px-6">
                Eldad Shneor
              </div>
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">
              EDITORIAL DIRECTOR, NEWS, FOOD, & DRINK
              </p>
          </div>
          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-center">
              <img src="/images/eldad.jpg" alt="eldad" className="mx-auto lg:mx-0 hover:underline gradient font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              </img>
            </div>
           </div>
        </div>

  <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <div className="w-full font-bold text-xl text-gray-800 px-6">
                YOU!
              </div>
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">
              EDITORIAL, FOOD, & DRINK
              </p>
          </div>
          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-center">
              <img src="/images/bakers.jpg" alt="bakers" className=" mx-auto lg:mx-0 hover:underline gradient font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              </img>
            </div>
           </div>
        </div>
        
      </div>
</section>);
};
    export default AboutUsPage;