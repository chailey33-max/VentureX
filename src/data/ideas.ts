import { BusinessIdea } from '../types';

export const BUSINESS_IDEAS: BusinessIdea[] = [
  {
    id: '1',
    title: 'Professional Window Cleaning',
    category: 'Service',
    description:
      'Window cleaning is the ultimate "simple" business with incredible margins. Luxury homeowners with floor-to-ceiling glass are happy to pay $500+ for a single day\'s work to maintain their view. It\'s a recurring necessity that most people refuse to do themselves due to height and equipment requirements. By focusing on high-end residential properties, you position yourself as a premium service provider rather than a commodity laborer.',
    startupCost: { min: 500, max: 2500 },
    potentialIncome: '$50,000 - $120,000/year',
    customerAcquisition: [
      'Target high-end zip codes with high-quality door hangers featuring a "First Clean" discount.',
      'Partner with local real estate agents who need "listing-ready" windows for their high-value properties.',
      'Use Google Local Services Ads to capture homeowners actively searching for "window cleaners near me".',
      'Offer a "Neighbor Discount"—if you clean three houses on the same street, everyone gets 15% off.',
    ],
    upsell:
      'Offer a "Screen & Track Deep Clean" or a "Hard Water Stain Removal" treatment for an extra $150-$300 per job.',
  },
  {
    id: '2',
    title: 'Mobile Car Detailing',
    category: 'Automotive',
    description:
      "Car detailing is more than a wash; it's a restoration service for an asset people love. Luxury vehicle owners are terrified of automated car washes scratching their paint. By bringing a premium, hand-touch service to their driveway, you solve a major pain point. High-ticket add-ons like ceramic coatings and paint correction can turn a $150 wash into a $1,500 multi-day project.",
    startupCost: { min: 1500, max: 4500 },
    potentialIncome: '$60,000 - $150,000/year',
    customerAcquisition: [
      'Create high-quality Instagram Reels showcasing the "foam cannon" process and satisfying before/after interior deep cleans.',
      'Set up a recurring subscription model for office parks—visit every Tuesday to clean 5-10 executive vehicles while they work.',
      'Network at local "Cars and Coffee" events with a professionally wrapped van that acts as a mobile billboard.',
      'Run Facebook ads specifically targeting owners of high-end car brands within a 15-mile radius.',
    ],
    upsell:
      'Upsell "Ceramic Coating" or "Paint Correction" services which can increase a $150 ticket to over $1,000.',
  },
  {
    id: '3',
    title: 'Pressure Washing & Soft Washing',
    category: 'Maintenance',
    description:
      'Pressure washing is the most satisfying and high-impact home improvement service available. Homeowners are often shocked at how new their driveway or siding looks after a professional clean. Soft washing—using low pressure and specialized chemicals—is the real secret, allowing you to clean delicate roofs and stucco without damage, commanding much higher prices.',
    startupCost: { min: 2000, max: 4800 },
    potentialIncome: '$70,000 - $180,000/year',
    customerAcquisition: [
      'Place yard signs at every completed job site—neighbors will see the immediate transformation and call the number.',
      'Send direct mail postcards featuring a split-screen "Before/After" photo of a local driveway to specific neighborhoods.',
      'Optimize your Google Maps profile with dozens of 5-star reviews and high-res photos of your work.',
      'Offer a "Whole House Package" that includes the driveway, siding, and gutters for a bundled premium price.',
    ],
    upsell:
      'Offer "Driveway Sealing" or "Paver Sanding" after the wash to double the project value and protect the surface.',
  },
  {
    id: '4',
    title: 'Pet Waste Removal (Pooper Scooper)',
    category: 'Service',
    description:
      'This is the definition of a "dirty" business that makes clean money. It is a recurring, recession-proof service that busy professionals and seniors are desperate to outsource. With a route-based model, you can service 20-30 yards a day. The low overhead and high customer retention make this one of the most stable local businesses you can start.',
    startupCost: { min: 200, max: 1000 },
    potentialIncome: '$40,000 - $90,000/year',
    customerAcquisition: [
      'Distribute flyers at local dog parks and high-end pet boutiques where owners spend money on their pets.',
      'Partner with local veterinarians and groomers to offer a "First Month Free" coupon to their clients.',
      'Optimize your website for local SEO keywords like "dog poop removal [city]" to capture organic search traffic.',
      'Post in local Facebook community groups offering a "Spring Clean" special to get people onto a recurring plan.',
    ],
    upsell:
      'Add "Yard Deodorizing" or "Flea & Tick Spraying" services for an extra $15-$25 per visit.',
  },
  {
    id: '5',
    title: 'Holiday Lighting Installation',
    category: 'Seasonal',
    description:
      'In just two months, you can make a full year\'s salary. High-net-worth homeowners want the "movie star" holiday look without the risk of falling off a ladder. You provide the lights, the installation, the maintenance, and the storage. This is a high-ticket service where a single residential job can easily exceed $2,000.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$30,000 - $100,000 (in 2 months)',
    customerAcquisition: [
      'Offer significant "Early Bird" discounts in September and October to fill your schedule before the rush.',
      'Provide in-person quotes using digital mockup software to show the client exactly how their house will sparkle.',
      'Use your truck and trailer as a mobile billboard with large, high-contrast signage and professional branding.',
      'Email previous clients from your other service businesses (window cleaning, etc.) with an exclusive "Loyalty Offer".',
    ],
    upsell:
      'Provide "Year-Round Storage" and "Wreath/Garland Add-ons" to increase the seasonal contract value.',
  },
  {
    id: '6',
    title: 'Mobile Knife Sharpening',
    category: 'Specialty',
    description:
      "A sharp knife is a chef's most important tool, yet most home cooks struggle with dull blades. By bringing professional sharpening to their doorstep or a local market, you provide an immediate, tangible benefit. This is a high-precision craft that builds incredible customer loyalty and word-of-mouth referrals.",
    startupCost: { min: 800, max: 3000 },
    potentialIncome: '$45,000 - $85,000/year',
    customerAcquisition: [
      'Secure a regular booth at local Farmers Markets where food enthusiasts gather and value high-quality tools.',
      'Conduct direct outreach to local independent restaurants to offer a weekly or bi-weekly sharpening service for their staff.',
      'Partner with local cooking schools to provide a "Sharpening 101" demo and offer your services to the students.',
      'Organize "Neighborhood Sharpening Days" on Nextdoor where neighbors can drop off knives at a central location.',
    ],
    upsell:
      'Sell "High-End Knife Rolls" or "Wooden Cutting Boards" and offer "Garden Tool Sharpening" as a seasonal add-on.',
  },
  {
    id: '7',
    title: 'Trash Can Cleaning Service',
    category: 'Service',
    description:
      'Every homeowner has a stinky, bacteria-ridden trash can they hate touching. This is a "set it and forget it" subscription service that solves a universal problem. Using a specialized cleaning system, you sanitize and deodorize bins in minutes, creating a recurring revenue stream that scales beautifully with route density.',
    startupCost: { min: 3500, max: 5000 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Focus exclusively on a subscription model (monthly or quarterly) to ensure predictable, recurring revenue.',
      'Place a small, professional "Sanitized" sticker on every bin after service to act as a silent referral to neighbors.',
      'Run targeted Facebook ads featuring a video of the cleaning process—the "gross factor" makes for highly engaging content.',
      'Partner with local HOAs to offer a neighborhood-wide discount, allowing you to clean dozens of bins on a single street.',
    ],
    upsell:
      'Offer "Driveway Degreasing" or "Garage Floor Sweeping" for an extra $50 during the bin cleaning visit.',
  },
  {
    id: '8',
    title: 'Pool Maintenance & Repair',
    category: 'Maintenance',
    description:
      "Pool owners don't want to be chemists; they want to swim. This is a high-trust, recurring service that is essential for maintaining a major home asset. Beyond basic cleaning, you can generate significant extra income from equipment repairs, filter changes, and seasonal openings/closings.",
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$70,000 - $160,000/year',
    customerAcquisition: [
      'Consider "Route Acquisition"—buying a small existing route from a retiring owner is the fastest way to scale.',
      'Build relationships with local pool builders who need a reliable partner to hand off maintenance to after a build.',
      'Use Google Local Services to capture homeowners who have just moved into a house with a pool and need a pro.',
      'Distribute door hangers in neighborhoods with a high density of pools, offering a "Free Water Analysis" to get in the door.',
    ],
    upsell:
      'Upsell "Filter Replacements," "Salt Cell Cleaning," or "Pool Heater Installation" for high-margin one-time profits.',
  },
  {
    id: '9',
    title: 'Lawn Aeration & Overseeding',
    category: 'Landscaping',
    description:
      "Lawn aeration is a high-margin, specialized service that standard mowing companies often overlook. It requires heavy equipment that homeowners won't rent themselves. By focusing on this twice-a-year service, you can generate massive cash flow in a very short window with minimal ongoing commitment.",
    startupCost: { min: 2500, max: 4500 },
    potentialIncome: '$40,000 - $80,000 (seasonal)',
    customerAcquisition: [
      'Upsell this service to existing lawn care clients as a "Premium Health Boost" for their turf.',
      'Offer "Neighborhood Group Buy" discounts—if five neighbors on the same block sign up, everyone gets 20% off.',
      'Send direct mailers in early spring and late summer with educational content on why aeration is critical for lawn health.',
      'Place yard signs at every job site with a bold headline like "Is Your Lawn Breathing?" and your phone number.',
    ],
    upsell:
      'Upsell "Lawn Fertilization" or "Top Dressing" immediately after aeration for maximum nutrient absorption.',
  },
  {
    id: '10',
    title: 'Mobile Screen Repair',
    category: 'Service',
    description:
      "Repairing or replacing window and door screens on-site. Many homeowners have torn screens but don't want to haul them to a hardware store.",
    startupCost: { min: 600, max: 1500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Nextdoor neighborhood posts',
      'Flyers at local hardware stores',
      'Realtor referral network',
      'Facebook Marketplace ads',
    ],
    upsell:
      'Offer "Solar Screen Upgrades" or "Pet-Resistant Mesh" for a higher-margin material upsell.',
  },
  {
    id: '11',
    title: 'Dryer Vent Cleaning',
    category: 'Maintenance',
    description:
      'A critical fire safety service. Cleaning lint buildup from dryer exhaust ducts. High demand and low competition in many areas.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $115,000/year',
    customerAcquisition: [
      'Partnerships with appliance repair shops',
      'Local fire department safety flyers',
      'Google Local Services Ads',
      'Direct mail to older neighborhoods',
    ],
    upsell:
      'Sell "Dryer Vent Bird Guards" or "Flexible Metal Duct Replacements" to improve safety and airflow.',
  },
  {
    id: '12',
    title: 'Mobile Pet Grooming',
    category: 'Service',
    description:
      "Bringing the salon to the pet owner's driveway. High convenience factor allows for premium pricing compared to brick-and-mortar shops.",
    startupCost: { min: 4000, max: 5000 },
    potentialIncome: '$75,000 - $140,000/year',
    customerAcquisition: [
      'Branded van wrap (mobile billboard)',
      'Instagram reels of grooming sessions',
      'Local pet store partnerships',
      'Referral program for existing clients',
    ],
    upsell:
      'Offer "Teeth Brushing," "Nail Grinding," or "De-Shedding Treatments" as premium add-ons.',
  },
  {
    id: '13',
    title: 'Christmas Tree Delivery & Setup',
    category: 'Seasonal',
    description:
      'Sourcing, delivering, and setting up high-quality Christmas trees. Optional removal service in January.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$15,000 - $40,000 (in 1 month)',
    customerAcquisition: [
      'Pre-order website with delivery slots',
      'Facebook ads targeting families',
      'Partnerships with local tree farms',
      'Corporate office building outreach',
    ],
    upsell:
      'Sell "Tree Stands," "Preservative Solution," or a "Post-Holiday Removal & Recycling" service.',
  },
  {
    id: '14',
    title: 'Junk Removal Service',
    category: 'Service',
    description:
      'Hauling away unwanted items for residential and commercial clients. Can start with a used truck and trailer.',
    startupCost: { min: 2500, max: 5000 },
    potentialIncome: '$80,000 - $200,000/year',
    customerAcquisition: [
      'Google Maps optimization',
      'Partnerships with property managers',
      'Yard signs at busy intersections',
      'Craigslist and Facebook Marketplace',
    ],
    upsell:
      'Offer "Light Demolition" (sheds, decks) or "Post-Haul Power Washing" for a complete site refresh.',
  },
  {
    id: '15',
    title: 'Pool Safety Fence Installation',
    category: 'Maintenance',
    description:
      'Specializing in the installation of removable mesh safety fences for swimming pools. High demand for families with young children.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Partnerships with pool service companies',
      'Facebook ads targeting new parents',
      'Local parenting group outreach',
      'Yard signs',
    ],
    upsell:
      'Sell "Self-Closing Gate Latches" or "Pool Alarms" as additional layers of safety for the family.',
  },
  {
    id: '16',
    title: 'Stump Grinding',
    category: 'Landscaping',
    description:
      'Using a specialized machine to remove tree stumps after a tree has been cut down. Fast jobs with high hourly rates.',
    startupCost: { min: 3500, max: 5000 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Partnerships with tree removal companies',
      'Google Search ads',
      'Nextdoor posts',
      'Yard signs',
    ],
    upsell:
      'Offer "Topsoil & Grass Seeding" or "Wood Chip Removal" to leave the yard perfectly listing-ready.',
  },
  {
    id: '17',
    title: 'Mobile Oil Change',
    category: 'Automotive',
    description:
      "Performing oil changes and basic vehicle maintenance at the client's home or office. High convenience for busy professionals.",
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$65,000 - $140,000/year',
    customerAcquisition: [
      'Office park subscription plans',
      'Facebook ads for busy parents',
      'Fleet maintenance contracts',
      'Google Local Services',
    ],
    upsell:
      'Upsell "Air Filter Replacements," "Wiper Blade Swaps," or "Tire Pressure Checks" during the oil change.',
  },
  {
    id: '18',
    title: 'Epoxy Garage Floor Coating',
    category: 'Maintenance',
    description:
      'Transforming standard concrete garage floors with durable, high-gloss epoxy coatings. High perceived value and premium pricing.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Instagram/Facebook before & after photos',
      'Home show booths',
      'Partnerships with custom cabinet makers',
      'Direct mail to new homeowners',
    ],
    upsell:
      'Offer "Wall Stem-Wall Coating" or "Overhead Storage Rack Installation" for a complete garage makeover.',
    image:
      'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '19',
    title: 'Mobile Bicycle Repair',
    category: 'Service',
    description:
      'Bicycles are precision machines that require regular maintenance, but hauling them to a shop is a major logistical headache for families and serious cyclists. You provide a "shop on wheels" that services bikes in the client\'s driveway. This business thrives on convenience and the high-trust relationship you build with local enthusiasts who value their gear.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Set up a mobile repair stand at popular local bike trailheads on weekend mornings to capture immediate repair needs.',
      'Partner with local cycling clubs and triathlon teams to be their "official" mobile mechanic for group rides and events.',
      'Optimize your Google Maps profile for "bicycle repair near me" to capture homeowners looking for a convenient alternative to a shop.',
      'Post in local Facebook community groups offering a "Family Bike Tune-up Special" for households with multiple bikes.',
    ],
    upsell:
      'Sell "Premium Lubricants," "Flat-Proof Tire Liners," or "Custom Handlebar Tape" during the tune-up.',
  },
  {
    id: '20',
    title: 'Holiday Decorating (Interior)',
    category: 'Seasonal',
    description:
      'While many companies do exterior lights, the interior of a luxury home is where the real holiday magic happens. You provide professional-grade tree trimming, mantle displays, and festive table settings. This is a high-end creative service for clients who want a "magazine-ready" home for their holiday parties without the weeks of effort.',
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$20,000 - $50,000 (seasonal)',
    customerAcquisition: [
      'Build a stunning portfolio on Pinterest and Instagram showcasing your most elegant and unique holiday designs.',
      'Partner with local interior designers who may want to outsource the holiday-specific decorating for their existing clients.',
      'Conduct direct outreach to luxury real estate agents who want to "stage" their high-value listings for the holidays.',
      'Run targeted ads in local lifestyle magazines and high-end community newsletters starting in early October.',
    ],
    upsell:
      'Offer "Custom Wreath Making" or "Post-Holiday Takedown & Organized Storage" for a stress-free experience.',
  },
  {
    id: '21',
    title: 'Mobile Headlight Restoration',
    category: 'Automotive',
    description:
      "Cloudy, yellowed headlights are a major safety hazard and significantly age the look of a car. Most people don't realize they can be restored for a fraction of the cost of replacement. This is a high-margin, low-material-cost service that provides an immediate, dramatic visual improvement that clients love.",
    startupCost: { min: 300, max: 1000 },
    potentialIncome: '$35,000 - $75,000/year',
    customerAcquisition: [
      'Perform live demonstrations at local gas stations or grocery store parking lots (with permission) to show the "magic" in minutes.',
      'Secure contracts with local used car dealerships to restore the headlights on their inventory, increasing their lot appeal.',
      'List your services on Facebook Marketplace with clear "Before & After" photos—the visual proof is your strongest selling point.',
      'Post in Nextdoor neighborhood groups with a "Safety First" message, highlighting the improved visibility for night driving.',
    ],
    upsell:
      'Offer "Ceramic Coating for Headlights" to guarantee the clarity lasts for years, not months.',
  },
  {
    id: '22',
    title: 'Curbside Address Painting',
    category: 'Service',
    description:
      "Faded or missing house numbers on the curb are a safety risk for emergency services and a frustration for delivery drivers. This is a high-volume, low-cost business that you can start with just a few stencils and cans of spray paint. It's a simple, tangible community service that homeowners are happy to pay $20-$40 for on the spot.",
    startupCost: { min: 100, max: 500 },
    potentialIncome: '$30,000 - $60,000/year',
    customerAcquisition: [
      'Conduct direct door-to-door sales in residential neighborhoods, offering to paint the number right then and there.',
      'Distribute simple, professional flyers in mailboxes that highlight the safety benefits for police, fire, and EMS.',
      "Post in local Facebook community groups announcing which neighborhood you'll be in that week to build anticipation.",
      'Seek HOA approval to offer a neighborhood-wide "Refresh Day" where you service dozens of homes in a single block.',
    ],
    upsell:
      'Offer "Reflective Paint Upgrades" or "Custom Logo/Mascot Stencils" for a personalized curb appeal.',
  },
  {
    id: '23',
    title: 'Mobile Notary for Estate Planning',
    category: 'Service',
    description:
      'Estate planning documents like wills and trusts are highly sensitive and often require notarization at home or in a hospital. By specializing in this niche, you provide a compassionate, professional service to families during critical times. This high-trust role commands premium fees and builds a strong reputation in the local legal community.',
    startupCost: { min: 400, max: 1200 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Network actively with local estate planning and elder law attorneys who need a reliable mobile notary for their clients.',
      'Conduct outreach to senior living facilities and nursing homes to become their "on-call" notary for resident needs.',
      'Maintain a professional Google Business Profile optimized for keywords like "mobile notary for wills [city]".',
      'Provide your business cards to local hospital information desks and social workers who assist families with legal paperwork.',
    ],
    upsell:
      'Offer "Document Printing & Scanning" or "Witness Provision" for a complete, one-stop signing service.',
  },
  {
    id: '24',
    title: 'Mobile Car Battery Replacement',
    category: 'Automotive',
    description:
      'A dead battery is a high-stress emergency that usually happens at the worst possible time. You provide a "rescue" service that tests and replaces batteries on-site, saving the client a tow and hours of waiting at a shop. This is a high-urgency, high-margin business that thrives on being the hero for stranded motorists.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads for high-intent keywords like "dead car battery [city]" or "car won\'t start near me".',
      "Establish referral partnerships with local auto parts stores that don't offer on-site installation services.",
      'Post in local Facebook community groups offering a "Winter Battery Check" to prevent emergency failures before they happen.',
      'Monitor Nextdoor for urgent "help needed" posts regarding car trouble and respond immediately with your mobile solution.',
    ],
    upsell:
      'Sell "Terminal Corrosion Protection" or "Emergency Jump-Start Cables" to keep the client moving safely.',
  },
  {
    id: '25',
    title: 'Mobile Pet Microchipping',
    category: 'Service',
    description:
      'Microchipping is the most effective way to ensure a lost pet is returned, but many owners procrastinate the trip to a vet. By offering on-site microchipping, you provide a convenient, low-stress solution for both the pet and the owner. This is an excellent add-on service for mobile groomers or a standalone niche for a dedicated specialist.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$30,000 - $65,000/year',
    customerAcquisition: [
      'Partner with local animal shelters and rescue groups to offer microchipping at their adoption events.',
      'Maintain a presence at local pet-friendly community events and farmers markets with a "Safety First" booth.',
      'Engage with local Facebook pet owner groups to educate members on the importance of microchipping and offer your mobile service.',
      'Monitor Nextdoor for "found pet" posts and reach out to the posters to offer microchipping for their own pets.',
    ],
    upsell:
      'Sell "Custom Engraved ID Tags" or "Premium GPS Pet Trackers" for ultimate peace of mind.',
  },
  {
    id: '26',
    title: 'Professional Grill Cleaning',
    category: 'Service',
    description:
      'High-end outdoor grills are a major investment, but deep-cleaning them is a greasy, unpleasant chore that most luxury homeowners avoid. You provide a professional degreasing and restoration service that makes their outdoor kitchen look and perform like new. This is a high-ticket, niche service that commands premium pricing in affluent areas.',
    startupCost: { min: 800, max: 2500 },
    potentialIncome: '$45,000 - $100,000/year',
    customerAcquisition: [
      'Send high-quality direct mailers to luxury zip codes in early spring as people begin preparing for outdoor entertaining.',
      'Partner with local outdoor kitchen builders and high-end grill retailers to be their recommended maintenance provider.',
      'Run targeted Facebook ads featuring satisfying "Before & After" videos of greasy grills being restored to a shine.',
      'Post in Nextdoor neighborhood groups offering a "Holiday BBQ Prep" special before major summer holidays.',
    ],
    upsell:
      'Offer "Grill Component Replacement" (burners, grates) or "Stainless Steel Polishing" for a showroom finish.',
  },
  {
    id: '27',
    title: 'Mobile RV Detailing',
    category: 'Automotive',
    description:
      "RVs are massive investments that require specialized care to maintain their value and appearance. Traditional car washes can't handle them, and many owners are physically unable to clean them themselves. You provide a high-end, on-site detailing service that focuses on the unique needs of large recreational vehicles, from roof cleaning to oxidation removal.",
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Establish a regular presence at local RV parks and campgrounds, offering on-site detailing to travelers and long-term residents.',
      'Engage with local and regional RV owner groups on Facebook to showcase your expertise and offer group discounts.',
      'Partner with local RV dealerships to provide "lot-ready" detailing for their used inventory and new deliveries.',
      'Run targeted Google Search ads for "mobile RV detailing [city]" to capture owners looking for professional care.',
    ],
    upsell:
      'Offer "Roof Resealing" or "Interior Deep Cleaning & Sanitization" for a complete home-on-wheels refresh.',
  },
  {
    id: '28',
    title: 'Parking Lot Striping',
    category: 'Maintenance',
    description:
      'Faded parking lines are a liability and an eyesore for businesses. This is a high-demand, recurring maintenance service that requires specialized equipment but offers incredible margins. By focusing on small-to-medium commercial lots, you can build a stable business with high-ticket jobs that are often completed in a single night.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$70,000 - $150,000/year',
    customerAcquisition: [
      'Conduct direct outreach to local property managers and small business owners whose parking lots are visibly faded.',
      'Partner with local asphalt repair and sealcoating companies who may want to outsource the striping portion of their jobs.',
      'Optimize your Google Maps profile for "parking lot striping [city]" to attract local commercial clients.',
      'Distribute professional flyers in commercial business parks highlighting the safety and aesthetic benefits of fresh striping.',
    ],
    upsell:
      'Offer "Handicap Symbol Painting" or "Stenciled Reserved Parking Signs" for a more organized lot.',
  },
  {
    id: '29',
    title: 'Graffiti Removal',
    category: 'Service',
    description:
      'Graffiti can quickly devalue a property and attract more vandalism if not addressed immediately. You provide a rapid-response removal service using specialized, eco-friendly chemicals and professional pressure washing. This is a high-urgency service that is essential for both commercial property owners and local municipalities looking to maintain community standards.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$50,000 - $120,000/year',
    customerAcquisition: [
      'Secure contracts with local municipalities and business improvement districts for regular "clean-up" patrols.',
      'Conduct direct outreach to property owners in affected areas immediately after a vandalism incident occurs.',
      'Run targeted Google Search ads for "graffiti removal [city]" to capture high-intent emergency requests.',
      'Partner with local commercial insurance agents who may recommend your services to their clients after a claim.',
    ],
    upsell: 'Offer "Anti-Graffiti Coating" to make future removal as easy as a simple water rinse.',
  },
  {
    id: '30',
    title: 'Solar Panel Cleaning',
    category: 'Maintenance',
    description:
      'Solar panels lose up to 25% of their efficiency when covered in dust, pollen, and bird droppings. Most homeowners invest thousands in solar but forget the maintenance. You provide a specialized, low-pressure cleaning service that pays for itself in energy savings. This is a high-growth niche with a massive, untapped market of existing solar owners.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$45,000 - $90,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on solar owners, featuring a "Before & After" energy production chart to show ROI.',
      'Partner with local solar installation companies to be their preferred maintenance provider for new and existing customers.',
      'Distribute educational door hangers in solar-heavy neighborhoods highlighting the efficiency loss from dirty panels.',
      'Monitor Nextdoor for discussions about solar performance and offer your professional cleaning as a solution.',
    ],
    upsell: 'Sell "Bird Proofing/Critter Guards" to prevent nesting and damage under the panels.',
  },
  {
    id: '31',
    title: 'Moss Removal (Roof)',
    category: 'Maintenance',
    description:
      "Moss and algae aren't just an eyesore; they trap moisture against shingles, leading to rot and premature roof failure. You provide a safe, non-pressure chemical treatment that kills moss at the root without damaging the roof. This is a high-demand, high-ticket service in damp climates that saves homeowners thousands in roof replacement costs.",
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Conduct direct door-to-door sales in moss-prone neighborhoods, offering a free "Roof Health Inspection".',
      'Partner with local roofing companies who may want to outsource the cleaning and maintenance portion of their business.',
      'Use Google Local Services to capture homeowners who are actively looking for "roof cleaning" or "moss removal".',
      'Place professional yard signs at completed jobs to build local awareness and social proof in the neighborhood.',
    ],
    upsell:
      'Offer "Gutter Cleaning" or "Zinc Strip Installation" to provide a complete roof maintenance package.',
  },
  {
    id: '32',
    title: 'Professional Blind Cleaning',
    category: 'Service',
    description:
      'Blinds are notorious dust magnets that are incredibly tedious to clean by hand. You provide a specialized deep-cleaning service using ultrasonic technology or professional-grade tools that restores them to like-new condition. This is a high-satisfaction, niche service that is especially popular with luxury homeowners and commercial offices.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Partner with local interior designers and window treatment retailers to be their recommended cleaning specialist.',
      'Run targeted Google Search ads for "blind cleaning [city]" to capture homeowners looking for a professional solution.',
      'Distribute high-quality flyers in luxury apartment complexes and gated communities where high-end blinds are common.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Blind Refresh" special for a flat, transparent fee.',
    ],
    upsell:
      'Offer "Blind Repair" (restringing, slat replacement) or "New Blind Installation" for a complete window refresh.',
  },
  {
    id: '33',
    title: 'Chandelier Cleaning',
    category: 'Service',
    description:
      'Crystal and glass chandeliers are the centerpieces of luxury homes, but they quickly lose their brilliance without meticulous care. You provide a specialized, hand-cleaning service that restores their sparkle and elegance. This is a high-trust, high-ticket niche that requires extreme attention to detail and commands premium pricing in affluent areas.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Conduct direct outreach to luxury hotels and event venues to be their preferred chandelier maintenance provider.',
      'Partner with local high-end lighting showrooms to offer your cleaning services to their customers after installation.',
      'Build a stunning Instagram presence showcasing the dramatic "Before & After" sparkle of your cleaned chandeliers.',
      "Send personalized direct mailers to high-net-worth zip codes focusing on the preservation of their home's centerpieces.",
    ],
    upsell:
      'Offer "Light Bulb Replacement" with energy-efficient LEDs or "Chandelier Re-pinning" for a safer fixture.',
  },
  {
    id: '34',
    title: 'Patio Furniture Restoration',
    category: 'Service',
    description:
      'High-end outdoor furniture is built to last, but the elements eventually take their toll on the finish and fabric. You provide a professional restoration service that includes deep cleaning, repainting, and re-slinging. This is a high-value alternative for clients who want to save their premium sets rather than spend thousands on new ones.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Partner with local high-end outdoor furniture retailers who may want to offer your restoration services to their customers.',
      'Run targeted Facebook ads in early spring as people begin preparing their outdoor spaces for the season.',
      'Post in Nextdoor neighborhood groups offering a "Patio Refresh" special for a flat, transparent fee.',
      'Maintain a professional portfolio showcasing your ability to transform weathered furniture back to its original beauty.',
    ],
    upsell:
      'Offer "Custom Cushion Re-upholstery" or "Protective Furniture Cover Sales" for a long-lasting restoration.',
  },
  {
    id: '35',
    title: 'Deck Staining & Sealing',
    category: 'Maintenance',
    description:
      "A wooden deck is a major home investment that can quickly rot and grey without proper protection. You provide a professional deep-cleaning and sealing service that restores the wood's natural beauty and extends its life for years. This is a high-demand, recurring maintenance service that offers immediate, dramatic visual results that homeowners love.",
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$65,000 - $140,000/year',
    customerAcquisition: [
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
      'Run targeted Facebook ads featuring high-quality "Before & After" photos of weathered decks being restored to a rich finish.',
      'Use Google Local Services to capture homeowners who are actively looking for "deck staining" or "deck sealing" in their area.',
      'Distribute educational door hangers in neighborhoods with older homes where wooden decks are common and likely need maintenance.',
    ],
    upsell:
      'Offer "Deck Board Replacement" or "Post-Cap Lighting Installation" for a complete deck transformation.',
  },
  {
    id: '36',
    title: 'Mailbox Installation & Repair',
    category: 'Service',
    description:
      "A leaning or damaged mailbox is a major eyesore that many homeowners simply don't have the tools or time to fix. You provide a fast, professional installation and repair service that restores their home's curb appeal in under an hour. This is a high-volume, low-overhead business that thrives on being the simple solution to a common neighborhood problem.",
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$35,000 - $75,000/year',
    customerAcquisition: [
      'Conduct direct door-to-door sales in residential neighborhoods, offering to fix or replace leaning mailboxes on the spot.',
      'Post in Nextdoor neighborhood groups offering a "Mailbox Refresh" special for a flat, transparent fee.',
      'List your services on Facebook Marketplace with clear photos of your high-quality installations and repairs.',
      'Seek HOA approval to offer a neighborhood-wide "Mailbox Day" where you service dozens of homes in a single block.',
    ],
    upsell:
      'Offer "Custom Address Lettering" or "Solar-Powered Mailbox Lighting" for a premium curb appeal.',
  },
  {
    id: '37',
    title: 'TV Mounting & Home Theater Setup',
    category: 'Service',
    description:
      'Everyone wants the "clean" look of a wall-mounted TV, but few have the tools or confidence to do it correctly, especially when it comes to hiding wires behind the wall. You provide a professional, aesthetic installation service that transforms a living room in an hour. This is a high-demand, high-satisfaction service with excellent word-of-mouth potential.',
    startupCost: { min: 800, max: 2000 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads for high-intent keywords like "TV mounting [city]" or "home theater setup near me".',
      'Partner with local electronics and home theater retailers who may want to offer your installation services to their customers.',
      'List your services on Facebook Marketplace with clear photos of your "Clean Installs" and hidden wire solutions.',
      'Maintain a professional presence on Thumbtack and Angi to capture homeowners who are actively looking for an installation pro.',
    ],
    upsell:
      'Sell "Premium HDMI Cables," "Soundbar Mounting Brackets," or "LED Backlighting Kits" for a cinematic experience.',
  },
  {
    id: '38',
    title: 'Furniture Assembly Service',
    category: 'Service',
    description:
      'Flat-pack furniture is affordable, but the assembly process is a universal source of frustration and wasted weekends. You provide a fast, professional assembly service that saves the client time and stress. This is a high-volume, low-overhead business that thrives on efficiency and a "can-do" attitude.',
    startupCost: { min: 200, max: 800 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Maintain a professional presence on TaskRabbit and Thumbtack to capture the high volume of assembly requests in your area.',
      'List your services on Facebook Marketplace with clear, flat-rate pricing for common furniture items like desks and beds.',
      'Distribute professional flyers at local apartment complexes where new residents are likely to have assembly needs.',
      'Post in Nextdoor neighborhood groups offering a "Weekend Assembly Special" for busy families and seniors.',
    ],
    upsell:
      'Offer "Furniture Anchoring" (for child safety) or "Old Furniture Removal" for a complete room refresh.',
  },
  {
    id: '39',
    title: 'Move-in/Move-out Deep Cleaning',
    category: 'Service',
    description:
      'Moving is stressful enough without having to scrub a house from top to bottom. You provide a deep-cleaning service that ensures a property is "listing-ready" or "move-in perfect". This is a high-urgency, high-ticket service that is essential for both renters looking to get their deposit back and homeowners looking to sell.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Establish direct partnerships with local real estate agents and property managers who need a reliable "go-to" cleaner.',
      'Conduct outreach to property managers of local apartment complexes to be their preferred move-out cleaning partner.',
      'Run targeted Google Search ads for high-intent keywords like "move out cleaning [city]" or "end of lease cleaning near me".',
      'Run targeted Facebook ads focusing on people who have recently listed their home or are in the process of moving.',
    ],
    upsell:
      'Offer "Carpet Steam Cleaning" or "Window Washing" as premium add-ons for a truly "listing-ready" home.',
  },
  {
    id: '40',
    title: 'Estate Sale Management',
    category: 'Service',
    description:
      "Managing an estate sale is an overwhelming task for families during a difficult time. You provide a full-service solution that includes organizing, pricing, and conducting the sale, taking a percentage of the total proceeds. This is a high-trust, high-impact business that provides essential support and maximizes the value of a family's legacy.",
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$70,000 - $200,000/year',
    customerAcquisition: [
      'Network actively with local probate and estate planning attorneys who can refer your services to their clients.',
      'Establish referral partnerships with senior move managers and real estate agents who specialize in estate properties.',
      'Run targeted Google Search ads for high-intent keywords like "estate sale management [city]" or "help with estate sale".',
      'Maintain a professional presence in local Facebook community groups to offer advice and support to families in need.',
    ],
    upsell:
      'Offer "Post-Sale Clean-Out" or "Professional Appraisal Services" for high-value individual items.',
  },
  {
    id: '41',
    title: 'Professional Home Organizing',
    category: 'Service',
    description:
      'Clutter is a major source of stress, but most people don\'t have the time or the "organizing brain" to fix it themselves. You provide a professional service that transforms chaotic spaces into functional, beautiful systems. This is a high-impact, high-satisfaction business that builds incredible customer loyalty and recurring maintenance needs.',
    startupCost: { min: 300, max: 1200 },
    potentialIncome: '$50,000 - $120,000/year',
    customerAcquisition: [
      'Build a stunning portfolio on Instagram and Pinterest showcasing your most dramatic "Before & After" transformations.',
      'Partner with local interior designers who may want to outsource the organizing portion of their projects to a specialist.',
      'Post in Nextdoor neighborhood groups offering a "Free 15-Minute Organizing Consultation" to get in the door.',
      'Run targeted Facebook ads focusing on the mental health and productivity benefits of a professionally organized home.',
    ],
    upsell:
      'Sell "Custom Storage Solutions" (bins, labels, shelving) or "Monthly Maintenance Visits" to keep the order.',
  },
  {
    id: '42',
    title: 'Garage Organization & Storage',
    category: 'Service',
    description:
      'The garage is often the most neglected space in a home, becoming a dumping ground for clutter. You provide a professional transformation service that includes overhead racks, wall systems, and custom cabinets to maximize every square inch. This is a high-ticket, high-impact service that turns a chaotic storage area into a functional, organized extension of the home.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$75,000 - $160,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads featuring high-quality "Before & After" photos of dramatic garage transformations.',
      'Establish a presence at local home and garden shows to showcase your storage solutions and generate leads.',
      'Distribute professional direct mailers to new homeowners who are likely to be looking for storage solutions as they move in.',
      'Partner with local epoxy floor installers to offer a complete "Garage Makeover" package to their customers.',
    ],
    upsell:
      'Offer "Wall Stem-Wall Coating" or "Overhead Storage Rack Installation" for a complete garage makeover.',
    image:
      'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '43',
    title: 'Tile & Grout Deep Cleaning',
    category: 'Maintenance',
    description:
      'Dirty grout can make even the most beautiful tile look old and neglected. You provide a professional deep-cleaning service using high-pressure steam and specialized tools that restores tile and grout to like-new condition. This is a high-impact, high-satisfaction service that provides immediate, dramatic visual results that homeowners love.',
    startupCost: { min: 2500, max: 4800 },
    potentialIncome: '$65,000 - $140,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads featuring satisfying "Before & After" videos of dirty grout being restored to a bright finish.',
      'Use Google Local Services to capture homeowners who are actively looking for "tile cleaning" or "grout restoration" in their area.',
      'Post in Nextdoor neighborhood groups offering a "Kitchen & Bath Tile Refresh" special for a flat, transparent fee.',
      'Partner with local floor installers who may want to offer your deep-cleaning services to their customers after a project.',
    ],
    upsell:
      'Offer "Grout Sealing" or "Color Sealing" to protect the results and provide a fresh, new look.',
  },
  {
    id: '44',
    title: 'Upholstery Deep Cleaning',
    category: 'Service',
    description:
      'Furniture is a major investment, but it quickly accumulates dust, allergens, and stains from everyday life. You provide a professional deep-cleaning service using low-moisture extraction methods that restores the beauty and comfort of sofas, chairs, and mattresses. This is a high-value, high-satisfaction service that is especially popular with pet owners and families.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on pet owners and families, featuring the benefits of a "Fresh & Clean Home".',
      'Partner with local interior designers who may want to offer your upholstery cleaning services to their clients after a project.',
      'Run targeted Google Search ads for high-intent keywords like "upholstery cleaning [city]" or "sofa cleaning near me".',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Upholstery Refresh" special for a flat, transparent fee.',
    ],
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '45',
    title: 'Hardwood Floor Screen & Coat',
    category: 'Maintenance',
    description:
      'Full hardwood refinishing is expensive and disruptive, but many floors just need a "refresh" to restore their shine and protection. You provide a professional "screen and coat" service that removes surface scratches and adds a new protective topcoat without the dust and mess of full sanding. This is a high-value, high-satisfaction service that transforms a home in a single day.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$70,000 - $160,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads featuring high-quality "Before & After" photos of dull floors being restored to a rich shine.',
      'Partner with local real estate agents who want to offer a "Floor Refresh" package to their sellers to increase home value.',
      'Use Google Local Services to capture homeowners who are actively looking for "hardwood floor cleaning" or "floor refinishing".',
      'Distribute professional direct mailers to older neighborhoods where hardwood floors are common and likely need maintenance.',
    ],
    upsell:
      'Offer "Deep Cleaning & Buffing" or "Felt Pad Installation" for all furniture to protect the new finish.',
    image:
      'https://images.unsplash.com/photo-1581850518616-bcb8186c443e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '46',
    title: 'Baseboard & Trim Installation',
    category: 'Service',
    description:
      'Old, dingy baseboards and trim can make even a freshly painted room look dated. You provide a professional installation and replacement service that adds instant architectural detail and value to any home. This is a high-impact, high-satisfaction aesthetic upgrade that is especially popular with homeowners looking to modernize their living spaces.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads featuring high-quality photos of "Trim Upgrades" and the dramatic impact on a room\'s appearance.',
      'Partner with local interior painters who may want to offer your trim installation services as an add-on to their projects.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Trim Refresh" special for a flat, transparent fee.',
      'Distribute professional flyers in home improvement stores to capture homeowners who are already thinking about home upgrades.',
    ],
    upsell:
      'Offer "Crown Molding Installation" or "Wainscoting Panels" for a truly premium architectural upgrade.',
    image:
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '47',
    title: 'Cabinet Hardware Upgrade',
    category: 'Service',
    description:
      'Replacing old, dated cabinet knobs and pulls is one of the fastest and most affordable ways to modernize a kitchen or bathroom. You provide a professional installation service that ensures every piece is perfectly aligned and secure. This is a high-frequency, high-satisfaction service that provides an immediate, dramatic visual improvement for a fraction of the cost of a full remodel.',
    startupCost: { min: 300, max: 1000 },
    potentialIncome: '$35,000 - $70,000/year',
    customerAcquisition: [
      'Build a stunning portfolio on Instagram and Facebook showcasing your most dramatic "Kitchen Hardware Refresh" transformations.',
      'Post in Nextdoor neighborhood groups offering a "Kitchen & Bath Hardware Swap" special for a flat, transparent fee.',
      'Partner with local real estate agents who want to offer a "Quick Kitchen Refresh" package to their sellers.',
      'Distribute professional flyers in kitchen and bath showrooms to capture homeowners who are already thinking about upgrades.',
    ],
    upsell:
      'Offer "Cabinet Hinge Adjustment" or "Soft-Close Damper Installation" for a modern, high-end feel.',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '48',
    title: 'Wallpaper Removal Service',
    category: 'Service',
    description:
      'Removing old, stubborn wallpaper is a tedious, messy chore that most homeowners absolutely dread. You provide a professional removal and wall-prep service that ensures a smooth, clean surface for new paint or wallpaper. This is a high-demand, high-satisfaction service that solves a major home maintenance headache and saves the client days of frustration.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Partner with local interior painters who may want to outsource the wallpaper removal portion of their projects to a specialist.',
      'Run targeted Google Search ads for high-intent keywords like "wallpaper removal [city]" or "help removing old wallpaper".',
      'Post in Nextdoor neighborhood groups offering a "Room-by-Room Wallpaper Removal" special for a flat, transparent fee.',
      'Run targeted Facebook ads focusing on homeowners in older neighborhoods where wallpaper is likely common and dated.',
    ],
    upsell:
      'Offer "Wall Texturing" or "Primer Application" to make the walls perfectly ready for new paint.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '49',
    title: 'Drywall Patch & Repair',
    category: 'Service',
    description:
      'Small holes and cracks in drywall are a common eyesore that most large contractors won\'t even return a call for. You provide a specialized "small-job" repair service that fixes everything from doorknob holes to plumbing access points. This is a high-frequency, high-satisfaction service that thrives on being the fast, professional solution to a common home maintenance problem.',
    startupCost: { min: 400, max: 1200 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Partner with local plumbers and electricians who frequently need to cut into drywall and need a reliable repair partner.',
      'Post in Nextdoor neighborhood groups offering a "Small Hole Repair Special" for a flat, transparent fee.',
      'List your services on Facebook Marketplace with clear photos of your seamless repairs and professional finish.',
      'Maintain a professional Google Business Profile optimized for keywords like "drywall repair [city]" or "fix hole in wall".',
    ],
    upsell:
      'Offer "Whole-Room Painting" or "Ceiling Texture Matching" for a completely seamless repair.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '50',
    title: 'Crawl Space Encapsulation',
    category: 'Maintenance',
    description:
      'A damp crawl space is a breeding ground for mold, rot, and pests that can affect the health and structure of a home. You provide a professional encapsulation service that seals the space with a heavy-duty vapor barrier and dehumidification. This is a high-ticket, essential maintenance service that provides long-term protection and improves indoor air quality.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$90,000 - $200,000/year',
    customerAcquisition: [
      'Partner with local home inspectors who can identify crawl space issues during their inspections and refer your services.',
      'Run targeted Google Search ads for high-intent keywords like "wet crawl space [city]" or "crawl space mold removal".',
      'Distribute professional direct mailers to homes in humid areas highlighting the benefits of crawl space encapsulation.',
      'Run targeted Facebook ads featuring photos of moisture damage and the benefits of a "Dry & Healthy Crawl Space".',
    ],
    upsell:
      'Sell "Crawl Space Dehumidifiers" or "Sump Pump Installation" for ultimate moisture control.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '51',
    title: 'Mold Inspection & Testing',
    category: 'Service',
    description:
      'Mold is a major health concern that can cause serious respiratory issues and property damage. You provide a professional inspection and air quality testing service that identifies mold issues and provides a clear plan for remediation. This is a high-trust, essential health service that is especially popular with new parents and home buyers who want to ensure a healthy living environment.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local home inspectors who can offer your specialized mold testing as an add-on.',
      'Run targeted Google Search ads for high-intent keywords like "mold smell [city]" or "is mold in my house".',
      'Run targeted Facebook ads focusing on new parents and families, highlighting the health benefits of a "Mold-Free Home".',
      'Maintain a professional presence in local Nextdoor neighborhood groups to offer advice and support to concerned homeowners.',
    ],
    upsell:
      'Offer "Mold Remediation Planning" or "Post-Remediation Clearance Testing" for complete peace of mind.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '52',
    title: 'Lead Paint Testing',
    category: 'Service',
    description:
      'Lead-based paint is a serious health hazard, especially for young children, and is common in homes built before 1978. You provide a professional testing service that identifies lead hazards and provides essential safety data for renovations. This is a high-trust, essential health service that is especially popular with families and homeowners looking to renovate older properties.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Partner with local interior painters who need reliable lead testing for their projects to comply with safety regulations.',
      'Distribute professional direct mailers to homes in older neighborhoods built before 1978 highlighting the risks of lead paint.',
      'Maintain a professional Google Business Profile optimized for keywords like "lead paint testing [city]" or "is lead in my paint".',
      'Establish referral partnerships with local health departments and pediatricians who can refer your services to concerned families.',
    ],
    upsell:
      'Offer "Lead Hazard Reduction Consulting" or "Soil Testing for Lead" for a comprehensive safety audit.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '53',
    title: 'Asbestos Testing',
    category: 'Service',
    description:
      'Asbestos was commonly used in flooring, insulation, and siding in older homes and can be extremely dangerous if disturbed. You provide a professional sampling and testing service that identifies asbestos hazards before renovations begin. This is a high-trust, essential safety service that is especially popular with homeowners and contractors looking to renovate older properties.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local renovation contractors who need reliable asbestos testing for their projects.',
      'Run targeted Google Search ads for high-intent keywords like "asbestos testing [city]" or "is asbestos in my floor".',
      'Distribute professional direct mailers to homes in older neighborhoods built before the 1980s highlighting the risks of asbestos.',
      'Network actively with local real estate agents who need reliable asbestos testing for their clients during the due diligence period.',
    ],
    upsell:
      'Offer "Asbestos Abatement Project Oversight" or "Post-Abatement Air Clearance Testing" for a safe renovation.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '54',
    title: 'Water Damage Restoration',
    category: 'Service',
    description:
      'A flooded basement or burst pipe is a high-stress emergency that requires immediate, professional action. You provide a 24/7 emergency water extraction and drying service that prevents mold and structural damage. This is a high-margin, high-urgency business that is often paid for by insurance, providing essential support to homeowners in crisis.',
    startupCost: { min: 4000, max: 5000 },
    potentialIncome: '$100,000 - $250,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads for high-intent keywords like "flooded basement [city]" or "emergency water removal".',
      'Establish referral partnerships with local insurance agents who can refer your services to their clients after a claim.',
      'Network actively with local plumbers who are often the first on the scene of a water emergency and can refer your services.',
      'Maintain a professional presence in local Facebook community groups to offer advice and support during weather-related flooding events.',
    ],
    upsell:
      'Offer "Sump Pump Installation" or "Basement Waterproofing Consulting" to prevent future flooding.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '55',
    title: 'Fire Damage Restoration',
    category: 'Service',
    description:
      "The aftermath of a fire is a devastating experience for any homeowner. You provide a professional restoration service that includes cleaning soot, smoke, and fire damage using specialized equipment and chemicals. This is a high-trust, high-impact business that provides essential support and restores a family's home to its original condition.",
    startupCost: { min: 4000, max: 5000 },
    potentialIncome: '$90,000 - $220,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local insurance adjusters who can refer your services to their clients after a fire claim.',
      'Run targeted Google Search ads for high-intent keywords like "fire damage restoration [city]" or "smoke cleaning near me".',
      'Network actively with local fire departments to be a known resource for families in the aftermath of a fire.',
      'Distribute professional direct mailers to fire-affected areas offering your advice and restoration services.',
    ],
    upsell:
      'Offer "Odor Neutralization" or "Content Cleaning & Storage" for a complete home recovery.',
    image:
      'https://images.unsplash.com/photo-1516663713099-37eb6d40bd2a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '56',
    title: 'Professional Carpet Cleaning',
    category: 'Service',
    description:
      "Carpets are a major investment that quickly accumulate dust, allergens, and stains from everyday life. You provide a professional deep-cleaning service using hot water extraction (steam cleaning) that restores the beauty and health of a home's flooring. This is a high-frequency, high-satisfaction service that is especially popular with pet owners and families.",
    startupCost: { min: 2500, max: 4800 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on pet owners and families, featuring the benefits of a "Fresh & Clean Home".',
      'Use Google Local Services to capture homeowners who are actively looking for "carpet cleaning" or "steam cleaning" in their area.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Carpet Refresh" special for a flat, transparent fee.',
      'Distribute professional flyers at local apartment complexes where residents are likely to need carpet cleaning for move-outs.',
    ],
    upsell:
      'Offer "Carpet Protection Treatment" or "Pet Stain & Odor Removal" for a longer-lasting clean.',
    image:
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '57',
    title: 'Grout Color Sealing',
    category: 'Maintenance',
    description:
      'Even after a deep clean, old grout can remain permanently stained or discolored. You provide a professional "color sealing" service that applies a durable, stain-proof epoxy coating to the grout lines, restoring their look and making them incredibly easy to maintain. This is a high-impact, high-satisfaction service that transforms a floor for a fraction of the cost of replacement.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads featuring high-quality "Before & After" photos of dramatic grout color transformations.',
      'Post in Nextdoor neighborhood groups offering a "Kitchen & Bath Grout Refresh" special for a flat, transparent fee.',
      'Partner with local floor installers who may want to offer your color sealing services to their customers after a project.',
      'Maintain a professional Google Business Profile optimized for keywords like "grout color sealing [city]" or "fix stained grout".',
    ],
    upsell: 'Offer "Tile Deep Cleaning" or "Caulking Replacement" for a completely refreshed look.',
    image:
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '58',
    title: 'Mattress Sanitizing & Cleaning',
    category: 'Service',
    description:
      'We spend a third of our lives on our mattresses, yet they are often the most neglected items in our homes, accumulating dust mites, allergens, and stains. You provide a professional sanitizing service using UV-C light and high-powered vacuuming that restores the health and comfort of a mattress. This is a high-value, high-trust service that is especially popular with allergy sufferers and families.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$40,000 - $90,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on allergy sufferers and families, highlighting the health benefits of a "Sanitized Sleep Space".',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Mattress Refresh" special for a flat, transparent fee.',
      'Partner with local high-end mattress stores who may want to offer your sanitizing services to their customers after a purchase.',
      'Distribute professional flyers in luxury apartment complexes where residents are likely to value a premium cleaning service.',
    ],
    upsell:
      'Offer "Pillow Sanitizing" or "Dust Mite Resistant Mattress Covers" for a complete sleep-safe package.',
    image:
      'https://images.unsplash.com/photo-1505693413171-293669746a57?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '59',
    title: 'Area Rug Cleaning (Mobile)',
    category: 'Service',
    description:
      'High-end wool and oriental rugs are major investments that require specialized care to maintain their beauty and value. You provide a professional mobile cleaning service that includes pick-up, deep cleaning, and delivery. This is a high-value, high-trust business that positions you as a specialist in luxury home maintenance.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Distribute professional direct mailers to high-end zip codes where homeowners are likely to own premium area rugs.',
      'Partner with local interior designers who may want to offer your rug cleaning services to their clients after a project.',
      'Run targeted Google Search ads for high-intent keywords like "oriental rug cleaning [city]" or "wool rug restoration".',
      'Run targeted Facebook ads featuring photos of dramatic rug restorations and the benefits of a "Fresh & Clean Home".',
    ],
    upsell: 'Offer "Rug Pad Replacement" or "Fringe Repair" for a complete rug restoration.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '60',
    title: 'Hardwood Floor Refinishing',
    category: 'Maintenance',
    description:
      "Full hardwood refinishing is a major home investment that provides one of the highest returns on investment. You provide a professional service that includes sanding, staining, and applying a durable topcoat to restore the wood's natural beauty. This is a high-ticket, high-impact service that transforms a home and provides immediate, dramatic visual results.",
    startupCost: { min: 4000, max: 5000 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads featuring high-quality "Before & After" videos of dramatic floor refinishing transformations.',
      'Partner with local real estate agents who want to offer a "Floor Refinishing" package to their sellers to increase home value.',
      'Use Google Local Services to capture homeowners who are actively looking for "hardwood floor refinishing" or "floor sanding".',
      'Distribute professional direct mailers to older neighborhoods where hardwood floors are common and likely need maintenance.',
    ],
    upsell:
      'Offer "Custom Stain Colors" or "Bona Traffic HD Finish" for a truly premium, durable result.',
    image:
      'https://images.unsplash.com/photo-1581850518616-bcb8186c443e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '61',
    title: 'Luxury Vinyl Plank (LVP) Install',
    category: 'Service',
    description:
      'Luxury vinyl plank (LVP) is the fastest-growing flooring category due to its durability, waterproof nature, and high-end look. You provide a professional installation service that transforms a home in a single day. This is a high-demand, high-satisfaction service that is especially popular with pet owners and families looking for a low-maintenance flooring solution.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$70,000 - $150,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads featuring high-quality photos of "LVP Transformations" and the dramatic impact on a room\'s appearance.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home LVP Special" for a flat, transparent fee.',
      'Partner with local floor retailers who may want to offer your installation services to their customers after a purchase.',
      'Maintain a professional Google Business Profile optimized for keywords like "LVP installation [city]" or "waterproof flooring".',
    ],
    upsell:
      'Offer "Matching Quarter-Round Installation" or "Furniture Moving Services" for a stress-free experience.',
    image:
      'https://images.unsplash.com/photo-1581850518616-bcb8186c443e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '62',
    title: 'Laminate Floor Installation',
    category: 'Service',
    description:
      'Laminate flooring is a cost-effective, durable alternative to hardwood that is especially popular with budget-conscious homeowners. You provide a professional installation service that ensures a seamless, high-quality finish. This is a high-volume, high-satisfaction service that provides an immediate, dramatic visual improvement for a fraction of the cost of hardwood.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'List your services on Facebook Marketplace with clear, flat-rate pricing for common laminate flooring installations.',
      'Post in Nextdoor neighborhood groups offering a "Room-by-Room Laminate Special" for a flat, transparent fee.',
      'Partner with local home improvement stores who may want to offer your installation services to their customers after a purchase.',
      'Run targeted Google Search ads for high-intent keywords like "laminate floor installation [city]" or "affordable flooring".',
    ],
    upsell:
      'Offer "Underlayment Upgrades" for better sound dampening or "Transition Strip Installation" for a professional finish.',
    image:
      'https://images.unsplash.com/photo-1581850518616-bcb8186c443e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '63',
    title: 'Crown Molding Installation',
    category: 'Service',
    description:
      'Crown molding is one of the most effective ways to add architectural detail and value to a home. You provide a professional installation service that ensures perfect miter joints and a seamless finish. This is a high-impact, high-satisfaction aesthetic upgrade that is especially popular with homeowners looking to add a touch of luxury to their living spaces.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads featuring high-quality photos of "Crown Molding Upgrades" and the dramatic impact on a room\'s appearance.',
      'Partner with local interior painters who may want to offer your crown molding installation services as an add-on to their projects.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Crown Molding Special" for a flat, transparent fee.',
      'Distribute professional flyers in high-end neighborhoods where homeowners are likely to value premium architectural details.',
    ],
    upsell:
      'Offer "Chair Rail Installation" or "Picture Frame Molding" for a complete wall transformation.',
    image:
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '64',
    title: 'Interior Room Painting',
    category: 'Service',
    description:
      'A fresh coat of paint is the fastest way to transform a home, but the prep work and clean lines are where the real skill lies. You provide a professional interior painting service that focuses on high-quality finishes and exceptional attention to detail. This is a high-demand, high-satisfaction service that provides immediate, dramatic visual results that homeowners love.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$65,000 - $140,000/year',
    customerAcquisition: [
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
      'Run targeted Facebook ads featuring high-quality "Before & After" photos of dramatic room transformations.',
      'Use Google Local Services to capture homeowners who are actively looking for "interior painting" or "house painters" in their area.',
      'Post in Nextdoor neighborhood groups offering a "Single Room Refresh" special for a flat, transparent fee.',
    ],
    upsell:
      'Offer "Accent Wall Painting" or "Ceiling Painting" as add-ons to a standard room project.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '65',
    title: 'Exterior House Painting (Trim)',
    category: 'Service',
    description:
      "Peeling or faded exterior trim can significantly decrease a home's curb appeal and lead to wood rot. You provide a professional exterior trim painting service that restores the beauty and protection of a home's doors, shutters, and window frames. This is a high-impact, high-urgency service that provides immediate visual improvement and long-term protection.",
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Conduct direct door-to-door sales in residential neighborhoods, offering to paint peeling trim or shutters on the spot.',
      'Run targeted Facebook ads focusing on "Curb Appeal Upgrades" and the dramatic impact of a fresh exterior trim.',
      'Post in Nextdoor neighborhood groups offering an "Exterior Door & Shutter Refresh" special for a flat, transparent fee.',
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
    ],
    upsell:
      'Offer "Exterior Window Washing" or "Gutter Cleaning" to complete the home\'s exterior refresh.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '66',
    title: 'Kitchen Cabinet Refacing',
    category: 'Service',
    description:
      'A full kitchen remodel is expensive and disruptive, but cabinet refacing offers a "like-new" look for a fraction of the cost. You provide a professional service that replaces cabinet doors and drawer fronts while keeping the existing boxes. This is a high-ticket, high-impact service that transforms a kitchen in a few days and provides incredible value for the homeowner.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads featuring high-quality "Before & After" photos of dramatic kitchen refacing transformations.',
      'Establish a presence at local home and garden shows to showcase your cabinet refacing solutions and generate leads.',
      'Run targeted Google Search ads for high-intent keywords like "cabinet refacing [city]" or "affordable kitchen remodel".',
      'Partner with local real estate agents who want to offer a "Kitchen Refresh" package to their sellers to increase home value.',
    ],
    upsell:
      'Offer "New Countertop Installation" or "Backsplash Tiling" for a complete kitchen makeover.',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '67',
    title: 'Kitchen Cabinet Painting',
    category: 'Service',
    description:
      'Professional cabinet painting is the fastest-growing kitchen upgrade due to its incredible visual impact and affordability. You provide a professional spray-painting service that transforms dated cabinets into a modern, factory-like finish. This is a high-demand, high-satisfaction service that provides a dramatic kitchen transformation for a fraction of the cost of replacement.',
    startupCost: { min: 2500, max: 4800 },
    potentialIncome: '$75,000 - $160,000/year',
    customerAcquisition: [
      'Build a stunning portfolio on Instagram and Facebook showcasing your most dramatic "Cabinet Painting" transformations.',
      'Post in Nextdoor neighborhood groups offering a "Kitchen Cabinet Refresh" special for a flat, transparent fee.',
      'Use Google Local Services to capture homeowners who are actively looking for "cabinet painting" or "kitchen painters".',
      'Partner with local real estate agents who want to offer a "Quick Kitchen Update" package to their sellers.',
    ],
    upsell:
      'Offer "Cabinet Hardware Upgrades" or "Under-Cabinet Lighting" for a modern, high-end finish.',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '68',
    title: 'Wallpaper Installation',
    category: 'Service',
    description:
      'Modern wallpaper and murals are back in style, but the installation process is a high-stakes task that requires precision and experience. You provide a professional installation service that ensures perfect patterns and a seamless finish. This is a high-value, high-satisfaction aesthetic upgrade that is especially popular with interior designers and style-conscious homeowners.',
    startupCost: { min: 800, max: 2000 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local interior designers who need a reliable and skilled wallpaper installer for their projects.',
      'Build a stunning portfolio on Instagram showcasing your most unique and high-quality wallpaper and mural installations.',
      'Run targeted Google Search ads for high-intent keywords like "wallpaper installation [city]" or "professional wallpaper hanger".',
      'Post in Nextdoor neighborhood groups offering a "Feature Wall Special" for a flat, transparent fee.',
    ],
    upsell:
      'Offer "Wallpaper Removal" for old patterns or "Wall Priming" for a perfect installation surface.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '69',
    title: 'Popcorn Ceiling Removal',
    category: 'Service',
    description:
      "Dated popcorn ceilings are a major eyesore that can significantly decrease a home's value and appeal. You provide a professional removal and refinishing service that transforms ceilings into smooth, modern surfaces. This is a high-demand, high-satisfaction service that solves a major home maintenance headache and provides immediate visual improvement.",
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on homeowners in older neighborhoods where popcorn ceilings are likely common and dated.',
      'Partner with local interior painters who may want to outsource the ceiling removal portion of their projects to a specialist.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Ceiling Refresh" special for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "popcorn ceiling removal [city]" or "smooth ceiling finish".',
    ],
    upsell:
      'Offer "Ceiling Texture Spraying" or "Whole-Home Painting" after the removal for a complete modernization.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '70',
    title: 'Ceiling Texture Spraying',
    category: 'Service',
    description:
      'Applying professional knockdown or orange peel textures to ceilings and walls is a specialized skill that adds instant visual interest and hides imperfections. You provide a professional spraying service that ensures a consistent, high-quality finish. This is a high-demand, high-satisfaction service that is especially popular after drywall repairs or ceiling removals.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Partner with local drywall contractors who may need a reliable texture spraying specialist for their projects.',
      'Run targeted Facebook ads featuring high-quality photos of "Ceiling Texture Upgrades" and the dramatic impact on a room\'s appearance.',
      'Post in Nextdoor neighborhood groups offering a "Room-by-Room Texture Refresh" special for a flat, transparent fee.',
      'Maintain a professional Google Business Profile optimized for keywords like "ceiling texture spraying [city]" or "knockdown texture near me".',
    ],
    upsell: 'Offer "Wall Texture Matching" or "Ceiling Painting" for a perfectly finished look.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '71',
    title: 'Door Installation Service',
    category: 'Service',
    description:
      'A new front door is the ultimate curb appeal upgrade, but proper installation is critical for security and energy efficiency. You provide a professional installation service for both interior and exterior doors, focusing on a perfect fit and high-quality hardware. This is a high-impact, high-satisfaction service that provides immediate visual improvement and long-term security.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Entry Door Upgrades" and the dramatic impact on a home\'s curb appeal.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Door Refresh" special for a flat, transparent fee.',
      'Partner with local home improvement stores who may want to offer your installation services to their customers after a purchase.',
      'Run targeted Google Search ads for high-intent keywords like "door installation [city]" or "front door replacement".',
    ],
    image:
      'https://images.unsplash.com/photo-1506704888326-3b8834edb40a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '72',
    title: 'Window Replacement Service',
    category: 'Service',
    description:
      'Energy-efficient windows are a major home investment that pays for itself in utility savings and increased comfort. You provide a professional replacement service that ensures a perfect seal and high-quality finish. This is a high-ticket, high-impact service that is especially popular with homeowners looking to reduce their carbon footprint and lower their energy bills.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads for high-intent keywords like "energy efficient windows [city]" or "window replacement near me".',
      'Distribute professional direct mailers offering a "Free Window Efficiency Inspection" to identify energy loss issues.',
      'Run targeted Facebook ads focusing on homeowners in older neighborhoods where window standards are likely outdated.',
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
    ],
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '73',
    title: 'Weatherstripping & Draft Proofing',
    category: 'Maintenance',
    description:
      'Small gaps around doors and windows can lead to massive energy loss and uncomfortable drafts. You provide a professional sealing service that improves energy efficiency and comfort for a fraction of the cost of replacement. This is a high-demand, high-satisfaction service that is especially popular during the winter months and for homeowners looking to reduce their utility bills.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Lower Your Energy Bill" and the comfort benefits of a professionally sealed home.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Draft Audit" to identify energy loss issues.',
      'Distribute professional direct mailers in winter months highlighting the benefits of weatherstripping and draft proofing.',
      'Partner with local HVAC companies who can refer your services after identifying efficiency issues during a service call.',
    ],
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '74',
    title: 'Deck Repair & Board Replacement',
    category: 'Maintenance',
    description:
      'A few rotted or damaged boards can make a deck unsafe and unsightly. You provide a professional repair service that replaces damaged boards and railings, restoring the safety and beauty of the outdoor space. This is a high-urgency, high-satisfaction service that is especially popular during the spring and summer months as people prepare for outdoor living.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
      'Run targeted Facebook ads focusing on "Deck Safety Checks" and the importance of replacing rotted or damaged boards.',
      'Post in Nextdoor neighborhood groups offering a "Spring Deck Refresh" special for a flat, transparent fee.',
      'Use Google Local Services to capture homeowners who are actively looking for "deck repair" or "fix deck boards".',
    ],
    upsell: 'Offer "Deck Staining" or "Power Washing" as a bundle to preserve the new boards.',
    image:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '75',
    title: 'Porch Repair & Restoration',
    category: 'Maintenance',
    description:
      "The front porch is the face of a home, but it is often the first area to show signs of wear and tear. You provide a professional repair and restoration service that includes fixing steps, railings, and flooring. This is a high-impact, high-satisfaction service that provides immediate visual improvement and restores a home's curb appeal.",
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$65,000 - $140,000/year',
    customerAcquisition: [
      'Conduct direct door-to-door sales in residential neighborhoods, offering to repair visible porch damage on the spot.',
      'Run targeted Facebook ads focusing on "Curb Appeal Upgrades" and the dramatic impact of a restored front porch.',
      'Post in Nextdoor neighborhood groups offering a "Porch & Step Refresh" special for a flat, transparent fee.',
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
    ],
    upsell:
      'Offer "Porch Painting" or "New Railing Installation" for a complete curb appeal transformation.',
    image:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '76',
    title: 'Siding Repair (Vinyl/Wood)',
    category: 'Maintenance',
    description:
      'Damaged or loose siding is not just an eyesore; it can lead to serious water damage and structural issues. You provide a professional repair service that replaces damaged panels and ensures a proper seal. This is a high-urgency, high-satisfaction service that provides immediate visual improvement and long-term protection for the home.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on homeowners in areas that have recently experienced severe storms or high winds.',
      'Post in Nextdoor neighborhood groups offering a "Siding Inspection & Repair" special for a flat, transparent fee.',
      'Partner with local roofing companies who can refer your siding repair services to their customers after a project.',
      'Use Google Local Services to capture homeowners who are actively looking for "siding repair" or "fix vinyl siding".',
    ],
    upsell:
      'Offer "Whole-Home Siding Cleaning" or "Caulking & Sealing" to prevent future water damage.',
    image:
      'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '77',
    title: 'Soffit & Fascia Repair',
    category: 'Maintenance',
    description:
      "Damaged soffit and fascia boards are not just an eyesore; they are critical for proper roof ventilation and preventing pest infestations. You provide a professional repair and replacement service that restores the integrity and appearance of a home's roofline. This is a high-impact, high-urgency service that provides immediate visual improvement and long-term protection.",
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local gutter cleaning companies who can identify soffit and fascia issues during their service calls.',
      'Post in Nextdoor neighborhood groups offering a "Roofline Inspection & Repair" special for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "soffit repair [city]" or "fascia board replacement".',
      'Distribute professional direct mailers in older neighborhoods where wood rot and pest issues are likely more common.',
    ],
    upsell:
      'Offer "Gutter Cleaning" or "Exterior Painting" to ensure a cohesive and protected roofline.',
    image:
      'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '78',
    title: 'Chimney Sweep & Inspection',
    category: 'Maintenance',
    description:
      "A dirty chimney is a major fire hazard and a leading cause of home heating issues. You provide a professional cleaning and inspection service that ensures the safety and efficiency of a home's fireplace. This is a high-demand, high-urgency service that is especially popular during the fall and winter months as people prepare for the heating season.",
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$70,000 - $150,000/year',
    customerAcquisition: [
      'Distribute professional direct mailers in late summer and early fall highlighting the importance of "Fireplace Safety" and your cleaning services.',
      'Run targeted Facebook ads focusing on "Chimney Fire Prevention" and the peace of mind that comes with a professional inspection.',
      'Post in Nextdoor neighborhood groups offering a "Pre-Winter Chimney Special" for a flat, transparent fee.',
      'Use Google Local Services to capture homeowners who are actively looking for "chimney sweep" or "fireplace inspection".',
    ],
    upsell:
      'Offer "Chimney Cap Installation" or "Masonry Repair" to prevent future debris and water entry.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '79',
    title: 'Fireplace Safety Inspection',
    category: 'Service',
    description:
      'Whether wood-burning or gas, a fireplace requires regular professional inspection to ensure it is safe and compliant with local codes. You provide a comprehensive safety inspection service that identifies potential hazards and ensures peace of mind for the homeowner. This is a high-value, high-urgency service that is especially popular during home sales and before the heating season.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local real estate agents who need reliable fireplace inspections for their sellers and buyers.',
      'Network with local home inspectors who can refer your specialized fireplace safety services to their clients.',
      'Maintain a professional Google Business Profile optimized for keywords like "fireplace safety inspection [city]" or "gas fireplace service".',
      'Post in Facebook community groups offering a "Home Safety Audit" that includes a comprehensive fireplace inspection.',
    ],
    upsell:
      'Offer "Fireplace Deep Cleaning" or "Gas Log Installation" for a safer and more attractive hearth.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '80',
    title: 'Dryer Vent Rerouting',
    category: 'Service',
    description:
      'Improperly routed dryer vents are a major fire hazard and a leading cause of appliance inefficiency. You provide a professional rerouting service that ensures a safe and efficient path for the dryer exhaust. This is a high-urgency, high-satisfaction service that provides immediate safety improvement and long-term peace of mind for the homeowner.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local appliance installers who can identify venting issues during a new dryer installation.',
      'Post in Nextdoor neighborhood groups offering a "Dryer Vent Safety Audit" to identify potential fire hazards.',
      'Run targeted Google Search ads for high-intent keywords like "dryer vent rerouting [city]" or "fix dryer vent path".',
      'Run targeted Facebook ads focusing on "Dryer Safety" and the importance of a professionally routed vent system.',
    ],
    upsell:
      'Offer "Dryer Vent Cleaning" or "Booster Fan Installation" for maximum drying efficiency and safety.',
    image:
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '81',
    title: 'Range Hood Installation',
    category: 'Service',
    description:
      'Proper kitchen ventilation is essential for indoor air quality and code compliance, but installing a range hood requires specialized skills in both electrical and venting. You provide a professional installation service that ensures a safe and effective exhaust system. This is a high-demand, high-satisfaction service that is especially popular during kitchen remodels or appliance upgrades.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local kitchen remodelers who may need a reliable specialist for range hood installations.',
      'Post in Nextdoor neighborhood groups offering a "Kitchen Ventilation Upgrade" special for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "range hood installation [city]" or "kitchen exhaust vent".',
      'Post in Facebook Marketplace offering professional installation services for customers who have recently purchased a range hood.',
    ],
    upsell:
      'Offer "Kitchen Cabinet Deep Cleaning" or "Backsplash Tiling" for a complete kitchen refresh.',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '82',
    title: 'Dishwasher Installation',
    category: 'Service',
    description:
      'Installing a dishwasher is a high-stakes task that requires precision in both plumbing and electrical connections to prevent leaks and ensure proper function. You provide a professional installation service that ensures a safe and reliable setup. This is a high-demand, high-satisfaction service that is especially popular after an appliance purchase or during a kitchen refresh.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local appliance stores who can offer your installation services to their customers after a purchase.',
      'Post in Nextdoor neighborhood groups offering a "Dishwasher Installation Special" for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "dishwasher installation [city]" or "appliance installer near me".',
      'Post in Facebook Marketplace offering professional installation services for customers who have recently purchased a dishwasher.',
    ],
    upsell:
      'Offer "Garbage Disposal Installation" or "Under-Sink Leak Detection" for a worry-free kitchen setup.',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '83',
    title: 'Garbage Disposal Replacement',
    category: 'Service',
    description:
      'A broken or leaking garbage disposal is a major kitchen headache that requires immediate attention. You provide a professional replacement service that ensures a safe and reliable installation for a fraction of the cost of a full plumber. This is a high-urgency, high-satisfaction service that provides immediate relief and long-term peace of mind for the homeowner.',
    startupCost: { min: 300, max: 1000 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Post in Nextdoor neighborhood groups offering a "Garbage Disposal Replacement Special" for a flat, transparent fee.',
      'Post in Facebook Marketplace offering professional replacement services for customers who have recently purchased a disposal.',
      'Maintain a professional Google Business Profile optimized for keywords like "garbage disposal replacement [city]" or "fix kitchen disposal".',
      'Distribute professional flyers in local hardware stores where customers are likely to be shopping for replacement parts.',
    ],
    upsell:
      'Offer "Faucet Replacement" or "Under-Sink Organization" for a fully optimized kitchen workspace.',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '84',
    title: 'Faucet & Sink Replacement',
    category: 'Service',
    description:
      'A new faucet or sink can instantly modernize a kitchen or bathroom, but the installation process is a high-stakes task that requires precision to prevent leaks. You provide a professional replacement service that ensures a safe and reliable setup. This is a high-demand, high-satisfaction service that provides immediate visual improvement and long-term peace of mind.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Kitchen & Bath Refreshes" and the dramatic impact of new fixtures.',
      'Post in Nextdoor neighborhood groups offering a "Fixture Upgrade Special" for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "faucet installation [city]" or "sink replacement near me".',
      'Partner with local real estate agents who want to offer a "Quick Home Refresh" package to their sellers.',
    ],
    upsell:
      'Offer "Soap Dispenser Installation" or "New Drain Assembly" for a complete sink modernization.',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '85',
    title: 'Toilet Repair & Replacement',
    category: 'Service',
    description:
      'A leaking or broken toilet is a major home maintenance emergency that requires immediate attention. You provide a professional repair and replacement service that ensures a safe and reliable installation. This is a high-urgency, high-satisfaction service that provides immediate relief and long-term peace of mind for the homeowner.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads for high-intent keywords like "emergency toilet repair [city]" or "toilet replacement near me".',
      'Post in Nextdoor neighborhood groups offering a "Bathroom Maintenance Special" for a flat, transparent fee.',
      'Post in Facebook community groups offering a "Quick Fix" service for common plumbing issues.',
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
    ],
    upsell:
      'Offer "Bidet Installation" or "New Wax Ring & Bolts" for a fully upgraded and leak-proof bathroom.',
    image:
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '86',
    title: 'Showerhead & Hardware Upgrade',
    category: 'Service',
    description:
      'Upgrading showerheads and bathroom hardware is a fast and affordable way to add a touch of luxury to a home. You provide a professional installation service that ensures a perfect fit and high-quality finish. This is a high-impact, high-satisfaction aesthetic upgrade that is especially popular with style-conscious homeowners.',
    startupCost: { min: 300, max: 1000 },
    potentialIncome: '$35,000 - $75,000/year',
    customerAcquisition: [
      'Build a stunning portfolio on Instagram and Facebook showcasing your most dramatic "Bathroom Hardware" transformations.',
      'Post in Nextdoor neighborhood groups offering a "Bathroom Refresh Special" for a flat, transparent fee.',
      'Partner with local real estate agents who want to offer a "Quick Home Update" package to their sellers.',
      'Distribute professional flyers in bathroom showrooms where customers are likely to be shopping for new fixtures.',
    ],
    upsell:
      'Offer "Grab Bar Installation" or "Grout Deep Cleaning" for a safer and cleaner shower experience.',
    image:
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '87',
    title: 'Light Fixture Replacement',
    category: 'Service',
    description:
      'New light fixtures can instantly transform the mood and style of a home, but the installation process requires specialized skills in electrical work. You provide a professional replacement service that ensures a safe and reliable setup. This is a high-impact, high-satisfaction aesthetic upgrade that is especially popular with interior designers and style-conscious homeowners.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads featuring high-quality photos of "Lighting Transformations" and the dramatic impact on a room\'s appearance.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Lighting Refresh" special for a flat, transparent fee.',
      'Establish referral partnerships with local interior designers who need a reliable specialist for light fixture installations.',
      'Run targeted Google Search ads for high-intent keywords like "light fixture installation [city]" or "professional electrician near me".',
    ],
    upsell:
      'Offer "Dimmer Switch Installation" or "Smart Bulb Setup" for fully customizable home lighting.',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '88',
    title: 'Ceiling Fan Installation',
    category: 'Service',
    description:
      'A professionally installed ceiling fan is essential for home comfort and energy efficiency, but the installation process requires specialized skills in both electrical and mounting. You provide a professional installation service that ensures a safe and reliable setup. This is a high-demand, high-satisfaction service that is especially popular during the summer months.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Summer Comfort" and the energy-saving benefits of a professionally installed ceiling fan.',
      'Post in Nextdoor neighborhood groups offering a "Room-by-Room Fan Refresh" special for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "ceiling fan installation [city]" or "professional fan installer".',
      'Distribute professional flyers in local hardware stores where customers are likely to be shopping for new fans.',
    ],
    upsell:
      'Offer "Remote Control Installation" or "Fan Cleaning & Balancing" for a quieter and more convenient setup.',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '89',
    title: 'Outlet & Switch Modernization',
    category: 'Service',
    description:
      'Old, yellowed outlets and switches can make a home feel dated and unsafe. You provide a professional modernization service that replaces old components with clean, modern versions, including high-demand USB outlet upgrades. This is a high-impact, high-satisfaction service that provides immediate visual improvement and long-term peace of mind.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Electrical Refreshes" and the dramatic impact of modern outlets and switches.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Outlet Special" for a flat, transparent fee.',
      'Partner with local real estate agents who want to offer a "Quick Home Update" package to their sellers.',
      'Maintain a professional Google Business Profile optimized for keywords like "outlet replacement [city]" or "USB outlet upgrade".',
    ],
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '90',
    title: 'Video Doorbell Installation',
    category: 'Service',
    description:
      'A video doorbell is the first line of defense for home security, but proper installation and configuration are critical for effective monitoring. You provide a professional service that ensures a safe and reliable setup for devices like Ring or Nest. This is a high-demand, high-satisfaction service that provides immediate security improvement and long-term peace of mind.',
    startupCost: { min: 300, max: 1000 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Security" and the peace of mind that comes with a professionally installed video doorbell.',
      'Post in Nextdoor neighborhood groups offering a "Front Door Security Special" for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "video doorbell installation [city]" or "Ring installer near me".',
      'Distribute professional flyers in new housing developments where homeowners are likely to be looking for security upgrades.',
    ],
    upsell:
      'Offer "Smart Keypad Installation" or "Auto-Lock Configuration" for maximum home security and convenience.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '91',
    title: 'Security Camera System Setup',
    category: 'Service',
    description:
      'A comprehensive security camera system provides 24/7 monitoring and peace of mind, but the installation process requires specialized skills in both electrical and networking. You provide a professional service that ensures a safe and reliable setup for multi-camera systems. This is a high-ticket, high-impact service that provides immediate security improvement and long-term protection.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Whole-Home Security" and the benefits of a professionally installed camera system.',
      'Post in Nextdoor neighborhood groups offering a "Security System Audit & Setup" special for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "security camera installation [city]" or "home surveillance setup".',
      'Partner with local real estate agents who want to offer a "Secure Home" package to their buyers.',
    ],
    upsell:
      'Offer "Cloud Storage Setup" or "Solar Panel Charger Installation" for continuous and worry-free security monitoring.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '92',
    title: 'Motion-Activated Security Lighting',
    category: 'Service',
    description:
      "Motion-activated floodlights are a powerful deterrent for intruders and a major safety upgrade for a home's exterior. You provide a professional installation service that ensures a safe and effective setup around the home perimeter. This is a high-impact, high-satisfaction service that provides immediate security improvement and long-term peace of mind.",
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Deter Intruders" and the safety benefits of a professionally installed security lighting system.',
      'Post in Nextdoor neighborhood groups offering a "Perimeter Security Special" for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "security lighting installation [city]" or "motion floodlight setup".',
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
    ],
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '93',
    title: 'Landscape Lighting Design',
    category: 'Landscaping',
    description:
      "Professional landscape lighting transforms a home's exterior into a stunning nighttime oasis while adding a layer of security. You provide a comprehensive design and installation service that focuses on high-quality, low-voltage lighting solutions. This is a high-value, high-satisfaction aesthetic upgrade that is especially popular with style-conscious homeowners.",
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$70,000 - $150,000/year',
    customerAcquisition: [
      'Build a stunning portfolio on Instagram showcasing your most dramatic "Nighttime Transformations" and landscape lighting designs.',
      'Establish referral partnerships with local landscapers who can refer your specialized lighting services to their clients.',
      'Post in Nextdoor neighborhood groups offering a "Nighttime Curb Appeal Audit" to identify potential lighting upgrades.',
      'Distribute professional direct mailers in high-end zip codes where homeowners are likely to value premium landscape enhancements.',
    ],
    upsell:
      'Offer "Smart Lighting Integration" or "Holiday Lighting Setup" for a versatile and year-round outdoor display.',
    image:
      'https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '94',
    title: 'Sprinkler System Repair',
    category: 'Maintenance',
    description:
      'A broken sprinkler head or a hidden leak can lead to a brown lawn and a massive water bill. You provide a professional repair service that identifies and fixes issues with heads, pipes, and controllers. This is a high-urgency, high-satisfaction service that is especially popular during the spring and summer months as people prepare for the growing season.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Save Your Lawn" and the water-saving benefits of a professionally repaired sprinkler system.',
      'Post in Nextdoor neighborhood groups offering a "Spring Sprinkler Audit" to identify potential leaks or broken heads.',
      'Use Google Local Services to capture homeowners who are actively looking for "sprinkler repair" or "fix irrigation leak".',
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
    ],
    upsell:
      'Offer "Smart Controller Upgrade" or "Drip Irrigation Retrofit" for maximum water efficiency and convenience.',
    image:
      'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '95',
    title: 'Drip Irrigation Installation',
    category: 'Landscaping',
    description:
      'Drip irrigation is the ultimate water-efficient solution for garden beds and potted plants, but the installation process requires specialized skills in both plumbing and design. You provide a professional installation service that ensures a safe and effective setup. This is a high-demand, high-satisfaction service that is especially popular with eco-conscious gardeners.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Water-Wise Gardening" and the convenience benefits of a professionally installed drip system.',
      'Post in Nextdoor neighborhood groups offering a "Garden Irrigation Audit" to identify potential water-saving upgrades.',
      'Establish referral partnerships with local nurseries who can refer your specialized irrigation services to their customers.',
      'Run targeted Google Search ads for high-intent keywords like "drip irrigation installation [city]" or "garden watering system".',
    ],
    upsell:
      'Offer "Soil Moisture Sensor Setup" or "Garden Bed Mulching" for a healthy and low-maintenance landscape.',
    image:
      'https://images.unsplash.com/photo-1592150621344-c7a43422e497?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '96',
    title: 'Raised Garden Bed Construction',
    category: 'Landscaping',
    description:
      'Custom raised garden beds are the ultimate solution for home gardeners looking to grow their own food, but building them requires specialized skills in both woodworking and design. You provide a professional construction service that ensures a safe and effective setup for any outdoor space. This is a high-demand, high-satisfaction service that is especially popular with health-conscious homeowners.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Build a stunning portfolio on Instagram showcasing your most unique and high-quality "Raised Garden Bed" designs.',
      'Post in Nextdoor neighborhood groups offering a "Garden Setup Special" for a flat, transparent fee.',
      'Establish referral partnerships with local nurseries who can refer your specialized construction services to their clients.',
      'Post in Facebook Marketplace offering professional construction services for customers who have recently purchased gardening supplies.',
    ],
    upsell:
      'Offer "Soil & Compost Delivery" or "Irrigation System Setup" for a ready-to-plant and high-yield garden.',
    image:
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '97',
    title: 'Mulching & Edging Service',
    category: 'Landscaping',
    description:
      'Professional mulching and bed edging are the fastest ways to transform a landscape and add instant curb appeal. You provide a professional service that ensures a consistent, high-quality finish for any outdoor space. This is a high-demand, high-satisfaction service that is especially popular during the spring months as people prepare for the growing season.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
      'Run targeted Facebook ads focusing on "Spring Cleanup" and the dramatic impact of a professionally mulched landscape.',
      'Post in Nextdoor neighborhood groups offering a "Landscape Refresh Special" for a flat, transparent fee.',
      'Distribute professional door hangers in residential neighborhoods offering a "Quick Landscape Fix" service for common maintenance issues.',
    ],
    upsell:
      'Offer "Weed Prevention Treatment" or "Perennial Planting" for a long-lasting and beautiful landscape.',
    image:
      'https://images.unsplash.com/photo-1599148400620-8e1ff0bf28d8?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '98',
    title: 'Hedge Trimming & Shaping',
    category: 'Landscaping',
    description:
      'Artistically trimmed and shaped hedges are the ultimate sign of a well-maintained home, but the process requires specialized skills in both design and precision. You provide a professional service that ensures a consistent, high-quality finish for any outdoor space. This is a high-demand, high-satisfaction service that provides immediate visual improvement and long-term curb appeal.',
    startupCost: { min: 800, max: 2000 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
      'Run targeted Facebook ads focusing on "Curb Appeal Upgrades" and the dramatic impact of professionally shaped hedges.',
      'Post in Nextdoor neighborhood groups offering a "Hedge & Shrub Refresh" special for a flat, transparent fee.',
      'Conduct direct door-to-door sales in residential neighborhoods, offering to trim overgrown hedges on the spot.',
    ],
    upsell:
      'Offer "Fertilization & Pest Control" or "Small Tree Pruning" for a healthy and well-maintained outdoor space.',
    image:
      'https://images.unsplash.com/photo-1592150621344-c7a43422e497?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '99',
    title: 'Tree Pruning (Small Trees)',
    category: 'Landscaping',
    description:
      'Professional pruning is essential for the health and aesthetics of small trees, but the process requires specialized skills in both biology and design. You provide a professional service that ensures a safe and effective setup for trees under 15 feet. This is a high-demand, high-satisfaction service that provides immediate visual improvement and long-term tree health.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Tree Health" and the benefits of a professionally pruned ornamental tree.',
      'Post in Nextdoor neighborhood groups offering a "Tree & Shrub Audit" to identify potential pruning needs.',
      'Establish referral partnerships with local landscapers who can refer your specialized pruning services to their clients.',
      'Use Google Local Services to capture homeowners who are actively looking for "tree pruning" or "fix small tree".',
    ],
    upsell: 'Offer "Stump Grinding" or "Tree Health Assessment" for a safe and thriving landscape.',
    image:
      'https://images.unsplash.com/photo-1592150621344-c7a43422e497?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '100',
    title: 'Leaf Raking & Removal',
    category: 'Landscaping',
    description:
      'Seasonal leaf removal is a major home maintenance headache that is essential for lawn health and aesthetics. You provide a professional service that ensures a consistent, high-quality finish for any outdoor space. This is a high-demand, high-satisfaction service that is especially popular during the fall months as people prepare for the winter season.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$30,000 - $65,000/year',
    customerAcquisition: [
      'Distribute professional door hangers in late summer and early fall highlighting the importance of "Fall Cleanup" and your removal services.',
      'Run targeted Facebook ads focusing on "Lawn Health" and the benefits of a professionally raked and removed leaf system.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Leaf Special" for a flat, transparent fee.',
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
    ],
    upsell:
      'Offer "Gutter Cleaning" or "Lawn Aeration" for a complete fall cleanup and healthy turf.',
    image:
      'https://images.unsplash.com/photo-1508500351588-bc69e385e03f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '101',
    title: 'Snow Shoveling (Residential)',
    category: 'Seasonal',
    description:
      'Manual snow shoveling is a high-urgency service that is essential for home safety and accessibility, especially for seniors and busy professionals. You provide a professional service that ensures a safe and reliable path for driveways and walkways. This is a high-demand, high-satisfaction service that provides immediate relief and long-term peace of mind.',
    startupCost: { min: 200, max: 800 },
    potentialIncome: '$20,000 - $45,000/season',
    customerAcquisition: [
      'Conduct direct door-to-door sales in residential neighborhoods immediately before and after major snowstorms.',
      'Post in Facebook community groups offering a "Quick Snow Fix" service for common accessibility issues.',
      'Post in Nextdoor neighborhood groups offering an "Urgent Snow Removal" special for a flat, transparent fee.',
      'Distribute professional flyers in senior living communities where homeowners are likely to need manual shoveling assistance.',
    ],
    upsell:
      'Offer "Ice Melt Application" or "Roof Snow Removal" for maximum winter safety and accessibility.',
    image:
      'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '102',
    title: 'Ice Dam Removal (Roof)',
    category: 'Seasonal',
    description:
      'Ice dams are a major home maintenance emergency that can lead to serious water damage and structural issues. You provide a professional removal service that ensures a safe and effective path for the roof exhaust. This is a high-urgency, high-satisfaction service that provides immediate relief and long-term protection for the home.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$40,000 - $90,000/season',
    customerAcquisition: [
      'Run targeted Google Search ads for high-intent keywords like "emergency ice dam removal [city]" or "fix roof ice dam".',
      'Run targeted Facebook ads focusing on "Prevent Roof Leaks" and the safety benefits of a professionally removed ice dam.',
      'Post in Nextdoor neighborhood groups offering an "Urgent Ice Dam Removal" special for a flat, transparent fee.',
      'Establish referral partnerships with local roofing companies who can refer your specialized removal services to their clients.',
    ],
    upsell:
      'Offer "Heat Tape Installation" or "Attic Insulation Audit" to prevent future ice dam formation and roof damage.',
    image:
      'https://images.unsplash.com/photo-1548625361-625bc3964bb3?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '103',
    title: 'Holiday Light Removal',
    category: 'Seasonal',
    description:
      'The joy of holiday lights often turns into a major headache when it comes time to take them down and organize them for storage. You provide a professional removal and organization service that ensures a safe and effective path for the next season. This is a high-demand, high-satisfaction service that provides immediate relief and long-term peace of mind.',
    startupCost: { min: 200, max: 800 },
    potentialIncome: '$15,000 - $35,000/season',
    customerAcquisition: [
      'Conduct direct outreach to previous holiday lighting clients offering a "Post-Season Removal & Storage" package.',
      'Run targeted Facebook ads in early January focusing on "Stress-Free Post-Holiday Cleanup" and the benefits of professional removal.',
      'Post in Nextdoor neighborhood groups offering a "Holiday Light Takedown Special" for a flat, transparent fee.',
      'Distribute professional flyers in residential neighborhoods where homeowners have visible holiday light displays.',
    ],
    upsell:
      'Offer "Year-Round Storage" or "Wreath & Garland Cleaning" for a complete post-holiday organization package.',
    image:
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '104',
    title: 'Pet Door Installation',
    category: 'Service',
    description:
      'Installing a pet door is a high-stakes task that requires precision in both cutting and sealing to prevent drafts and ensure security. You provide a professional installation service for walls, doors, and screens, focusing on a perfect fit and high-quality finish. This is a high-demand, high-satisfaction service that provides immediate freedom for pets and long-term convenience for owners.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Pet Freedom" and the convenience benefits of a professionally installed pet door.',
      'Post in Nextdoor neighborhood groups offering a "Pet Door Setup Special" for a flat, transparent fee.',
      'Establish referral partnerships with local pet stores who can refer your specialized installation services to their customers.',
      'Run targeted Google Search ads for high-intent keywords like "pet door installation [city]" or "dog door installer near me".',
    ],
    upsell:
      'Offer "Electronic Pet Door Upgrade" or "Pet Security Camera Setup" for a fully modern and secure pet entryway.',
    image:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '105',
    title: 'Senior Safety Home Audit',
    category: 'Service',
    description:
      'Aging in place requires a safe and accessible home environment, but identifying potential hazards can be difficult for seniors and their families. You provide a comprehensive safety audit service that identifies risks and recommends modifications like grab bars and improved lighting. This is a high-value, high-urgency service that provides immediate safety improvement and long-term peace of mind.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local senior centers who can refer your specialized audit services to their members.',
      'Network with geriatric care managers who can refer your safety services to their clients and families.',
      'Run targeted Google Search ads for high-intent keywords like "senior home safety audit [city]" or "aging in place modifications".',
      'Run targeted Facebook ads focusing on adult children who are likely looking for safety solutions for their aging parents.',
    ],
    upsell:
      'Offer "Grab Bar Installation" or "Lighting Upgrade" for a safer and more accessible home environment.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '106',
    title: 'Grab Bar Installation',
    category: 'Service',
    description:
      'Professionally installed grab bars are essential for senior safety and independence in the bathroom, but the installation process requires specialized skills in both mounting and sealing. You provide a professional installation service that ensures a safe and reliable setup. This is a high-urgency, high-satisfaction service that provides immediate safety improvement and long-term peace of mind.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local physical therapists who can refer your specialized installation services to their clients.',
      'Post in Nextdoor neighborhood groups offering a "Bathroom Safety Special" for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "grab bar installation [city]" or "senior bathroom safety".',
      'Distribute professional flyers in senior living communities where homeowners are likely to need safety modifications.',
    ],
    upsell:
      'Offer "Non-Slip Floor Treatment" or "Shower Seat Installation" for a fully secure and accessible bathroom.',
    image:
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '107',
    title: 'Wheelchair Ramp Construction',
    category: 'Service',
    description:
      'A professionally constructed wheelchair ramp is essential for home accessibility and independence, but the process requires specialized skills in both design and engineering. You provide a professional construction service for both modular and custom ramps, focusing on a safe and effective setup. This is a high-ticket, high-impact service that provides immediate accessibility improvement and long-term peace of mind.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$70,000 - $150,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local medical supply stores who can refer your specialized construction services to their customers.',
      'Network with local social workers who can refer your accessibility services to their clients and families.',
      'Run targeted Google Search ads for high-intent keywords like "wheelchair ramp construction [city]" or "home accessibility ramp".',
      'Run targeted Facebook ads focusing on caregivers who are likely looking for accessibility solutions for their loved ones.',
    ],
    upsell:
      'Offer "Handrail Installation" or "Non-Slip Surface Coating" for maximum accessibility and safety.',
    image:
      'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '108',
    title: 'Furniture Repair & Touch-up',
    category: 'Service',
    description:
      'Scratched or damaged wooden furniture can be a major eyesore, but the process of repair and touch-up requires specialized skills in both woodworking and finishing. You provide a professional service that restores the beauty and integrity of family heirlooms and high-quality pieces. This is a high-value, high-satisfaction service that provides immediate visual improvement and long-term preservation.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Build a stunning portfolio on Instagram and Facebook showcasing your most dramatic "Furniture Restoration" transformations.',
      'Post in Nextdoor neighborhood groups offering a "Furniture Refresh Special" for a flat, transparent fee.',
      'Establish referral partnerships with local antique shops who can refer your specialized repair services to their customers.',
      'Maintain a professional Google Business Profile optimized for keywords like "furniture repair [city]" or "wood touch-up near me".',
    ],
    upsell:
      'Offer "Furniture Refinishing" or "Upholstery Cleaning" for a complete furniture restoration and refresh.',
    image:
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '109',
    title: 'Antique Furniture Restoration',
    category: 'Service',
    description:
      'Antique furniture restoration is a high-stakes craft that requires specialized skills in both historical accuracy and modern finishing techniques. You provide a professional service that restores the beauty and integrity of family heirlooms and historical pieces. This is a high-value, high-satisfaction service that provides immediate visual improvement and long-term preservation.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local antique dealers who can refer your specialized restoration services to their clients.',
      'Build a stunning portfolio on Instagram showcasing your most unique and high-quality "Antique Restoration" projects.',
      'Run targeted Google Search ads for high-intent keywords like "antique furniture restoration [city]" or "fix old furniture".',
      'Post in Nextdoor neighborhood groups offering a "Historical Piece Audit" to identify potential restoration needs.',
    ],
    upsell:
      'Offer "Historical Documentation" or "Custom Protective Covers" for a fully preserved and protected heirloom.',
    image:
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '110',
    title: 'Piano Tuning Service',
    category: 'Service',
    description:
      'Professional piano tuning is a high-precision task that requires specialized skills in both acoustics and mechanical engineering. You provide a professional service that ensures a consistent, high-quality sound for any acoustic piano. This is a high-demand, high-satisfaction service that provides immediate musical improvement and long-term instrument health.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local music teachers who can refer your specialized tuning services to their students.',
      'Run targeted Google Search ads for high-intent keywords like "piano tuning [city]" or "piano tuner near me".',
      'Post in Nextdoor neighborhood groups offering a "Piano Health Audit" to identify potential tuning and maintenance needs.',
      'Distribute professional flyers in local music stores where customers are likely to be shopping for piano supplies.',
    ],
    upsell:
      'Offer "Piano Cleaning & Polishing" or "Humidity Control System Installation" for a perfectly tuned and maintained instrument.',
    image:
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '111',
    title: 'Clock Repair & Maintenance',
    category: 'Service',
    description:
      'Mechanical clocks are high-precision instruments that require specialized skills in both horology and mechanical engineering to maintain. You provide a professional repair and maintenance service for grandfather clocks and antiques, focusing on a safe and effective setup. This is a high-value, high-satisfaction service that provides immediate visual improvement and long-term preservation.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local antique stores who can refer your specialized repair services to their customers.',
      'Run targeted Google Search ads for high-intent keywords like "clock repair [city]" or "grandfather clock maintenance".',
      'Post in Nextdoor neighborhood groups offering a "Clock Health Audit" to identify potential repair needs.',
      'Post in Facebook community groups offering a "Quick Clock Fix" service for common maintenance issues.',
    ],
    upsell:
      'Offer "Clock Case Restoration" or "Movement Deep Cleaning" for a perfectly functioning and beautiful timepiece.',
    image:
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '112',
    title: 'Sewing Machine Repair',
    category: 'Service',
    description:
      'Sewing machines are high-precision tools that require specialized skills in both mechanical engineering and electronics to maintain. You provide a professional repair and maintenance service for residential and industrial machines, focusing on a safe and effective setup. This is a high-demand, high-satisfaction service that provides immediate performance improvement and long-term instrument health.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Establish referral partnerships with local fabric stores who can refer your specialized repair services to their customers.',
      'Run targeted Google Search ads for high-intent keywords like "sewing machine repair [city]" or "fix sewing machine near me".',
      'Post in Nextdoor neighborhood groups offering a "Sewing Machine Health Audit" to identify potential repair needs.',
      'Post in Facebook sewing groups offering a "Quick Machine Fix" service for common maintenance issues.',
    ],
    upsell:
      'Offer "Machine Deep Cleaning" or "New Motor Installation" for a high-performance and reliable sewing experience.',
    image:
      'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '113',
    title: 'Vacuum Cleaner Repair',
    category: 'Service',
    description:
      'High-end vacuum cleaners like Dyson and Miele are major investments that require specialized skills in both mechanical engineering and electronics to maintain. You provide a professional repair and maintenance service that ensures a safe and effective setup for any high-end machine. This is a high-demand, high-satisfaction service that provides immediate performance improvement and long-term instrument health.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$35,000 - $75,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads for high-intent keywords like "Dyson repair [city]" or "Miele vacuum service near me".',
      'Post in Nextdoor neighborhood groups offering a "Vacuum Performance Audit" to identify potential repair needs.',
      'Post in Facebook Marketplace offering professional repair services for customers who have recently purchased high-end vacuums.',
      'Distribute professional flyers in local hardware stores where customers are likely to be shopping for vacuum supplies.',
    ],
    upsell:
      'Offer "Filter Replacement Subscription" or "Deep Cleaning Service" for a high-performance and healthy home environment.',
    image:
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '114',
    title: 'Small Engine Repair',
    category: 'Service',
    description:
      'Lawn mowers, leaf blowers, and other small engine equipment are essential for home maintenance, but the process of repair requires specialized skills in both mechanical engineering and diagnostics. You provide a professional repair and maintenance service that ensures a safe and effective setup for any small engine. This is a high-demand, high-satisfaction service that provides immediate performance improvement and long-term equipment health.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads for high-intent keywords like "lawn mower repair [city]" or "small engine service near me".',
      'Post in Nextdoor neighborhood groups offering a "Seasonal Equipment Tune-up" special for a flat, transparent fee.',
      'Post in Facebook Marketplace offering professional repair services for customers who have recently purchased used equipment.',
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
    ],
    upsell:
      'Offer "Seasonal Storage Prep" or "Blade Sharpening" for a high-performance and reliable equipment setup.',
    image:
      'https://images.unsplash.com/photo-1597766353939-958983023000?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '115',
    title: 'Mobile Scissor Sharpening',
    category: 'Service',
    description:
      'Hair stylist scissors and fabric shears are high-precision tools that require specialized skills in both metallurgy and grinding to maintain. You provide a professional mobile sharpening service that ensures a consistent, high-quality edge for any professional tool. This is a high-demand, high-satisfaction service that provides immediate performance improvement and long-term tool health.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Conduct direct outreach to local hair salons offering a "Salon Sharpening Day" for a flat, transparent fee.',
      'Establish referral partnerships with local fabric stores who can refer your specialized sharpening services to their customers.',
      'Run targeted Google Search ads for high-intent keywords like "professional scissor sharpening [city]" or "hair shear sharpening near me".',
      'Run targeted Facebook ads focusing on "Professional Tool Maintenance" and the performance benefits of a professionally sharpened edge.',
    ],
    upsell:
      'Offer "Tool Cleaning & Lubrication" or "New Tool Sales" for a high-performance and professional tool kit.',
    image:
      'https://images.unsplash.com/photo-1594498653385-d5172b532c00?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '116',
    title: 'Garden Tool Restoration',
    category: 'Service',
    description:
      'Rusted or dull garden tools are a major headache for home gardeners, but the process of restoration requires specialized skills in both cleaning and sharpening. You provide a professional service that ensures a safe and effective setup for any outdoor tool. This is a high-demand, high-satisfaction service that is especially popular during the spring months as people prepare for the growing season.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$35,000 - $75,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Spring Garden Prep" and the dramatic impact of professionally restored garden tools.',
      'Post in Nextdoor neighborhood groups offering a "Garden Tool Refresh Special" for a flat, transparent fee.',
      'Establish referral partnerships with local nurseries who can refer your specialized restoration services to their clients.',
      'Distribute professional flyers in local hardware stores where customers are likely to be shopping for gardening supplies.',
    ],
    image:
      'https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '117',
    title: 'Chainsaw Chain Sharpening',
    category: 'Service',
    description:
      'A dull chainsaw chain is a major safety hazard and a significant efficiency drain, but the process of sharpening requires specialized skills in both precision and grinding. You provide a professional sharpening service that ensures a safe and effective setup for any chainsaw. This is a high-demand, high-satisfaction service that provides immediate performance improvement and long-term equipment health.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$30,000 - $65,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads for high-intent keywords like "chainsaw sharpening [city]" or "fix chainsaw near me".',
      'Post in Nextdoor neighborhood groups offering a "Chainsaw Performance Audit" to identify potential sharpening needs.',
      'Post in Facebook Marketplace offering professional sharpening services for customers who have recently purchased used chainsaws.',
      'Distribute professional flyers in local hardware stores where customers are likely to be shopping for chainsaw supplies.',
    ],
    upsell:
      'Offer "Chainsaw Bar Dressing" or "Small Engine Tune-up" for a high-performance and reliable cutting experience.',
    image:
      'https://images.unsplash.com/photo-1594498653385-d5172b532c00?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '118',
    title: 'Window Well Cover Install',
    category: 'Service',
    description:
      'Window wells are a major entry point for debris and water, but the process of installing custom or pre-made covers requires specialized skills in both measurement and mounting. You provide a professional installation service that ensures a safe and effective setup for any window well. This is a high-demand, high-satisfaction service that provides immediate protection and long-term peace of mind.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Basement Protection" and the benefits of a professionally installed window well cover.',
      'Post in Nextdoor neighborhood groups offering a "Window Well Safety Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "window well cover installation [city]" or "fix window well".',
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
    ],
    upsell:
      'Offer "Window Well Cleaning" or "Basement Egress Ladder Installation" for a safe and protected home foundation.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '119',
    title: 'Sump Pump Testing & Replace',
    category: 'Maintenance',
    description:
      'A failing sump pump is a major home maintenance emergency that can lead to serious basement flooding and structural issues. You provide a professional testing and replacement service that ensures a safe and reliable setup for any home with a basement. This is a high-urgency, high-satisfaction service that provides immediate relief and long-term protection for the home.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Flood Prevention" and the safety benefits of a professionally tested and replaced sump pump.',
      'Post in Nextdoor neighborhood groups offering an "Urgent Sump Pump Audit" to identify potential maintenance needs.',
      'Run targeted Google Search ads for high-intent keywords like "sump pump replacement [city]" or "fix sump pump near me".',
      'Establish referral partnerships with local home inspectors who can refer your specialized maintenance services to their clients.',
    ],
    upsell:
      'Offer "Backup Battery Installation" or "High-Water Alarm Setup" for maximum flood protection and peace of mind.',
    image:
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '120',
    title: 'Attic Fan Installation',
    category: 'Service',
    description:
      'Attic fans are a high-impact solution for improving home ventilation and reducing cooling costs, but the installation process requires specialized skills in both electrical and roofing. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate comfort improvement and long-term energy savings.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Lower Your Cooling Bill" and the energy-saving benefits of a professionally installed attic fan.',
      'Post in Nextdoor neighborhood groups offering an "Attic Ventilation Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "attic fan installation [city]" or "fix attic ventilation".',
      'Establish referral partnerships with local HVAC companies who can refer your specialized installation services to their clients.',
    ],
    upsell:
      'Offer "Attic Insulation Audit" or "Solar Attic Fan Upgrade" for a fully optimized and energy-efficient home ventilation system.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '121',
    title: 'Whole House Fan Installation',
    category: 'Service',
    description:
      'Whole house fans are a high-efficiency solution for energy-efficient cooling, especially in dry climates, but the installation process requires specialized skills in both electrical and structural. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-ticket, high-impact service that provides immediate comfort improvement and long-term energy savings.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$70,000 - $150,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Energy Efficient Cooling" and the comfort benefits of a professionally installed whole house fan.',
      'Post in Nextdoor neighborhood groups offering a "Whole House Cooling Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "whole house fan installation [city]" or "fix home cooling".',
      'Establish referral partnerships with local HVAC companies who can refer your specialized installation services to their clients.',
    ],
    upsell:
      'Offer "Smart Control Integration" or "Attic Venting Upgrade" for a fully automated and high-performance home cooling system.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '122',
    title: 'Drywall Repair & Patching',
    category: 'Maintenance',
    description:
      'Drywall damage is a common home maintenance issue that requires specialized skills in both patching and finishing to restore a seamless look. You provide a professional repair service that ensures a consistent, high-quality finish for any indoor space. This is a high-demand, high-satisfaction service that provides immediate visual improvement and long-term structural integrity.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
      'Run targeted Facebook ads focusing on "Drywall Repair" and the dramatic impact of a professionally patched wall.',
      'Post in Nextdoor neighborhood groups offering a "Wall Refresh Special" for a flat, transparent fee.',
      'Establish referral partnerships with local painters who can refer your specialized repair services to their clients.',
    ],
    upsell:
      'Offer "Whole-Room Painting" or "Texture Matching" for a perfectly finished and seamless wall restoration.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '123',
    title: 'Caulking & Sealing Service',
    category: 'Maintenance',
    description:
      'Proper caulking and sealing are essential for home energy efficiency and moisture protection, but the process requires specialized skills in both application and finishing. You provide a professional service that ensures a safe and effective setup for any indoor or outdoor space. This is a high-demand, high-satisfaction service that provides immediate protection and long-term energy savings.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$35,000 - $75,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Energy Efficiency" and the benefits of a professionally caulked and sealed home.',
      'Post in Nextdoor neighborhood groups offering a "Whole-Home Sealing Special" for a flat, transparent fee.',
      'Establish referral partnerships with local window installers who can refer your specialized sealing services to their clients.',
      'Distribute professional door hangers in residential neighborhoods offering a "Quick Sealing Fix" service for common maintenance issues.',
    ],
    upsell:
      'Offer "Weatherstripping Installation" or "Window Efficiency Audit" for a fully sealed and energy-efficient home.',
    image:
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '124',
    title: 'Screen Door Repair & Replace',
    category: 'Maintenance',
    description:
      'Damaged or torn screen doors are a major headache for homeowners, but the process of repair or replacement requires specialized skills in both measurement and mounting. You provide a professional service that ensures a safe and effective setup for any outdoor space. This is a high-demand, high-satisfaction service that provides immediate relief and long-term peace of mind.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$30,000 - $65,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Summer Comfort" and the benefits of a professionally repaired or replaced screen door.',
      'Post in Nextdoor neighborhood groups offering a "Screen Door Refresh Special" for a flat, transparent fee.',
      'Establish referral partnerships with local hardware stores who can refer your specialized repair services to their customers.',
      'Distribute professional door hangers in residential neighborhoods offering a "Quick Screen Fix" service for common maintenance issues.',
    ],
    upsell:
      'Offer "Pet-Resistant Mesh Upgrade" or "New Door Hardware Installation" for a durable and secure entryway.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '125',
    title: 'House Numbering Service',
    category: 'Maintenance',
    description:
      'Clear and visible house numbering is essential for emergency services and delivery drivers, but the process of installation requires specialized skills in both design and precision. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate safety improvement and long-term curb appeal.',
    startupCost: { min: 200, max: 800 },
    potentialIncome: '$15,000 - $35,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Safety & Visibility" and the benefits of a professionally installed house number.',
      'Post in Nextdoor neighborhood groups offering a "House Number Refresh Special" for a flat, transparent fee.',
      'Establish referral partnerships with local emergency services who can refer your specialized installation services to their members.',
      'Distribute professional flyers in residential neighborhoods where homeowners are likely to have unclear or missing house numbers.',
    ],
    upsell:
      'Offer "Solar-Powered House Numbers" or "Curb Painting" for maximum visibility and curb appeal.',
    image:
      'https://images.unsplash.com/photo-1506704888326-3b8834edb40a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '126',
    title: 'Outdoor Lighting Repair',
    category: 'Maintenance',
    description:
      'Failing outdoor lighting is a major safety hazard and a significant curb appeal drain, but the process of repair requires specialized skills in both electrical and diagnostics. You provide a professional repair service that ensures a safe and effective setup for any outdoor space. This is a high-demand, high-satisfaction service that provides immediate safety improvement and long-term curb appeal.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Safety & Security" and the benefits of a professionally repaired outdoor lighting system.',
      'Post in Nextdoor neighborhood groups offering an "Outdoor Lighting Audit" to identify potential repair needs.',
      'Establish referral partnerships with local landscapers who can refer your specialized repair services to their clients.',
      'Maintain a professional Google Business Profile optimized for keywords like "outdoor lighting repair [city]" or "fix landscape lights".',
    ],
    upsell:
      'Offer "LED Bulb Upgrade" or "Smart Lighting Setup" for a high-performance and energy-efficient outdoor display.',
    image:
      'https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '127',
    title: 'Fence Repair & Staining',
    category: 'Maintenance',
    description:
      'A leaning or weathered fence is a major eyesore that can be difficult to fix without specialized skills in both structural integrity and finishing. You provide a professional repair and staining service that ensures a safe and effective setup for any outdoor space. This is a high-demand, high-satisfaction service that provides immediate visual improvement and long-term protection for the home.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Place professional yard signs at every completed project to build local awareness and social proof in the neighborhood.',
      'Post in Nextdoor neighborhood groups offering a "Fence Refresh Special" for a flat, transparent fee.',
      'Run targeted Google Search ads for high-intent keywords like "fence repair [city]" or "fix leaning fence".',
      'Distribute professional flyers in residential neighborhoods where homeowners are likely to have leaning or weathered fences.',
    ],
    upsell:
      'Offer "Gate Hardware Replacement" or "Post Reinforcement" for a fully secure and long-lasting fence.',
    image:
      'https://images.unsplash.com/photo-1504198458649-012800d46315?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '128',
    title: 'Gutter Guard Installation',
    category: 'Maintenance',
    description:
      'Clogged gutters are a major home maintenance headache that can lead to serious water damage and structural issues. You provide a professional gutter guard installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate relief and long-term protection for the home.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$65,000 - $140,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Stress-Free Gutter Maintenance" and the benefits of a professionally installed gutter guard.',
      'Post in Nextdoor neighborhood groups offering a "Gutter Safety Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "gutter guard installation [city]" or "fix clogged gutters".',
      'Establish referral partnerships with local roofing companies who can refer your specialized installation services to their clients.',
    ],
    upsell:
      'Offer "Gutter Repair" or "Downspout Extension Installation" for a fully protected and efficient drainage system.',
    image:
      'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '129',
    title: 'Attic Insulation Upgrade',
    category: 'Maintenance',
    description:
      'Poor attic insulation is a major energy efficiency drain that can lead to high cooling and heating costs, but the process of upgrading requires specialized skills in both material selection and installation. You provide a professional insulation upgrade service that ensures a safe and effective setup for any home. This is a high-ticket, high-impact service that provides immediate comfort improvement and long-term energy savings.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$75,000 - $160,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Lower Your Energy Bill" and the comfort benefits of a professionally upgraded attic insulation.',
      'Post in Nextdoor neighborhood groups offering an "Attic Efficiency Audit" to identify potential upgrade needs.',
      'Run targeted Google Search ads for high-intent keywords like "attic insulation upgrade [city]" or "fix home energy loss".',
      'Establish referral partnerships with local HVAC companies who can refer your specialized insulation services to their clients.',
    ],
    upsell:
      'Offer "Air Sealing" or "Radiant Barrier Installation" for maximum energy efficiency and home comfort.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '130',
    title: 'Radon Testing & Mitigation',
    category: 'Maintenance',
    description:
      'Radon is a major home safety hazard that can lead to serious health issues, but the process of testing and mitigation requires specialized skills in both diagnostics and engineering. You provide a professional service that ensures a safe and effective setup for any home. This is a high-urgency, high-satisfaction service that provides immediate safety improvement and long-term peace of mind.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$70,000 - $150,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Safety" and the health benefits of a professionally tested and mitigated radon system.',
      'Post in Nextdoor neighborhood groups offering a "Radon Safety Audit" to identify potential mitigation needs.',
      'Run targeted Google Search ads for high-intent keywords like "radon testing [city]" or "fix radon in home".',
      'Establish referral partnerships with local realtors who can refer your specialized safety services to their clients.',
    ],
    upsell:
      'Offer "Sump Pump Sealing" or "Whole-Home Air Quality Monitoring" for a safe and healthy home environment.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '131',
    title: 'Air Duct Cleaning',
    category: 'Cleaning',
    description:
      'Dirty air ducts are a major indoor air quality hazard and a significant efficiency drain, but the process of cleaning requires specialized skills in both diagnostics and clearance. You provide a professional cleaning service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate air quality improvement and long-term HVAC health.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$75,000 - $160,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Indoor Air Quality" and the health benefits of a professionally cleaned air duct system.',
      'Post in Nextdoor neighborhood groups offering an "Air Quality Audit" to identify potential cleaning needs.',
      'Run targeted Google Search ads for high-intent keywords like "air duct cleaning [city]" or "fix dirty air ducts".',
      'Establish referral partnerships with local HVAC companies who can refer your specialized cleaning services to their clients.',
    ],
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '132',
    title: 'Skylight Cleaning & Repair',
    category: 'Cleaning',
    description:
      'Dirty or leaking skylights are a major headache for homeowners, but the process of cleaning and repair requires specialized skills in both safety and sealing. You provide a professional service that ensures a safe and effective setup for any indoor space. This is a high-demand, high-satisfaction service that provides immediate visual improvement and long-term protection for the home.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Natural Light" and the benefits of a professionally cleaned and repaired skylight.',
      'Post in Nextdoor neighborhood groups offering a "Skylight Safety Audit" to identify potential repair needs.',
      'Run targeted Google Search ads for high-intent keywords like "skylight cleaning [city]" or "fix leaking skylight".',
      'Establish referral partnerships with local roofing companies who can refer your specialized repair services to their clients.',
    ],
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '133',
    title: 'Window Tinting (Residential)',
    category: 'Service',
    description:
      'Window tinting is a high-impact solution for home energy efficiency and privacy, but the process of installation requires specialized skills in both precision and application. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate comfort improvement and long-term energy savings.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Energy Efficiency" and the privacy benefits of a professionally installed window tint.',
      'Post in Nextdoor neighborhood groups offering a "Window Efficiency Audit" to identify potential tinting needs.',
      'Run targeted Google Search ads for high-intent keywords like "residential window tinting [city]" or "fix home heat gain".',
      'Establish referral partnerships with local window installers who can refer your specialized tinting services to their clients.',
    ],
    upsell:
      'Offer "Security Film Upgrade" or "Decorative Glass Film Installation" for added safety and aesthetic appeal.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '134',
    title: 'Security Camera Installation',
    category: 'Service',
    description:
      'Security cameras are a high-urgency solution for home safety and peace of mind, but the process of installation requires specialized skills in both electrical and networking. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate safety improvement and long-term peace of mind.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$65,000 - $140,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Security" and the peace of mind that comes with a professionally installed security camera system.',
      'Post in Nextdoor neighborhood groups offering a "Home Safety Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "security camera installation [city]" or "fix home security".',
      'Establish referral partnerships with local realtors who can refer your specialized safety services to their clients.',
    ],
    upsell:
      'Offer "Cloud Storage Subscription" or "Smart Floodlight Integration" for maximum home security and peace of mind.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '135',
    title: 'Smart Thermostat Install',
    category: 'Service',
    description:
      'Smart thermostats are a high-impact solution for home energy efficiency and comfort, but the process of installation requires specialized skills in both electrical and HVAC. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate comfort improvement and long-term energy savings.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$35,000 - $75,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Lower Your Energy Bill" and the comfort benefits of a professionally installed smart thermostat.',
      'Post in Nextdoor neighborhood groups offering a "Home Efficiency Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart thermostat installation [city]" or "fix home heating".',
      'Establish referral partnerships with local HVAC companies who can refer your specialized installation services to their clients.',
    ],
    upsell:
      'Offer "HVAC Filter Subscription" or "Smart Vent Installation" for maximum energy efficiency and home comfort.',
    image:
      'https://images.unsplash.com/photo-1567928223614-1843ae529ad0?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '136',
    title: 'Smart Lock Installation',
    category: 'Service',
    description:
      'Smart locks are a high-urgency solution for home safety and convenience, but the process of installation requires specialized skills in both mechanical and electronics. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate safety improvement and long-term peace of mind.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Security" and the convenience benefits of a professionally installed smart lock.',
      'Post in Nextdoor neighborhood groups offering a "Home Safety Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart lock installation [city]" or "fix home security".',
      'Establish referral partnerships with local realtors who can refer your specialized safety services to their clients.',
    ],
    upsell:
      'Offer "Keyless Entry Training" or "Video Doorbell Integration" for a fully secure and convenient entryway.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '137',
    title: 'Smart Lighting Setup',
    category: 'Service',
    description:
      'Smart lighting is a high-impact solution for home automation and ambiance, but the process of setup and integration requires specialized skills in both electrical and networking. You provide a professional setup service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate convenience improvement and long-term system health.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Automation" and the ambiance benefits of a professionally setup smart lighting system.',
      'Post in Nextdoor neighborhood groups offering a "Smart Home Performance Audit" to identify potential setup needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart lighting setup [city]" or "fix home automation".',
      'Establish referral partnerships with local electronics stores who can refer your specialized setup services to their customers.',
    ],
    upsell:
      'Offer "Custom Lighting Scenes" or "Outdoor Smart Lighting Integration" for a fully automated and beautiful home ambiance.',
    image:
      'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '138',
    title: 'Smart Blinds Installation',
    category: 'Service',
    description:
      'Smart blinds are a high-impact solution for home energy efficiency and convenience, but the process of installation requires specialized skills in both precision and application. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate comfort improvement and long-term energy savings.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Energy Efficiency" and the convenience benefits of a professionally installed smart blind system.',
      'Post in Nextdoor neighborhood groups offering a "Window Efficiency Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart blinds installation [city]" or "fix home heat gain".',
      'Establish referral partnerships with local window installers who can refer your specialized installation services to their clients.',
    ],
    upsell:
      'Offer "Solar-Powered Motor Upgrade" or "Smart Home Integration" for a fully automated and energy-efficient window treatment.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '139',
    title: 'Smart Irrigation Setup',
    category: 'Service',
    description:
      'Smart irrigation is a high-impact solution for home energy efficiency and landscape health, but the process of setup and integration requires specialized skills in both plumbing and networking. You provide a professional setup service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate energy savings and long-term landscape health.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$65,000 - $140,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Energy Efficiency" and the landscape health benefits of a professionally setup smart irrigation system.',
      'Post in Nextdoor neighborhood groups offering a "Landscape Efficiency Audit" to identify potential setup needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart irrigation setup [city]" or "fix home water loss".',
      'Establish referral partnerships with local landscapers who can refer your specialized setup services to their clients.',
    ],
    upsell:
      'Offer "Soil Moisture Sensor Installation" or "Landscape Lighting Integration" for a fully automated and healthy outdoor space.',
    image:
      'https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '140',
    title: 'Smart Garage Door Setup',
    category: 'Service',
    description:
      'Smart garage door openers are a high-urgency solution for home safety and convenience, but the process of setup and integration requires specialized skills in both mechanical and networking. You provide a professional setup service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate safety improvement and long-term peace of mind.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Security" and the convenience benefits of a professionally setup smart garage door opener.',
      'Post in Nextdoor neighborhood groups offering a "Home Safety Audit" to identify potential setup needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart garage door setup [city]" or "fix home security".',
      'Establish referral partnerships with local realtors who can refer your specialized safety services to their clients.',
    ],
    upsell:
      'Offer "Garage Security Camera Installation" or "Smart Lighting Integration" for a fully secure and convenient garage setup.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '141',
    title: 'Smart Pool Controller Setup',
    category: 'Service',
    description:
      'Smart pool controllers are a high-impact solution for home automation and convenience, but the process of setup and integration requires specialized skills in both plumbing and networking. You provide a professional setup service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate convenience improvement and long-term system health.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$70,000 - $150,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Automation" and the convenience benefits of a professionally setup smart pool controller.',
      'Post in Nextdoor neighborhood groups offering a "Pool Performance Audit" to identify potential setup needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart pool controller setup [city]" or "fix home automation".',
      'Establish referral partnerships with local pool maintenance companies who can refer your specialized setup services to their clients.',
    ],
    upsell:
      'Offer "Pool Chemistry Monitoring" or "Smart Pool Lighting Integration" for a fully automated and high-performance pool experience.',
    image:
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '142',
    title: 'Smart Water Leak Detector',
    category: 'Service',
    description:
      'Smart water leak detectors are a high-urgency solution for home safety and peace of mind, but the process of installation requires specialized skills in both plumbing and networking. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate safety improvement and long-term peace of mind.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Safety" and the peace of mind that comes with a professionally installed smart water leak detector.',
      'Post in Nextdoor neighborhood groups offering a "Home Safety Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart water leak detector installation [city]" or "fix home security".',
      'Establish referral partnerships with local realtors who can refer your specialized safety services to their clients.',
    ],
    upsell:
      'Offer "Automatic Shut-Off Valve Installation" or "Whole-Home Plumbing Audit" for maximum flood protection and peace of mind.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '143',
    title: 'Smart Smoke & CO Detector',
    category: 'Service',
    description:
      'Smart smoke and CO detectors are a high-urgency solution for home safety and peace of mind, but the process of installation requires specialized skills in both electrical and networking. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate safety improvement and long-term peace of mind.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Safety" and the peace of mind that comes with a professionally installed smart smoke and CO detector.',
      'Post in Nextdoor neighborhood groups offering a "Home Safety Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart smoke detector installation [city]" or "fix home security".',
      'Establish referral partnerships with local realtors who can refer your specialized safety services to their clients.',
    ],
    upsell:
      'Offer "Fire Safety Audit" or "Smart Lighting Integration" for a fully secure and healthy home environment.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '144',
    title: 'Smart Air Quality Monitor',
    category: 'Service',
    description:
      'Smart air quality monitors are a high-impact solution for home health and comfort, but the process of setup and integration requires specialized skills in both electronics and networking. You provide a professional setup service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate air quality improvement and long-term system health.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Indoor Air Quality" and the health benefits of a professionally setup smart air quality monitor.',
      'Post in Nextdoor neighborhood groups offering an "Air Quality Audit" to identify potential setup needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart air quality monitor setup [city]" or "fix home health".',
      'Establish referral partnerships with local electronics stores who can refer your specialized setup services to their customers.',
    ],
    upsell:
      'Offer "Air Purifier Integration" or "HVAC Filter Subscription" for a fully healthy and comfortable indoor space.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '145',
    title: 'Smart Home Audio Setup',
    category: 'Service',
    description:
      'Smart home audio systems are a high-impact solution for home entertainment and ambiance, but the process of setup and integration requires specialized skills in both electronics and networking. You provide a professional setup service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate entertainment improvement and long-term system health.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$80,000 - $170,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Entertainment" and the ambiance benefits of a professionally setup smart home audio system.',
      'Post in Nextdoor neighborhood groups offering a "Smart Home Performance Audit" to identify potential setup needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart home audio setup [city]" or "fix home entertainment".',
      'Establish referral partnerships with local electronics stores who can refer your specialized setup services to their customers.',
    ],
    upsell:
      'Offer "Multi-Room Audio Integration" or "Outdoor Speaker Installation" for a fully immersive and high-performance home entertainment experience.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '146',
    title: 'Smart Home Security Audit',
    category: 'Service',
    description:
      'Smart home security audits are a high-urgency solution for home safety and peace of mind, but the process of auditing and recommending modifications requires specialized skills in both electronics and networking. You provide a comprehensive audit service that identifies risks and recommends modifications like security cameras and smart locks. This is a high-value, high-urgency service that provides immediate safety improvement and long-term peace of mind.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$65,000 - $140,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Security" and the peace of mind that comes with a professionally audited smart home security system.',
      'Post in Nextdoor neighborhood groups offering a "Home Safety Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart home security audit [city]" or "fix home security".',
      'Establish referral partnerships with local realtors who can refer your specialized safety services to their clients.',
    ],
    upsell:
      'Offer "Security Camera Installation" or "Smart Lock Setup" for a fully secure and protected home environment.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '147',
    title: 'Smart Home Remote Access',
    category: 'Service',
    description:
      'Smart home remote access systems are a high-impact solution for home automation and convenience, but the process of setup and integration requires specialized skills in both networking and electronics. You provide a professional setup service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate convenience improvement and long-term system health.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Automation" and the convenience benefits of a professionally setup smart home remote access system.',
      'Post in Nextdoor neighborhood groups offering a "Smart Home Performance Audit" to identify potential setup needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart home remote access setup [city]" or "fix home automation".',
      'Establish referral partnerships with local electronics stores who can refer your specialized setup services to their customers.',
    ],
    upsell:
      'Offer "VPN Setup" or "Smart Home Hub Integration" for a fully secure and convenient remote control experience.',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '148',
    title: 'Smart Home Troubleshooting',
    category: 'Service',
    description:
      'Smart home troubleshooting is a high-urgency solution for home automation and connectivity issues, but the process of troubleshooting and fixing requires specialized skills in both networking and electronics. You provide a professional troubleshooting service that ensures a safe and effective fix for any home. This is a high-demand, high-satisfaction service that provides immediate connectivity improvement and long-term system health.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Connectivity" and the convenience benefits of a professionally fixed smart home system.',
      'Post in Nextdoor neighborhood groups offering a "Smart Home Performance Audit" to identify potential troubleshooting needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart home troubleshooting [city]" or "fix home connectivity".',
      'Establish referral partnerships with local electronics stores who can refer your specialized troubleshooting services to their customers.',
    ],
    upsell:
      'Offer "System Health Audit" or "Network Optimization Service" for a high-performance and reliable smart home system.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '149',
    title: 'Smart Home Consultation',
    category: 'Service',
    description:
      'Smart home consultations are a high-impact solution for home automation and system health, but the process of consulting and recommending modifications requires specialized skills in both networking and electronics. You provide a comprehensive consultation service that identifies risks and recommends modifications like security cameras and smart locks. This is a high-value, high-urgency service that provides immediate safety improvement and long-term peace of mind.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Security" and the peace of mind that comes with a professionally consulted smart home system.',
      'Post in Nextdoor neighborhood groups offering a "Smart Home Performance Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart home consultation [city]" or "fix home security".',
      'Establish referral partnerships with local realtors who can refer your specialized safety services to their clients.',
    ],
    upsell:
      'Offer "System Design & Planning" or "Hardware Procurement Service" for a fully customized and high-performance smart home.',
    image:
      'https://images.unsplash.com/photo-1454165833767-02a698d1316a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '150',
    title: 'Smart Home Installation',
    category: 'Service',
    description:
      'Smart home installations are a high-impact solution for home automation and convenience, but the process of installation and integration requires specialized skills in both electronics and networking. You provide a professional installation service that ensures a safe and effective setup for any home. This is a high-demand, high-satisfaction service that provides immediate convenience improvement and long-term system health.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$95,000 - $200,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Home Automation" and the convenience benefits of a professionally installed smart home system.',
      'Post in Nextdoor neighborhood groups offering a "Smart Home Performance Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart home installation [city]" or "fix home automation".',
      'Establish referral partnerships with local electronics stores who can refer your specialized installation services to their customers.',
    ],
    upsell:
      'Offer "Configuration & Setup" or "User Training Service" for a fully functional and convenient smart home.',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '151',
    title: 'Smart Home Energy Audit',
    category: 'Service',
    description:
      'Smart home energy audits are a high-impact solution for home energy efficiency and savings, but the process of auditing and recommending modifications requires specialized skills in both networking and electronics. You provide a comprehensive audit service that identifies risks and recommends modifications like smart thermostats and energy monitors. This is a high-value, high-urgency service that provides immediate energy savings and long-term system health.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$70,000 - $150,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Lower Your Energy Bill" and the energy-saving benefits of a professionally audited smart home energy system.',
      'Post in Nextdoor neighborhood groups offering a "Home Efficiency Audit" to identify potential installation needs.',
      'Run targeted Google Search ads for high-intent keywords like "smart home energy audit [city]" or "fix home energy loss".',
      'Establish referral partnerships with local HVAC companies who can refer your specialized safety services to their clients.',
    ],
    upsell:
      'Offer "Energy Monitor Installation" or "Smart Thermostat Setup" for maximum energy savings and home performance.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '152',
    title: 'Grease Trap Cleaning',
    category: 'Service',
    description:
      'Grease trap cleaning is a mandatory service for every commercial kitchen to prevent sewer blockages and comply with health codes. You provide a specialized pumping and disposal service that keeps restaurants running smoothly. This is a highly stable, recession-proof business with a built-in recurring customer base, as most municipalities require cleaning every 30 to 90 days.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$100,000 - $250,000/year',
    customerAcquisition: [
      'Canvass local restaurant districts and provide competitive quotes for scheduled maintenance contracts.',
      "Partner with plumbing companies that don't offer pumping services to receive referrals for grease trap maintenance.",
      'Run targeted Facebook ads focusing on restaurant owners and managers emphasizing "Compliance and Peace of Mind".',
      'Offer a "First Cleaning Discount" to win over customers from established, higher-priced competitors.',
    ],
    upsell:
      'Offer "Drain Line Jetting" or "Grease Trap Enzyme Treatment" for a fully clean and efficient kitchen drainage system.',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '153',
    title: 'Medical Waste Disposal',
    category: 'Service',
    description:
      'Medical waste disposal is a highly regulated and essential service for clinics, dental offices, and veterinary practices. You provide secure collection, transport, and disposal of sharps and biohazardous materials. This business offers high margins and long-term contracts, as healthcare providers prioritize reliability and strict adherence to safety protocols over the lowest price.',
    startupCost: { min: 2500, max: 5000 },
    potentialIncome: '$120,000 - $300,000/year',
    customerAcquisition: [
      'Directly mail professional brochures to local medical and dental practices highlighting your compliance certifications.',
      'Attend local healthcare networking events and trade shows to build relationships with practice managers.',
      'Offer a "Compliance Audit" to help offices identify if they are currently meeting all disposal regulations.',
      'Run Google Search ads targeting "biohazard waste disposal" and "sharps container service" in your region.',
    ],
    upsell:
      'Offer "Compliance Training" or "Sharps Container Supply" for a fully secure and compliant medical facility.',
    image:
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '154',
    title: 'Pallet Recycling',
    category: 'Service',
    description:
      'Pallet recycling is a high-volume business that solves a major logistics headache for warehouses and manufacturing plants. You collect used wooden pallets, repair them if necessary, and resell them to businesses needing shipping supplies. This is a "green" business that turns waste into a valuable commodity, with very low overhead once you have a reliable truck and a small storage space.',
    startupCost: { min: 1000, max: 3500 },
    potentialIncome: '$60,000 - $180,000/year',
    customerAcquisition: [
      'Visit local industrial parks and offer free pallet removal to businesses with overflowing loading docks.',
      'List your refurbished pallets on Facebook Marketplace and Craigslist for small businesses and individuals.',
      'Establish relationships with shipping and receiving managers at large distribution centers.',
      'Run simple Google Search ads for "buy used pallets [city]" to attract local shipping companies.',
    ],
    upsell:
      'Offer "Custom Pallet Manufacturing" or "Pallet Repair Service" for a fully optimized and cost-effective shipping solution.',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '155',
    title: 'Estate Sale Organizer',
    category: 'Service',
    description:
      'Estate sale organizers provide a compassionate and efficient solution for families needing to liquidate the contents of a home due to downsizing or the loss of a loved one. You handle everything from inventory and pricing to marketing and conducting the actual sale. This business requires strong organizational skills and a good eye for value, offering high commission-based income with no inventory costs.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$80,000 - $200,000/year',
    customerAcquisition: [
      'Network with probate attorneys and senior move managers who can refer your services to their clients.',
      'Build a large email list of local antique dealers and frequent estate sale shoppers.',
      'Promote your sales on dedicated platforms like EstateSales.net and through local Facebook groups.',
      'Offer a free initial consultation to build trust with families during a potentially difficult time.',
    ],
    upsell:
      'Offer "Clean-Out Service" or "Antique Appraisal" for a fully managed and profitable estate liquidation.',
    image:
      'https://images.unsplash.com/photo-1531685250054-7620ffa51397?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '156',
    title: 'Window Screen Repair & Replacement',
    category: 'Service',
    description:
      'Window screen repair is a "simple" but essential service that most homeowners neglect until they want to open their windows. You provide on-site repair of torn mesh and replacement of bent frames. By offering a mobile service, you save customers the hassle of taking their screens to a hardware store, allowing you to charge a premium for convenience.',
    startupCost: { min: 800, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Distribute door hangers in older neighborhoods where screens are likely to be damaged or weathered.',
      'Run a "Spring Special" on Nextdoor to capture homeowners preparing for warmer weather.',
      'Partner with local window cleaning companies to offer screen repair as an add-on service.',
      'Create a simple website with a clear "Price Per Screen" menu to make it easy for customers to book.',
    ],
    upsell:
      'Offer "Solar Screen Upgrade" or "Pet-Resistant Mesh Installation" for a fully protected and comfortable home environment.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '157',
    title: 'Mobile Tool Sharpening',
    category: 'Service',
    description:
      "Mobile tool sharpening brings a specialized skill directly to the customer's door, serving chefs, landscapers, and hobbyists. You provide precision sharpening for knives, shears, mower blades, and chisels using professional grinding equipment. This is a high-demand service with very little competition, as most people don't know where to take their dull tools.",
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$60,000 - $140,000/year',
    customerAcquisition: [
      'Set up a mobile booth at local Farmers Markets to sharpen knives while customers shop.',
      'Visit local hair salons and dog groomers to offer specialized sharpening for their expensive shears.',
      'Partner with local garden centers to offer "Mower Blade Sharpening Days" for their customers.',
      'Run targeted Instagram ads showing "Before and After" videos of incredibly sharp tools.',
    ],
    upsell:
      'Offer "Tool Cleaning & Maintenance" or "Replacement Blade Sales" for a high-performance and reliable cutting experience.',
    image:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '158',
    title: 'Commercial Hood Cleaning',
    category: 'Service',
    description:
      'Commercial hood cleaning is a mandatory fire safety service for every restaurant and commercial kitchen. You provide deep cleaning of exhaust fans, ducts, and filters to remove grease buildup. This is a highly regulated business with recurring revenue, as health and fire inspectors require professional cleaning every 3 to 6 months.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$150,000 - $400,000/year',
    customerAcquisition: [
      'Directly approach restaurant owners with a "Compliance Guarantee" and competitive contract pricing.',
      'Network with fire inspectors and insurance agents who can recommend your certified services.',
      'Run Google Search ads for "kitchen hood cleaning [city]" to capture leads from new restaurant openings.',
      'Offer a "Night Shift" service to clean kitchens while they are closed, avoiding any business interruption.',
    ],
    upsell:
      'Offer "Fan Belt Replacement" or "Grease Filter Exchange Service" for a fully clean and safe kitchen exhaust system.',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '159',
    title: 'Backflow Testing',
    category: 'Service',
    description:
      'Backflow testing is a specialized plumbing service required by law for commercial buildings and many residential irrigation systems. You provide annual inspections of backflow prevention devices to ensure drinking water remains uncontaminated. This is a high-stability business with a built-in recurring customer base driven by municipal enforcement.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Obtain a list of properties with registered backflow devices from the local water department.',
      'Send timely "Test Due" reminders to property owners 30 days before their annual deadline.',
      'Partner with commercial property managers to handle testing for their entire portfolio of buildings.',
      'Run targeted Google Search ads for "certified backflow tester [city]" to capture urgent leads.',
    ],
    upsell:
      'Offer "Backflow Repair" or "Enclosure Installation" for a fully compliant and protected water system.',
    image:
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '160',
    title: 'Fire Extinguisher Recharging',
    category: 'Service',
    description:
      'Fire extinguisher recharging and inspection is a critical safety service for businesses, apartment complexes, and public buildings. You provide annual inspections, pressure testing, and chemical recharging to ensure equipment is ready for an emergency. This is a low-competition niche with high recurring revenue driven by strict fire code enforcement.',
    startupCost: { min: 2500, max: 5000 },
    potentialIncome: '$90,000 - $220,000/year',
    customerAcquisition: [
      'Directly canvass local businesses and offer to perform their required annual fire safety inspection.',
      'Partner with commercial insurance brokers who can refer your services to help their clients lower premiums.',
      'Run targeted Facebook ads for "Small Business Fire Safety" emphasizing compliance and protection.',
      'Establish contracts with local school districts and government offices for multi-site maintenance.',
    ],
    upsell:
      'Offer "Fire Safety Training" or "Emergency Lighting Inspection" for a fully secure and compliant facility.',
    image:
      'https://images.unsplash.com/photo-1599833719486-6917307168ac?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '161',
    title: 'Septic Tank Inspection',
    category: 'Service',
    description:
      'Septic tank inspection is a vital service for rural property owners and a mandatory part of most real estate transactions in non-sewered areas. You provide professional assessments of tank health, baffle condition, and drain field performance. This is a high-expertise service that commands premium fees, especially during the home buying process.',
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$100,000 - $250,000/year',
    customerAcquisition: [
      'Build strong relationships with local realtors who specialize in rural and suburban properties.',
      'Run targeted Google Search ads for "septic inspection for home sale" to capture high-intent leads.',
      "Partner with septic pumping companies that don't offer formal inspection and reporting services.",
      'Post in local community Facebook groups for rural areas offering "Septic Health Checkups".',
    ],
    upsell:
      'Offer "Septic Pumping" or "Riser Installation" for a fully functional and accessible septic system.',
    image:
      'https://images.unsplash.com/photo-1541625602330-2277a4c4b282?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '162',
    title: 'Mold Remediation (Small Scale)',
    category: 'Service',
    description:
      'Small-scale mold remediation focuses on identifying and safely removing mold from bathrooms, attics, and crawl spaces. You provide a specialized cleaning service that uses professional-grade antimicrobials and containment procedures. This is a high-urgency service that homeowners prioritize to protect their health and property value.',
    startupCost: { min: 2000, max: 5000 },
    potentialIncome: '$120,000 - $300,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads for "mold removal [city]" and "black mold cleaning".',
      'Partner with local plumbers who often discover mold while fixing leaks and can refer your services.',
      'Post in Nextdoor neighborhood groups offering "Free Mold Inspections" to generate leads.',
      'Network with real estate agents who need quick remediation to keep a home sale on track.',
    ],
    upsell:
      'Offer "Air Quality Testing" or "Dehumidifier Installation" for a fully healthy and mold-free home environment.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '163',
    title: 'Well Water Testing',
    category: 'Service',
    description:
      'Well water testing is an essential service for rural homeowners who are responsible for their own water safety. You provide professional collection and lab analysis for bacteria, nitrates, and heavy metals. This is a high-trust business that provides a critical health service to a loyal rural customer base.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$50,000 - $130,000/year',
    customerAcquisition: [
      'Post in local rural community Facebook groups offering "Annual Well Water Safety Checks".',
      'Partner with local realtors who specialize in rural properties and need testing for closings.',
      'Run targeted Google Search ads for "well water testing near me" in rural counties.',
      'Distribute educational flyers at local feed stores and rural hardware shops.',
    ],
    upsell:
      'Offer "Water Filtration System Installation" or "Well Pump Maintenance" for a fully secure and healthy water supply.',
    image:
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '164',
    title: 'Chimney Sweep',
    category: 'Service',
    description:
      'Chimney sweeping is a traditional but essential safety service that prevents dangerous creosote buildup and chimney fires. You provide professional cleaning, inspection, and minor repairs for wood-burning fireplaces and stoves. This is a highly seasonal business with extreme demand in the fall and winter, allowing for premium pricing during peak months.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$70,000 - $160,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads for "chimney sweep [city]" starting in late summer.',
      'Distribute flyers in older neighborhoods with prominent chimneys and wood-burning fireplaces.',
      'Partner with local firewood delivery services to include your business card with every delivery.',
      'Offer an "Early Bird Discount" for customers who book their cleaning in the spring or summer.',
    ],
    upsell:
      'Offer "Chimney Cap Installation" or "Fireplace Inspection" for a fully clean and safe home heating system.',
    image:
      'https://images.unsplash.com/photo-1516663713099-37eb6d40bd2a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '165',
    title: 'Stucco Repair',
    category: 'Service',
    description:
      'Stucco repair is a specialized niche in the home exterior market, focusing on fixing cracks, water damage, and "woodpecker holes" in stucco siding. You provide expert color matching and texture blending to make repairs invisible. This is a high-skill, high-margin service that homeowners often struggle to find reliable contractors for.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Canvass neighborhoods with stucco homes and provide free estimates for visible crack repairs.',
      'Partner with local exterior painters who often find stucco damage that needs fixing before they can paint.',
      'Run targeted Facebook ads showing "Invisible Repairs" to homeowners in stucco-heavy developments.',
      'Use yard signs on every job site to attract interest from neighbors with similar stucco issues.',
    ],
    upsell:
      'Offer "Exterior Painting" or "Elastomeric Coating Application" for a fully protected and beautiful home exterior.',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '166',
    title: 'Drywall Repair Specialist',
    category: 'Service',
    description:
      'Drywall repair specialists focus on the "small jobs" that large construction companies won\'t touch, such as fixing holes from plumbing repairs, doorknob damage, or ceiling leaks. You provide fast, clean, and professional patching and texture matching. This is a high-volume business with very low material costs and high demand from both homeowners and property managers.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Partner with local plumbers and electricians who frequently have to cut into drywall to perform their work.',
      'Run a "Small Hole Special" on Nextdoor to capture homeowners with minor cosmetic damage.',
      'Build relationships with property managers who need quick turnarounds on apartment repairs.',
      'Post "Satisfying Repair" videos on Instagram and TikTok to showcase your texture matching skills.',
    ],
    upsell:
      'Offer "Interior Painting" or "Texture Matching Service" for a fully seamless and beautiful home interior.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '167',
    title: 'Cabinet Refacing',
    category: 'Service',
    description:
      'Cabinet refacing provides a "new kitchen" look at a fraction of the cost of a full remodel. You replace old doors and drawer fronts with new ones and apply matching veneer to the existing cabinet boxes. This is a high-ticket, high-margin service that appeals to budget-conscious homeowners who want a dramatic aesthetic upgrade without the weeks of construction.',
    startupCost: { min: 2000, max: 5000 },
    potentialIncome: '$120,000 - $300,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads showing "Kitchen Transformations in 3 Days" for a fraction of the cost.',
      'Display a "Mini-Kitchen" demo at local home shows to allow customers to see the quality of the refacing.',
      'Partner with local countertop installers to offer a complete kitchen "refresh" package.',
      'Offer a free in-home design consultation with a wide variety of door style and color samples.',
    ],
    upsell:
      'Offer "New Cabinet Hardware Installation" or "Under-Cabinet Lighting Setup" for a fully modern and beautiful kitchen.',
    image:
      'https://images.unsplash.com/photo-1556911223-e1534ff6f95e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '168',
    title: 'Countertop Repair',
    category: 'Service',
    description:
      'Countertop repair focuses on fixing chips, scratches, and seams in granite, marble, quartz, and laminate surfaces. You provide specialized color-matched epoxy repairs that make damage virtually disappear. This is a high-value service that saves homeowners thousands of dollars compared to replacing an entire countertop.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$70,000 - $160,000/year',
    customerAcquisition: [
      'Partner with local countertop fabricators who often receive calls for repairs they are too busy to handle.',
      'Run targeted Google Search ads for "granite chip repair" and "quartz countertop scratch fix".',
      'Build relationships with property managers and apartment complexes with high-end finishes.',
      'Post "Before and After" macro photos of your seamless repairs on Instagram and Facebook.',
    ],
    upsell:
      'Offer "Countertop Sealing" or "Sink Re-Caulking Service" for a fully protected and beautiful kitchen surface.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6199f74709?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '169',
    title: 'Tile & Grout Cleaning/Sealing',
    category: 'Service',
    description:
      'Tile and grout cleaning restores the "like-new" look of floors, showers, and backsplashes by removing deep-seated dirt and stains. You use high-pressure steam and specialized brushes, followed by a professional-grade sealer to prevent future staining. This is a high-impact service that provides immediate visual gratification and is a popular choice for homeowners preparing to sell.',
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Offer a "Free Demo" on a small section of the customer\'s dirtiest grout to prove the effectiveness.',
      'Run targeted Facebook ads focusing on "Bathroom Refresh" and "Deep Cleaned Kitchen Floors".',
      'Partner with local house cleaning services to offer grout cleaning as a specialized add-on.',
      'Post "Satisfying Cleaning" videos on social media to showcase the dramatic results.',
    ],
    upsell:
      'Offer "Grout Color Sealing" or "Caulking Replacement Service" for a fully clean and beautiful tiled surface.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '170',
    title: 'Hardwood Floor Refinishing (Screen & Coat)',
    category: 'Service',
    description:
      'The "Screen and Coat" method is a faster, cleaner alternative to full hardwood sanding and refinishing. You lightly abrade the existing finish and apply a fresh topcoat to restore shine and provide new protection. This is a high-margin service that can be completed in a single day, making it very attractive to busy homeowners and property managers.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$90,000 - $220,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads for "One-Day Floor Refresh" highlighting the speed and lack of dust.',
      "Partner with local realtors who need to quickly improve a home's appearance before listing.",
      'Distribute flyers in neighborhoods with older homes that likely have original hardwood floors.',
      'Offer a "Free Floor Assessment" to determine if a floor is a candidate for a screen and coat.',
    ],
    upsell:
      'Offer "Floor Deep Cleaning" or "Felt Pad Installation Service" for a long-lasting and beautiful hardwood floor.',
    image:
      'https://images.unsplash.com/photo-1581850518616-bcb8186c443e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '171',
    title: 'Carpet Repair & Stretching',
    category: 'Service',
    description:
      "Carpet repair and stretching solves common issues like wrinkles, bumps, pet damage, and permanent stains without the cost of full replacement. You use specialized power stretchers and patching techniques to restore the carpet's appearance and safety. This is a high-demand niche service that many general carpet cleaners don't offer, allowing you to charge premium rates.",
    startupCost: { min: 800, max: 2500 },
    potentialIncome: '$60,000 - $140,000/year',
    customerAcquisition: [
      'Partner with local carpet cleaning companies to receive referrals for repair and stretching jobs.',
      'Run targeted Google Search ads for "carpet stretching [city]" and "fix carpet wrinkles".',
      'Build relationships with property managers who need to extend the life of carpets in rental units.',
      'Post "Before and After" photos of dramatic carpet repairs in local neighborhood Facebook groups.',
    ],
    upsell:
      'Offer "Carpet Cleaning" or "Carpet Protection Treatment" for a fully restored and beautiful carpet.',
    image:
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '172',
    title: 'Blind & Drape Cleaning',
    category: 'Service',
    description:
      "Blind and drape cleaning is a specialized service that handles delicate window treatments that standard house cleaners won't touch. You provide on-site ultrasonic cleaning or professional steaming to remove dust, allergens, and odors. This is a high-value service for homeowners with expensive custom window treatments who want to maintain their investment.",
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$50,000 - $120,000/year',
    customerAcquisition: [
      'Partner with local custom blind and drape showrooms to offer cleaning services to their past clients.',
      'Run targeted Facebook ads focusing on "Allergy-Free Home" and "Professional Window Treatment Care".',
      'Distribute brochures in high-end neighborhoods where custom window treatments are common.',
      'Offer a "Whole House Blind Cleaning Special" on Nextdoor to encourage larger bookings.',
    ],
    upsell:
      'Offer "Blind Repair" or "Drapery Steaming Service" for a fully clean and functional window treatment.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '173',
    title: 'Attic Insulation Blowing',
    category: 'Service',
    description:
      'Attic insulation blowing is a high-impact energy efficiency service that helps homeowners lower their heating and cooling bills. You use a specialized machine to blow loose-fill fiberglass or cellulose insulation into the attic space. This is a high-ticket service that often qualifies for government rebates, making it an easy sell for budget-conscious homeowners.',
    startupCost: { min: 2500, max: 5000 },
    potentialIncome: '$100,000 - $250,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Lower Your Energy Bills" and "Government Rebates Available".',
      'Partner with local HVAC companies who can recommend insulation as a way to improve home comfort.',
      'Offer a "Free Attic Insulation Audit" to show homeowners where they are losing heat.',
      'Use yard signs on every job site to attract interest from neighbors with similar energy concerns.',
    ],
    upsell:
      'Offer "Air Sealing Service" or "Attic Hatch Insulation" for maximum energy efficiency and home comfort.',
    image:
      'https://images.unsplash.com/photo-1503387762-592dee582a7b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '174',
    title: 'Sump Pump Installation/Maintenance',
    category: 'Service',
    description:
      'Sump pump services provide critical flood protection for homes with basements or crawl spaces. You provide professional installation of high-quality pumps and battery backup systems, as well as annual maintenance to ensure reliability. This is a high-urgency service that homeowners prioritize to protect their most valuable asset from water damage.',
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Run targeted Google Search ads during heavy rain seasons for "sump pump repair" and "basement flooding".',
      'Partner with local plumbers and basement waterproofers to handle their overflow installation work.',
      'Offer an "Annual Sump Pump Reliability Test" to homeowners in flood-prone areas.',
      'Distribute flyers emphasizing "Don\'t Wait for a Flood" and the importance of battery backups.',
    ],
    upsell:
      'Offer "Battery Backup System" or "Water Alarm Installation" for maximum flood protection and peace of mind.',
    image:
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '175',
    title: 'French Drain Installation',
    category: 'Service',
    description:
      'French drain installation provides a permanent solution for yard drainage issues and wet basements. You design and install gravel-filled trenches with perforated pipe to redirect water away from the foundation. This is a high-ticket exterior service that appeals to homeowners frustrated with standing water or recurring basement leaks.',
    startupCost: { min: 2000, max: 5000 },
    potentialIncome: '$100,000 - $250,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads showing "Before and After" of soggy yards turned into usable space.',
      "Partner with local landscapers who don't offer specialized drainage engineering and installation.",
      'Offer a "Free Yard Drainage Consultation" to homeowners after heavy rain events.',
      'Use yard signs on every job site to attract interest from neighbors with similar drainage problems.',
    ],
    upsell:
      'Offer "Downspout Extension Integration" or "Sump Pump Connection" for a fully functional and integrated drainage system.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '176',
    title: 'Foundation Crack Repair (Epoxy Injection)',
    category: 'Service',
    description:
      'Foundation crack repair using epoxy or polyurethane injection provides a fast, cost-effective way to seal leaks and restore structural integrity. You provide a specialized service that stops water infiltration without the need for expensive exterior excavation. This is a high-margin niche service that homeowners often need urgently when they discover a wet basement.',
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$90,000 - $220,000/year',
    customerAcquisition: [
      'Partner with home inspectors who often flag foundation cracks as a major concern during home sales.',
      'Run targeted Google Search ads for "fix basement wall crack" and "stop foundation leak".',
      'Build relationships with local realtors who need quick, certified repairs to keep a closing on track.',
      'Offer a "Lifetime Leak-Free Guarantee" to differentiate your service from DIY patching kits.',
    ],
    upsell:
      'Offer "Wall Reinforcement" or "Basement Waterproofing Consultation" for a fully secure and dry foundation.',
    image:
      'https://images.unsplash.com/photo-1503387762-592dee582a7b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '177',
    title: 'Radon Mitigation',
    category: 'Service',
    description:
      'Radon mitigation is a life-saving service that reduces dangerous levels of radon gas in homes. You install specialized ventilation systems that draw radon from beneath the foundation and vent it safely outside. This is a highly regulated, high-ticket service that homeowners often require immediately after a failed home inspection during a real estate transaction.',
    startupCost: { min: 2000, max: 5000 },
    potentialIncome: '$120,000 - $300,000/year',
    customerAcquisition: [
      'Partner with local home inspectors who perform radon testing and need to refer mitigation specialists.',
      'Run targeted Google Search ads for "radon mitigation [city]" and "how to fix high radon".',
      'Build relationships with real estate agents who need quick, reliable mitigation to save their deals.',
      'Offer "Free Radon System Inspections" for homeowners with existing systems to ensure they are working.',
    ],
    upsell:
      'Offer "Radon Fan Replacement" or "Ongoing Monitoring Subscription" for a fully secure and healthy home environment.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '178',
    title: 'Lead Paint Stabilization',
    category: 'Service',
    description:
      'Lead paint stabilization is a critical safety service for owners of older homes. You provide professional scraping, priming, and "encapsulation" of deteriorating lead-based paint to prevent dangerous dust and chips. This is a high-demand service for families with young children and landlords who must comply with strict local lead safety regulations.',
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$90,000 - $220,000/year',
    customerAcquisition: [
      'Partner with local pediatricians who can provide your information to parents of children with elevated lead levels.',
      'Run targeted Facebook ads focusing on "Lead-Safe Home" for families in older zip codes.',
      'Build relationships with property managers who oversee older rental housing stock.',
      'Offer "Free Lead Paint Visual Assessments" to help homeowners identify high-risk areas.',
    ],
    upsell:
      'Offer "Lead Dust Cleaning" or "Lead Safety Consultation" for a fully secure and healthy home environment.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '179',
    title: 'Asbestos Sampling & Management',
    category: 'Service',
    description:
      'Asbestos sampling and management provides peace of mind for homeowners planning renovations in older properties. You provide professional bulk sampling of suspect materials (like floor tiles or pipe wrap) and coordinate with labs for testing. This is a high-value consulting service that helps homeowners navigate complex safety regulations and avoid dangerous exposure.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$70,000 - $160,000/year',
    customerAcquisition: [
      'Partner with local general contractors who need asbestos clearance before starting demolition work.',
      'Run targeted Google Search ads for "asbestos testing [city]" and "is this asbestos?".',
      'Build relationships with real estate agents who deal with older "fixer-upper" properties.',
      'Offer a "Pre-Renovation Safety Consultation" for homeowners planning DIY projects in older homes.',
    ],
    upsell:
      'Offer "Asbestos Removal Coordination" or "Air Quality Testing" for a fully secure and healthy home environment.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '180',
    title: 'Biohazard/Hoarding Cleanup',
    category: 'Service',
    description:
      'Biohazard and hoarding cleanup is a specialized, compassionate service that handles extreme cleaning situations. You provide professional sorting, decluttering, and deep disinfection of properties that have been neglected or contaminated. This is a high-ticket, high-margin service that requires strong emotional intelligence and strict adherence to safety protocols.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$150,000 - $400,000/year',
    customerAcquisition: [
      'Partner with local adult protective services and social workers who manage hoarding cases.',
      'Build relationships with estate attorneys who need to clear out properties for sale.',
      'Run targeted Google Search ads for "hoarding cleanup [city]" and "extreme cleaning services".',
      'Network with local police and fire departments who often encounter properties in need of deep cleaning.',
    ],
    upsell:
      'Offer "Deep Disinfection Service" or "Odor Removal Treatment" for a fully clean and safe living environment.',
    image:
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '181',
    title: 'Crime Scene/Trauma Cleanup',
    category: 'Service',
    description:
      'Crime scene and trauma cleanup is a highly specialized service that provides professional disinfection and restoration after a traumatic event. You handle the removal of biohazardous materials and ensure the property is safe and habitable again. This is a high-ticket service that is often covered by homeowners insurance, allowing for premium pricing.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$200,000 - $500,000/year',
    customerAcquisition: [
      'Partner with local funeral homes and coroners who can provide your information to grieving families.',
      'Build relationships with insurance adjusters who handle trauma-related claims.',
      'Run targeted Google Search ads for "biohazard cleanup [city]" and "trauma restoration".',
      'Network with local property managers and hotel owners who may need these services unexpectedly.',
    ],
    upsell:
      'Offer "Structural Restoration" or "Insurance Claim Assistance" for a fully restored and safe property.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '182',
    title: 'Fire & Smoke Damage Restoration',
    category: 'Service',
    description:
      'Fire and smoke damage restoration focuses on cleaning and deodorizing properties after a fire. You provide professional soot removal, structural cleaning, and specialized ozone or hydroxyl treatments to eliminate smoke odors. This is a high-ticket service that is almost always insurance-funded, making it a very lucrative niche for dedicated restoration professionals.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$150,000 - $400,000/year',
    customerAcquisition: [
      'Partner with local fire departments who can provide your information to homeowners after a fire.',
      'Build relationships with insurance agents and adjusters who manage fire claims.',
      'Run targeted Google Search ads for "smoke odor removal" and "fire damage cleaning".',
      'Network with local property managers who need quick restoration of rental units after kitchen fires.',
    ],
    upsell:
      'Offer "Donation Pickup" or "Estate Clean-Out Service" for a fully managed and stress-free decluttering experience.',
    image:
      'https://images.unsplash.com/photo-1516663713099-37eb6d40bd2a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '183',
    title: 'Water Damage Restoration (Drying Only)',
    category: 'Service',
    description:
      'Water damage restoration focuses on the critical first 24-48 hours after a leak or flood. You provide professional extraction, dehumidification, and air moving to dry out structures before mold can grow. This is a high-urgency, high-margin service that relies on specialized equipment and fast response times.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$150,000 - $350,000/year',
    customerAcquisition: [
      'Partner with local plumbers who are the first on the scene for major leaks.',
      'Run targeted Google Search ads for "emergency water extraction" and "basement drying".',
      'Build relationships with property managers who need 24/7 response for tenant flooding issues.',
      'Offer a "Free Moisture Mapping" service to help homeowners identify hidden water damage.',
    ],
    upsell:
      'Offer "Mold Prevention Treatment" or "Moisture Monitoring Service" for a fully dry and safe property.',
    image:
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '184',
    title: 'Odor Removal Specialist',
    category: 'Service',
    description:
      'Odor removal specialists use advanced technology like ozone generators, hydroxyl machines, and fogging to eliminate stubborn smells from pets, smoke, or cooking. You provide a permanent solution that goes beyond masking odors with perfumes. This is a high-value service for home sellers, landlords, and car owners looking to restore a fresh environment.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$60,000 - $140,000/year',
    customerAcquisition: [
      'Partner with local realtors who have "stinky" listings that aren\'t selling.',
      'Build relationships with property managers who need to deodorize units after long-term tenants.',
      'Run targeted Facebook ads focusing on "Pet Odor Elimination" and "Smoke Smell Removal".',
      'Offer a "Fresh Start" package for new homeowners who want to remove the previous owner\'s scents.',
    ],
    upsell:
      'Offer "Air Duct Cleaning" or "HEPA Air Filtration" for a fully fresh and healthy indoor environment.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '185',
    title: 'Parking Lot Sealcoating',
    category: 'Service',
    description:
      'Parking lot sealcoating protects asphalt from water, oil, and UV damage, significantly extending its lifespan. You apply a professional-grade coal tar or asphalt emulsion sealer to create a deep black, "like-new" finish. This is a high-ticket recurring service that commercial property owners view as a necessary preventative maintenance expense.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$100,000 - $250,000/year',
    customerAcquisition: [
      'Canvass commercial areas and provide quotes to properties with gray, cracked asphalt.',
      'Partner with local property managers who oversee multiple shopping centers or office parks.',
      'Run targeted Facebook ads for "Asphalt Protection" targeting local business owners.',
      'Offer a "Seal and Stripe" bundle to provide a complete parking lot transformation.',
    ],
    upsell:
      'Offer "Parking Lot Striping" or "Asphalt Crack Filling" for a fully restored and professional-looking parking lot.',
    image:
      'https://images.unsplash.com/photo-1541625602330-2277a4c4b282?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '186',
    title: 'Driveway Sealing (Residential)',
    category: 'Service',
    description:
      "Residential driveway sealing is a high-volume, high-margin service that improves a home's curb appeal and protects the asphalt. You provide professional cleaning, crack filling, and sealer application using brushes or sprayers. This is a seasonal business that can be highly profitable by focusing on high-density neighborhoods with many asphalt driveways.",
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$50,000 - $120,000/year',
    customerAcquisition: [
      'Distribute door hangers in neighborhoods with many asphalt driveways in early spring.',
      'Offer a "Neighbor Discount" to encourage multiple bookings on the same street.',
      'Run targeted Facebook ads focusing on "Curb Appeal" and "Protect Your Driveway".',
      'Use yard signs on every job site to attract interest from passing neighbors.',
    ],
    upsell:
      'Offer "Driveway Crack Repair" or "Oil Stain Removal Service" for a fully restored and beautiful home driveway.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6199f74709?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '187',
    title: 'Asphalt Crack Filling',
    category: 'Service',
    description:
      'Asphalt crack filling is a critical maintenance step that prevents water from reaching the base layer and causing potholes. You use specialized hot-pour or cold-pour rubberized fillers to seal cracks in driveways and parking lots. This is a high-margin add-on service that can be sold alongside sealcoating or as a standalone preventative measure.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$60,000 - $140,000/year',
    customerAcquisition: [
      "Partner with local sealcoating companies who don't want to handle the meticulous crack filling work.",
      'Directly approach property owners with visible "alligator cracking" and offer a solution.',
      'Run targeted Google Search ads for "asphalt crack repair [city]" and "stop driveway cracks".',
      'Offer a "Free Driveway Health Assessment" to identify cracks that need immediate attention.',
    ],
    image:
      'https://images.unsplash.com/photo-1541625602330-2277a4c4b282?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '188',
    title: 'Pothole Repair Service',
    category: 'Service',
    description:
      'Pothole repair provides a fast, professional solution for dangerous and unsightly holes in asphalt surfaces. You use specialized "cold patch" or "hot mix" materials and professional tamping equipment to create a durable, level repair. This is a high-urgency service for commercial property owners who want to avoid vehicle damage claims and trip-and-fall liability.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$70,000 - $160,000/year',
    customerAcquisition: [
      'Directly approach businesses with visible potholes in their parking lots and offer an immediate fix.',
      'Partner with local property managers who need quick repairs to maintain tenant satisfaction.',
      'Run targeted Google Search ads for "pothole repair [city]" and "emergency asphalt fix".',
      'Offer a "Parking Lot Safety Inspection" to identify potholes and other trip hazards.',
    ],
    upsell:
      'Offer "Parking Lot Striping" or "Asphalt Crack Filling" for a fully restored and safe parking lot.',
    image:
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '189',
    title: 'Concrete Leveling (Mudjacking/Polyjacking)',
    category: 'Service',
    description:
      'Concrete leveling restores sunken sidewalks, driveways, and pool decks to their original height without the cost of replacement. You inject specialized "slurry" or polyurethane foam beneath the slab to lift it back into place. This is a high-value service that saves homeowners thousands of dollars and eliminates dangerous trip hazards.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$120,000 - $300,000/year',
    customerAcquisition: [
      'Canvass neighborhoods and look for sunken sidewalk slabs or uneven driveways.',
      'Partner with local realtors who need to fix trip hazards before a home can pass inspection.',
      'Run targeted Facebook ads focusing on "Fix Your Sunken Driveway" and "Save 50% Over Replacement".',
      'Use yard signs on every job site to attract interest from neighbors with similar concrete issues.',
    ],
    upsell:
      'Offer "Concrete Sealing" or "Concrete Crack Repair" for a fully restored and protected concrete surface.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '190',
    title: 'Concrete Sealing & Staining',
    category: 'Service',
    description:
      'Concrete sealing and staining protects and beautifies driveways, patios, and garage floors. You provide professional cleaning followed by the application of decorative stains and high-performance protective sealers. This is a high-margin service that appeals to homeowners looking for a premium, custom look for their outdoor living spaces.',
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$80,000 - $190,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads showing "Patio Transformations" and "Custom Garage Floors".',
      'Partner with local hardscape installers who can refer you for the final sealing and staining work.',
      'Display a "Sample Board" at local home shows to allow customers to see the variety of colors and finishes.',
      'Offer a "Free Concrete Design Consultation" to help homeowners choose the right look for their space.',
    ],
    upsell:
      'Offer "Concrete Polishing" or "Decorative Concrete Overlays" for a fully customized and beautiful concrete floor.',
    image:
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '191',
    title: 'Paver Sealing & Sanding',
    category: 'Service',
    description:
      'Paver sealing and sanding protects and stabilizes brick and stone paver patios, walkways, and driveways. You provide professional cleaning, installation of specialized polymeric sand, and application of a high-quality protective sealer. This is a high-margin recurring service that keeps pavers looking new and prevents weed growth and shifting.',
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$70,000 - $160,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Protect Your Paver Investment" and "Stop Weeds in Your Patio".',
      "Partner with local hardscape installers who don't offer ongoing maintenance and sealing services.",
      'Distribute flyers in high-end neighborhoods where paver patios and driveways are common.',
      'Offer a "Free Paver Health Assessment" to identify shifting or sand loss that needs attention.',
    ],
    upsell:
      'Offer "Paver Repair" or "Paver Cleaning Service" for a fully restored and beautiful outdoor surface.',
    image:
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '192',
    title: 'Deck Staining & Restoration',
    category: 'Service',
    description:
      'Deck staining and restoration restores the beauty and protects the wood of outdoor decks and fences. You provide professional cleaning, sanding, and application of high-quality stains and sealers. This is a high-demand seasonal service that homeowners often struggle to do themselves, making them happy to pay for professional results.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$60,000 - $150,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads in early spring focusing on "Get Your Deck Ready for Summer".',
      'Partner with local deck builders who can refer you for the initial staining of new projects.',
      'Offer a "Neighbor Discount" to encourage multiple bookings on the same street.',
      'Use yard signs on every job site to attract interest from neighbors with weathered decks.',
    ],
    upsell:
      'Offer "Deck Board Replacement" or "Deck Power Washing Service" for a fully restored and beautiful outdoor living space.',
    image:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '193',
    title: 'Commercial Kitchen Exhaust Cleaning',
    category: 'Maintenance',
    description:
      'Every commercial kitchen is a ticking time bomb of grease buildup in their exhaust systems. Fire marshals and insurance companies require professional cleaning every 3-6 months to prevent catastrophic fires. You provide a certified, high-pressure steam cleaning service that strips grease down to the bare metal. This is a high-ticket, recurring necessity for restaurants, hotels, and hospitals who cannot afford the risk of a kitchen fire or a failed health inspection.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$120,000 - $250,000/year',
    customerAcquisition: [
      'Directly visit restaurant managers during their slow hours (2 PM - 4 PM) with a "First Clean" discount and a free exhaust inspection.',
      'Partner with local fire inspectors who can refer your certified services to businesses that fail their initial inspections.',
      'Run targeted Google Search ads for "hood cleaning [city]" to capture restaurant owners looking for a reliable provider.',
      'Offer a "Compliance Guarantee" where you handle all the paperwork and scheduling for their required quarterly cleanings.',
    ],
    upsell:
      'Offer "Kitchen Equipment Deep Cleaning" or "Grease Trap Maintenance" for a fully compliant and clean kitchen.',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '194',
    title: 'Parking Lot Striping & Curb Painting',
    category: 'Service',
    description:
      'Faded parking lines are not just an eyesore; they are a liability and a sign of a neglected property. You provide professional restriping for small to medium-sized parking lots, including handicap spaces, fire lanes, and directional arrows. This is a high-margin service with very low material costs, and property managers love the immediate "facelift" it gives their buildings.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Canvass local strip malls and office parks, leaving a professional quote for restriping on the doors of property management offices.',
      'Partner with local asphalt sealcoating companies who often need a reliable subcontractor for the striping phase of their projects.',
      'Run targeted Facebook ads for "Parking Lot Maintenance" focusing on commercial property owners in your area.',
      'Offer a "Safety First" package that includes high-visibility curb painting and updated handicap signage to ensure ADA compliance.',
    ],
    upsell:
      'Offer "Parking Lot Sealcoating" or "Asphalt Crack Filling" for a fully restored and professional-looking parking lot.',
    image:
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '195',
    title: 'Mobile Window Screen Repair',
    category: 'Service',
    description:
      "Torn or missing window screens are a major annoyance for homeowners who want to enjoy fresh air without the bugs. You provide a mobile service that repairs or replaces screens right in the customer's driveway. This is a high-convenience service that homeowners are happy to pay a premium for, especially during the spring and fall when they are most likely to open their windows.",
    startupCost: { min: 800, max: 2500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      "Partner with local hardware stores that don't offer screen repair services and ask to leave your cards at their service desk.",
      'Run targeted Facebook ads in early spring with the headline "Don\'t Let the Bugs In - Mobile Screen Repair at Your Door."',
      'Offer a "Whole House Screen Tune-up" where you inspect and repair every screen in the home for a flat bundled price.',
      'Place yard signs in neighborhoods with older homes where original screens are likely reaching the end of their lifespan.',
    ],
    upsell:
      'Offer "Window Frame Cleaning" or "New Screen Frame Installation" for a fully restored and functional window.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '196',
    title: 'Dryer Vent Cleaning & Lint Removal',
    category: 'Maintenance',
    description:
      "Clogged dryer vents are a leading cause of house fires and significantly increase energy bills. You provide a professional cleaning service that removes dangerous lint buildup from the entire vent line, from the dryer to the exterior wall. This is a high-urgency safety service that is easy to sell once you show the homeowner the amount of lint you've extracted.",
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$45,000 - $95,000/year',
    customerAcquisition: [
      'Partner with local appliance repair technicians who can refer you when they find a dryer that is overheating due to a clog.',
      'Run targeted Facebook ads focusing on "Fire Safety" and the "Hidden Danger in Your Laundry Room."',
      'Offer a "Free Dryer Airflow Test" to homeowners to demonstrate the need for a professional cleaning.',
      'Distribute door hangers in neighborhoods with homes older than 10 years, emphasizing the importance of annual vent maintenance.',
    ],
    upsell:
      'Offer "Dryer Vent Repair" or "Lint Trap Replacement" for a fully safe and efficient laundry system.',
    image:
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '197',
    title: 'Trash Can Sanitizing Service',
    category: 'Service',
    description:
      'Dirty trash cans are a breeding ground for bacteria, odors, and pests like maggots and rodents. You provide a specialized curbside cleaning service using high-pressure hot water and eco-friendly sanitizers. This is a high-volume, route-based business that generates consistent recurring revenue from homeowners who want a cleaner, fresher-smelling garage and driveway.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Follow trash collection trucks on their routes and leave door hangers on the cans you just saw being emptied.',
      'Run targeted Facebook ads in local community groups with a video showing the satisfying "Before and After" of a deep clean.',
      'Offer a "First Clean for $19" special to get homeowners onto a monthly or quarterly recurring subscription plan.',
      'Partner with local HOAs to offer a community-wide "Sanitization Day" at a discounted group rate.',
    ],
    upsell:
      'Offer "Driveway Pressure Washing" or "Garage Floor Cleaning" for a fully clean and fresh-smelling home exterior.',
    image:
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '198',
    title: 'Christmas Tree Removal & Recycling',
    category: 'Seasonal',
    description:
      "After the holidays, millions of homeowners are left with a dry, messy, and heavy Christmas tree that they don't know how to dispose of. You provide a convenient curbside pickup and eco-friendly recycling service. This is a high-intensity, short-duration business that can generate significant cash flow in the first two weeks of January.",
    startupCost: { min: 200, max: 800 },
    potentialIncome: '$5,000 - $15,000 (in 2 weeks)',
    customerAcquisition: [
      'Partner with local Christmas tree lots in December to hand out your removal flyers with every tree sold.',
      'Run targeted Facebook ads starting on December 26th with the headline "We\'ll Take the Mess Away - Easy Tree Removal."',
      'Post in local Nextdoor groups offering a "No-Mess Removal" where you bag the tree inside the house to prevent needle drops.',
      'Offer a "Neighbor Special" where you pick up multiple trees on the same block for a discounted rate.',
    ],
    upsell:
      'Offer "Holiday Light Removal" or "Post-Holiday House Cleaning" for a fully managed and stress-free holiday cleanup.',
    image:
      'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '199',
    title: 'Mailbox Repair & Replacement',
    category: 'Service',
    description:
      "A leaning or broken mailbox is a major detractor from a home's curb appeal and can even lead to missed mail. You provide professional repair of existing posts or full replacement with high-quality, weather-resistant units. This is a simple, high-impact service that homeowners often put off because they don't have the tools or desire to dig post holes and mix concrete.",
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Drive through older neighborhoods and look for leaning or damaged mailboxes, leaving a professional quote on the front door.',
      'Run targeted Facebook ads focusing on "Instant Curb Appeal" and "Professional Mailbox Installation."',
      'Partner with local realtors who want to fix small exterior eyesores before a home goes on the market.',
      'Offer a "Neighborhood Refresh" where you replace 5+ mailboxes on the same street with matching high-end units.',
    ],
    upsell:
      'Offer "House Number Installation" or "Mailbox Post Painting" for a fully updated and beautiful home entrance.',
    image:
      'https://images.unsplash.com/photo-1509475826633-fed577a2c719?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '200',
    title: 'TV Mounting & Wire Concealment',
    category: 'Service',
    description:
      'Modern thin-profile TVs look best when mounted on the wall, but the process of finding studs and hiding wires is a nightmare for most people. You provide professional mounting on any wall surface (including brick and stone) and clean wire concealment behind the wall. This is a high-demand service for homeowners who want a clean, "pro" look for their home theaters and living rooms.',
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      "Partner with local independent electronics stores that don't offer their own installation services.",
      'Run targeted Facebook ads focusing on "The Clean Look - Professional TV Mounting with No Visible Wires."',
      'Post in local community groups offering a "New Home Move-In Special" for mounting multiple TVs.',
      'Optimize your Google Business profile with photos of perfectly level, wire-free installations in high-end homes.',
    ],
    upsell:
      'Offer "Soundbar Mounting" or "Universal Remote Programming" for a fully integrated and easy-to-use home theater.',
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '201',
    title: 'Flat-Pack Furniture Assembly',
    category: 'Service',
    description:
      'Everyone loves the look and price of flat-pack furniture, but almost everyone hates the hours of frustration required to assemble it. You provide a professional, efficient assembly service for everything from IKEA wardrobes to complex office desks. This is a high-convenience service that appeals to busy professionals and seniors who value their time and sanity.',
    startupCost: { min: 300, max: 1000 },
    potentialIncome: '$45,000 - $90,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Skip the Frustration - Professional Furniture Assembly at Your Door."',
      "Partner with local interior designers who need a reliable person to assemble furniture for their clients' new spaces.",
      'Post your services on TaskRabbit and Thumbtack to build a base of reviews and repeat customers.',
      'Offer a "Whole Room Assembly Package" for nurseries or home offices to encourage larger bookings.',
    ],
    upsell:
      'Offer "Furniture Anchoring" or "Old Furniture Disposal Service" for a fully safe and stress-free furniture upgrade.',
    image:
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '202',
    title: 'Garage Door Tune-up & Lubrication',
    category: 'Maintenance',
    description:
      'The garage door is often the largest moving part in a home, yet it is rarely maintained until it breaks. You provide a comprehensive "Tune-up" service that includes lubricating all moving parts, tightening hardware, and adjusting the safety sensors. This is a high-value preventative service that extends the life of the door and opener, preventing expensive emergency repairs.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Is Your Garage Door Noisy? - Professional Tune-up for Peace of Mind."',
      'Distribute door hangers in neighborhoods where homes are 5-15 years old and likely have original openers.',
      'Offer a "Free Garage Door Safety Inspection" to identify worn springs or cables before they snap.',
      'Partner with local realtors who want to ensure the garage door is operating smoothly before an open house.',
    ],
    upsell:
      'Offer "Garage Door Opener Installation" or "Smart Garage Hub Setup" for a fully functional and modern garage door.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '203',
    title: 'Pool Safety Net Installation',
    category: 'Service',
    description:
      'For families with young children, a swimming pool is both a luxury and a constant source of anxiety. You provide professional installation of high-tension pool safety nets that prevent accidental falls while maintaining the view of the water. This is a high-ticket, high-urgency safety service that provides parents with invaluable peace of mind.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$90,000 - $200,000/year',
    customerAcquisition: [
      'Partner with local pool maintenance companies who can refer your safety services to their clients with children.',
      'Run targeted Facebook ads focusing on "Pool Safety for Families" and "The Invisible Barrier That Saves Lives."',
      'Network with local pediatricians and "Mom Groups" to educate parents on the benefits of safety nets over fences.',
      'Offer a "Free Pool Safety Audit" to help homeowners identify potential risks and choose the right protection.',
    ],
    upsell:
      'Offer "Pool Safety Fence Installation" or "Pool Alarm Setup" for maximum pool safety and peace of mind.',
    image:
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '204',
    title: 'Solar Panel Washing',
    category: 'Maintenance',
    description:
      'Dust, pollen, and bird droppings can reduce solar panel efficiency by up to 30%. You provide a specialized cleaning service using deionized water and soft brushes to restore maximum power output without scratching the glass. This is a high-margin recurring service that pays for itself through the energy savings it provides to the homeowner.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$55,000 - $130,000/year',
    customerAcquisition: [
      'Use Google Earth to identify homes with large solar arrays and send them a personalized postcard showing their potential efficiency loss.',
      'Run targeted Facebook ads focusing on "Get the Most from Your Solar" and "Professional Cleaning for Maximum Savings."',
      "Partner with local solar installation companies who don't offer ongoing maintenance and cleaning services.",
      'Offer a "Subscription Cleaning Plan" (e.g., twice a year) to ensure panels are always operating at peak performance.',
    ],
    upsell:
      'Offer "Solar System Health Check" or "Bird Guard Installation" for maximum energy production and system longevity.',
    image:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '205',
    title: 'Artificial Turf Maintenance',
    category: 'Maintenance',
    description:
      'Artificial turf is marketed as "maintenance-free," but it actually requires regular brushing, sanitizing, and infill replenishment to stay looking and smelling great. You provide a professional grooming service that lifts flattened fibers and removes pet odors. This is a high-margin niche service that appeals to homeowners who have invested thousands in their synthetic lawns.',
    startupCost: { min: 1500, max: 3500 },
    potentialIncome: '$60,000 - $140,000/year',
    customerAcquisition: [
      'Partner with local artificial turf installers who can refer your ongoing maintenance services to their clients.',
      'Run targeted Facebook ads focusing on "Keep Your Turf Looking New" and "Professional Pet Odor Removal for Synthetic Grass."',
      'Distribute flyers in high-end neighborhoods where artificial turf is a popular landscaping choice.',
      'Offer a "Spring Refresh" special to get homeowners onto a recurring annual or semi-annual maintenance plan.',
    ],
    upsell:
      'Offer "Turf Sanitization Service" or "Infill Replenishment" for a fully clean and beautiful synthetic lawn.',
    image:
      'https://images.unsplash.com/photo-1558905619-171426efb452?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '206',
    title: 'Estate Sale Preparation',
    category: 'Service',
    description:
      'Managing the contents of a home after a death or major downsize is an overwhelming task for families. You provide a professional preparation service that includes sorting, cleaning, and staging items for an estate sale. This is a high-value, compassionate service that helps families maximize the value of their assets while minimizing their stress during a difficult time.',
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$60,000 - $140,000/year',
    customerAcquisition: [
      'Partner with local estate attorneys and probate specialists who can refer your services to their clients.',
      'Build relationships with local realtors who need a home cleared out and staged before it can be listed.',
      'Run targeted Facebook ads focusing on "Compassionate Estate Management" and "Stress-Free Home Downsizing."',
      'Network with local senior living communities to offer your services to residents who are moving into smaller spaces.',
    ],
    upsell:
      'Offer "Estate Clean-Out Service" or "Professional Staging" for a fully managed and successful estate sale.',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '207',
    title: 'Senior Home Safety Audits',
    category: 'Service',
    description:
      'For seniors who want to "age in place," the home can become a source of danger due to trip hazards and poor accessibility. You provide a comprehensive safety audit followed by the installation of grab bars, improved lighting, and non-slip surfaces. This is a high-value, high-impact service that provides families with peace of mind and helps seniors maintain their independence.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$70,000 - $160,000/year',
    customerAcquisition: [
      'Partner with local occupational therapists and physical therapists who can refer your safety modifications to their patients.',
      'Run targeted Facebook ads focusing on "Keep Your Parents Safe at Home" and "Professional Aging-in-Place Modifications."',
      'Network with local senior centers and churches to provide educational workshops on home safety for seniors.',
      'Offer a "Free Home Safety Assessment" to help families identify the most critical risks in their loved ones\' homes.',
    ],
    upsell:
      'Offer "Grab Bar Installation" or "Smart Home Safety Monitoring" for a fully secure and independent living environment.',
    image:
      'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '208',
    title: 'Baby Proofing Installation',
    category: 'Service',
    description:
      "New parents are often overwhelmed by the hidden dangers in their homes as their children begin to crawl and walk. You provide a professional baby proofing service that includes the installation of safety gates, cabinet locks, and furniture anchors. This is a high-urgency service that parents are happy to outsource to ensure their child's safety and save themselves hours of frustration.",
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Partner with local "New Mom Groups" and pediatricians to offer your safety services to their members and patients.',
      'Run targeted Facebook ads focusing on "Peace of Mind for New Parents" and "Professional Baby Proofing at Your Door."',
      'Display a "Safety Sample Kit" at local baby boutiques and maternity stores to show the quality of your products.',
      'Offer a "Whole House Safety Package" that includes a comprehensive audit and installation of all necessary devices.',
    ],
    upsell:
      'Offer "Baby Safety Gate Installation" or "Furniture Anchoring Service" for a fully secure and child-friendly home.',
    image:
      'https://images.unsplash.com/photo-1520206159162-9f9302fd4986?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '209',
    title: 'Smart Lock & Video Doorbell Setup',
    category: 'Service',
    description:
      'Smart home security devices are incredibly popular, but many homeowners struggle with the technical setup and physical installation. You provide a professional service that installs and configures smart locks, video doorbells, and outdoor cameras. This is a high-demand service that provides immediate security benefits and a "tech-forward" upgrade to any home.',
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Partner with local realtors who want to offer a "Smart Home Upgrade" as a closing gift for their clients.',
      'Run targeted Facebook ads focusing on "Upgrade Your Home Security" and "Professional Smart Device Installation."',
      'Post in local community groups offering a "Security Refresh" special for installing multiple devices.',
      'Optimize your Google Business profile with photos of clean, professional installations of popular smart home brands.',
    ],
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '210',
    title: 'Attic Insulation Topping',
    category: 'Maintenance',
    description:
      'Most older homes have settled or insufficient attic insulation, leading to high energy bills and uncomfortable rooms. You provide a "Topping" service where you blow in additional cellulose or fiberglass insulation to bring the home up to modern R-value standards. This is a high-margin service that pays for itself through energy savings and improved home comfort.',
    startupCost: { min: 2000, max: 4500 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Lower Your Energy Bills" and "Stop Losing Heat Through Your Roof."',
      'Offer a "Free Attic Insulation Inspection" using a simple measuring stick to show homeowners their current levels.',
      'Partner with local HVAC companies who can refer your insulation services when they find a home that is hard to heat or cool.',
      'Distribute door hangers in neighborhoods with homes older than 20 years, highlighting the benefits of an insulation upgrade.',
    ],
    upsell:
      'Offer "Air Sealing Service" or "Attic Hatch Insulation" for maximum energy efficiency and home comfort.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '211',
    title: 'Basement Dehumidification Service',
    category: 'Maintenance',
    description:
      'Many basements suffer from high humidity, leading to musty odors and potential mold growth. You provide a professional dehumidification service that includes the installation of high-capacity, industrial-grade dehumidifiers with automatic drainage. This is a high-value service that protects stored belongings and makes the basement a more comfortable, usable space.',
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$50,000 - $120,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Say Goodbye to Musty Basement Odors" and "Protect Your Belongings from Humidity."',
      'Offer a "Free Basement Humidity Check" to help homeowners understand the moisture levels in their lower levels.',
      'Partner with local HVAC companies who can refer your dehumidification services for homes with damp basements.',
      'Distribute flyers in neighborhoods with older homes that are more likely to have moisture issues in their basements.',
    ],
    upsell:
      'Offer "Basement Waterproofing Consultation" or "Sump Pump Maintenance" for a fully dry and protected basement.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '212',
    title: 'Sump Pump Battery Backup Installation',
    category: 'Service',
    description:
      'A sump pump is useless during a power outage, which is exactly when it\'s needed most during a storm. You provide professional installation of high-quality battery backup systems that ensure the sump pump continues to operate even when the grid goes down. This is a high-urgency "insurance" service that prevents catastrophic basement flooding.',
    startupCost: { min: 500, max: 1500 },
    potentialIncome: '$45,000 - $100,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads during the rainy season focusing on "Don\'t Let a Power Outage Flood Your Basement."',
      'Offer a "Sump Pump Health Check" that includes testing the pump and recommending a backup system.',
      'Partner with local plumbers who can refer your specialized backup installation services to their clients.',
      'Distribute door hangers in flood-prone areas, highlighting the peace of mind that comes with a battery backup.',
    ],
    upsell:
      'Offer "Sump Pump Replacement" or "Water Alarm Installation" for maximum flood protection and peace of mind.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '213',
    title: 'Foundation Crack Repair (Non-Structural)',
    category: 'Maintenance',
    description:
      "Small cracks in foundation walls can allow water and pests to enter the home, even if they aren't structurally threatening. You provide a professional injection service using high-quality epoxy or polyurethane to seal these cracks from the inside. This is a high-margin preventative service that protects the home from water damage and improves energy efficiency.",
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$60,000 - $140,000/year',
    customerAcquisition: [
      'Partner with local home inspectors who can refer your crack repair services when they find minor issues during a sale.',
      'Run targeted Google Search ads for "foundation crack repair [city]" and "basement water leak fix."',
      'Offer a "Free Foundation Inspection" to help homeowners identify and seal cracks before they lead to leaks.',
      'Distribute flyers in neighborhoods with poured concrete foundations, which are most susceptible to these types of cracks.',
    ],
    upsell:
      'Offer "Wall Reinforcement" or "Basement Waterproofing Consultation" for a fully secure and dry foundation.',
    image:
      'https://images.unsplash.com/photo-1590060417673-428bb1b1284d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '214',
    title: 'Concrete Leveling & Polyjacking',
    category: 'Maintenance',
    description:
      'Sunken concrete walkways, driveways, and pool decks are unsightly trip hazards. You provide a professional leveling service using high-density polyurethane foam injection to lift and stabilize the concrete without the need for replacement. This is a high-value, cost-effective alternative to "rip and replace" that can be completed in hours.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$120,000 - $280,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Fix Your Trip Hazards Without Replacing the Concrete" and "Cost-Effective Concrete Lifting."',
      'Offer a "Free Concrete Leveling Estimate" and provide on-the-spot quotes using a simple laser level.',
      'Partner with local property management companies and HOAs who need to maintain safe common areas.',
      'Distribute door hangers in older neighborhoods where settled concrete is a common issue.',
    ],
    upsell:
      'Offer "Concrete Sealing" or "Concrete Crack Repair" for a fully restored and protected concrete surface.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '215',
    title: 'Retaining Wall Repair & Reinforcement',
    category: 'Maintenance',
    description:
      'Retaining walls often fail due to poor drainage or shifting soil, leading to expensive property damage. You provide a professional repair service that includes cleaning out drainage systems, replacing damaged blocks, and installing soil anchors for reinforcement. This is a high-value service that protects landscaping and prevents wall collapse.',
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$80,000 - $180,000/year',
    customerAcquisition: [
      'Partner with local landscapers who can refer your specialized wall repair services when they see signs of failure.',
      'Run targeted Facebook ads focusing on "Is Your Retaining Wall Leaning? - Professional Repair and Reinforcement."',
      'Offer a "Free Retaining Wall Health Check" to identify early signs of failure like bulging or cracking.',
      'Distribute flyers in hilly neighborhoods where retaining walls are a common and critical feature of most properties.',
    ],
    upsell:
      'Offer "Landscape Lighting" or "Drainage System Integration" for a fully functional and beautiful outdoor feature.',
    image:
      'https://images.unsplash.com/photo-1541625602330-2277a4c4b282?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '216',
    title: 'Underground Downspout Extensions',
    category: 'Service',
    description:
      "Downspouts that dump water right at the foundation are a major cause of basement flooding and foundation issues. You provide a professional service that extends downspouts underground to pop-up emitters or dry wells far from the home. This is a high-value, low-cost solution that significantly improves a home's drainage and protection.",
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Protect Your Foundation from Water Damage" and "Professional Underground Downspouts."',
      'Offer a "Free Downspout Drainage Audit" to show homeowners where their water is currently going.',
      'Partner with local gutter cleaning companies who can refer your extension services to their clients.',
      'Distribute door hangers in new construction neighborhoods where builders often leave downspouts short and unfinished.',
    ],
    upsell:
      'Offer "French Drain Installation" or "Sump Pump Connection" for a fully functional and integrated drainage system.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '217',
    title: 'Egress Window Installation',
    category: 'Service',
    description:
      "Adding an egress window to a basement bedroom is a legal requirement for safety and can significantly increase a home's value and usable square footage. You provide a professional installation service that includes excavation, cutting the foundation, and installing the window and well. This is a high-ticket, high-value service that appeals to homeowners finishing their basements.",
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$150,000 - $350,000/year',
    customerAcquisition: [
      'Partner with local basement finishing contractors who need a reliable specialist for egress window installation.',
      'Run targeted Google Search ads for "egress window installation [city]" and "basement bedroom safety window."',
      'Offer a "Free Egress Window Consultation" and provide a detailed estimate for the entire project.',
      'Network with local realtors who can refer your services to clients looking to add value to their homes before selling.',
    ],
    upsell:
      'Offer "Window Well Cover Installation" or "Basement Finishing Consultation" for a fully safe and valuable basement upgrade.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '218',
    title: 'Basement Waterproofing (Interior Drainage)',
    category: 'Maintenance',
    description:
      'Water seeping through basement walls can cause mold, odors, and structural damage. You provide a professional interior waterproofing service that includes installing a perimeter drainage system and a high-quality sump pump. This is a high-ticket, high-urgency service that provides homeowners with a permanently dry basement and peace of mind.',
    startupCost: { min: 3000, max: 5000 },
    potentialIncome: '$180,000 - $400,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads during the rainy season focusing on "Stop Basement Leaks Forever" and "Professional Interior Waterproofing."',
      'Offer a "Free Basement Water Inspection" and provide a detailed plan for a permanent drainage solution.',
      'Partner with local home inspectors who can refer your waterproofing services when they find moisture issues.',
      'Distribute educational flyers in neighborhoods with older homes that are more likely to have basement seepage problems.',
    ],
    upsell:
      'Offer "Sump Pump Battery Backup" or "Basement Dehumidification Service" for a fully dry and protected basement.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '219',
    title: 'Foundation Vent Sealing & Insulation',
    category: 'Maintenance',
    description:
      "Open foundation vents allow humid air and pests into the crawl space, leading to mold and high energy bills. You provide a professional service that seals these vents and installs high-quality insulation on the crawl space walls. This is a high-margin service that improves energy efficiency and protects the home's structural integrity.",
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$55,000 - $130,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Lower Your Energy Bills" and "Stop Mold in Your Crawl Space."',
      'Offer a "Free Crawl Space Energy Audit" and show homeowners how much they are losing through open vents.',
      'Partner with local HVAC companies who can refer your vent sealing services to their clients.',
      'Distribute door hangers in neighborhoods where homes are built on crawl space foundations, highlighting the benefits of sealing vents.',
    ],
    upsell:
      'Offer "Crawl Space Vapor Barrier Installation" or "Crawl Space Dehumidification" for a fully dry and healthy crawl space.',
    image:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '220',
    title: 'Chimney Cap Installation & Repair',
    category: 'Maintenance',
    description:
      'A missing or damaged chimney cap can allow rain, snow, and animals into the flue, leading to expensive water damage and blockages. You provide professional installation of high-quality stainless steel or copper chimney caps. This is a high-value preventative service that protects the chimney and the home from the elements.',
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on "Protect Your Chimney from the Elements" and "Professional Chimney Cap Installation."',
      'Offer a "Free Chimney Safety Inspection" and check for missing or damaged caps.',
      'Partner with local roofing companies who can refer your chimney cap services to their clients.',
      'Distribute flyers in neighborhoods with older homes and multiple chimneys, where caps are more likely to be needed.',
    ],
    upsell:
      'Offer "Chimney Flue Cleaning" or "Chimney Crown Repair" for a fully safe and protected chimney.',
    image:
      'https://images.unsplash.com/photo-1516663713099-37eb6d40bd2a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '221',
    title: 'Fireplace Flue Cleaning & Inspection',
    category: 'Maintenance',
    description:
      'Creosote buildup in a fireplace flue is a major fire hazard. You provide a professional cleaning and inspection service that removes dangerous buildup and ensures the fireplace is safe to use. This is a high-urgency, seasonal service that provides homeowners with peace of mind and a safe way to enjoy their fireplace.',
    startupCost: { min: 1000, max: 3000 },
    potentialIncome: '$60,000 - $140,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads in the fall focusing on "Is Your Fireplace Safe for Winter? - Professional Flue Cleaning."',
      'Offer a "Early Bird Special" for chimney cleaning in the late summer to get homeowners on your schedule.',
      'Partner with local firewood delivery services who can refer your cleaning services to their customers.',
      'Distribute door hangers in neighborhoods with many wood-burning fireplaces, highlighting the importance of annual cleaning.',
    ],
    upsell:
      'Offer "Fireplace Grate Replacement" or "Fireplace Glass Door Installation" for a fully safe and beautiful fireplace.',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '222',
    title: 'Range Hood Vent Installation',
    category: 'Service',
    description:
      "Many range hoods only recirculate air, which doesn't effectively remove grease, smoke, and odors from the kitchen. You provide professional installation of a dedicated vent that exhausts the range hood to the outside. This is a high-value service that improves indoor air quality and keeps the kitchen cleaner.",
    startupCost: { min: 1000, max: 2500 },
    potentialIncome: '$60,000 - $130,000/year',
    customerAcquisition: [
      'Partner with local kitchen remodeling contractors who need a reliable specialist for range hood venting.',
      'Run targeted Facebook ads focusing on "Improve Your Kitchen\'s Air Quality" and "Professional Range Hood Venting."',
      'Offer a "Free Kitchen Ventilation Consultation" and provide a quote for installing a dedicated vent.',
      'Network with local appliance stores who can refer your installation services to customers buying new range hoods.',
    ],
    upsell:
      'Offer "Kitchen Cabinet Deep Cleaning" or "Range Hood Filter Replacement" for a fully clean and fresh-smelling kitchen.',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '223',
    title: 'Bathroom Fan Venting to Outside',
    category: 'Service',
    description:
      'Bathroom fans that vent into the attic can cause major mold and rot issues. You provide a professional service that reroutes these fans to exhaust through the roof or a side wall. This is a high-value maintenance service that protects the home from moisture damage and improves bathroom ventilation.',
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$50,000 - $110,000/year',
    customerAcquisition: [
      'Partner with local home inspectors who can refer your fan venting services when they find fans venting into the attic.',
      'Run targeted Facebook ads focusing on "Stop Mold in Your Attic" and "Professional Bathroom Fan Venting."',
      'Offer a "Free Attic Moisture Inspection" and check where the bathroom fans are currently venting.',
      'Distribute door hangers in neighborhoods with older homes where bathroom fans were often incorrectly vented.',
    ],
    upsell:
      'Offer "Bathroom Fan Replacement" or "Humidity-Sensing Switch Installation" for a fully functional and mold-free bathroom.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '224',
    title: 'Short-Term Rental Cleaning Specialist',
    category: 'Service',
    description:
      'Short-term rentals like Airbnb require a level of cleaning and staging far beyond standard residential maid services. You provide "hotel-ready" turnovers, including laundry, restocking essentials, and damage reporting. By specializing in the high-pressure, tight-window schedule of rental turnovers, you can charge a premium and build a reliable route of recurring clients.',
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$50,000 - $120,000/year',
    customerAcquisition: [
      'Join local Airbnb host Facebook groups and offer a "First Turnover" discount.',
      'Partner with local property management companies who handle short-term rentals.',
      'Optimize your Google Business profile for "Airbnb cleaning [city]" to capture organic search.',
      'Offer a "Restock Service" where you manage the inventory of toiletries and coffee for the host.',
    ],
    upsell:
      'Offer "Linen Rental Service" or "Welcome Basket Preparation" for a fully managed and high-end rental experience.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '225',
    title: 'Residential Room Rental Management',
    category: 'Real Estate',
    description:
      'Turning an extra bedroom into a consistent income stream is one of the lowest-effort ways to build wealth. You provide the platform, the vetting process, and the management of a shared living space. By focusing on high-quality tenants like traveling nurses or graduate students, you minimize risk and maximize the monthly return on your existing mortgage.',
    startupCost: { min: 200, max: 1500 },
    potentialIncome: '$6,000 - $18,000/year (per room)',
    customerAcquisition: [
      'List your space on specialized platforms like Furnished Finder for traveling professionals.',
      'Use Facebook Marketplace with high-quality, staged photos of the room and shared spaces.',
      'Network with local hospitals and universities to become a recommended housing provider.',
      'Offer a "Utilities Included" flat rate to simplify the process for potential tenants.',
    ],
    upsell:
      'Offer "Room Staging Service" or "Tenant Screening Consultation" for a fully managed and successful rental property.',
    image:
      'https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '226',
    title: 'Automated Retail (Vending) Route',
    category: 'Passive Income',
    description:
      'Vending machines are the ultimate "simple" passive income business. You place machines in high-traffic locations like office buildings, gyms, or laundromats and restock them weekly. By focusing on high-margin snacks or specialized items like healthy options or tech accessories, you can build a scalable route with minimal weekly time commitment.',
    startupCost: { min: 2000, max: 5000 },
    potentialIncome: '$30,000 - $80,000/year (for a small route)',
    customerAcquisition: [
      'Cold-call local business owners in industrial parks or office complexes to offer a free machine placement.',
      'Offer a "Commission Share" to the property owner to secure the best high-traffic spots.',
      'Use Google Maps to identify "vending deserts" in your local area and pitch those locations.',
      'Attend local business networking events to find warehouse managers looking to improve employee perks.',
    ],
    upsell:
      'Offer "Machine Maintenance Service" or "Custom Product Sourcing" for a fully managed and profitable vending route.',
    image:
      'https://images.unsplash.com/photo-1585341840941-98553e474d84?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '227',
    title: 'Artisanal Apothecary (Soap & Candles)',
    category: 'Creative',
    description:
      'The market for high-end, natural home fragrances and skincare is booming. You create small-batch, hand-poured candles and soaps using premium ingredients and unique scent profiles. By focusing on aesthetic packaging and "giftable" branding, you can sell through local boutiques, farmers\' markets, and high-margin online stores.',
    startupCost: { min: 500, max: 2500 },
    potentialIncome: '$40,000 - $90,000/year',
    customerAcquisition: [
      "Set up a visually stunning booth at local farmers' markets and holiday craft fairs.",
      'Partner with local gift shops and boutiques to sell your products on consignment.',
      'Use Instagram and TikTok to showcase the "process" of making the products and build a following.',
      'Offer "Custom Wedding Favors" or corporate gift baskets for high-volume, high-margin orders.',
    ],
    upsell:
      'Offer "Subscription Boxes" or "Custom Scent Creation" for a fully personalized and recurring customer experience.',
    image:
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '228',
    title: 'Custom Apparel & Screen Printing',
    category: 'Creative',
    description:
      'Every local business, sports team, and family reunion needs custom apparel. You provide high-quality screen printing or heat-press services for t-shirts, hoodies, and hats. By focusing on fast turnaround times and low minimum orders, you can capture the local market that larger online printers often ignore.',
    startupCost: { min: 1000, max: 4000 },
    potentialIncome: '$50,000 - $130,000/year',
    customerAcquisition: [
      'Reach out to local youth sports leagues and offer a "Team Package" for uniforms and fan gear.',
      'Visit local small businesses and offer a free sample shirt with their logo to pitch staff uniforms.',
      'Run targeted Facebook ads for "Custom T-Shirts [City]" to capture local event planners.',
      'Partner with local schools for spirit wear fundraisers where you share a percentage of the profits.',
    ],
    upsell:
      'Offer "Graphic Design Services" or "Embroidery Upgrades" for a fully professional and high-end apparel line.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '229',
    title: 'Inflatable Party Rentals',
    category: 'Event Service',
    description:
      "Bounce houses are the centerpiece of every children's birthday party. You provide the rental, delivery, setup, and sanitization of high-quality inflatables. This is a high-demand weekend business where a single unit can pay for itself in just a few rentals. By focusing on safety and cleanliness, you build a reputation that leads to constant referrals.",
    startupCost: { min: 2500, max: 5000 },
    potentialIncome: '$40,000 - $110,000/year',
    customerAcquisition: [
      'Place high-visibility yard signs at every party you set up—parents will see the fun and call.',
      'Run targeted Facebook ads for "Birthday Party Rentals" to parents of children aged 3-10.',
      'Partner with local event planners and party venues to be their "Preferred Vendor."',
      'Offer a "Weekday Discount" to capture preschools and daycare centers for special events.',
    ],
    upsell:
      'Offer "Concession Machine Rentals" or "Party Staging Services" for a fully managed and fun-filled event.',
    image:
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '230',
    title: 'Luxury Restroom Trailers',
    category: 'Event Service',
    description:
      'Standard porta potties are a necessity, but "Luxury Restroom Trailers" are a high-ticket service for weddings and upscale outdoor events. You provide clean, climate-controlled, and aesthetically pleasing portable restrooms. This is a high-margin business that services the booming outdoor wedding and corporate event market.',
    startupCost: { min: 4000, max: 10000 },
    potentialIncome: '$80,000 - $250,000/year',
    customerAcquisition: [
      'Network with local wedding planners and outdoor venue owners who need premium sanitation options.',
      'Run targeted Google Search ads for "Luxury Restroom Trailer Rental [City]" to capture high-budget events.',
      'Attend local bridal expos to showcase your trailers and build relationships with engaged couples.',
      'Partner with high-end construction companies who need premium facilities for their executive job sites.',
    ],
    upsell:
      'Offer "Attendant Services" or "Luxury Amenity Kits" for a fully professional and high-end event experience.',
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '231',
    title: 'Licensed In-Home Childcare',
    category: 'Service',
    description:
      'Childcare is a massive, recession-proof industry with a severe shortage of quality providers. By running a licensed daycare from your home, you eliminate commercial rent costs and provide a more personal, "homey" environment for children. This is a high-responsibility but high-reward business with extremely high customer retention.',
    startupCost: { min: 1000, max: 4500 },
    potentialIncome: '$60,000 - $140,000/year',
    customerAcquisition: [
      'List your daycare on local childcare referral networks and state licensing websites.',
      'Use local Facebook "Mom Groups" to share your philosophy and openings with parents.',
      'Place a professional sign in your front yard to capture the attention of local families.',
      'Offer a "Referral Bonus" to current parents who help you fill your open spots.',
    ],
    upsell:
      'Offer "Weekend Care" or "Educational Enrichment Programs" for a fully managed and high-quality childcare service.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '232',
    title: 'Private Vocal Coaching',
    category: 'Education',
    description:
      'Many people dream of improving their voice, from aspiring professionals to hobbyists. You provide one-on-one vocal coaching, focusing on technique, performance, and confidence. This is a high-margin service that can be run from a home studio or even virtually, with very low overhead and high recurring revenue.',
    startupCost: { min: 200, max: 1500 },
    potentialIncome: '$40,000 - $85,000/year',
    customerAcquisition: [
      'Post high-quality videos of your own singing or student progress on Instagram and YouTube.',
      'Partner with local high school drama and music departments to offer supplemental coaching.',
      'Offer a "Free 15-Minute Intro Lesson" to lower the barrier for new students to try your service.',
      'List your services on platforms like Lessonface or Takelessons to capture national virtual students.',
    ],
    upsell:
      'Offer "Recording Sessions" or "Performance Workshops" for a fully professional and high-end vocal training experience.',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '233',
    title: 'Luxury Travel Concierge',
    category: 'Service',
    description:
      "In an era of overwhelming online options, people are returning to travel agents for expert curation and stress-free planning. You specialize in high-end, bespoke itineraries for honeymoons, family reunions, or corporate retreats. By leveraging industry relationships, you provide perks and access that travelers can't find on their own.",
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$50,000 - $150,000/year',
    customerAcquisition: [
      'Specialize in a "Niche" (e.g., African Safaris or Disney Cruises) to become the go-to expert.',
      'Use Instagram to share stunning travel inspiration and "Insider Tips" that showcase your expertise.',
      'Partner with local high-end wedding planners to offer honeymoon planning as a value-add.',
      'Run targeted Facebook ads for "Stress-Free Family Vacations" to busy, high-income parents.',
    ],
    upsell:
      'Offer "Private Tour Bookings" or "Travel Insurance Consultation" for a fully managed and high-end travel experience.',
    image:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '234',
    title: 'Full-Service Wedding & Event Design',
    category: 'Event Service',
    description:
      "A wedding is often the most expensive and stressful event in a person's life. You provide the organization, vendor management, and design expertise to make it seamless. This is a high-ticket service where you can charge a flat fee or a percentage of the total budget, with significant opportunities for upselling and referrals.",
    startupCost: { min: 1000, max: 3500 },
    potentialIncome: '$60,000 - $180,000/year',
    customerAcquisition: [
      'Build a stunning portfolio website and Instagram feed showcasing your unique design aesthetic.',
      'Network with local wedding venues and photographers to build a "Preferred Vendor" circle.',
      'Attend local bridal expos with a professionally designed booth that stands out from the crowd.',
      'Offer a "Day-of Coordination" package as a lower-cost entry point to build your reputation.',
    ],
    upsell:
      'Offer "Day-of Coordination" or "Event Staging Services" for a fully managed and high-end event experience.',
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '235',
    title: 'Mobile Hair & Makeup Artistry',
    category: 'Beauty',
    description:
      'Getting to a salon is a major inconvenience for brides, busy professionals, and seniors. You bring the full salon experience to their home or office. By focusing on high-ticket events like weddings and prom, or recurring services like blowouts and color, you build a loyal client base that values the ultimate convenience.',
    startupCost: { min: 1500, max: 4000 },
    potentialIncome: '$55,000 - $130,000/year',
    customerAcquisition: [
      'Partner with local wedding photographers and planners to be their go-to mobile stylist.',
      'Use Instagram to showcase "Before & After" transformations and build a visual brand.',
      'Offer "Office Blowout Days" where you visit a corporate office and service multiple clients in one day.',
      'Run targeted Facebook ads for "Mobile Hair & Makeup [City]" to capture local event planners.',
    ],
    upsell:
      'Offer "Lash Application" or "Touch-Up Kits" for a fully professional and high-end beauty service.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '236',
    title: 'Mobile Skincare & Facial Specialist',
    category: 'Beauty',
    description:
      "Skincare is a deeply personal and recurring necessity. You provide professional facials, chemical peels, and skincare consultations in the comfort of the client's home. By focusing on high-end products and a relaxing, spa-like experience, you can charge a premium for the convenience and privacy of a mobile service.",
    startupCost: { min: 2000, max: 5000 },
    potentialIncome: '$60,000 - $140,000/year',
    customerAcquisition: [
      'Offer "Skincare Parties" where a host invites friends for mini-facials and product demos.',
      'Partner with local gyms and yoga studios to offer "Post-Workout Glow" facials.',
      'Use Instagram to educate your audience on skincare routines and the benefits of professional treatments.',
      'Run targeted Facebook ads for "Luxury In-Home Facials" to high-income women in your area.',
    ],
    upsell:
      'Offer "Skincare Product Bundles" or "LED Light Therapy Add-ons" for a fully professional and high-end skincare experience.',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '237',
    title: 'Mobile Art & Wine Experience',
    category: 'Event Service',
    description:
      'The "Paint and Sip" trend is a staple for girls\' nights, bachelorette parties, and team-building events. You bring the canvases, paint, and instruction to the client\'s chosen location. This is a high-margin, fun-focused business that requires no permanent studio space and can be run entirely on weekends and evenings.',
    startupCost: { min: 800, max: 2500 },
    potentialIncome: '$35,000 - $80,000/year',
    customerAcquisition: [
      'Partner with local bars and restaurants that have slow nights to host "Public Paint Nights."',
      'Market directly to corporate HR departments as a unique and creative team-building activity.',
      'Use Instagram to showcase the fun, social atmosphere of your events and the finished artwork.',
      'Offer "Bachelorette Packages" that include specialized themes and a free gift for the bride.',
    ],
    upsell:
      'Offer "Custom Canvas Pre-Sketching" or "Premium Wine Selection" for a fully managed and fun-filled event.',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '238',
    title: 'Professional Moving Labor & Logistics Management',
    category: 'Service',
    description:
      "Moving is one of the most stressful life events, and while many people rent their own trucks to save money, they still need the physical labor to safely load and unload their property. You provide a professional labor-only service, specializing in the logistics of the move without the overhead of owning a fleet of vehicles. As a lead contractor, you manage and dispatch skilled teams to handle the heavy lifting, packing, and furniture assembly, ensuring the client's property is handled with care while they maintain control of the transportation.",
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$60,000 - $150,000/year',
    customerAcquisition: [
      'Partner with local truck rental companies (U-Haul, Penske) to be their recommended labor provider.',
      'Run targeted Facebook ads for "Moving Labor Only" to capture DIY movers who need help with heavy items.',
      'Network with local realtors who can refer your services to clients who are downsizing or moving locally.',
      'Offer "Packing-Only" packages to help people prepare for their move weeks in advance.',
    ],
    upsell:
      'Offer "Packing Supplies" or "Furniture Disassembly/Assembly Service" for a fully managed and stress-free move.',
    image:
      'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '239',
    title: 'Professional AirBnB & Short-Term Rental Cleaning',
    category: 'Maintenance',
    description:
      'Short-term rental hosts live and die by their reviews, and cleanliness is the #1 factor. You provide a specialized cleaning service that goes beyond a standard house cleaning, including laundry, restock of essentials, and staging for photos. By offering a "guaranteed turnover" service, you become an indispensable partner for local hosts who need reliability above all else.',
    startupCost: { min: 300, max: 1200 },
    potentialIncome: '$45,000 - $110,000/year',
    customerAcquisition: [
      'Join local AirBnB host groups on Facebook and offer a "First Turnover Free" trial.',
      'Partner with local property management companies that handle multiple short-term rentals.',
      'Create a professional "Turnover Checklist" to show hosts exactly what you cover in every visit.',
      'Run targeted ads for "AirBnB Cleaning [City]" to capture hosts looking for new cleaners.',
    ],
    upsell:
      'Offer "Linen Rental Service" or "Welcome Basket Preparation" for a fully managed and high-end rental experience.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '240',
    title: 'Specialty Vending Machine Route',
    category: 'Specialty',
    description:
      'Traditional vending is crowded, but specialty vending (healthy snacks, tech accessories, or even beauty products) is a growing niche. You identify high-traffic locations like gyms, office buildings, or transit hubs and place machines that cater to that specific audience. Once established, this is a highly scalable business with minimal weekly time commitment per machine.',
    startupCost: { min: 2500, max: 5000 },
    potentialIncome: '$25,000 - $90,000/year',
    customerAcquisition: [
      'Pitch to gym owners to place a "Healthy Fuel" machine with protein bars and electrolytes.',
      'Offer a "Revenue Share" model to building managers to secure prime, high-traffic locations.',
      'Use professional, branded machine wraps to make your vending units stand out and look premium.',
      'Monitor inventory remotely to ensure your best-sellers are always in stock.',
    ],
    upsell:
      'Offer "Machine Maintenance Service" or "Custom Product Sourcing" for a fully managed and profitable vending route.',
    image:
      'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '241',
    title: 'Artisan Soap & Candle Studio',
    category: 'Specialty',
    description:
      "The market for handmade, natural home and body products is booming. You create high-quality, small-batch soaps and candles using premium essential oils and sustainable materials. By focusing on unique scents and beautiful packaging, you can sell at a significant premium through online stores, local boutiques, and farmers' markets.",
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$20,000 - $65,000/year',
    customerAcquisition: [
      'Build a strong visual brand on Instagram and TikTok with "Process Videos" of you making the products.',
      "Sell at local farmers' markets and craft fairs to build a local following and get direct feedback.",
      'Partner with local gift shops and boutiques to carry your line on a wholesale or consignment basis.',
      'Offer "Custom Gift Sets" for weddings, corporate events, and holidays.',
    ],
    upsell:
      'Offer "Subscription Boxes" or "Custom Scent Creation" for a fully personalized and recurring customer experience.',
    image:
      'https://images.unsplash.com/photo-1605264964528-06403738d6dc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '242',
    title: 'Custom Apparel & T-Shirt Printing',
    category: 'Service',
    description:
      'From local sports teams to corporate retreats, everyone needs custom apparel. You provide high-quality screen printing or DTG (Direct to Garment) services with a focus on fast turnaround and low minimum orders. By positioning yourself as the "Local Choice" for custom gear, you can build a recurring client base of schools, small businesses, and event organizers.',
    startupCost: { min: 1500, max: 4500 },
    potentialIncome: '$40,000 - $120,000/year',
    customerAcquisition: [
      'Reach out to local youth sports leagues and offer a "Team Spirit" package for parents and players.',
      'Partner with local gyms and yoga studios to print their branded merchandise.',
      'Use Instagram to showcase your print quality and unique design capabilities.',
      'Offer a "Design-Your-Own" online tool to make the ordering process seamless for clients.',
    ],
    upsell:
      'Offer "Graphic Design Services" or "Embroidery Upgrades" for a fully professional and high-end apparel line.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '243',
    title: 'Bounce House & Party Rental',
    category: 'Seasonal',
    description:
      "Children's birthday parties are a recession-proof industry. You provide bounce houses, water slides, and other inflatable entertainment for weekend events. This is a high-margin business where a single unit can pay for itself in just a few rentals. By focusing on safety, cleanliness, and on-time delivery, you become the go-to provider for local parents.",
    startupCost: { min: 2000, max: 5000 },
    potentialIncome: '$30,000 - $85,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads for "Birthday Party Rentals [City]" to local parents.',
      'Partner with local event planners and venues that host outdoor family gatherings.',
      'Offer "School & Church Packages" for larger community events and festivals.',
      'Use Google My Business to capture local search traffic for "Bounce House Near Me."',
    ],
    upsell:
      'Offer "Concession Machine Rentals" or "Party Staging Services" for a fully managed and fun-filled event.',
    image:
      'https://images.unsplash.com/photo-1572953109213-3be62398eb95?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '244',
    title: 'Luxury Mobile Porta Potty Rental',
    category: 'Specialty',
    description:
      'Outdoor weddings and high-end events require more than a standard plastic toilet. You provide "Luxury Restroom Trailers" that feature climate control, running water, and high-end finishes. This is a premium service that commands high daily rental rates and is in high demand for the wedding and corporate event season.',
    startupCost: { min: 5000, max: 15000 },
    potentialIncome: '$50,000 - $150,000/year',
    customerAcquisition: [
      'Partner with local wedding planners who specialize in outdoor and "tent" weddings.',
      'Market to local wineries and farms that host public events but lack permanent facilities.',
      'Attend local event industry networking events to build relationships with caterers and venues.',
      'Use a professional website with high-quality photos of the trailer interiors to justify the premium price.',
    ],
    upsell:
      'Offer "Attendant Services" or "Luxury Amenity Kits" for a fully professional and high-end event experience.',
    image:
      'https://images.unsplash.com/photo-1595438662899-09510f975c67?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '245',
    title: 'Licensed In-Home Daycare',
    category: 'Service',
    description:
      'Childcare is a critical need for working parents, and many prefer the smaller, more personal environment of an in-home daycare. By becoming licensed and focusing on a high-quality educational curriculum and healthy meals, you can provide a premium service that parents trust and value. This business offers consistent, recurring income with very low marketing costs once full.',
    startupCost: { min: 1000, max: 3500 },
    potentialIncome: '$40,000 - $95,000/year',
    customerAcquisition: [
      'List your business on state licensing websites and local childcare referral networks.',
      'Use local Facebook "Mom Groups" to share your philosophy and open spots.',
      'Host an "Open House" for local families to tour your space and meet you in person.',
      'Offer a "Referral Bonus" to current parents who bring in new families.',
    ],
    upsell:
      'Offer "Weekend Care" or "Educational Enrichment Programs" for a fully managed and high-quality childcare service.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '246',
    title: 'Private Vocal & Singing Instruction',
    category: 'Service',
    description:
      'Music education is a lifelong pursuit for many. You provide one-on-one vocal coaching for students of all ages and skill levels. Whether you focus on classical technique, musical theater, or contemporary pop, your expertise helps students build confidence and skill. This is a high-margin service business that can be run from a home studio or virtually.',
    startupCost: { min: 200, max: 1500 },
    potentialIncome: '$30,000 - $70,000/year',
    customerAcquisition: [
      'Partner with local school music programs and theater groups to be their recommended coach.',
      'Offer a "Free 30-Minute Intro Lesson" to lower the barrier for new students.',
      'Host an annual "Student Showcase" to build community and show off student progress.',
      'Use YouTube and Instagram to share vocal tips and build your authority as a teacher.',
    ],
    upsell:
      'Offer "Recording Sessions" or "Performance Workshops" for a fully professional and high-end vocal training experience.',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '247',
    title: 'Peer-to-Peer Car Rental Fleet',
    category: 'Automotive',
    description:
      'Platforms like Turo allow you to turn your car (or a fleet of cars) into a rental business. By selecting high-demand vehicles and focusing on "Power Host" status through exceptional cleanliness and communication, you can generate significant income with relatively low active time. This is a scalable model where you can add vehicles as your profits grow.',
    startupCost: { min: 2000, max: 10000 },
    potentialIncome: '$15,000 - $60,000/year',
    customerAcquisition: [
      'Optimize your Turo listings with professional photography and detailed descriptions.',
      'Offer "Airport Delivery" to capture high-value travelers who want convenience.',
      'Maintain a 5-star rating through meticulous cleaning and proactive communication.',
      'Use dynamic pricing tools to ensure your rates are competitive for local events and holidays.',
    ],
    upsell:
      'Offer "Airport Delivery" or "Child Safety Seat Rentals" for a fully managed and convenient car-sharing experience.',
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '248',
    title: 'Independent Travel & Vacation Planning',
    category: 'Service',
    description:
      'While online booking is common, many people still value the expertise and time-saving of a professional travel agent, especially for complex international trips or luxury vacations. You provide personalized itineraries, insider knowledge, and concierge-level service. By specializing in a niche (like Disney, Cruises, or European Tours), you become the go-to expert for high-value clients.',
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$35,000 - $100,000/year',
    customerAcquisition: [
      'Partner with local businesses to offer "Corporate Travel" planning for their employees.',
      'Use Instagram and Pinterest to share stunning travel inspiration and your own travel experiences.',
      'Offer "Free Vacation Consultations" to build trust and demonstrate your expertise.',
      'Join a host agency to get access to exclusive deals and professional training.',
    ],
    upsell:
      'Offer "Private Tour Bookings" or "Travel Insurance Consultation" for a fully managed and high-end travel experience.',
    image:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '249',
    title: 'Mobile Makeup Artist',
    category: 'Beauty',
    description:
      "Weddings, proms, and special events are high-stakes occasions where people want to look their absolute best. You provide a professional mobile makeup service that brings the salon experience directly to the client's home or venue. By focusing on high-quality products and a personalized touch, you can build a premium brand that clients trust for their most important moments.",
    startupCost: { min: 500, max: 2000 },
    potentialIncome: '$30,000 - $85,000/year',
    customerAcquisition: [
      'Build a stunning portfolio on Instagram and TikTok showcasing your most dramatic transformations.',
      'Partner with local wedding photographers and venues to be their recommended makeup artist.',
      'Offer "Bridal Trial Packages" to build trust and secure bookings for the big day.',
      'Use local Facebook groups to share your expertise and offer special promotions for local events.',
    ],
    upsell: 'Offer "Lash Application" or "Touch-Up Kits" for an additional fee.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '250',
    title: 'Mobile Nail Technician',
    category: 'Beauty',
    description:
      'Many people value the convenience of a professional manicure and pedicure in the comfort of their own home. You provide a high-quality mobile nail service that focuses on hygiene, precision, and a relaxing experience. This is a high-frequency, high-satisfaction service that is especially popular with busy professionals, seniors, and stay-at-home parents.',
    startupCost: { min: 800, max: 2500 },
    potentialIncome: '$35,000 - $75,000/year',
    customerAcquisition: [
      'Run targeted Facebook ads focusing on busy professionals and families in your local area.',
      'Partner with local senior living communities to offer regular "Nail Care Days" for residents.',
      'Post in Nextdoor neighborhood groups offering a "First-Time Client Special" to build your local following.',
      'Use Instagram to showcase your nail art and the high-quality products you use.',
    ],
    upsell:
      'Offer "Gel Polish Upgrades" or "Paraffin Wax Treatments" for a more luxurious experience.',
    image:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '251',
    title: 'Mobile Hair Stylist',
    category: 'Beauty',
    description:
      'A professional haircut and style can be a major confidence booster, but many people struggle to find the time for a salon visit. You provide a high-quality mobile hair service that brings the salon experience directly to the client. By focusing on precision, style, and a personalized touch, you can build a loyal client base that values convenience and quality.',
    startupCost: { min: 1000, max: 3500 },
    potentialIncome: '$45,000 - $110,000/year',
    customerAcquisition: [
      'Build a strong visual brand on Instagram showcasing your most dramatic hair transformations.',
      'Partner with local wedding planners and venues to be their recommended hair stylist.',
      'Offer "Family Haircut Packages" to capture multiple clients in a single visit.',
      'Use local Facebook groups to share your expertise and offer special promotions for local events.',
    ],
    upsell:
      'Offer "Deep Conditioning Treatments" or "Professional Hair Care Products" for an additional fee.',
    image:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1000',
  },
];
