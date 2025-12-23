
import { Recipe, Challenge } from './types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'sourdough-starter',
    name: 'Sourdough Starter (The Mother)',
    category: 'Bread',
    difficulty: 'Intermediate',
    description: 'The foundation of all sourdough baking. A living culture of wild yeast and beneficial bacteria created from just flour and water.',
    ingredients: [
      { name: 'Whole Wheat Flour', amount: '50', unit: 'g', importance: 'Initial Nutrient Source' },
      { name: 'All-Purpose Flour', amount: '500', unit: 'g', importance: 'Maintenance Feed' },
      { name: 'Filtered Water', amount: '50', unit: 'ml', importance: 'Hydration (Chlorine-free)' }
    ],
    steps: [
      { id: 1, text: 'Day 1: Combine 50g whole wheat flour and 50g warm water in a clean jar.' },
      { id: 2, text: 'Day 2: Discard half the mixture. Add 50g all-purpose flour and 50g warm water.' },
      { id: 3, text: 'Days 3-7: Repeat feeding every 24 hours (Discard half, add 50g flour/water).' },
      { id: 4, text: 'Ready: When it consistently doubles in size 4-6 hours after feeding.' },
      { id: 5, text: 'The Float Test: A small amount should float in a glass of water when active.' }
    ],
    bakeTemp: 'Room Temp (21-24°C)',
    bakeTime: '7 Days'
  },
  {
    id: 'basic-bread',
    name: 'Artisan Country Bread',
    category: 'Bread',
    difficulty: 'Beginner',
    description: 'A simple 4-ingredient bread with a crispy crust and soft crumb.',
    ingredients: [
      { name: 'Strong White Flour', amount: '500', unit: 'g', importance: 'Structure' },
      { name: 'Warm Water', amount: '350', unit: 'ml', importance: 'Hydration' },
      { name: 'Instant Yeast', amount: '7', unit: 'g', importance: 'Leavening' },
      { name: 'Sea Salt', amount: '10', unit: 'g', importance: 'Flavor & Texture' }
    ],
    steps: [
      { id: 1, text: 'Whisk dry ingredients except salt, then add water.' },
      { id: 2, text: 'Mix into a shaggy dough and let rest for 30 minutes.' },
      { id: 3, text: 'Add salt and knead for 10 minutes until elastic.' },
      { id: 4, text: 'Bulk ferment for 2 hours until doubled.' },
      { id: 5, text: 'Shape, proof for 1 hour, and bake.' }
    ],
    bakeTemp: '230°C',
    bakeTime: '35 minutes'
  },
  {
    id: 'challah',
    name: 'Classic Braided Challah',
    category: 'Bread',
    difficulty: 'Intermediate',
    description: 'A rich, slightly sweet, and beautifully braided Jewish ceremonial bread.',
    ingredients: [
      { name: 'All-Purpose Flour', amount: '500', unit: 'g', importance: 'Body' },
      { name: 'Eggs', amount: '2', unit: 'large', importance: 'Richness' },
      { name: 'Honey', amount: '60', unit: 'ml', importance: 'Sweetness' },
      { name: 'Vegetable Oil', amount: '60', unit: 'ml', importance: 'Softness' }
    ],
    steps: [
      { id: 1, text: 'Mix yeast with warm water and a tsp of honey.' },
      { id: 2, text: 'Combine with flour, eggs, oil, and remaining honey.' },
      { id: 3, text: 'Knead for 10 mins until smooth and elastic.' },
      { id: 4, text: 'Let rise for 1.5 hours, then divide and braid.' },
      { id: 5, text: 'Egg wash twice and bake until deep golden.' }
    ],
    bakeTemp: '190°C',
    bakeTime: '25-30 minutes'
  },
  {
    id: 'baguettes',
    name: 'Traditional French Baguettes',
    category: 'Bread',
    difficulty: 'Advanced',
    description: 'The iconic French loaf with a thin, crackly crust and airy, irregular holes.',
    ingredients: [
      { name: 'Bread Flour', amount: '500', unit: 'g', importance: 'Protein' },
      { name: 'Water', amount: '350', unit: 'ml', importance: 'Hydration' },
      { name: 'Yeast', amount: '5', unit: 'g', importance: 'Fermentation' },
      { name: 'Salt', amount: '10', unit: 'g', importance: 'Tight Crust' }
    ],
    steps: [
      { id: 1, text: 'Mix ingredients and perform autolyse (20 mins).' },
      { id: 2, text: 'Knead lightly and perform 3 sets of folds.' },
      { id: 3, text: 'Cold ferment in the fridge for 12-24 hours.' },
      { id: 4, text: 'Divide, pre-shape, and bench rest.' },
      { id: 5, text: 'Shape into long cylinders and score deeply.' },
      { id: 6, text: 'Bake with steam for maximum crust crackle.' }
    ],
    bakeTemp: '240°C',
    bakeTime: '20-25 minutes'
  },
  {
    id: 'pretzels',
    name: 'Bavarian Soft Pretzels',
    category: 'Bread',
    difficulty: 'Intermediate',
    description: 'Dark, salty, and chewy with that classic lye-dipped crust flavor.',
    ingredients: [
      { name: 'Bread Flour', amount: '500', unit: 'g', importance: 'Chew' },
      { name: 'Baking Soda', amount: '50', unit: 'g', importance: 'Alkaline Bath' },
      { name: 'Butter', amount: '30', unit: 'g', importance: 'Tender Crumb' },
      { name: 'Coarse Salt', amount: '2', unit: 'tbsp', importance: 'Topping' }
    ],
    steps: [
      { id: 1, text: 'Knead a stiff dough and let rise for 1 hour.' },
      { id: 2, text: 'Divide into 8 pieces and roll into long ropes.' },
      { id: 3, text: 'Twist into the signature pretzel shape.' },
      { id: 4, text: 'Dip each pretzel in a boiling water/soda solution for 30s.' },
      { id: 5, text: 'Score the bottom and sprinkle with salt.' }
    ],
    bakeTemp: '220°C',
    bakeTime: '12-15 minutes'
  },
  {
    id: 'milk-bread',
    name: 'Japanese Shokupan (Milk Bread)',
    category: 'Bread',
    difficulty: 'Intermediate',
    description: 'The fluffiest bread in the world, made using the Tangzhong starter method.',
    ingredients: [
      { name: 'Bread Flour', amount: '350', unit: 'g', importance: 'Structure' },
      { name: 'Whole Milk', amount: '120', unit: 'ml', importance: 'Flavor' },
      { name: 'Dry Milk Powder', amount: '20', unit: 'g', importance: 'Softness' },
      { name: 'Tangzhong (Flour/Water paste)', amount: '100', unit: 'g', importance: 'Moisture Retention' }
    ],
    steps: [
      { id: 1, text: 'Make Tangzhong by heating flour and water until a paste forms.' },
      { id: 2, text: 'Mix all ingredients and knead until the windowpane stage.' },
      { id: 3, text: 'Let double in size, then divide and roll into coils.' },
      { id: 4, text: 'Place in a Pullman loaf tin for final proof.' },
      { id: 5, text: 'Bake until the internal temperature reaches 90°C.' }
    ],
    bakeTemp: '175°C',
    bakeTime: '30-35 minutes'
  },
  {
    id: 'black-forest',
    name: 'Black Forest Gateau',
    category: 'Cakes',
    difficulty: 'Advanced',
    description: 'Layers of chocolate sponge, whipped cream, and tart cherries with kirsch.',
    ingredients: [
      { name: 'Cocoa Powder', amount: '50', unit: 'g', importance: 'Deep Chocolate' },
      { name: 'Kirsch (Cherry Brandy)', amount: '60', unit: 'ml', importance: 'Authentic Flavor' },
      { name: 'Sour Cherries', amount: '400', unit: 'g', importance: 'Tartness' },
      { name: 'Heavy Cream', amount: '600', unit: 'ml', importance: 'Frosting' }
    ],
    steps: [
      { id: 1, text: 'Bake a light chocolate genoese sponge.' },
      { id: 2, text: 'Split sponge into three layers and brush with Kirsch syrup.' },
      { id: 3, text: 'Pipe rings of whipped cream and fill centers with cherries.' },
      { id: 4, text: 'Stack layers and coat the entire cake in cream.' },
      { id: 5, text: 'Decorate with chocolate shavings and whole cherries.' }
    ],
    bakeTemp: '180°C',
    bakeTime: '25-30 minutes'
  },
  {
    id: 'tres-leches',
    name: 'Classic Tres Leches Cake',
    category: 'Cakes',
    difficulty: 'Intermediate',
    description: 'A sponge cake soaked in three types of milk, topped with whipped cream.',
    ingredients: [
      { name: 'Condensed Milk', amount: '400', unit: 'g', importance: 'Sweetness' },
      { name: 'Evaporated Milk', amount: '350', unit: 'ml', importance: 'Richness' },
      { name: 'Heavy Cream', amount: '250', unit: 'ml', importance: 'Soak' },
      { name: 'Eggs', amount: '5', unit: 'large', importance: 'Absorbent Sponge' }
    ],
    steps: [
      { id: 1, text: 'Bake a sponge cake and let it cool completely.' },
      { id: 2, text: 'Poke holes all over the cake with a fork.' },
      { id: 3, text: 'Whisk the three milks together and pour over the cake.' },
      { id: 4, text: 'Let the cake absorb the liquid in the fridge for 4+ hours.' },
      { id: 5, text: 'Top with whipped cream and a sprinkle of cinnamon.' }
    ],
    bakeTemp: '175°C',
    bakeTime: '30 minutes'
  },
  {
    id: 'matcha-chiffon',
    name: 'Matcha Green Tea Chiffon',
    category: 'Cakes',
    difficulty: 'Intermediate',
    description: 'Airy, light, and vibrantly green with a delicate earthy tea flavor.',
    ingredients: [
      { name: 'Matcha Powder', amount: '15', unit: 'g', importance: 'Color & Flavor' },
      { name: 'Cake Flour', amount: '100', unit: 'g', importance: 'Lightness' },
      { name: 'Egg Whites', amount: '6', unit: 'large', importance: 'Structure' },
      { name: 'Vegetable Oil', amount: '50', unit: 'ml', importance: 'Moisture' }
    ],
    steps: [
      { id: 1, text: 'Whisk yolks with oil, milk, and sifted matcha/flour.' },
      { id: 2, text: 'Whip whites with sugar to stiff, glossy peaks.' },
      { id: 3, text: 'Gently fold the meringue into the matcha base.' },
      { id: 4, text: 'Bake in an ungreased tube pan.' },
      { id: 5, text: 'Invert the pan immediately after baking to prevent collapse.' }
    ],
    bakeTemp: '170°C',
    bakeTime: '45-50 minutes'
  },
  {
    id: 'sticky-toffee',
    name: 'Sticky Toffee Pudding',
    category: 'Cakes',
    difficulty: 'Beginner',
    description: 'A dark, moist date sponge served with a warm, buttery toffee sauce.',
    ingredients: [
      { name: 'Medjool Dates', amount: '200', unit: 'g', importance: 'Moisture & Base' },
      { name: 'Bicarbonate of Soda', amount: '1', unit: 'tsp', importance: 'Softening Dates' },
      { name: 'Dark Muscovado Sugar', amount: '175', unit: 'g', importance: 'Molasses Depth' },
      { name: 'Double Cream', amount: '200', unit: 'ml', importance: 'Toffee Sauce' }
    ],
    steps: [
      { id: 1, text: 'Soak dates in boiling water and soda, then blend.' },
      { id: 2, text: 'Cream butter and sugar, add eggs and date puree.' },
      { id: 3, text: 'Fold in flour and bake in a square dish.' },
      { id: 4, text: 'Boil cream, butter, and sugar for the toffee sauce.' },
      { id: 5, text: 'Pour sauce over the warm cake and grill briefly.' }
    ],
    bakeTemp: '180°C',
    bakeTime: '35 minutes'
  },
  {
    id: 'snickerdoodles',
    name: 'Cinnamon Snickerdoodles',
    category: 'Cookies',
    difficulty: 'Beginner',
    description: 'Soft and pillowy cookies with a characteristic tang and cinnamon-sugar coating.',
    ingredients: [
      { name: 'Cream of Tartar', amount: '2', unit: 'tsp', importance: 'Tang & Chew' },
      { name: 'Butter', amount: '225', unit: 'g', importance: 'Softness' },
      { name: 'Cinnamon', amount: '2', unit: 'tbsp', importance: 'Coating' },
      { name: 'Sugar', amount: '300', unit: 'g', importance: 'Texture' }
    ],
    steps: [
      { id: 1, text: 'Cream butter and sugar until very light.' },
      { id: 2, text: 'Beat in eggs and add dry ingredients.' },
      { id: 3, text: 'Chill dough for 30 minutes for easier handling.' },
      { id: 4, text: 'Roll into balls and coat heavily in cinnamon-sugar.' },
      { id: 5, text: 'Bake until the edges are just set but the centers are soft.' }
    ],
    bakeTemp: '190°C',
    bakeTime: '8-10 minutes'
  },
  {
    id: 'biscotti',
    name: 'Almond & Cranberry Biscotti',
    category: 'Cookies',
    difficulty: 'Intermediate',
    description: 'Double-baked Italian cookies designed for dipping into coffee or wine.',
    ingredients: [
      { name: 'Whole Almonds', amount: '100', unit: 'g', importance: 'Crunch' },
      { name: 'Plain Flour', amount: '250', unit: 'g', importance: 'Stiffness' },
      { name: 'Eggs', amount: '3', unit: 'large', importance: 'Binding' },
      { name: 'Orange Zest', amount: '1', unit: 'tbsp', importance: 'Aroma' }
    ],
    steps: [
      { id: 1, text: 'Mix ingredients into a sticky dough.' },
      { id: 2, text: 'Form into two long, flat logs and bake.' },
      { id: 3, text: 'Let logs cool for 10 mins, then slice diagonally.' },
      { id: 4, text: 'Bake slices again until completely dry and hard.' }
    ],
    bakeTemp: '180°C',
    bakeTime: '30 + 15 minutes'
  },
  {
    id: 'linzer-cookies',
    name: 'Austrian Linzer Cookies',
    category: 'Cookies',
    difficulty: 'Intermediate',
    description: 'Shortbread-like hazelnut cookies sandwiched with raspberry jam.',
    ingredients: [
      { name: 'Ground Hazelnuts', amount: '100', unit: 'g', importance: 'Nutty Texture' },
      { name: 'Raspberry Jam', amount: '150', unit: 'g', importance: 'Filling' },
      { name: 'Icing Sugar', amount: '50', unit: 'g', importance: 'Dusting' },
      { name: 'Cinnamon', amount: '1/2', unit: 'tsp', importance: 'Spice' }
    ],
    steps: [
      { id: 1, text: 'Make a nutty shortcrust dough and chill.' },
      { id: 2, text: 'Roll out and cut circles; cut small "windows" in half of them.' },
      { id: 3, text: 'Bake until golden and let cool completely.' },
      { id: 4, text: 'Spread jam on whole circles, top with window circles.' },
      { id: 5, text: 'Dust generously with icing sugar.' }
    ],
    bakeTemp: '175°C',
    bakeTime: '10-12 minutes'
  },
  {
    id: 'gingersnaps',
    name: 'Molasses Gingersnaps',
    category: 'Cookies',
    difficulty: 'Beginner',
    description: 'Thin, crispy cookies with a spicy kick and a crackly top.',
    ingredients: [
      { name: 'Ground Ginger', amount: '2', unit: 'tsp', importance: 'Heat' },
      { name: 'Blackstrap Molasses', amount: '80', unit: 'ml', importance: 'Color & Chew' },
      { name: 'Butter', amount: '175', unit: 'g', importance: 'Snap' },
      { name: 'Clove Powder', amount: '1/4', unit: 'tsp', importance: 'Hidden Spice' }
    ],
    steps: [
      { id: 1, text: 'Beat butter, sugar, and molasses together.' },
      { id: 2, text: 'Add egg and whisked dry ingredients.' },
      { id: 3, text: 'Roll into small balls and toss in granulated sugar.' },
      { id: 4, text: 'Bake until the surface cracks and edges are dark.' }
    ],
    bakeTemp: '180°C',
    bakeTime: '12-15 minutes'
  },
  {
    id: 'baklava',
    name: 'Pistachio & Walnut Baklava',
    category: 'Pastries',
    difficulty: 'Advanced',
    description: 'Layers of paper-thin phyllo pastry, nuts, and a honey-lemon syrup.',
    ingredients: [
      { name: 'Phyllo Pastry', amount: '1', unit: 'pack', importance: 'Flakiness' },
      { name: 'Clarified Butter', amount: '250', unit: 'g', importance: 'Crispness' },
      { name: 'Shelled Pistachios', amount: '300', unit: 'g', importance: 'Rich Filling' },
      { name: 'Honey Syrup', amount: '200', unit: 'ml', importance: 'Sweet Soak' }
    ],
    steps: [
      { id: 1, text: 'Brush a tray with butter and layer 10 sheets of phyllo.' },
      { id: 2, text: 'Spread a layer of crushed nuts and sugar.' },
      { id: 3, text: 'Repeat layering until the tray is full.' },
      { id: 4, text: 'Cut into diamonds before baking.' },
      { id: 5, text: 'Pour cold syrup over the piping hot pastry.' }
    ],
    bakeTemp: '170°C',
    bakeTime: '45-50 minutes'
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    category: 'Pastries',
    difficulty: 'Advanced',
    description: 'A laminated croissant dough wrapped around sticks of dark chocolate.',
    ingredients: [
      { name: 'Laminated Dough', amount: '1', unit: 'batch', importance: 'Layers' },
      { name: 'Chocolate Batons', amount: '20', unit: 'sticks', importance: 'Filling' },
      { name: 'Egg Yolk', amount: '1', unit: 'large', importance: 'Shine' }
    ],
    steps: [
      { id: 1, text: 'Roll out croissant dough into a rectangle.' },
      { id: 2, text: 'Cut into strips exactly the width of the batons.' },
      { id: 3, text: 'Place a baton at one end, fold over, place second baton.' },
      { id: 4, text: 'Roll up and place seam-side down.' },
      { id: 5, text: 'Proof until very wobbly and bake until mahogany brown.' }
    ],
    bakeTemp: '200°C',
    bakeTime: '15-18 minutes'
  },
  {
    id: 'eclairs',
    name: 'Classic Chocolate Eclairs',
    category: 'Pastries',
    difficulty: 'Intermediate',
    description: 'Light choux pastry logs filled with vanilla cream and dipped in ganache.',
    ingredients: [
      { name: 'Choux Pastry', amount: '1', unit: 'batch', importance: 'Airy Shell' },
      { name: 'Pastry Cream', amount: '500', unit: 'ml', importance: 'Silky Center' },
      { name: 'Dark Chocolate', amount: '100', unit: 'g', importance: 'Glaze' }
    ],
    steps: [
      { id: 1, text: 'Pipe 10cm logs of choux pastry.' },
      { id: 2, text: 'Bake at high heat to steam, then lower to dry out.' },
      { id: 3, text: 'Poke holes in the bottom to release steam.' },
      { id: 4, text: 'Fill with vanilla custard using a piping bag.' },
      { id: 5, text: 'Dip the tops in melted chocolate ganache.' }
    ],
    bakeTemp: '200°C',
    bakeTime: '25-30 minutes'
  },
  {
    id: 'empanadas',
    name: 'Argentine Beef Empanadas',
    category: 'Pies',
    difficulty: 'Intermediate',
    description: 'Savory hand pies with a spiced beef, olive, and egg filling.',
    ingredients: [
      { name: 'Empanada Dough', amount: '12', unit: 'discs', importance: 'Shell' },
      { name: 'Ground Beef', amount: '500', unit: 'g', importance: 'Filling' },
      { name: 'Cumin', amount: '1', unit: 'tbsp', importance: 'Latin Spice' },
      { name: 'Hard Boiled Eggs', amount: '2', unit: 'chopped', importance: 'Texture' }
    ],
    steps: [
      { id: 1, text: 'Sauté onions and beef with spices; cool completely.' },
      { id: 2, text: 'Place a spoonful of filling on each dough disc.' },
      { id: 3, text: 'Fold in half and seal with the "repulgue" folding technique.' },
      { id: 4, text: 'Egg wash and bake until golden.' }
    ],
    bakeTemp: '210°C',
    bakeTime: '15-20 minutes'
  },
  {
    id: 'key-lime-pie',
    name: 'Key Lime Pie',
    category: 'Pies',
    difficulty: 'Beginner',
    description: 'A tart and creamy lime custard in a buttery graham cracker crust.',
    ingredients: [
      { name: 'Key Lime Juice', amount: '120', unit: 'ml', importance: 'Acidic Punch' },
      { name: 'Condensed Milk', amount: '400', unit: 'g', importance: 'Body' },
      { name: 'Egg Yolks', amount: '4', unit: 'large', importance: 'Thickening' },
      { name: 'Graham Crackers', amount: '200', unit: 'g', importance: 'Base' }
    ],
    steps: [
      { id: 1, text: 'Mix cracker crumbs with butter and bake base for 10 mins.' },
      { id: 2, text: 'Whisk yolks and milk, then slowly add lime juice.' },
      { id: 3, text: 'Pour into the crust and bake until just set.' },
      { id: 4, text: 'Cool and chill for at least 6 hours before serving.' }
    ],
    bakeTemp: '175°C',
    bakeTime: '15 minutes'
  },
  {
    id: 'banoffee-pie',
    name: 'English Banoffee Pie',
    category: 'Pies',
    difficulty: 'Beginner',
    description: 'A no-bake classic with layers of biscuit, dulce de leche, bananas, and cream.',
    ingredients: [
      { name: 'Digestive Biscuits', amount: '250', unit: 'g', importance: 'Crunchy Base' },
      { name: 'Dulce de Leche', amount: '300', unit: 'g', importance: 'Caramel Layer' },
      { name: 'Bananas', amount: '3', unit: 'ripe', importance: 'Fruit Body' },
      { name: 'Whipped Cream', amount: '300', unit: 'ml', importance: 'Topping' }
    ],
    steps: [
      { id: 1, text: 'Crush biscuits, mix with butter, and press into a tart tin.' },
      { id: 2, text: 'Spread thick dulce de leche over the base.' },
      { id: 3, text: 'Layer sliced bananas tightly over the caramel.' },
      { id: 4, text: 'Top with unsweetened whipped cream and coffee dust.' }
    ],
    bakeTemp: 'None',
    bakeTime: '0 minutes'
  },
  {
    id: 'blueberry-pie',
    name: 'Wild Blueberry Lattice Pie',
    category: 'Pies',
    difficulty: 'Intermediate',
    description: 'Jammy purple blueberries encased in a crisp, sugared pastry.',
    ingredients: [
      { name: 'Fresh Blueberries', amount: '600', unit: 'g', importance: 'Juicy Core' },
      { name: 'Cornstarch', amount: '3', unit: 'tbsp', importance: 'Gelation' },
      { name: 'Lemon Juice', amount: '1', unit: 'tbsp', importance: 'Brightness' },
      { name: 'Pie Crust', amount: '2', unit: 'rounds', importance: 'Vessel' }
    ],
    steps: [
      { id: 1, text: 'Toss berries with sugar, starch, and lemon.' },
      { id: 2, text: 'Fill the bottom crust with berry mixture.' },
      { id: 3, text: 'Cut the top crust into strips and weave a lattice.' },
      { id: 4, text: 'Brush with egg wash and sprinkle with turbinado sugar.' },
      { id: 5, text: 'Bake until the juices are thick and bubbling.' }
    ],
    bakeTemp: '200°C',
    bakeTime: '45-50 minutes'
  },
  {
    id: 'steak-ale-pie',
    name: 'Steak & Ale Savory Pie',
    category: 'Pies',
    difficulty: 'Intermediate',
    description: 'Tender chunks of beef in a rich Guinness gravy topped with puff pastry.',
    ingredients: [
      { name: 'Chuck Steak', amount: '800', unit: 'g', importance: 'Meatiness' },
      { name: 'Stout Beer', amount: '440', unit: 'ml', importance: 'Rich Sauce' },
      { name: 'Puff Pastry', amount: '1', unit: 'sheet', importance: 'Flaky Top' },
      { name: 'Mushrooms', amount: '200', unit: 'g', importance: 'Umami' }
    ],
    steps: [
      { id: 1, text: 'Brown meat and sauté veg; simmer with ale for 2 hours.' },
      { id: 2, text: 'Thicken gravy and cool the filling completely.' },
      { id: 3, text: 'Pour filling into a dish and cover with pastry.' },
      { id: 4, text: 'Egg wash and score the top.' },
      { id: 5, text: 'Bake until the pastry is puffed and golden.' }
    ],
    bakeTemp: '200°C',
    bakeTime: '25-30 minutes'
  },
  {
    id: 'focaccia',
    name: 'Rosemary & Sea Salt Focaccia',
    category: 'Bread',
    difficulty: 'Beginner',
    description: 'An oily, salty, and dimpled Italian classic that is incredibly forgiving.',
    ingredients: [
      { name: 'All-Purpose Flour', amount: '500', unit: 'g', importance: 'Structure' },
      { name: 'Extra Virgin Olive Oil', amount: '100', unit: 'ml', importance: 'Flavor & Crispness' },
      { name: 'Yeast', amount: '10', unit: 'g', importance: 'Rise' },
      { name: 'Fresh Rosemary', amount: '2', unit: 'sprigs', importance: 'Aroma' }
    ],
    steps: [
      { id: 1, text: 'Mix flour, yeast, and water into a wet dough.' },
      { id: 2, text: 'Knead and perform several "stretch and folds".' },
      { id: 3, text: 'Place in a heavily oiled tray and let double in size.' },
      { id: 4, text: 'Dimple the surface with fingers and drizzle with more oil.' },
      { id: 5, text: 'Top with salt and rosemary, then bake until golden.' }
    ],
    bakeTemp: '220°C',
    bakeTime: '20-25 minutes'
  },
  {
    id: 'sourdough',
    name: 'Classic Sourdough Loaf',
    category: 'Bread',
    difficulty: 'Advanced',
    description: 'The holy grail of bread baking. Tangy, chewy, and naturally leavened.',
    ingredients: [
      { name: 'Active Starter', amount: '100', unit: 'g', importance: 'Natural Leavening' },
      { name: 'Bread Flour', amount: '450', unit: 'g', importance: 'High Protein Content' },
      { name: 'Whole Wheat Flour', amount: '50', unit: 'g', importance: 'Complex Flavor' },
      { name: 'Fine Sea Salt', amount: '12', unit: 'g', importance: 'Gluten Control' }
    ],
    steps: [
      { id: 1, text: 'Mix flours and water for autolyse phase (1 hour).' },
      { id: 2, text: 'Add starter and salt, mix until fully incorporated.' },
      { id: 3, text: 'Perform bulk fermentation with folds every 30 mins.' },
      { id: 4, text: 'Pre-shape, rest, then final shape into a banneton.' },
      { id: 5, text: 'Cold proof overnight in the fridge.' },
      { id: 6, text: 'Score the dough and bake in a preheated Dutch oven.' }
    ],
    bakeTemp: '240°C',
    bakeTime: '45 minutes'
  },
  {
    id: 'brioche',
    name: 'Buttery Brioche Nanterre',
    category: 'Bread',
    difficulty: 'Intermediate',
    description: 'An enriched French bread loaded with eggs and butter.',
    ingredients: [
      { name: 'Bread Flour', amount: '500', unit: 'g', importance: 'Strength' },
      { name: 'Eggs', amount: '5', unit: 'large', importance: 'Richness & Color' },
      { name: 'Unsalted Butter', amount: '250', unit: 'g', importance: 'Soft Texture' },
      { name: 'Caster Sugar', amount: '50', unit: 'g', importance: 'Sweetness' }
    ],
    steps: [
      { id: 1, text: 'Mix dry ingredients and eggs into a stiff dough.' },
      { id: 2, text: 'Gradually incorporate cold butter cubes one by one.' },
      { id: 3, text: 'Knead until dough is shiny and pulls away from the bowl.' },
      { id: 4, text: 'Bulk ferment at room temp, then chill overnight.' },
      { id: 5, text: 'Shape into balls and place in a loaf tin.' },
      { id: 6, text: 'Proof until doubled and egg wash before baking.' }
    ],
    bakeTemp: '180°C',
    bakeTime: '30 minutes'
  },
  {
    id: 'victoria-sponge',
    name: 'Victoria Sponge Cake',
    category: 'Cakes',
    difficulty: 'Beginner',
    description: 'The quintessential British afternoon tea cake.',
    ingredients: [
      { name: 'Self-Raising Flour', amount: '200', unit: 'g', importance: 'Lift' },
      { name: 'Caster Sugar', amount: '200', unit: 'g', importance: 'Tenderness' },
      { name: 'Butter', amount: '200', unit: 'g', importance: 'Moisture' },
      { name: 'Eggs', amount: '4', unit: 'large', importance: 'Emulsion' }
    ],
    steps: [
      { id: 1, text: 'Cream butter and sugar until pale and fluffy.' },
      { id: 2, text: 'Add eggs one at a time with a spoonful of flour.' },
      { id: 3, text: 'Gently fold in the remaining flour.' },
      { id: 4, text: 'Divide between two tins and bake.' },
      { id: 5, text: 'Sandwich with strawberry jam and whipped cream.' }
    ],
    bakeTemp: '180°C',
    bakeTime: '20-25 minutes'
  },
  {
    id: 'choc-lava-cake',
    name: 'Molten Chocolate Lava Cake',
    category: 'Cakes',
    difficulty: 'Intermediate',
    description: 'Timing is everything for this decadent, gooey-centered dessert.',
    ingredients: [
      { name: 'Dark Chocolate (70%)', amount: '100', unit: 'g', importance: 'Main Flavor' },
      { name: 'Unsalted Butter', amount: '100', unit: 'g', importance: 'Fatty Core' },
      { name: 'Eggs', amount: '2', unit: 'whole', importance: 'Structure' },
      { name: 'Egg Yolks', amount: '2', unit: 'yolks', importance: 'Richness' }
    ],
    steps: [
      { id: 1, text: 'Melt chocolate and butter together gently.' },
      { id: 2, text: 'Whisk eggs, yolks, and sugar until thick and pale.' },
      { id: 3, text: 'Fold the chocolate into the egg mixture.' },
      { id: 4, text: 'Sift in a tiny amount of flour and fold.' },
      { id: 5, text: 'Pour into greased ramekins and bake precisely.' }
    ],
    bakeTemp: '200°C',
    bakeTime: '10-12 minutes'
  },
  {
    id: 'ny-cheesecake',
    name: 'New York Cheesecake',
    category: 'Cakes',
    difficulty: 'Intermediate',
    description: 'Dense, creamy, and smooth with a buttery graham cracker crust.',
    ingredients: [
      { name: 'Full Fat Cream Cheese', amount: '900', unit: 'g', importance: 'Body' },
      { name: 'Sour Cream', amount: '200', unit: 'ml', importance: 'Tanginess' },
      { name: 'Digestive Biscuits', amount: '250', unit: 'g', importance: 'Base' },
      { name: 'Vanilla Extract', amount: '1', unit: 'tbsp', importance: 'Flavor Profile' }
    ],
    steps: [
      { id: 1, text: 'Crush biscuits, mix with butter, and press into tin.' },
      { id: 2, text: 'Beat cream cheese and sugar on low speed (no air!).' },
      { id: 3, text: 'Add eggs one by one, then stir in sour cream.' },
      { id: 4, text: 'Bake in a water bath to prevent cracking.' },
      { id: 5, text: 'Cool in oven with door ajar, then chill overnight.' }
    ],
    bakeTemp: '160°C',
    bakeTime: '75 minutes'
  },
  {
    id: 'classic-cookies',
    name: 'Golden Choc-Chip Cookies',
    category: 'Cookies',
    difficulty: 'Beginner',
    description: 'The ultimate chewy chocolate chip cookie.',
    ingredients: [
      { name: 'Unsalted Butter', amount: '115', unit: 'g', importance: 'Richness' },
      { name: 'Brown Sugar', amount: '150', unit: 'g', importance: 'Chewiness' },
      { name: 'White Sugar', amount: '50', unit: 'g', importance: 'Crispness' },
      { name: 'Egg', amount: '1', unit: 'large', importance: 'Binding' },
      { name: 'All-Purpose Flour', amount: '200', unit: 'g', importance: 'Structure' },
      { name: 'Dark Chocolate Chips', amount: '150', unit: 'g', importance: 'Joy' }
    ],
    steps: [
      { id: 1, text: 'Cream butter and sugars until pale and fluffy.' },
      { id: 2, text: 'Beat in the egg and vanilla.' },
      { id: 3, text: 'Fold in dry ingredients and chocolate chips.' },
      { id: 4, text: 'Chill dough for at least 1 hour.' },
      { id: 5, text: 'Scoop and bake until edges are golden.' }
    ],
    bakeTemp: '180°C',
    bakeTime: '10-12 minutes'
  },
  {
    id: 'macarons',
    name: 'French Macarons',
    category: 'Cookies',
    difficulty: 'Advanced',
    description: 'Delicate almond meringue shells with a smooth, glossy top and "feet".',
    ingredients: [
      { name: 'Almond Flour', amount: '125', unit: 'g', importance: 'Texture' },
      { name: 'Icing Sugar', amount: '125', unit: 'g', importance: 'Body' },
      { name: 'Egg Whites', amount: '100', unit: 'g', importance: 'Meringue Base' },
      { name: 'Caster Sugar', amount: '100', unit: 'g', importance: 'Stability' }
    ],
    steps: [
      { id: 1, text: 'Sift almond flour and icing sugar twice.' },
      { id: 2, text: 'Whisk whites to soft peaks, then add sugar for stiff peaks.' },
      { id: 3, text: 'The Macaronage: Fold dry into wet until "lava" stage.' },
      { id: 4, text: 'Pipe circles and rap the tray to release air.' },
      { id: 5, text: 'Let dry for 45 mins until a skin forms.' },
      { id: 6, text: 'Bake precisely and let cool before filling.' }
    ],
    bakeTemp: '150°C',
    bakeTime: '15 minutes'
  },
  {
    id: 'shortbread',
    name: 'Classic Scottish Shortbread',
    category: 'Cookies',
    difficulty: 'Beginner',
    description: 'Buttery, crumbly, and only needs three ingredients.',
    ingredients: [
      { name: 'Unsalted Butter', amount: '250', unit: 'g', importance: 'Primary Flavor' },
      { name: 'Plain Flour', amount: '375', unit: 'g', importance: 'Bulk' },
      { name: 'Caster Sugar', amount: '125', unit: 'g', importance: 'Crunch' }
    ],
    steps: [
      { id: 1, text: 'Cream butter and sugar until smooth.' },
      { id: 2, text: 'Rub in flour to form a stiff dough.' },
      { id: 3, text: 'Press into a rectangular tin or cut into rounds.' },
      { id: 4, text: 'Prick with a fork and sprinkle with extra sugar.' },
      { id: 5, text: 'Bake until very pale golden.' }
    ],
    bakeTemp: '160°C',
    bakeTime: '30-35 minutes'
  },
  {
    id: 'lemon-tart',
    name: 'Zesty Lemon Tart',
    category: 'Pastries',
    difficulty: 'Intermediate',
    description: 'Crispy shortcrust pastry with a silky, tangy lemon curd.',
    ingredients: [
      { name: 'Plain Flour', amount: '250', unit: 'g', importance: 'Pastry' },
      { name: 'Cold Butter', amount: '125', unit: 'g', importance: 'Flakiness' },
      { name: 'Lemons', amount: '4', unit: 'medium', importance: 'Zest & Juice' },
      { name: 'Eggs', amount: '5', unit: 'large', importance: 'Custard Set' },
      { name: 'Double cream', amount: '150', unit: 'ml', importance: 'Smoothness' }
    ],
    steps: [
      { id: 1, text: 'Make shortcrust pastry and blind bake for 15 mins.' },
      { id: 2, text: 'Whisk eggs, sugar, lemon juice, and zest.' },
      { id: 3, text: 'Stir in cream and strain the mixture.' },
      { id: 4, text: 'Pour into pastry case and bake low and slow.' }
    ],
    bakeTemp: '140°C',
    bakeTime: '30-35 minutes'
  },
  {
    id: 'croissants',
    name: 'Hand-Laminated Croissants',
    category: 'Pastries',
    difficulty: 'Advanced',
    description: 'Light, airy, and intensely buttery layers through lamination.',
    ingredients: [
      { name: 'Bread Flour', amount: '500', unit: 'g', importance: 'Elasticity' },
      { name: 'Dry Yeast', amount: '10', unit: 'g', importance: 'Open Crumb' },
      { name: 'Tournage Butter', amount: '250', unit: 'g', importance: 'Lamination' },
      { name: 'Cold Milk', amount: '300', unit: 'ml', importance: 'Soft Dough' }
    ],
    steps: [
      { id: 1, text: 'Make a detrempe dough and chill.' },
      { id: 2, text: 'Envelope a butter block into the dough.' },
      { id: 3, text: 'Perform three "single turns" with chilling between.' },
      { id: 4, text: 'Roll out thin and cut into long triangles.' },
      { id: 5, text: 'Roll up, proof for 2 hours, and egg wash.' },
      { id: 6, text: 'Bake at high heat initially, then lower.' }
    ],
    bakeTemp: '200°C',
    bakeTime: '15-20 minutes'
  },
  {
    id: 'cinnamon-rolls',
    name: 'Gooey Cinnamon Rolls',
    category: 'Pastries',
    difficulty: 'Intermediate',
    description: 'Soft yeasted dough swirled with cinnamon butter and topped with glaze.',
    ingredients: [
      { name: 'Warm Milk', amount: '250', unit: 'ml', importance: 'Dough Activation' },
      { name: 'Active Dry Yeast', amount: '7', unit: 'g', importance: 'Growth' },
      { name: 'Cinnamon', amount: '2', unit: 'tbsp', importance: 'Main Spice' },
      { name: 'Cream Cheese', amount: '100', unit: 'g', importance: 'Icing Base' }
    ],
    steps: [
      { id: 1, text: 'Make an enriched dough and let it rise.' },
      { id: 2, text: 'Roll into a rectangle and spread with spiced butter.' },
      { id: 3, text: 'Roll tightly into a log and slice into rounds.' },
      { id: 4, text: 'Place in a pan for second proof.' },
      { id: 5, text: 'Bake until fluffy and pour glaze over while warm.' }
    ],
    bakeTemp: '190°C',
    bakeTime: '20-25 minutes'
  },
  {
    id: 'apple-pie',
    name: 'Classic Granny Smith Apple Pie',
    category: 'Pies',
    difficulty: 'Beginner',
    description: 'A nostalgic favorite with a flaky lattice crust and spiced apples.',
    ingredients: [
      { name: 'Cold Butter', amount: '200', unit: 'g', importance: 'Flaky Crust' },
      { name: 'Granny Smith Apples', amount: '6', unit: 'large', importance: 'Tart Filling' },
      { name: 'Cinnamon', amount: '1', unit: 'tsp', importance: 'Warmth' },
      { name: 'Ice Water', amount: '50', unit: 'ml', importance: 'Dough Binding' }
    ],
    steps: [
      { id: 1, text: 'Make pie crust and chill for 1 hour.' },
      { id: 2, text: 'Toss sliced apples with sugar, spice, and flour.' },
      { id: 3, text: 'Roll bottom crust and fill with apples.' },
      { id: 4, text: 'Add lattice top and crimp the edges.' },
      { id: 5, text: 'Bake until the crust is golden and juice bubbles.' }
    ],
    bakeTemp: '190°C',
    bakeTime: '50 minutes'
  },
  {
    id: 'pecan-pie',
    name: 'Southern Pecan Pie',
    category: 'Pies',
    difficulty: 'Intermediate',
    description: 'A rich, nutty, and sweet pie that is a holiday staple.',
    ingredients: [
      { name: 'Pecan Halves', amount: '200', unit: 'g', importance: 'Crunch' },
      { name: 'Corn Syrup', amount: '200', unit: 'ml', importance: 'Glossy Set' },
      { name: 'Brown Sugar', amount: '100', unit: 'g', importance: 'Molasses Notes' },
      { name: 'Bourbon', amount: '1', unit: 'tbsp', importance: 'Hidden Depth' }
    ],
    steps: [
      { id: 1, text: 'Blind bake a single pie shell.' },
      { id: 2, text: 'Whisk eggs, syrup, sugar, and melted butter.' },
      { id: 3, text: 'Stir in the pecans and bourbon.' },
      { id: 4, text: 'Pour into the shell and bake until center is set.' }
    ],
    bakeTemp: '175°C',
    bakeTime: '45-50 minutes'
  },
  {
    id: 'pumpkin-pie',
    name: 'Velvety Pumpkin Pie',
    category: 'Pies',
    difficulty: 'Beginner',
    description: 'Smooth pumpkin custard spiced with ginger, cloves, and nutmeg.',
    ingredients: [
      { name: 'Pumpkin Puree', amount: '450', unit: 'g', importance: 'Flavor & Color' },
      { name: 'Evaporated Milk', amount: '350', unit: 'ml', importance: 'Creamy Set' },
      { name: 'Pumpkin Pie Spice', amount: '2', unit: 'tsp', importance: 'Aroma' },
      { name: 'Eggs', amount: '2', unit: 'large', importance: 'Custard Binding' }
    ],
    steps: [
      { id: 1, text: 'Whisk all ingredients together until smooth.' },
      { id: 2, text: 'Pour into an unbaked pie shell.' },
      { id: 3, text: 'Bake at high heat for 15 mins, then lower.' },
      { id: 4, text: 'Cool completely to allow the custard to set.' }
    ],
    bakeTemp: '175°C',
    bakeTime: '40-50 minutes'
  },
  {
    id: 'quiche-lorraine',
    name: 'Quiche Lorraine',
    category: 'Pies',
    difficulty: 'Intermediate',
    description: 'A savory classic with smoky bacon and a rich egg custard.',
    ingredients: [
      { name: 'Shortcrust Pastry', amount: '1', unit: 'sheet', importance: 'Vessel' },
      { name: 'Smoked Bacon', amount: '200', unit: 'g', importance: 'Salty Punch' },
      { name: 'Gruyère Cheese', amount: '100', unit: 'g', importance: 'Melting Quality' },
      { name: 'Heavy Cream', amount: '200', unit: 'ml', importance: 'Silkiness' }
    ],
    steps: [
      { id: 1, text: 'Blind bake pastry case until sandy and dry.' },
      { id: 2, text: 'Fry bacon until crisp and drain.' },
      { id: 3, text: 'Whisk eggs, cream, and a pinch of nutmeg.' },
      { id: 4, text: 'Scatter bacon and cheese in the case.' },
      { id: 5, text: 'Pour in custard and bake until just wobbly.' }
    ],
    bakeTemp: '180°C',
    bakeTime: '30-35 minutes'
  },
  {
    id: 'brownies',
    name: 'Fudgy Dark Choc Brownies',
    category: 'Cookies',
    difficulty: 'Beginner',
    description: 'Deeply chocolatey with a crackly top and moist, dense center.',
    ingredients: [
      { name: 'Dark Chocolate', amount: '200', unit: 'g', importance: 'Intensity' },
      { name: 'Butter', amount: '150', unit: 'g', importance: 'Fudginess' },
      { name: 'Eggs', amount: '3', unit: 'large', importance: 'Lift' },
      { name: 'Cocoa Powder', amount: '50', unit: 'g', importance: 'Depth' }
    ],
    steps: [
      { id: 1, text: 'Melt chocolate and butter together.' },
      { id: 2, text: 'Whisk eggs and sugar until doubled in volume.' },
      { id: 3, text: 'Fold chocolate into eggs, then sift in dry ingredients.' },
      { id: 4, text: 'Bake in a lined square tin.' },
      { id: 5, text: 'Cool in tin before slicing to ensure the center sets.' }
    ],
    bakeTemp: '180°C',
    bakeTime: '25 minutes'
  }
];

export const BADGES = [
  { id: 'yeast-master', name: 'Yeast Master', icon: '🍞', description: 'Perfectly recalled a bread recipe.' },
  { id: 'sugar-sweet', name: 'Sugar Sweet', icon: '🍪', description: 'Mastered 3 cookie recipes.' },
  { id: 'flour-power', name: 'Flour Power', icon: '🥖', description: 'Achieved a 5-day streak.' },
  { id: 'oven-overlord', name: 'Oven Overlord', icon: '👑', description: 'Finished an advanced quiz with 100%.' },
  { id: 'speed-baker', name: 'Speed Baker', icon: '⚡', description: 'Completed a Challenge Mode session.' }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'bread-blitz',
    title: 'Bread Blitz',
    description: 'Drill the fundamentals of bread making in record time.',
    recipes: ['basic-bread', 'focaccia', 'challah'],
    timeLimit: 60,
    bonusPoints: 150,
    category: 'Bread'
  },
  {
    id: 'sweet-marathon',
    title: 'Sweet Marathon',
    description: 'A high-speed test of cookie and tart mastery.',
    recipes: ['classic-cookies', 'lemon-tart', 'brownies', 'snickerdoodles'],
    timeLimit: 120,
    bonusPoints: 300
  },
  {
    id: 'pastry-perfection',
    title: 'Pastry Perfection',
    description: 'Advanced techniques under intense pressure.',
    recipes: ['croissants', 'macarons', 'pain-au-chocolat', 'baklava'],
    timeLimit: 180,
    bonusPoints: 500
  },
  {
    id: 'pie-frenzy',
    title: 'Pie Frenzy',
    description: 'Recall the secrets of the perfect crust and filling.',
    recipes: ['apple-pie', 'key-lime-pie', 'blueberry-pie'],
    timeLimit: 90,
    bonusPoints: 200
  }
];
