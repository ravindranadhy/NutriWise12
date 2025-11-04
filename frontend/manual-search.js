// Manual Food Search Functionality

// Food Database
const foodDatabase=[
// Indian Foods
{name:'Masala Dosa',category:'Indian',calories:250,protein:6,carbs:45,fats:8,fiber:3,vitamins:{A:'5%',C:'10%',D:'0%',B12:'2%'},minerals:{Iron:'8%',Calcium:'6%',Potassium:'5%'},servingSize:'1 dosa',icon:'🥞'},
{name:'Idli',category:'Indian',calories:39,protein:2,carbs:8,fats:0.2,fiber:0.5,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'1%',Potassium:'1%'},servingSize:'1 piece',icon:'🍙'},
{name:'Sambar',category:'Indian',calories:150,protein:8,carbs:20,fats:5,fiber:6,vitamins:{A:'15%',C:'25%',D:'0%',B12:'0%'},minerals:{Iron:'12%',Calcium:'4%',Potassium:'10%'},servingSize:'1 bowl',icon:'🍲'},
{name:'Roti',category:'Indian',calories:80,protein:3,carbs:15,fats:1,fiber:2,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'4%',Calcium:'2%',Potassium:'2%'},servingSize:'1 piece',icon:'🫓'},
{name:'Dal Tadka',category:'Indian',calories:180,protein:12,carbs:25,fats:5,fiber:8,vitamins:{A:'5%',C:'5%',D:'0%',B12:'0%'},minerals:{Iron:'20%',Calcium:'5%',Potassium:'15%'},servingSize:'1 bowl',icon:'🍲'},
{name:'Poha',category:'Indian',calories:180,protein:4,carbs:30,fats:6,fiber:2,vitamins:{A:'2%',C:'8%',D:'0%',B12:'0%'},minerals:{Iron:'10%',Calcium:'2%',Potassium:'4%'},servingSize:'1 bowl',icon:'🍚'},
{name:'Upma',category:'Indian',calories:200,protein:5,carbs:35,fats:5,fiber:3,vitamins:{A:'3%',C:'5%',D:'0%',B12:'0%'},minerals:{Iron:'8%',Calcium:'3%',Potassium:'6%'},servingSize:'1 bowl',icon:'🍚'},
{name:'Vada',category:'Indian',calories:150,protein:4,carbs:18,fats:8,fiber:2,vitamins:{A:'1%',C:'3%',D:'0%',B12:'0%'},minerals:{Iron:'6%',Calcium:'2%',Potassium:'4%'},servingSize:'2 pieces',icon:'🍩'},
{name:'Puri',category:'Indian',calories:120,protein:3,carbs:18,fats:5,fiber:1,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'5%',Calcium:'2%',Potassium:'2%'},servingSize:'2 pieces',icon:'🫓'},
{name:'Naan',category:'Indian',calories:260,protein:9,carbs:45,fats:5,fiber:2,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'15%',Calcium:'8%',Potassium:'4%'},servingSize:'1 piece',icon:'🫓'},
{name:'Rajma',category:'Indian',calories:220,protein:14,carbs:35,fats:3,fiber:12,vitamins:{A:'2%',C:'8%',D:'0%',B12:'0%'},minerals:{Iron:'25%',Calcium:'6%',Potassium:'18%'},servingSize:'1 bowl',icon:'🍲'},
{name:'Palak Paneer',category:'Indian',calories:280,protein:15,carbs:12,fats:20,fiber:4,vitamins:{A:'180%',C:'40%',D:'3%',B12:'12%'},minerals:{Iron:'18%',Calcium:'35%',Potassium:'20%'},servingSize:'1 bowl',icon:'🥬'},
{name:'Dal Makhani',category:'Indian',calories:320,protein:15,carbs:30,fats:18,fiber:10,vitamins:{A:'8%',C:'6%',D:'2%',B12:'0%'},minerals:{Iron:'22%',Calcium:'8%',Potassium:'16%'},servingSize:'1 bowl',icon:'🍲'},
{name:'Tandoori Chicken',category:'Indian',calories:280,protein:35,carbs:5,fats:14,fiber:1,vitamins:{A:'6%',C:'8%',D:'3%',B12:'15%'},minerals:{Iron:'8%',Calcium:'4%',Potassium:'12%'},servingSize:'1 serving',icon:'🍗'},
{name:'Samosa',category:'Indian',calories:262,protein:5,carbs:35,fats:12,fiber:3,vitamins:{A:'3%',C:'12%',D:'0%',B12:'0%'},minerals:{Iron:'8%',Calcium:'3%',Potassium:'10%'},servingSize:'2 pieces',icon:'🥟'},
{name:'Pakora',category:'Indian',calories:180,protein:4,carbs:20,fats:10,fiber:2,vitamins:{A:'5%',C:'15%',D:'0%',B12:'0%'},minerals:{Iron:'6%',Calcium:'3%',Potassium:'8%'},servingSize:'6 pieces',icon:'🍤'},
{name:'Khichdi',category:'Indian',calories:200,protein:8,carbs:35,fats:4,fiber:5,vitamins:{A:'4%',C:'6%',D:'0%',B12:'0%'},minerals:{Iron:'12%',Calcium:'4%',Potassium:'10%'},servingSize:'1 bowl',icon:'🍚'},
{name:'Pav Bhaji',category:'Indian',calories:400,protein:10,carbs:55,fats:16,fiber:6,vitamins:{A:'25%',C:'45%',D:'0%',B12:'0%'},minerals:{Iron:'15%',Calcium:'8%',Potassium:'20%'},servingSize:'1 serving',icon:'🍛'},
{name:'Vada Pav',category:'Indian',calories:290,protein:6,carbs:42,fats:12,fiber:3,vitamins:{A:'2%',C:'10%',D:'0%',B12:'0%'},minerals:{Iron:'8%',Calcium:'4%',Potassium:'8%'},servingSize:'1 piece',icon:'🍔'},
{name:'Dhokla',category:'Indian',calories:160,protein:6,carbs:28,fats:3,fiber:2,vitamins:{A:'2%',C:'8%',D:'0%',B12:'0%'},minerals:{Iron:'6%',Calcium:'3%',Potassium:'5%'},servingSize:'4 pieces',icon:'🍰'},
// More Indian Dishes
{name:'Paneer Butter Masala',category:'Indian',calories:350,protein:16,carbs:15,fats:26,fiber:3,vitamins:{A:'12%',C:'10%',D:'4%',B12:'14%'},minerals:{Iron:'8%',Calcium:'32%',Potassium:'12%'},servingSize:'1 bowl',icon:'🍛'},
{name:'Chicken Curry',category:'Indian',calories:320,protein:28,carbs:12,fats:20,fiber:2,vitamins:{A:'10%',C:'12%',D:'3%',B12:'18%'},minerals:{Iron:'12%',Calcium:'6%',Potassium:'14%'},servingSize:'1 bowl',icon:'🍛'},
{name:'Fish Curry',category:'Indian',calories:250,protein:25,carbs:10,fats:14,fiber:2,vitamins:{A:'8%',C:'15%',D:'45%',B12:'35%'},minerals:{Iron:'8%',Calcium:'5%',Potassium:'16%'},servingSize:'1 bowl',icon:'🍲'},
{name:'Medu Vada',category:'Indian',calories:180,protein:6,carbs:22,fats:8,fiber:3,vitamins:{A:'1%',C:'4%',D:'0%',B12:'0%'},minerals:{Iron:'8%',Calcium:'3%',Potassium:'6%'},servingSize:'2 pieces',icon:'🍩'},
{name:'Pesarattu',category:'Indian',calories:150,protein:8,carbs:22,fats:4,fiber:4,vitamins:{A:'3%',C:'6%',D:'0%',B12:'0%'},minerals:{Iron:'12%',Calcium:'4%',Potassium:'8%'},servingSize:'1 dosa',icon:'🥞'},
{name:'Paneer Tikka',category:'Indian',calories:300,protein:18,carbs:8,fats:22,fiber:2,vitamins:{A:'10%',C:'15%',D:'5%',B12:'15%'},minerals:{Iron:'6%',Calcium:'30%',Potassium:'8%'},servingSize:'6 pieces',icon:'🧀'},{name:'Biryani',category:'Indian',calories:450,protein:20,carbs:60,fats:15,fiber:3,vitamins:{A:'8%',C:'10%',D:'2%',B12:'10%'},minerals:{Iron:'15%',Calcium:'8%',Potassium:'12%'},servingSize:'1 plate',icon:'🍛'},{name:'Chole Bhature',category:'Indian',calories:550,protein:15,carbs:70,fats:25,fiber:10,vitamins:{A:'5%',C:'15%',D:'0%',B12:'0%'},minerals:{Iron:'18%',Calcium:'10%',Potassium:'20%'},servingSize:'1 serving',icon:'🍛'},{name:'Aloo Paratha',category:'Indian',calories:250,protein:6,carbs:35,fats:10,fiber:3,vitamins:{A:'2%',C:'15%',D:'0%',B12:'0%'},minerals:{Iron:'8%',Calcium:'5%',Potassium:'12%'},servingSize:'1 piece',icon:'🫓'},{name:'Butter Chicken',category:'Indian',calories:400,protein:25,carbs:12,fats:30,fiber:2,vitamins:{A:'15%',C:'10%',D:'5%',B12:'20%'},minerals:{Iron:'10%',Calcium:'8%',Potassium:'15%'},servingSize:'1 serving',icon:'🍗'},{name:'White Rice',category:'Grains',calories:130,protein:2.7,carbs:28,fats:0.3,fiber:0.4,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'1%',Potassium:'1%'},servingSize:'1 cup',icon:'🍚'},{name:'Brown Rice',category:'Grains',calories:215,protein:5,carbs:45,fats:1.8,fiber:3.5,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'5%',Calcium:'2%',Potassium:'4%'},servingSize:'1 cup',icon:'🍚'},{name:'Chicken Breast',category:'Protein',calories:165,protein:31,carbs:0,fats:3.6,fiber:0,vitamins:{A:'1%',C:'0%',D:'1%',B12:'6%'},minerals:{Iron:'5%',Calcium:'1%',Potassium:'8%'},servingSize:'100g',icon:'🍗'},{name:'Eggs',category:'Protein',calories:155,protein:13,carbs:1.1,fats:11,fiber:0,vitamins:{A:'10%',C:'0%',D:'10%',B12:'23%'},minerals:{Iron:'6%',Calcium:'5%',Potassium:'3%'},servingSize:'2 large',icon:'🥚'},{name:'Banana',category:'Fruits',calories:105,protein:1.3,carbs:27,fats:0.4,fiber:3.1,vitamins:{A:'2%',C:'17%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'1%',Potassium:'12%'},servingSize:'1 medium',icon:'🍌'},{name:'Apple',category:'Fruits',calories:95,protein:0.5,carbs:25,fats:0.3,fiber:4.4,vitamins:{A:'2%',C:'14%',D:'0%',B12:'0%'},minerals:{Iron:'1%',Calcium:'1%',Potassium:'6%'},servingSize:'1 medium',icon:'🍎'},{name:'Milk',category:'Dairy',calories:150,protein:8,carbs:12,fats:8,fiber:0,vitamins:{A:'10%',C:'0%',D:'25%',B12:'50%'},minerals:{Iron:'0%',Calcium:'30%',Potassium:'10%'},servingSize:'1 cup',icon:'🥛'},{name:'Yogurt',category:'Dairy',calories:100,protein:10,carbs:12,fats:2.5,fiber:0,vitamins:{A:'4%',C:'2%',D:'0%',B12:'20%'},minerals:{Iron:'0%',Calcium:'30%',Potassium:'12%'},servingSize:'1 cup',icon:'🥛'},{name:'Bread',category:'Grains',calories:80,protein:4,carbs:15,fats:1,fiber:2,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'6%',Calcium:'4%',Potassium:'2%'},servingSize:'1 slice',icon:'🍞'},{name:'Oatmeal',category:'Grains',calories:150,protein:5,carbs:27,fats:3,fiber:4,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'10%',Calcium:'2%',Potassium:'4%'},servingSize:'1 cup',icon:'🥣'},{name:'Almonds',category:'Nuts',calories:160,protein:6,carbs:6,fats:14,fiber:3.5,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'6%',Calcium:'8%',Potassium:'6%'},servingSize:'28g',icon:'🥜'},{name:'Spinach',category:'Vegetables',calories:23,protein:2.9,carbs:3.6,fats:0.4,fiber:2.2,vitamins:{A:'188%',C:'47%',D:'0%',B12:'0%'},minerals:{Iron:'15%',Calcium:'10%',Potassium:'16%'},servingSize:'1 cup',icon:'🥬'},{name:'Broccoli',category:'Vegetables',calories:55,protein:3.7,carbs:11,fats:0.6,fiber:2.4,vitamins:{A:'12%',C:'135%',D:'0%',B12:'0%'},minerals:{Iron:'4%',Calcium:'4%',Potassium:'8%'},servingSize:'1 cup',icon:'🥦'},{name:'Salmon',category:'Protein',calories:206,protein:22,carbs:0,fats:13,fiber:0,vitamins:{A:'3%',C:'0%',D:'127%',B12:'51%'},minerals:{Iron:'3%',Calcium:'1%',Potassium:'11%'},servingSize:'100g',icon:'🐟'},{name:'Sweet Potato',category:'Vegetables',calories:112,protein:2,carbs:26,fats:0.1,fiber:3.9,vitamins:{A:'384%',C:'37%',D:'0%',B12:'0%'},minerals:{Iron:'4%',Calcium:'4%',Potassium:'15%'},servingSize:'1 medium',icon:'🍠'},
// Fruits
{name:'Orange',category:'Fruits',calories:62,protein:1.2,carbs:15,fats:0.2,fiber:3.1,vitamins:{A:'4%',C:'116%',D:'0%',B12:'0%'},minerals:{Iron:'1%',Calcium:'5%',Potassium:'7%'},servingSize:'1 medium',icon:'🍊'},
{name:'Mango',category:'Fruits',calories:99,protein:1.4,carbs:25,fats:0.6,fiber:2.6,vitamins:{A:'25%',C:'76%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'2%',Potassium:'7%'},servingSize:'1 cup',icon:'🥭'},
{name:'Grapes',category:'Fruits',calories:104,protein:1.1,carbs:27,fats:0.2,fiber:1.4,vitamins:{A:'2%',C:'27%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'2%',Potassium:'8%'},servingSize:'1 cup',icon:'🍇'},
{name:'Watermelon',category:'Fruits',calories:46,protein:0.9,carbs:12,fats:0.2,fiber:0.6,vitamins:{A:'11%',C:'21%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'1%',Potassium:'4%'},servingSize:'1 cup',icon:'🍉'},
{name:'Strawberries',category:'Fruits',calories:49,protein:1,carbs:12,fats:0.5,fiber:3,vitamins:{A:'1%',C:'149%',D:'0%',B12:'0%'},minerals:{Iron:'3%',Calcium:'2%',Potassium:'5%'},servingSize:'1 cup',icon:'🍓'},
{name:'Papaya',category:'Fruits',calories:62,protein:0.7,carbs:16,fats:0.4,fiber:2.5,vitamins:{A:'31%',C:'144%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'3%',Potassium:'11%'},servingSize:'1 cup',icon:'🍈'},
{name:'Pineapple',category:'Fruits',calories:82,protein:0.9,carbs:22,fats:0.2,fiber:2.3,vitamins:{A:'2%',C:'131%',D:'0%',B12:'0%'},minerals:{Iron:'3%',Calcium:'2%',Potassium:'5%'},servingSize:'1 cup',icon:'🍍'},
{name:'Pomegranate',category:'Fruits',calories:144,protein:2.9,carbs:33,fats:2,fiber:7,vitamins:{A:'0%',C:'30%',D:'0%',B12:'0%'},minerals:{Iron:'5%',Calcium:'3%',Potassium:'12%'},servingSize:'1 cup',icon:'🍎'},
{name:'Guava',category:'Fruits',calories:112,protein:4.2,carbs:24,fats:1.6,fiber:9,vitamins:{A:'12%',C:'628%',D:'0%',B12:'0%'},minerals:{Iron:'4%',Calcium:'3%',Potassium:'14%'},servingSize:'1 cup',icon:'🍏'},
// More Vegetables
{name:'Tomato',category:'Vegetables',calories:32,protein:1.6,carbs:7,fats:0.4,fiber:2.2,vitamins:{A:'20%',C:'28%',D:'0%',B12:'0%'},minerals:{Iron:'3%',Calcium:'2%',Potassium:'10%'},servingSize:'1 cup',icon:'🍅'},
{name:'Carrot',category:'Vegetables',calories:52,protein:1.2,carbs:12,fats:0.3,fiber:3.6,vitamins:{A:'428%',C:'13%',D:'0%',B12:'0%'},minerals:{Iron:'3%',Calcium:'4%',Potassium:'12%'},servingSize:'1 cup',icon:'🥕'},
{name:'Cucumber',category:'Vegetables',calories:16,protein:0.8,carbs:3.6,fats:0.1,fiber:0.5,vitamins:{A:'2%',C:'4%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'2%',Potassium:'4%'},servingSize:'1 cup',icon:'🥒'},
{name:'Cauliflower',category:'Vegetables',calories:25,protein:2,carbs:5,fats:0.1,fiber:2.5,vitamins:{A:'0%',C:'77%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'2%',Potassium:'9%'},servingSize:'1 cup',icon:'🥦'},
{name:'Cabbage',category:'Vegetables',calories:22,protein:1.1,carbs:5,fats:0.1,fiber:2.2,vitamins:{A:'2%',C:'54%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'4%',Potassium:'5%'},servingSize:'1 cup',icon:'🥬'},
{name:'Beetroot',category:'Vegetables',calories:58,protein:2.2,carbs:13,fats:0.2,fiber:3.8,vitamins:{A:'1%',C:'11%',D:'0%',B12:'0%'},minerals:{Iron:'5%',Calcium:'2%',Potassium:'11%'},servingSize:'1 cup',icon:'🫐'},
{name:'Bell Pepper',category:'Vegetables',calories:39,protein:1.5,carbs:9,fats:0.5,fiber:3.1,vitamins:{A:'93%',C:'317%',D:'0%',B12:'0%'},minerals:{Iron:'4%',Calcium:'1%',Potassium:'7%'},servingSize:'1 cup',icon:'🫑'},
{name:'Onion',category:'Vegetables',calories:64,protein:1.8,carbs:15,fats:0.2,fiber:2.7,vitamins:{A:'0%',C:'20%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'4%',Potassium:'8%'},servingSize:'1 cup',icon:'🧅'},
{name:'Green Beans',category:'Vegetables',calories:44,protein:2.4,carbs:10,fats:0.4,fiber:4,vitamins:{A:'17%',C:'25%',D:'0%',B12:'0%'},minerals:{Iron:'6%',Calcium:'6%',Potassium:'8%'},servingSize:'1 cup',icon:'🫘'},
// Protein Sources
{name:'Tofu',category:'Protein',calories:144,protein:17,carbs:3,fats:9,fiber:2,vitamins:{A:'1%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'19%',Calcium:'86%',Potassium:'5%'},servingSize:'100g',icon:'🧈'},
{name:'Chickpeas',category:'Protein',calories:269,protein:15,carbs:45,fats:4,fiber:13,vitamins:{A:'1%',C:'4%',D:'0%',B12:'0%'},minerals:{Iron:'26%',Calcium:'8%',Potassium:'14%'},servingSize:'1 cup',icon:'🫘'},
{name:'Lentils',category:'Protein',calories:230,protein:18,carbs:40,fats:0.8,fiber:16,vitamins:{A:'0%',C:'3%',D:'0%',B12:'0%'},minerals:{Iron:'37%',Calcium:'4%',Potassium:'21%'},servingSize:'1 cup',icon:'🫘'},
{name:'Tuna',category:'Protein',calories:179,protein:39,carbs:0,fats:1.3,fiber:0,vitamins:{A:'3%',C:'0%',D:'39%',B12:'104%'},minerals:{Iron:'6%',Calcium:'1%',Potassium:'16%'},servingSize:'100g',icon:'🐟'},
{name:'Shrimp',category:'Protein',calories:99,protein:24,carbs:0.2,fats:0.3,fiber:0,vitamins:{A:'3%',C:'3%',D:'0%',B12:'59%'},minerals:{Iron:'15%',Calcium:'7%',Potassium:'6%'},servingSize:'100g',icon:'🍤'},
{name:'Cottage Cheese',category:'Dairy',calories:163,protein:28,carbs:6,fats:2.3,fiber:0,vitamins:{A:'3%',C:'0%',D:'0%',B12:'24%'},minerals:{Iron:'1%',Calcium:'14%',Potassium:'5%'},servingSize:'1 cup',icon:'🧀'},
// Grains & Cereals
{name:'Quinoa',category:'Grains',calories:222,protein:8,carbs:39,fats:3.6,fiber:5,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'15%',Calcium:'3%',Potassium:'9%'},servingSize:'1 cup',icon:'🌾'},
{name:'Pasta',category:'Grains',calories:220,protein:8,carbs:43,fats:1.3,fiber:2.5,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'10%',Calcium:'2%',Potassium:'2%'},servingSize:'1 cup',icon:'🍝'},
{name:'Whole Wheat Bread',category:'Grains',calories:110,protein:5,carbs:20,fats:1.5,fiber:3,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'8%',Calcium:'6%',Potassium:'3%'},servingSize:'2 slices',icon:'🍞'},
{name:'Cornflakes',category:'Grains',calories:100,protein:2,carbs:24,fats:0,fiber:1,vitamins:{A:'10%',C:'25%',D:'10%',B12:'25%'},minerals:{Iron:'45%',Calcium:'0%',Potassium:'1%'},servingSize:'1 cup',icon:'🥣'},
{name:'Granola',category:'Grains',calories:471,protein:11,carbs:68,fats:20,fiber:8,vitamins:{A:'0%',C:'1%',D:'0%',B12:'0%'},minerals:{Iron:'16%',Calcium:'6%',Potassium:'12%'},servingSize:'1 cup',icon:'🥣'},
// Snacks & Fast Food
{name:'Pizza',category:'Fast Food',calories:285,protein:12,carbs:36,fats:10,fiber:2,vitamins:{A:'6%',C:'2%',D:'0%',B12:'8%'},minerals:{Iron:'15%',Calcium:'20%',Potassium:'5%'},servingSize:'1 slice',icon:'🍕'},
{name:'Burger',category:'Fast Food',calories:354,protein:20,carbs:33,fats:16,fiber:2,vitamins:{A:'4%',C:'2%',D:'2%',B12:'15%'},minerals:{Iron:'15%',Calcium:'8%',Potassium:'8%'},servingSize:'1 burger',icon:'🍔'},
{name:'French Fries',category:'Fast Food',calories:365,protein:4,carbs:48,fats:17,fiber:4,vitamins:{A:'0%',C:'16%',D:'0%',B12:'0%'},minerals:{Iron:'4%',Calcium:'2%',Potassium:'18%'},servingSize:'1 medium',icon:'🍟'},
{name:'Sandwich',category:'Fast Food',calories:250,protein:12,carbs:30,fats:8,fiber:3,vitamins:{A:'6%',C:'8%',D:'1%',B12:'10%'},minerals:{Iron:'12%',Calcium:'10%',Potassium:'6%'},servingSize:'1 sandwich',icon:'🥪'},
{name:'Chocolate',category:'Snacks',calories:235,protein:3,carbs:26,fats:13,fiber:3,vitamins:{A:'1%',C:'0%',D:'0%',B12:'2%'},minerals:{Iron:'12%',Calcium:'6%',Potassium:'8%'},servingSize:'40g',icon:'🍫'},
{name:'Ice Cream',category:'Dessert',calories:207,protein:3.5,carbs:24,fats:11,fiber:0.7,vitamins:{A:'10%',C:'1%',D:'0%',B12:'8%'},minerals:{Iron:'2%',Calcium:'10%',Potassium:'4%'},servingSize:'1 cup',icon:'🍨'},
{name:'Cookies',category:'Snacks',calories:140,protein:2,carbs:20,fats:6,fiber:1,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'6%',Calcium:'2%',Potassium:'1%'},servingSize:'3 cookies',icon:'🍪'},
// Beverages
{name:'Green Tea',category:'Beverages',calories:2,protein:0,carbs:0,fats:0,fiber:0,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'0%',Calcium:'0%',Potassium:'1%'},servingSize:'1 cup',icon:'🍵'},
{name:'Coffee',category:'Beverages',calories:2,protein:0.3,carbs:0,fats:0,fiber:0,vitamins:{A:'0%',C:'0%',D:'0%',B12:'0%'},minerals:{Iron:'0%',Calcium:'0%',Potassium:'3%'},servingSize:'1 cup',icon:'☕'},
{name:'Orange Juice',category:'Beverages',calories:112,protein:1.7,carbs:26,fats:0.5,fiber:0.5,vitamins:{A:'4%',C:'207%',D:'0%',B12:'0%'},minerals:{Iron:'2%',Calcium:'3%',Potassium:'14%'},servingSize:'1 cup',icon:'🧃'},
{name:'Smoothie',category:'Beverages',calories:150,protein:4,carbs:30,fats:2,fiber:4,vitamins:{A:'15%',C:'80%',D:'0%',B12:'5%'},minerals:{Iron:'4%',Calcium:'15%',Potassium:'18%'},servingSize:'1 cup',icon:'🥤'},
{name:'Lassi',category:'Beverages',calories:140,protein:6,carbs:22,fats:3,fiber:0,vitamins:{A:'4%',C:'2%',D:'10%',B12:'15%'},minerals:{Iron:'1%',Calcium:'20%',Potassium:'8%'},servingSize:'1 cup',icon:'🥛'}
];

// Log database size for verification
console.log('✅ Food Database Loaded:', foodDatabase.length, 'items');
console.log('📊 Sample items:', foodDatabase.slice(0, 3).map(f => f.name));
console.log('🍊 Orange in database:', foodDatabase.find(f => f.name === 'Orange') ? 'YES' : 'NO');
console.log('🍕 Pizza in database:', foodDatabase.find(f => f.name === 'Pizza') ? 'YES' : 'NO');

function openManualSearch(){
  let e = document.getElementById('manualSearchModal');
  e || (createSearchModal(), e = document.getElementById('manualSearchModal'));
  e.style.display = 'flex';
  document.getElementById('foodSearchInput').focus();
}

function createSearchModal(){
  const e = document.createElement('div');
  e.id = 'manualSearchModal';
  e.className = 'search-modal';
  e.innerHTML = `
    <div class="search-modal-content">
      <div class="search-modal-header">
        <h3>Search Food Database</h3>
        <button id="closeSearchModal" class="close-btn">×</button>
      </div>
      <div class="search-modal-body">
        <div class="search-input-container">
          <span class="search-icon">🔍</span>
          <input type="text" id="foodSearchInput" placeholder="Search for food items..." autocomplete="off">
        </div>
        <div id="searchResults" class="search-results"></div>
      </div>
    </div>
  `;
  document.body.appendChild(e);
  addSearchStyles();
  document.getElementById('closeSearchModal').addEventListener('click', () => {
    e.style.display = 'none';
  });
  document.getElementById('foodSearchInput').addEventListener('input', handleSearch);
  showPopularFoods();
}

function addSearchStyles(){
  const e = document.createElement('style');
  e.textContent = `
    .search-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      align-items: center;
      justify-content: center;
    }
    .search-modal-content {
      background-color: white;
      border-radius: 16px;
      width: 90%;
      max-width: 600px;
      max-height: 80vh;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
    }
    .search-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: #16a34a;
      color: white;
    }
    .search-modal-header h3 {
      margin: 0;
      font-size: 18px;
    }
    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
    }
    .search-modal-body {
      padding: 16px;
      overflow-y: auto;
      flex: 1;
    }
    .search-input-container {
      position: relative;
      margin-bottom: 16px;
    }
    .search-input-container .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
    }
    #foodSearchInput {
      width: 100%;
      padding: 12px 12px 12px 40px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    #foodSearchInput:focus {
      border-color: #16a34a;
    }
    .search-results {
      display: grid;
      gap: 12px;
    }
    .food-result-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      background-color: #f8fafc;
      cursor: pointer;
      transition: all 0.2s;
    }
    .food-result-item:hover {
      background-color: #e2e8f0;
      transform: translateX(4px);
    }
    .food-result-icon {
      font-size: 32px;
      margin-right: 12px;
    }
    .food-result-info {
      flex: 1;
    }
    .food-result-name {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .food-result-details {
      font-size: 14px;
      color: #64748b;
    }
    .food-result-calories {
      font-weight: 600;
      color: #16a34a;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
      margin: 16px 0 8px 0;
      text-transform: uppercase;
    }
    .no-results {
      text-align: center;
      padding: 32px;
      color: #64748b;
    }
  `;
  document.head.appendChild(e);
}

function handleSearch(e) {
  const t = e.target.value.toLowerCase().trim();
  const a = document.getElementById('searchResults');
  if (0 === t.length) return void showPopularFoods();
  const l = foodDatabase.filter(e => e.name.toLowerCase().includes(t) || e.category.toLowerCase().includes(t));
  0 === l.length ? a.innerHTML = '<div class="no-results">No foods found. Try a different search term.</div>' : displaySearchResults(l);
}

function showPopularFoods() {
  const e = document.getElementById('searchResults');
  const t = foodDatabase.slice(0, 10);
  e.innerHTML = '<div class="section-title">Popular Foods</div>';
  displaySearchResults(t);
}

function displaySearchResults(e) {
  const t = document.getElementById('searchResults');
  const a = e.map(e => `
    <div class="food-result-item" onclick="showFoodDetails('${e.name}')">
      <div class="food-result-icon">${e.icon}</div>
      <div class="food-result-info">
        <div class="food-result-name">${e.name}</div>
        <div class="food-result-details">
          <span class="food-result-calories">${e.calories} kcal</span> • ${e.servingSize} • ${e.category}
        </div>
      </div>
    </div>
  `).join('');
  t.querySelector('.section-title') ? t.innerHTML += a : t.innerHTML = a;
}

function showFoodDetails(e) {
  const t = foodDatabase.find(t => t.name === e);
  if (!t) return;
  document.getElementById('manualSearchModal').style.display = 'none';
  let a = document.getElementById('foodDetailsModal');
  a || (createDetailsModal(), a = document.getElementById('foodDetailsModal'));
  updateDetailsModal(t);
  a.style.display = 'flex';
}

function createDetailsModal() {
  const e = document.createElement('div');
  e.id = 'foodDetailsModal';
  e.className = 'details-modal';
  e.innerHTML = `
    <div class="details-modal-content">
      <div class="details-modal-header">
        <h3>Food Details</h3>
        <button id="closeDetailsModal" class="close-btn">×</button>
      </div>
      <div class="details-modal-body" id="detailsModalBody"></div>
    </div>
  `;
  document.body.appendChild(e);
  addDetailsStyles();
  document.getElementById('closeDetailsModal').addEventListener('click', () => {
    e.style.display = 'none';
  });
}

function addDetailsStyles() {
  const e = document.createElement('style');
  e.textContent = `
    .details-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 10001;
      align-items: center;
      justify-content: center;
    }
    .details-modal-content {
      background-color: white;
      border-radius: 16px;
      width: 90%;
      max-width: 500px;
      max-height: 80vh;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      animation: slideUp 0.3s ease;
    }
    .details-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: #16a34a;
      color: white;
    }
    .details-modal-header h3 {
      margin: 0;
      font-size: 18px;
    }
    .details-modal-body {
      padding: 24px;
      overflow-y: auto;
      max-height: calc(80vh - 60px);
    }
    .food-details-icon {
      font-size: 64px;
      text-align: center;
      margin-bottom: 16px;
    }
    .food-details-name {
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 8px;
    }
    .food-details-category {
      text-align: center;
      color: #64748b;
      margin-bottom: 24px;
    }
    .nutrition-section {
      margin-bottom: 24px;
    }
    .nutrition-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #0f172a;
    }
    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .nutrition-card {
      background-color: #f8fafc;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
    }
    .nutrition-value {
      font-size: 20px;
      font-weight: 700;
      color: #16a34a;
      margin-bottom: 4px;
    }
    .nutrition-label {
      font-size: 14px;
      color: #64748b;
    }
    .vitamins-minerals {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    .vitamin-item {
      background-color: #f0fdf4;
      border-radius: 6px;
      padding: 8px;
      text-align: center;
    }
    .vitamin-name {
      font-size: 12px;
      font-weight: 600;
      color: #16a34a;
    }
    .vitamin-value {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
    }
    .details-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }
    .details-btn {
      flex: 1;
      padding: 12px;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .details-btn.primary {
      background-color: #16a34a;
      color: white;
    }
    .details-btn.secondary {
      background-color: #e2e8f0;
      color: #0f172a;
    }
    .details-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `;
  document.head.appendChild(e);
}

function updateDetailsModal(e) {
  document.getElementById('detailsModalBody').innerHTML = `
    <div class="food-details-icon">${e.icon}</div>
    <div class="food-details-name">${e.name}</div>
    <div class="food-details-category">${e.category} • ${e.servingSize}</div>
    <div class="nutrition-section">
      <div class="nutrition-title">Macronutrients</div>
      <div class="nutrition-grid">
        <div class="nutrition-card">
          <div class="nutrition-value">${e.calories}</div>
          <div class="nutrition-label">Calories</div>
        </div>
        <div class="nutrition-card">
          <div class="nutrition-value">${e.protein}g</div>
          <div class="nutrition-label">Protein</div>
        </div>
        <div class="nutrition-card">
          <div class="nutrition-value">${e.carbs}g</div>
          <div class="nutrition-label">Carbs</div>
        </div>
        <div class="nutrition-card">
          <div class="nutrition-value">${e.fats}g</div>
          <div class="nutrition-label">Fats</div>
        </div>
      </div>
    </div>
    <div class="nutrition-section">
      <div class="nutrition-title">Vitamins (% Daily Value)</div>
      <div class="vitamins-minerals">
        <div class="vitamin-item">
          <div class="vitamin-name">Vit A</div>
          <div class="vitamin-value">${e.vitamins.A}</div>
        </div>
        <div class="vitamin-item">
          <div class="vitamin-name">Vit C</div>
          <div class="vitamin-value">${e.vitamins.C}</div>
        </div>
        <div class="vitamin-item">
          <div class="vitamin-name">Vit D</div>
          <div class="vitamin-value">${e.vitamins.D}</div>
        </div>
        <div class="vitamin-item">
          <div class="vitamin-name">B12</div>
          <div class="vitamin-value">${e.vitamins.B12}</div>
        </div>
      </div>
    </div>
    <div class="nutrition-section">
      <div class="nutrition-title">Minerals (% Daily Value)</div>
      <div class="vitamins-minerals">
        <div class="vitamin-item">
          <div class="vitamin-name">Iron</div>
          <div class="vitamin-value">${e.minerals.Iron}</div>
        </div>
        <div class="vitamin-item">
          <div class="vitamin-name">Calcium</div>
          <div class="vitamin-value">${e.minerals.Calcium}</div>
        </div>
        <div class="vitamin-item">
          <div class="vitamin-name">Potassium</div>
          <div class="vitamin-value">${e.minerals.Potassium}</div>
        </div>
        <div class="vitamin-item">
          <div class="vitamin-name">Fiber</div>
          <div class="vitamin-value">${e.fiber}g</div>
        </div>
      </div>
    </div>
    <div class="details-actions">
      <button class="details-btn primary" onclick="addFoodToLog('${e.name}')">Add to Today's Log</button>
      <button class="details-btn secondary" onclick="document.getElementById('foodDetailsModal').style.display='none'">Close</button>
    </div>
  `;
}

function addFoodToLog(e) {
  const t = foodDatabase.find(t => t.name === e);
  t && (showToast(`${t.name} (${t.calories} kcal) added to today's log!`), document.getElementById('foodDetailsModal').style.display = 'none');
}