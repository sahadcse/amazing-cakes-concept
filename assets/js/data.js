/* ==========================================================================
   Amazing Cakes — shared content model (single authoritative source)
   --------------------------------------------------------------------------
   All product names, pairings, sizes, pricing and historical content below
   are drawn from the bakery's own public website (research snapshot,
   5 Nov 2026) and the Sahad Labs content inventory. Spelling is normalized
   for presentation ("Lemon Raspberry"); product meaning is unchanged.

   Pages render from this file so the homepage preview, menu pages, gallery
   and forms always reference the same underlying data. Nothing here should
   be duplicated in page markup.

   CONFIRMATION STATUS
   - flavors / fillings / favorites / sizes / cupcake & dessert-table prices: published by
     the bakery; availability + pricing pending owner reconfirmation. Cake-size
     starting prices are NOT published online (the original site's "Starting
     Prices" section shows a decorative graphic only) — sizes are therefore
     presented as "contact for pricing".
   - awards / vendors / reviews: historical content as displayed on the
     bakery's website (awards 2009–2017; reviews dated October 2017).
   ========================================================================== */

window.AC = (function () {
  "use strict";

  var flavors = [
    "White", "Chocolate", "Red Velvet", "Lemon", "Funfetti", "Marble",
    "Carrot", "Rum", "Banana", "Almond Poppy", "Strawberry"
  ];

  var fillings = [
    "Fudge Buttercream", "Buttercream", "Bavarian Mousse", "Chocolate Mousse",
    "Strawberry Mousse", "Lemon Mousse", "Lemon Raspberry", "Raspberry Mousse",
    "Banana Mousse", "Strawberry Banana Mousse", "Hazelnut Mocha Mousse",
    "Cajeta Mousse", "Pina Colada", "Peanut Butter Mousse", "Mango Mousse",
    "Strawberry Mango Mousse", "Sweet Cream Cheese", "Toasted Almond",
    "Cookies and Cream", "Blueberry Cream Cheese", "Raspberry Truffle",
    "Strawberry Cream Cheese", "Strawberry Bavarian Mousse",
    "Chocolate Bavarian Mousse"
  ];

  /* Pairings published by the bakery as favorites. */
  var favorites = [
    { cake: "White",      filling: "Strawberry Mousse" },
    { cake: "Chocolate",  filling: "Cookies and Cream" },
    { cake: "Marble",     filling: "Hazelnut Mocha" },
    { cake: "Red Velvet", filling: "Sweet Cream Cheese" },
    { cake: "Strawberry", filling: "Bavarian Mousse" },
    { cake: "Funfetti",   filling: "Raspberry Mousse" },
    { cake: "Lemon",      filling: "Lemon Raspberry" }
  ];

  /* Fresh-fruit add-on, as published (subject to owner confirmation). */
  var fruitAddOn = {
    one:  { label: "One fruit",  price: "+$0.50 / serving" },
    two:  { label: "Two fruits", price: "+$0.75 / serving" },
    note: "Published add-on pricing, pending owner confirmation. Fresh-fruit availability can vary with the season and is confirmed with the bakery at inquiry."
  };

  /* Cake sizes & frostings, exactly as published. Serving counts are
     approximate guides, not guarantees. */
  var sizes = [
    { size: "6 inch",  frosting: "Whip Cream",  servings: "6–8" },
    { size: "6 inch",  frosting: "Buttercream", servings: "6–8" },
    { size: "8 inch",  frosting: "Whip Cream",  servings: "12" },
    { size: "8 inch",  frosting: "Buttercream", servings: "10–12" },
    { size: "10 inch", frosting: "Whip Cream",  servings: "20" },
    { size: "10 inch", frosting: "Buttercream", servings: "20" }
  ];

  /* Cupcake menu, dessert table & pricing notes — transcribed 6 Nov 2026
     from the bakery's online menu. Cupcake and dessert-table prices are as
     published. The six cake-size items carry no published price: the
     original site's "Starting Prices" section shows only a decorative
     stock graphic, so sizes are presented as "contact for pricing" until
     the owner supplies figures. */
  var cupcakes = [
    { name: "Vanilla Strawberry",    desc: "Vanilla cake filled and iced with strawberry mousse", price: "$3.50", img: "assets/img/menu/cup-vanilla-strawberry.jpg" },
    { name: "Cookies and Cream",     desc: "Chocolate cake with cookies & cream mousse",          price: "$3.50", img: "assets/img/menu/cup-cookies-cream.jpg" },
    { name: "Red Velvet",            desc: "Red Velvet cake with sweet cream cheese",             price: "$3.50", img: "assets/img/menu/cup-red-velvet.jpg" },
    { name: "Carrot",                desc: "Carrot cake with sweet cream cheese",                 price: "$3.50", img: "assets/img/menu/cup-carrot.jpg" },
    { name: "Raspberry Lemonade",    desc: "Lemon cake with lemonade mousse & raspberry jam",     price: "$3.50", img: "assets/img/menu/cup-raspberry-lemonade.jpg" },
    { name: "Almond Poppy",          desc: "Almond poppy cupcake with toasted almond mousse",     price: "$3.50", img: "assets/img/menu/cup-almond-poppy.jpg" },
    { name: "Chocolate",             desc: "Chocolate cake with chocolate mousse",                price: "$3.50", img: "assets/img/menu/cup-chocolate.jpg" },
    { name: "Chocolate Raspberry",   desc: "Chocolate cupcake with raspberry mousse",             price: "$3.50", img: "assets/img/menu/cup-choc-raspberry.jpg" }
  ];

  var desserts = [
    { name: "Mini Cupcake",                   price: "$3",    img: "assets/img/menu/dt-mini-cupcake.jpg" },
    { name: "Cake Pops",                      price: "$3",    img: "assets/img/menu/dt-cake-pops.jpg" },
    { name: "Mini Fruit Tart",                price: "$3.50", img: "assets/img/menu/dt-fruit-tart.jpg" },
    { name: "Chocolate Covered Strawberries", price: null,    priceNote: "Price varies depending on season", img: "assets/img/menu/dt-choc-berries.jpg" },
    { name: "Brownie Bites",                  price: "$2",    img: "assets/img/menu/dt-brownie-bites.jpg" },
    { name: "Lemon Bar Bites",                price: "$4",    img: "assets/img/menu/dt-lemon-bars.jpg" },
    { name: "Sugar Cookies",                  price: null,    priceNote: "Price based on design", img: "assets/img/menu/dt-sugar-cookies.jpg" },
    { name: "Chocolate-Dipped Pretzels",      price: "$2.50", img: "assets/img/menu/dt-pretzels.jpg" },
    { name: "Chocolate-Dipped Oreos",         price: "$3",    priceNote: "$3 each full-dip · $2 each half-dip", img: "assets/img/menu/dt-oreos.png" },
    { name: "Rice Krispie Treats",            price: "$3",    img: "assets/img/menu/dt-rice-krispie.jpg" }
  ];

  var menu = {
    cakesQuote: "Though our online selection is limited, we have endless possibilities in store — come visit or call us!",
    cupcakePrice: "$3.50 each, as published",
    sizesPriceNote: "Starting prices for custom cakes are not published online. The bakery quotes each design individually — please call or email regarding custom designs.",
    dessertsQuote: "Dessert-table items and pricing — all items can be customized to your party color scheme!"
  };

  /* Cake categories — connect cards, gallery filters and inquiry choices. */
  var categories = [
    { id: "wedding",   name: "Wedding Cakes",              blurb: "Tiered and floral designs for celebrations." },
    { id: "birthday",  name: "Birthday & Celebration",     blurb: "Character, theme and milestone cakes." },
    { id: "specialty", name: "Specialty Cakes",            blurb: "Sculpted, themed and one-of-a-kind builds." },
    { id: "pastries",  name: "Pastries & Cupcakes",        blurb: "Cupcakes, cake pops and hand-piped treats." },
    { id: "seasonal",  name: "Seasonal Designs",           blurb: "Holiday cakes and festive treats." }
  ];

  /* Gallery — genuine Amazing Cakes photographs from the bakery's public
     site (wedding, birthday, specialty, pastries galleries + seasonal
     collection). Captions are descriptive only; no product names invented.
     Excluded during curation: one screen-photo (birthday) and one
     low-quality duplicate set (2 images). */
  var gallery = [
    { src: "assets/img/gallery/wed-01.jpg", cat: "wedding", cap: "Naked finish with buttercream roses", alt: "Single-tier naked cake wrapped with pink and cream buttercream roses" },
    { src: "assets/img/gallery/wed-02.jpg", cat: "wedding", cap: "Succulent naked tiers", alt: "Three-tier naked cake decorated with piped succulents and deep red buttercream flowers" },
    { src: "assets/img/gallery/wed-03.jpg", cat: "wedding", cap: "Fresh roses and baby's breath", alt: "Three-tier white wedding cake accented with fresh pink roses and baby's breath" },
    { src: "assets/img/gallery/wed-04.jpg", cat: "wedding", cap: "Blue ribbon and scrollwork", alt: "Three-tier white cake with periwinkle ribbon bands, piped scrollwork and a Mr and Mrs topper" },
    { src: "assets/img/gallery/wed-05.jpg", cat: "wedding", cap: "Ivory monogram and paisley", alt: "Two-tier ivory cake with piped monogram letters, paisley details and white sugar flowers" },
    { src: "assets/img/gallery/wed-06.jpg", cat: "wedding", cap: "Gold ombre rosettes", alt: "Two-tier cake with white-to-gold ombre rosette texture and a smooth white top tier" },
    { src: "assets/img/gallery/wed-07.jpg", cat: "wedding", cap: "Gold base with white blooms", alt: "Three-tier white cake with a gold-airbrushed base tier, fresh white flowers and a gold rhinestone stand" },
    { src: "assets/img/gallery/wed-08.jpg", cat: "wedding", cap: "Cascading pink roses", alt: "Three-tier white cake with cascading fresh pink roses and carnations on a crystal stand" },
    { src: "assets/img/gallery/wed-09.jpg", cat: "wedding", cap: "Peach roses and hydrangeas", alt: "Three-tier white cake with a cascading arrangement of peach roses and hydrangeas" },
    { src: "assets/img/gallery-tiered-roses.jpg", cat: "wedding", cap: "Garden rose wrap", alt: "Three-tier celebration cake wrapped with fresh pink and cream roses in a garden setting" },

    { src: "assets/img/gallery/bday-01.jpg", cat: "birthday", cap: "Tropical character theme", alt: "Blue birthday cake with tropical buttercream flowers and an illustrated character topper" },
    { src: "assets/img/gallery/bday-02.jpg", cat: "birthday", cap: "Mermaid tail sheet cake", alt: "Sheet cake decorated with a sparkling blue mermaid tail, coral and seashells" },
    { src: "assets/img/gallery/bday-03.jpg", cat: "birthday", cap: "Unicorn rosette mane", alt: "Unicorn cake with a gold horn, fondant ears and a pastel rosette mane" },
    { src: "assets/img/gallery/bday-04.jpg", cat: "birthday", cap: "Unicorn in gold and lilac", alt: "Unicorn cake with a gold horn, gold-lined ears and purple, pink and yellow rosettes" },
    { src: "assets/img/gallery/bday-05.jpg", cat: "birthday", cap: "First birthday street sign", alt: "First-birthday cake with piped character faces and a green street-sign banner" },
    { src: "assets/img/gallery/bday-06.jpg", cat: "birthday", cap: "Yellow character cake", alt: "Yellow birthday cake with goggle-eyed character details and figurines" },
    { src: "assets/img/gallery/bday-07.jpg", cat: "birthday", cap: "Golf theme", alt: "Green golf-themed cake with a piped club, ball and tee on buttercream grass" },
    { src: "assets/img/gallery/bday-08.jpg", cat: "birthday", cap: "Doll topper celebration", alt: "Light blue birthday cake with doll figurines, candy toppers and a pink number six" },

    { src: "assets/img/gallery/spec-01.jpg", cat: "specialty", cap: "Fondant bow and scrollwork", alt: "White cake with a burgundy fondant bow, black scrollwork and a piped banner" },
    { src: "assets/img/gallery/spec-02.jpg", cat: "specialty", cap: "Sculpted chocolate Labrador", alt: "Sculpted chocolate Labrador cake resting on a green fondant base" },
    { src: "assets/img/gallery/spec-03.jpg", cat: "specialty", cap: "Circus tent build", alt: "Cake sculpted as a red and yellow circus tent with bunting flags" },
    { src: "assets/img/gallery/spec-04.jpg", cat: "specialty", cap: "Portrait figurine scene", alt: "Cake topped with a sculpted figure in an armchair surrounded by fondant dogs" },
    { src: "assets/img/gallery/spec-05.jpg", cat: "specialty", cap: "Football theme", alt: "Yellow football-themed cake with piped grass and a team-color medallion" },
    { src: "assets/img/gallery/spec-06.jpg", cat: "specialty", cap: "Basketball cake set", alt: "Basketball-themed cake with a sculpted ball topper beside a matching Smash cake" },
    { src: "assets/img/gallery/spec-08.jpg", cat: "specialty", cap: "Topsy-turvy tiers", alt: "Wonky topsy-turvy tiers wrapped in draped blue fondant with piped garlands" },
    { src: "assets/img/gallery/spec-09.jpg", cat: "specialty", cap: "Makeup artist theme", alt: "Makeup-themed cake with sculpted brushes, lipstick, palette and sugar roses" },

    { src: "assets/img/gallery/past-01.jpg", cat: "pastries", cap: "Buttercream blossom crowns", alt: "Cupcakes crowned with piped buttercream blossoms and a butterfly pick" },
    { src: "assets/img/gallery/past-02.jpg", cat: "pastries", cap: "Rose-piped cupcake tray", alt: "Tray of cupcakes topped with hand-piped buttercream roses in warm colors" },
    { src: "assets/img/gallery/past-03.jpg", cat: "pastries", cap: "White and gold cake pops", alt: "Cake pops coated in white with gold drizzle and shimmer" },
    { src: "assets/img/gallery/past-04.jpg", cat: "pastries", cap: "Reptile cupcake set", alt: "Cupcakes decorated with piped turtles, snakes and lizards" },
    { src: "assets/img/gallery/past-05.jpg", cat: "pastries", cap: "Chocolate-dipped blossoms", alt: "Chocolate-dipped cupcakes finished with piped flowers and a lips design" },
    { src: "assets/img/gallery/past-06.jpg", cat: "pastries", cap: "Panda with a love letter", alt: "Cupcake topped with a sculpted panda holding an envelope with a red heart" },
    { src: "assets/img/gallery/past-07.jpg", cat: "pastries", cap: "Swirled cake pops", alt: "Cake pops coated in white and red swirls on sticks" },
    { src: "assets/img/gallery/past-08.jpg", cat: "pastries", cap: "Chocolate cages and roses", alt: "Cupcakes finished with red glitter roses inside dark chocolate cages and pearl dragees" },

    { src: "assets/img/gallery/seas-01.jpg", cat: "seasonal", cap: "Snowman face", alt: "Snowman-face cake with a piped blue hat, buttercream trim and a carrot nose" },
    { src: "assets/img/gallery/seas-02.jpg", cat: "seasonal", cap: "Santa close-up", alt: "Close-up of a Santa face cake with a piped buttercream beard and wire glasses" },
    { src: "assets/img/gallery/seas-03.jpg", cat: "seasonal", cap: "Poinsettia and gingerbread", alt: "White cake with piped poinsettia blossoms, pinecones and gingerbread details" },
    { src: "assets/img/gallery/seas-04.jpg", cat: "seasonal", cap: "Marshmallow treat stand", alt: "Display of wrapped marshmallow pops arranged on a tiered stand" },
    { src: "assets/img/gallery/seas-05.jpg", cat: "seasonal", cap: "Piped Christmas tree", alt: "Cake sculpted as a Christmas tree with piped green fronds and candy ornaments" },
    { src: "assets/img/gallery/seas-06.jpg", cat: "seasonal", cap: "Snowflake pops", alt: "Red and white cake pops decorated with snowflakes and ribbons" },
    { src: "assets/img/gallery/seas-07.jpg", cat: "seasonal", cap: "Polar bear cookie pops", alt: "Chocolate-covered cookie pops decorated with piped polar bears in Santa hats" },
    { src: "assets/img/gallery/seas-08.jpg", cat: "seasonal", cap: "Chocolate pop tree", alt: "Chocolate-dipped marshmallow pops displayed on a tiered tree stand with curled ribbon" },
    { src: "assets/img/gallery/seas-09.jpg", cat: "seasonal", cap: "Holiday gift basket", alt: "Holiday treat basket with marshmallow snowmen, cocoa bombs and cookies" }
  ];

  /* Historical recognition — WeddingWire award badges as displayed on the
     bakery's website. Presented as history, never as current ratings. */
  var awards = [
    { img: "assets/img/badges/award-2009.png", label: "WeddingWire Bride's Choice Awards 2009" },
    { img: "assets/img/badges/award-2010.png", label: "WeddingWire Bride's Choice Awards 2010" },
    { img: "assets/img/badges/award-2011.png", label: "WeddingWire Bride's Choice Awards 2011" },
    { img: "assets/img/badges/award-ww4.png",  label: "WeddingWire Bride's Choice Awards 2012" },
    { img: "assets/img/badges/award-ww3.png",  label: "WeddingWire Bride's Choice Awards 2013" },
    { img: "assets/img/badges/award-ww5.png",  label: "WeddingWire Couples' Choice Awards 2014" },
    { img: "assets/img/badges/award-ww2.png",  label: "WeddingWire Couples' Choice Awards 2016" },
    { img: "assets/img/badges/award-ww1.png",  label: "WeddingWire Couples' Choice Awards 2017" }
  ];

  /* Vendor and venue marks displayed on the bakery's website. Historical
     relationships; current partnerships require owner confirmation. */
  var vendors = [
    { img: "assets/img/badges/vendor-1.jpg", name: "Coyote Hills Golf Course" },
    { img: "assets/img/badges/vendor-2.png", name: "Knott's Berry Farm Hotel" },
    { img: "assets/img/badges/vendor-3.jpg", name: "Alta Vista Country Club" },
    { img: "assets/img/badges/vendor-5.jpg", name: "Sheraton Cerritos Hotel" },
    { img: "assets/img/badges/vendor-6.png", name: "Dad Miller Golf Course" }
  ];

  /* Customer reviews as published on the bakery's About page — retrieved
     from Yelp, October 2017. Historical context only. */
  var reviews = [
    {
      author: "Lesley H.", date: "October 31, 2017", source: "Yelp",
      text: "We're never going anywhere else for cake again! Amazing cakes did such a great job on our wedding cake. It looked exactly like the picture i showed them and tasted even better than i imagined! Their customer service was excellent, they let me and my husband pick and choose every detail we wanted on our cake and they work around your budget! Highly recommend!"
    },
    {
      author: "Lily Z.", date: "October 27, 2017", source: "Yelp",
      text: "I found Amazing Cakes through our wedding venue (Los Coyotes Country Club), they were one of the vendors for our wedding cake. We had gone to a couple of other bakeries for a cake tasting, but none compared to Amazing Cakes! We settled on three cakes and got a free upgrade flavor for attending a Wedding Expo at LLCC. Our cake tasting experience: They made us feel SO welcomed! Informed us thoroughly on how everything works. Day of wedding: Our cake was BEAUTIFUL! We received so many compliments on our wedding cake designs and flavor. Amazing Cakes definitely delivered my vision for my dream wedding cake. We provided the fresh flowers and cake topper. Thanks you for everything! The Silvas"
    },
    {
      author: "Jessica D.", date: "October 21, 2017", source: "Yelp",
      text: "This place is truly amazing! I have been coming here for all my cakes for years the service and cakes are far beyond i could ever imagine. We recently got my daughter 1st birthday cake and smash cake from here and Michelle did a fabulous job. I showed her one photo and she not only recreated it but added small touches to make it PERFECT! It was beautiful and tasted even better!!! Give them a try, you will not be disappointed."
    }
  ];

  /* Contact details as published on the bakery's website (pending owner
     reconfirmation before any public launch). */
  var contact = {
    address: "524 N Magnolia Ave, Anaheim, CA 92801",
    phone: { label: "714-995-3399", href: "tel:+17149953399" },
    text:  { label: "714-855-9020", href: "sms:+17148559020", note: "Text only" },
    email: { label: "amzncakes@yahoo.com", href: "mailto:amzncakes@yahoo.com" },
    instagram: {
      label: "@amazingcakesanaheim",
      /* constructed from the published handle — profile URL to be verified with the owner */
      href: "https://www.instagram.com/amazingcakesanaheim"
    }
  };

  /* Ordering, hours & policies — previously published information, kept
     central so values update in one place. Hours, lead times and policies
     are PENDING OWNER RECONFIRMATION before any production use (see
     CONCEPT-NOTES.md). No holiday dates are hardcoded. */
  var hours = {
    note: "As previously published by the bakery — please call to confirm before visiting.",
    rows: [
      { day: "Monday – Friday", time: "11:00 AM – 5:00 PM" },
      { day: "Saturday", time: "10:00 AM – 4:00 PM" },
      { day: "Sunday", time: "Closed" }
    ]
  };

  var leadTimes = [
    { label: "Regular cake orders", text: "Please place your order at least one week in advance." },
    { label: "Fondant cake orders", text: "Please allow at least two weeks of advance notice." },
    { label: "Response time", text: "Please allow 24–48 business hours for an inquiry response." },
    { label: "Weekend inquiries", text: "Messages received over the weekend are processed starting the next business day. The published schedule lists Sunday as closed." }
  ];

  var policies = [
    {
      id: "cancellation",
      title: "Cancellation & refund",
      body: "As previously published: a 75% refund is issued for cancellations made at least one week before the scheduled event date. No refund is available for cancellations made during the week of the event. Postponing your date is encouraged as an alternative to cancelling."
    },
    {
      id: "holidays",
      title: "Holiday closures",
      body: "Holiday hours may vary. Please contact Amazing Cakes to confirm availability around holidays."
    }
  ];

  return {
    flavors: flavors,
    fillings: fillings,
    combos: flavors.length * fillings.length,
    fillingGroups: [
      { label: "Mousses & Bavarians", items: ["Bavarian Mousse", "Chocolate Mousse", "Strawberry Mousse", "Lemon Mousse", "Raspberry Mousse", "Banana Mousse", "Strawberry Banana Mousse", "Hazelnut Mocha Mousse", "Cajeta Mousse", "Peanut Butter Mousse", "Mango Mousse", "Strawberry Mango Mousse", "Strawberry Bavarian Mousse", "Chocolate Bavarian Mousse"] },
      { label: "Creams & Buttercreams", items: ["Fudge Buttercream", "Buttercream", "Sweet Cream Cheese", "Blueberry Cream Cheese", "Strawberry Cream Cheese"] },
      { label: "Chocolate & Candy", items: ["Cookies and Cream", "Raspberry Truffle"] },
      { label: "Fruit & Specialty", items: ["Lemon Raspberry", "Pina Colada", "Toasted Almond"] }
    ],
    cupcakes: cupcakes,
    desserts: desserts,
    menu: menu,
    hours: hours,
    leadTimes: leadTimes,
    policies: policies,
    favorites: favorites,
    fruitAddOn: fruitAddOn,
    sizes: sizes,
    categories: categories,
    gallery: gallery,
    awards: awards,
    vendors: vendors,
    reviews: reviews,
    contact: contact
  };
})();
