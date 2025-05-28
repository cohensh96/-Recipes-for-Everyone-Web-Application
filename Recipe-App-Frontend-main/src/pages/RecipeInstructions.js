/** This component displays recipe instructions based on the value of the 'isShown' prop
 * if isShown is true display recipe instructions otherwise does not display recipe instructions */ 
const RecipeInstructions = ({ isShown }) => {

  return (
    <div>
    {isShown && (
<div id="recipeInstructions" className="default-container">
<div id="step1">
<h3 className=" mb-4 text-2xl mt-6 text-left font-bold tracking-tight text-gray-900"
>Step 1: investigate your ingredients and what types of dishes they could make</h3>

<ul className="list-disc">
    <li>What ingredients do you have at home?</li>
    <li>What do you want to use as your main ingredients?</li>
</ul>

<p>Could you make one of these dishes?  These are just SOME possible ideas!</p>
<img src="/images/CreateRecipe/step1.png" alt="steps" className=" mt-4" ></img>
</div>


<div id="step2">
<h3 className="mb-4 text-2xl mt-6 text-left font-bold tracking-tight text-gray-900"
>Step 2: Think about what ingredients will taste good together</h3>
<p>We’ll break our recipe down into three categories.</p>
<ol className="list-decimal">
    <li>Main ingredients: This is what you’ll add the most of!</li>
    <li>Extra ingredients: These aren’t the main ingredients, but they are the other veggies, grains, fruits, seeds or other things you want to add.</li>
    <li>Flavor ingredients: Spices, herbs, salt, pepper, sauce, or dressing</li>
</ol>

<h4 className="text-1xl mt-6 text-left font-bold tracking-tight text-gray-900">Making a Salad</h4>
<p>If I want to make a salad, I will organize my ingredients like this:</p>
<img src="/images/CreateRecipe/step2.png" alt="steps" className=" mt-4"></img>
</div>


<div id="step3">
<h3 className=" mb-4 text-2xl mt-6 text-left font-bold tracking-tight text-gray-900"
>Step 3: How do you want your ingredients cooked?</h3>
<p>Now that you’ve chosen your ingredients, we have to decide how to cook them. There are many different styles of cooking to try.</p>
<img src="/images/CreateRecipe/step3.png" alt="steps" className=" mt-4"></img>
</div>

<div id="step4">
<h3 className=" mb-4 text-2xl mt-6 text-left font-bold tracking-tight text-gray-900"
>How do you want your ingredients cooked?</h3>
<p>Look at the list of ingredients you’re going to use.</p>
<p>What do you need to do with each ingredient so it is ready to go into your dish?</p>
<p>Do you need to wash it, chop it, or pre-cook any ingredients?</p>
<p>Let’s look back at our salad example…</p>
<h4 className="text-1xl mt-6 text-left font-bold tracking-tight text-gray-900">Making a Salad, Part 2</h4>
<p>Here is how I will prepare each ingredient:</p>
<p>Lettuce: Rinse the lettuce, and cut it into small pieces.</p>
<p>Cucumbers: Slice the cucumber.</p>
<p>Sunflower seeds: Ready to add in.</p>
<p>Salad dressing: Mix the olive oil, lemon juice, and salt together in a jar.</p>
</div>


<div id="step5">
<h3 className=" mb-4 text-2xl mt-6 text-left font-bold tracking-tight text-gray-900"
>Step 5: Writing your recipe</h3>
<p>When you write your recipe be sure to include:</p>
<ul className="list-disc mb-4">
    <li>a name for your dish</li>
    <li>a list of ingredients</li>
    <li>a list of steps</li>
</ul>
<p className=" mb-4">When writing your list of ingredients, be sure to include how much of each ingredient to add. For example instead of writing tomatoes, you should write exactly how many tomatoes to add.</p>
<p>When writing the steps, be sure to include details. If you want me to cut the tomatoes, do I cut them into big slices, or small pieces? If you want me to cook the tomatoes, do I cook them in a pan on the stove, or in the oven? Tell me exactly how to do it.</p>

</div>

<div id="step6">
<h3 className=" mb-4 text-2xl mt-6 text-left font-bold tracking-tight text-gray-900">
Your Turn!
</h3>
<p>
Time to create your own special recipe. Based on what you just learned, write down your recipe using the format below. What will you make?
</p>

</div>

</div>
    )}
    </div>
 );
}

export default RecipeInstructions;