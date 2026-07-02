/* =========================================================
   MENU
   ========================================================= */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.classList.toggle("active", nav.classList.contains("open"));
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn?.classList.remove("active");
  });
});

/* =========================================================
   KOPÍROVANIE IBAN
   ========================================================= */
document.getElementById("copyIban")?.addEventListener("click", async () => {
  const iban = document.getElementById("iban").textContent.trim();
  try {
    await navigator.clipboard.writeText(iban);
    alert(i18n[currentLang].iban_copied || "IBAN bol skopírovaný.");
  } catch {
    alert("IBAN: " + iban);
  }
});

/* =========================================================
   PREKLADY
   ========================================================= */
const i18n = {
  sk: {
    nav_home: "Domov",
    nav_program: "Program",
    nav_places: "Miesta",
    nav_travel: "Cestovanie",
    nav_tips: "Tipy",
    nav_info: "Info",
    nav_faq: "FAQ",
    nav_rsvp: "Požiadavky",
    nav_game: "Hra",

    hero_date: "19. SEPTEMBER 2026",
    hero_note: "Pripravte sa na víkend plný mora, talianskej atmosféry a spoločných chvíľ, na ktoré budeme dlho spomínať.",

    sec_program: "Program",
    program_time_note: "Okrem obradu sú časy len orientačné. Chceme, aby ste si večer užili pokojne a bez stresu.",
    prog_ceremony: "Svadobný obrad",
    prog_aperitivo: "Aperitivo",
    prog_aperitivo_note: "Malé talianske občerstvenie pri pohári vína pred večerou.",
    prog_photos: "Gratulácie a fotenie",
    prog_dinner: "Večera",
    prog_dance: "Afterparty pre najvytrvalejších",
    prog_cake: "Torta",
    prog_party: "Party",

    sec_places: "Miesta svadby",
    place_ceremony: "Obrad",
    place_party: "Oslava",
    btn_maps: "Otvoriť v Google Maps",

    sec_travel: "Cestovanie a ubytovanie",
    travel_desc: "Tu nájdete všetky praktické informácie o ceste do Rimini a ubytovaní počas svadobného víkendu.",
    travel_how: "Ako sa dostať do Rimini",
    travel_how_desc: "Detaily budú zverejnené neskôr. Peter má najviac informácií.",
    travel_airports: "Letiská v okolí",
    travel_airports_desc: "Najbližšie možnosti: Rimini, Bologna, Ancona alebo Milano.",
    travel_hotels: "Odporúčané ubytovanie",
    travel_hotels_desc: "Hostia zo Slovenska budú ubytovaní v hoteli Hotel Imperiale Rimini & SPA. Viac informácií nájdete cez odkaz nižšie.",
    travel_hotels_btn: "Otvoriť hotel",
    travel_transport: "Doprava po meste",
    travel_transport_desc: "Informácie o MHD, taxíkoch a presunoch medzi obradom a hostinou.",
    travel_parking: "Parkovanie",
    travel_parking_desc: "V Tenuta Mara je k dispozícii parkovanie pre svadobných hostí.",

    rsvp_inline_title: "Špeciálne požiadavky",
    rsvp_inline_lead: "Potvrdenie účasti",
    rsvp_inline_desc: "Prosíme vás o potvrdenie účasti. Zároveň nám, prosím, dajte vedieť, či máte akékoľvek diétne požiadavky alebo alergie.\n\nNapísať nám môžete cez kontakty v sekcii Kontakty.\n\nVopred vám ďakujeme za odpoveď a tešíme sa na oslavu s vami.",
    rsvp_inline_until: "Prosíme o potvrdenie účasti najneskôr do 31. 7. 2026.",
    rsvp_inline_btn: "Napísať nám",

    weather_eyebrow: "Svadobný víkend",
    weather_title: "Počasie v Rimini",
    weather_date_17: "17. 9. · štvrtok",
    weather_date_18: "18. 9. · piatok",
    weather_date_19_main: "19. september",
    weather_date_20: "20. 9. · nedeľa",
    weather_wedding_day: "Svadobný deň",
    weather_wedding_desc: "Slnečno a príjemne teplo",
    weather_daytime: "Cez deň",
    weather_evening: "Večer",
    weather_mood: "Atmosféra",
    weather_mood_value: "letná",
    weather_cloudy: "Polojasno",
    weather_sunny: "Slnečno",
    weather_warm: "Teplý deň",
    weather_note: "Presnú predpoveď doplníme bližšie k svadbe.",

    sec_tips: "Tipy od nás",
    tips_sub: "Tip od nás",
    tips_intro: "Malý výber miest v Rimini, kam môžete zájsť na kávu, večeru alebo krátku prechádzku.",
    tips_filter_cafes: "Kaviarne",
    tips_filter_restaurants: "Reštaurácie",
    tips_filter_places: "Miesta na návštevu",
    tip_visit: "Miesto",
    tip_pascucci_desc: "Príjemná kaviareň pri mori, ideálna na rannú kávu alebo sladké raňajky.",
    tip_dallajole_desc: "Milé miesto pri prístave, kde sa dá zastaviť na kávu alebo niečo malé pod zub.",
    tip_antica_desc: "Kaviareň v historickom centre, vhodná na krátku prestávku počas prechádzky mestom.",
    tip_cavour_desc: "Pokojné miesto na Piazza Cavour, kde si môžete vychutnať kávu priamo v centre Rimini.",
    tip_lella_desc: "Obľúbená reštaurácia pri mori, známa jednoduchou talianskou atmosférou a dobrým jedlom.",
    tip_esse_desc: "Tradičné miesto v centre, kde môžete ochutnať lokálnu kuchyňu z regiónu Romagna.",
    tip_amarina_desc: "Reštaurácia pri prístave, vhodná na večeru s morskou atmosférou.",
    tip_portolotto_desc: "Útulná reštaurácia neďaleko mariny, ideálna na pokojný obed alebo večeru.",
    tip_castel_desc: "Historický hrad v centre Rimini, ktorý patrí medzi najvýraznejšie pamiatky mesta.",
    tip_piazza_cavour_desc: "Pekné historické námestie s palácmi, fontánou a príjemnou atmosférou starého mesta.",
    tip_tre_martiri_desc: "Živé námestie v srdci Rimini, vhodné na prechádzku aj krátke posedenie.",
    tip_arco_desc: "Staroveký rímsky oblúk a jedna z najznámejších historických pamiatok v Rimini.",
    tip_domus_desc: "Archeologické miesto s pozostatkami rímskeho domu a zaujímavou históriou mesta.",
    tip_darsena_desc: "Moderná marina v Rimini, ideálna na večernú prechádzku pri vode.",
    tip_cafe: "Kaviareň",
    tip_restaurant: "Reštaurácia",
    tip_beach: "Pláž",
    tip_view: "Výhľad",
    tip_shopping: "Nákupy",
    btn_map: "Otvoriť mapu",

    sec_wedding_party: "Družba a družičky",
    role_best_man: "Družba",
    role_bridesmaids: "Družičky",

    sec_gift: "Svadobný dar",
    gift_text: "Vaša prítomnosť je pre nás najväčším darom. Ak by ste nás však chceli potešiť svadobným príspevkom, budeme veľmi vďační.",
    btn_copy_iban: "Skopírovať IBAN",
    iban_copied: "IBAN bol skopírovaný.",

    sec_contacts: "Kontakty",
    btn_call: "Zavolať",

    sec_faq: "Užitočné otázky",
    faq_q1: "Kedy máme prísť?",
    faq_a1: "Odporúčame prísť aspoň 20 minút pred obradom.",
    faq_q2: "Je zabezpečená doprava?",
    faq_a2: "Dopravu medzi miestami ešte doplníme.",
    faq_q3: "Môžeme prísť s deťmi?",
    faq_a3: "Informáciu doplníme podľa finálneho plánu.",
    faq_q4: "Aký je dress code?",
    faq_a4: "Elegant / summer wedding.",
    faq_q5: "Bude program v troch jazykoch?",
    faq_a5: "Áno, stránka aj hlavné informácie budú v troch jazykoch.",

    sec_game: "Wedding Quest",
    quest1: "Odfoť sa s niekým z inej krajiny",
    quest2: "Nájdi niekoho, kto pozná nevestu zo školy",
    quest3: "Zatancuj si s niekým novým",
    quest4: "Odfoť taliansky detail",
    quest5: "Napíš odkaz pre novomanželov",
    quest6: "Nájdi družičku alebo družbu",
    quest_cert: "Po splnení všetkých úloh získate digitálny certifikát.",

    footer_text: "Tešíme sa na krásne chvíle s vami v Taliansku!",
    footer_credit: "Vytvorili Peťka a Mirka Kakaščikové",

    faq_eyebrow: "Máte otázky?",
    faq_heading: "Všetko, čo potrebujete vedieť",
    faq2_q1: "Bude zabezpečená doprava?",
    faq2_a1: "Informácie o doprave doplníme čoskoro.",
    faq2_q2: "Bude obrad aj hostina na tom istom mieste?",
    faq2_a2: "Nie — obrad prebehne v kostole Chiesa di San Fortunato, oslava na Tenuta Mara.",
    faq2_q3: "Bude svadba vnútri alebo vonku?",
    faq2_a3: "Obrad prebehne v kostole, oslava je plánovaná vonku v areáli Tenuta Mara.",
    faq2_q4: "Môžeme prísť s deťmi?",
    faq2_a4: "Informáciu doplníme podľa finálneho plánu.",
    faq2_q5: "Je dress code aj na welcome dinner?",
    faq2_a5: "Dress code bude upresnený pre každú udalosť zvlášť.",
    faq2_q6: "Môžem počas obradu fotiť?",
    faq2_a6: "Prosíme, počas obradu nefotografujte a nechajte túto chvíľu na nášho fotografa.",
    faq2_q7: "Máme si požičať auto?",
    faq2_a7: "Odporúčame mať vlastnú dopravu, no detaily doplníme neskôr.",
    faq2_q8: "Bude po oslave zabezpečená doprava?",
    faq2_a8: "Informácie o doprave po oslave doplníme čoskoro.",
    faq2_q9: "Môžeme počas obradu fotiť?",
    faq2_a9: "Áno, môžete si urobiť pár fotiek, no prosíme, aby ste si obrad hlavne užili s nami.",
    faq2_q10: "Čo ak bude pršať?",
    faq2_a10: "Ak by nám počasie neprialo, presunieme sa dovnútra a všetko si užijeme rovnako krásne.",
    faq2_q11: "Bude čas ísť na pláž?",
    faq2_a11: "Áno, určite. Záleží najmä na tom, kedy prídete — pokojne si môžete naplánovať pláž v piatok, v sobotu ráno alebo v nedeľu.",

    game_badge: "MINI HRA",
    game_title: "Chceš vyhrať cenu?",
    game_desc: "Zbaľ kufor, preži cestu na letisko a doraz do Rimini.\nNajlepší cestujúci vyhrajú tanec s novomanželmi.",
    game_card1: "Zbaľ kufor",
    game_card2: "Leť do Rimini",
    game_card3: "Vyhraj tanec",
    game_btn: "Zahrať si hru",
  },

  en: {
    nav_home: "Home",
    nav_program: "Schedule",
    nav_places: "Venues",
    nav_travel: "Travel",
    nav_tips: "Tips",
    nav_info: "Info",
    nav_faq: "FAQ",
    nav_rsvp: "Requests",
    nav_game: "Game",

    hero_date: "19th SEPTEMBER 2026",
    hero_note: "Get ready for a weekend by the sea, full of Italian charm and moments we will remember for a long time.",

    sec_program: "Schedule",
    program_time_note: "Only the ceremony time is fixed. The rest is just a gentle guide, so everyone can enjoy the evening without stress.",
    prog_ceremony: "Wedding Ceremony",
    prog_aperitivo: "Aperitivo",
    prog_aperitivo_note: "",
    prog_photos: "Congratulations & Photos",
    prog_dinner: "Dinner",
    prog_dance: "Afterparty for the bravest",
    prog_cake: "Wedding Cake",
    prog_party: "Party",

    sec_places: "Wedding Venues",
    place_ceremony: "Ceremony",
    place_party: "Reception",
    btn_maps: "Open in Google Maps",

    sec_travel: "Travel & Accommodation",
    travel_desc: "Here you will find all practical information about getting to Rimini and accommodation during the wedding weekend.",
    travel_how: "How to get to Rimini",
    travel_how_desc: "We will add recommended routes by car, train or bus.",
    travel_airports: "Nearby Airports",
    travel_airports_desc: "Closest options: Rimini, Bologna, Ancona or Milan.",
    travel_hotels: "Recommended Accommodation",
    travel_hotels_desc: "There are many hotels available in and around Rimini. For your convenience, a 10% discount code, “ZUZYVALE”, is available for stays at Hotel Imperiale Rimini & SPA when booking minimum 2 nights (18–19 September). The hotel website can be found below.",
    travel_hotels_btn: "Open hotel",
    travel_transport: "Getting Around",
    travel_transport_desc: "Information about public transport, taxis and transfers between venues.",
    travel_parking: "Parking",
    travel_parking_desc: "Parking is available at Tenuta Mara for wedding guests.",

    rsvp_inline_title: "Special requests",
    rsvp_inline_lead: "RSVP",
    rsvp_inline_desc: "Please kindly confirm your participation and let us know about any dietary requirements or allergies.\n\nYou can contact us through the Contacts section.\n\nWe appreciate your response in advance and look forward to celebrating with you.",
    rsvp_inline_until: "Please confirm your attendance by 31 July 2026.",
    rsvp_inline_btn: "Write to us",

    weather_eyebrow: "Wedding weekend",
    weather_title: "Weather in Rimini",
    weather_date_17: "17 Sep · Thursday",
    weather_date_18: "18 Sep · Friday",
    weather_date_19_main: "19 September",
    weather_date_20: "20 Sep · Sunday",
    weather_wedding_day: "Wedding day",
    weather_wedding_desc: "Sunny and pleasantly warm",
    weather_daytime: "Daytime",
    weather_evening: "Evening",
    weather_mood: "Mood",
    weather_mood_value: "summer",
    weather_cloudy: "Partly cloudy",
    weather_sunny: "Sunny",
    weather_warm: "Warm day",
    weather_note: "We will add the exact forecast closer to the wedding.",

    sec_tips: "Our Tips",
    tips_sub: "A tip from us",
    tips_intro: "A small selection of places in Rimini where you can go for coffee, dinner or a short walk.",
    tips_filter_cafes: "Cafés",
    tips_filter_restaurants: "Restaurants",
    tips_filter_places: "Places to visit",
    tip_visit: "Place",
    tip_pascucci_desc: "A pleasant café by the sea, perfect for morning coffee or a sweet breakfast.",
    tip_dallajole_desc: "A lovely spot near the harbour for coffee or a small bite.",
    tip_antica_desc: "A café in the historic centre, ideal for a short break while exploring the city.",
    tip_cavour_desc: "A calm place on Piazza Cavour where you can enjoy coffee in the heart of Rimini.",
    tip_lella_desc: "A popular seaside restaurant with a relaxed Italian atmosphere and good food.",
    tip_esse_desc: "A traditional place in the centre where you can try local Romagna cuisine.",
    tip_amarina_desc: "A restaurant by the harbour, perfect for dinner with a seaside atmosphere.",
    tip_portolotto_desc: "A cosy restaurant near the marina, ideal for a relaxed lunch or dinner.",
    tip_castel_desc: "A historic castle in the centre of Rimini and one of the city’s most distinctive landmarks.",
    tip_piazza_cavour_desc: "A beautiful historic square with palaces, a fountain and the charm of the old town.",
    tip_tre_martiri_desc: "A lively square in the heart of Rimini, nice for a walk or a short stop.",
    tip_arco_desc: "An ancient Roman arch and one of Rimini’s best-known historic monuments.",
    tip_domus_desc: "An archaeological site with remains of a Roman house and an interesting piece of city history.",
    tip_darsena_desc: "Rimini’s modern marina, ideal for an evening walk by the water.",
    tip_cafe: "Café",
    tip_restaurant: "Restaurant",
    tip_beach: "Beach",
    tip_view: "Viewpoint",
    tip_shopping: "Shopping",
    btn_map: "Open Map",

    sec_wedding_party: "Groomsman & Bridesmaids",
    role_best_man: "Groomsman",
    role_bridesmaids: "Bridesmaids",

    sec_gift: "Wedding Gift",
    gift_text: "Your presence is the greatest gift we could ask for. If you would like to contribute, we would be truly grateful.",
    btn_copy_iban: "Copy IBAN",
    iban_copied: "IBAN copied to clipboard.",

    sec_contacts: "Contacts",
    btn_call: "Call",

    sec_faq: "Useful Q&A",
    faq_q1: "When should we arrive?",
    faq_a1: "We recommend arriving at least 20 minutes before the ceremony.",
    faq_q2: "Is transport arranged?",
    faq_a2: "We will add transfer details soon.",
    faq_q3: "Can we bring children?",
    faq_a3: "We will confirm based on the final plan.",
    faq_q4: "What is the dress code?",
    faq_a4: "Elegant / summer wedding.",
    faq_q5: "Will the programme be in three languages?",
    faq_a5: "Yes, the website and key information will be available in three languages.",

    sec_game: "Wedding Quest",
    quest1: "Take a photo with someone from another country",
    quest2: "Find someone who knows the bride from school",
    quest3: "Dance with someone new",
    quest4: "Photograph an Italian detail",
    quest5: "Write a message for the newlyweds",
    quest6: "Find the groomsman or a bridesmaid",
    quest_cert: "Complete all tasks to receive a digital certificate.",

    footer_text: "We look forward to beautiful moments with you in Italy!",
    footer_credit: "Powered by Petra and Mirka Kakascikova´s",

    faq_eyebrow: "Any questions?",
    faq_heading: "Everything you need to know",
    faq2_q1: "Will transport be arranged?",
    faq2_a1: "We will add transport details soon.",
    faq2_q2: "Will the ceremony and reception be at the same venue?",
    faq2_a2: "No — the ceremony will be at Chiesa di San Fortunato, the reception at Tenuta Mara.",
    faq2_q3: "Will the wedding be indoors or outdoors?",
    faq2_a3: "The ceremony will be in the church; the reception is planned outdoors at Tenuta Mara.",
    faq2_q4: "Can we bring children?",
    faq2_a4: "We will confirm based on the final plan.",
    faq2_q5: "Is there a dress code for the welcome dinner too?",
    faq2_a5: "Dress code details will be specified separately for each event.",
    faq2_q6: "Can I take photos during the ceremony?",
    faq2_a6: "Please refrain from photographing during the ceremony and let our photographer capture those moments.",
    faq2_q7: "Should we rent a car?",
    faq2_a7: "We recommend having your own transport, but we will add details later.",
    faq2_q8: "Will there be transport after the reception?",
    faq2_a8: "We will add information about transport after the reception soon.",
    faq2_q9: "Can we take photos during the ceremony?",
    faq2_a9: "Yes, you can take a few photos, but we kindly ask you to enjoy the ceremony with us in the moment.",
    faq2_q10: "What happens if it rains?",
    faq2_a10: "If the weather is not on our side, we will move indoors and enjoy everything just as beautifully.",
    faq2_q11: "Will there be time to go to the beach?",
    faq2_a11: "Yes, definitely. It depends on when you arrive — Friday, Saturday morning or Sunday can all be lovely beach moments.",

    game_badge: "MINI GAME",
    game_title: "Want to win a prize?",
    game_desc: "Pack your bag, survive the trip to the airport and make it to Rimini.\nThe best travellers will win a dance with the newlyweds.",
    game_card1: "Pack your bag",
    game_card2: "Fly to Rimini",
    game_card3: "Win a dance",
    game_btn: "Play the game",
  },

  it: {
    nav_home: "Inizio",
    nav_program: "Programma",
    nav_places: "Luoghi",
    nav_travel: "Viaggio",
    nav_tips: "Consigli",
    nav_info: "Info",
    nav_faq: "Domande",
    nav_rsvp: "Richieste",
    nav_game: "Gioco",

    hero_date: "19 SETTEMBRE 2026",
    hero_note: "Preparatevi a un weekend sul mare, tra atmosfera italiana e momenti da ricordare insieme.",

    sec_program: "Programma",
    program_time_note: "Solo l’orario della cerimonia è fisso. Gli altri momenti sono indicativi, per vivere la serata con calma e senza stress.",
    prog_ceremony: "Cerimonia nuziale",
    prog_aperitivo: "Aperitivo",
    prog_aperitivo_note: "",
    prog_photos: "Congratulazioni e foto",
    prog_dinner: "Cena",
    prog_dance: "Afterparty per i piú coraggiosi",
    prog_cake: "Torta nuziale",
    prog_party: "Festa",

    sec_places: "Luoghi del matrimonio",
    place_ceremony: "Cerimonia",
    place_party: "Ricevimento",
    btn_maps: "Apri in Google Maps",

    sec_travel: "Viaggio e alloggio",
    travel_desc: "Qui troverete tutte le informazioni pratiche per raggiungere Rimini e per l'alloggio durante il weekend del matrimonio.",
    travel_how: "Come arrivare a Rimini",
    travel_how_desc: "Aggiungeremo i percorsi consigliati in auto, treno o autobus.",
    travel_airports: "Aeroporti vicini",
    travel_airports_desc: "Le opzioni più vicine: Rimini, Bologna, Ancona o Milano.",
    travel_hotels: "Alloggi consigliati",
    travel_hotels_desc: "Sono disponibili numerose strutture alberghiere a Rimini e nei dintorni. Per vostra comodità, è disponibile il codice sconto “ZUZYVALE”, che offre il 10% di sconto presso Hotel Imperiale Rimini & SPA per soggiorni di almeno 2 notti. Di seguito trovate il sito dell’hotel.",
    travel_hotels_btn: "Apri hotel",
    travel_transport: "Trasporti locali",
    travel_transport_desc: "Informazioni su autobus, taxi e trasferimenti tra i luoghi.",
    travel_parking: "Parcheggio",
    travel_parking_desc: "È disponibile parcheggio presso Tenuta Mara per gli ospiti del matrimonio.",

    rsvp_inline_title: "Richieste speciali",
    rsvp_inline_lead: "Conferma presenza",
    rsvp_inline_desc: "Vi chiediamo gentilmente di confermare la vostra presenza e di comunicarci eventuali esigenze o allergie alimentari.\n\nPotete contattarci tramite la sezione Contatti.\n\nNon vediamo l’ora di festeggiare con voi.",
    rsvp_inline_until: "Vi chiediamo di confermare la vostra presenza entro il 31 luglio 2026.",
    rsvp_inline_btn: "Scriveteci",

    weather_eyebrow: "Weekend di nozze",
    weather_title: "Meteo a Rimini",
    weather_date_17: "17 set · giovedì",
    weather_date_18: "18 set · venerdì",
    weather_date_19_main: "19 settembre",
    weather_date_20: "20 set · domenica",
    weather_wedding_day: "Giorno del matrimonio",
    weather_wedding_desc: "Soleggiato e piacevolmente caldo",
    weather_daytime: "Di giorno",
    weather_evening: "Sera",
    weather_mood: "Atmosfera",
    weather_mood_value: "estiva",
    weather_cloudy: "Poco nuvoloso",
    weather_sunny: "Soleggiato",
    weather_warm: "Giornata calda",
    weather_note: "Aggiungeremo la previsione precisa più vicino al matrimonio.",

    sec_tips: "I nostri consigli",
    tips_sub: "Un consiglio da noi",
    tips_intro: "Una piccola selezione di luoghi a Rimini dove andare per un caffè, una cena o una breve passeggiata.",
    tips_filter_cafes: "Caffè",
    tips_filter_restaurants: "Ristoranti",
    tips_filter_places: "Luoghi da visitare",
    tip_visit: "Luogo",
    tip_pascucci_desc: "Un caffè piacevole vicino al mare, perfetto per una colazione o un caffè al mattino.",
    tip_dallajole_desc: "Un posto carino vicino al porto per un caffè o qualcosa di semplice da mangiare.",
    tip_antica_desc: "Una caffetteria nel centro storico, ideale per una breve pausa durante la passeggiata in città.",
    tip_cavour_desc: "Un luogo tranquillo in Piazza Cavour dove gustare un caffè nel cuore di Rimini.",
    tip_lella_desc: "Un ristorante sul mare molto amato, con atmosfera italiana semplice e buon cibo.",
    tip_esse_desc: "Un locale tradizionale in centro dove assaggiare la cucina romagnola.",
    tip_amarina_desc: "Un ristorante vicino al porto, adatto per una cena con atmosfera di mare.",
    tip_portolotto_desc: "Un ristorante accogliente vicino alla marina, ideale per un pranzo o una cena tranquilla.",
    tip_castel_desc: "Un castello storico nel centro di Rimini e uno dei luoghi più riconoscibili della città.",
    tip_piazza_cavour_desc: "Una bella piazza storica con palazzi, fontana e atmosfera del centro antico.",
    tip_tre_martiri_desc: "Una piazza vivace nel cuore di Rimini, perfetta per una passeggiata o una breve sosta.",
    tip_arco_desc: "Un antico arco romano e uno dei monumenti storici più conosciuti di Rimini.",
    tip_domus_desc: "Un sito archeologico con resti di una casa romana e una parte interessante della storia della città.",
    tip_darsena_desc: "La marina moderna di Rimini, ideale per una passeggiata serale vicino all’acqua.",
    tip_cafe: "Caffetteria",
    tip_restaurant: "Ristorante",
    tip_beach: "Spiaggia",
    tip_view: "Panorama",
    tip_shopping: "Shopping",
    btn_map: "Apri mappa",

    sec_wedding_party: "Testimone e damigelle",
    role_best_man: "Testimone",
    role_bridesmaids: "Damigelle",

    sec_gift: "Regalo di nozze",
    gift_text: "La vostra presenza è il regalo più grande che potessimo desiderare. Se volete contribuire, ve ne saremo molto grati.",
    btn_copy_iban: "Copia IBAN",
    iban_copied: "IBAN copiato negli appunti.",

    sec_contacts: "Contatti",
    btn_call: "Chiama",

    sec_faq: "Domande utili",
    faq_q1: "Quando dobbiamo arrivare?",
    faq_a1: "Vi consigliamo di arrivare almeno 20 minuti prima della cerimonia.",
    faq_q2: "È organizzato il trasporto?",
    faq_a2: "Aggiungeremo i dettagli sui trasferimenti a breve.",
    faq_q3: "Possiamo portare bambini?",
    faq_a3: "Confermeremo in base al piano finale.",
    faq_q4: "Qual è il dress code?",
    faq_a4: "Elegante / matrimonio estivo.",
    faq_q5: "Il programma sarà in tre lingue?",
    faq_a5: "Sì, il sito e le informazioni principali saranno disponibili in tre lingue.",

    sec_game: "Wedding Quest",
    quest1: "Fatti una foto con qualcuno di un altro paese",
    quest2: "Trova qualcuno che conosce la sposa dai tempi della scuola",
    quest3: "Balla con qualcuno di nuovo",
    quest4: "Fotografa un dettaglio italiano",
    quest5: "Scrivi un messaggio per gli sposi",
    quest6: "Trova il testimone o una damigella",
    quest_cert: "Completa tutti i compiti per ricevere un certificato digitale.",

    footer_text: "Non vediamo l'ora di condividere momenti meravigliosi con voi in Italia!",
    footer_credit: "Realizzato da Petra e Mirka Kakascikova",

    faq_eyebrow: "Avete domande?",
    faq_heading: "Tutto quello che dovete sapere",
    faq2_q1: "Sarà organizzato il trasporto?",
    faq2_a1: "Aggiungeremo i dettagli sui trasporti a breve.",
    faq2_q2: "La cerimonia e il ricevimento si terranno nello stesso posto?",
    faq2_a2: "No — la cerimonia si terrà nella chiesa di San Fortunato, il ricevimento a Tenuta Mara.",
    faq2_q3: "Il matrimonio sarà in interni o all'aperto?",
    faq2_a3: "La cerimonia si terrà in chiesa; il ricevimento è previsto all'aperto nella tenuta Tenuta Mara.",
    faq2_q4: "Possiamo portare bambini?",
    faq2_a4: "Confermeremo in base al piano finale.",
    faq2_q5: "C'è un dress code anche per la welcome dinner?",
    faq2_a5: "Il dress code sarà specificato separatamente per ogni evento.",
    faq2_q6: "Posso fotografare durante la cerimonia?",
    faq2_a6: "Vi chiediamo di non fotografare durante la cerimonia e di lasciare questi momenti al nostro fotografo.",
    faq2_q7: "Dobbiamo noleggiare un'auto?",
    faq2_a7: "Consigliamo di avere un mezzo proprio, ma aggiungeremo i dettagli in seguito.",
    faq2_q8: "Ci sarà un servizio di trasporto dopo il ricevimento?",
    faq2_a8: "Aggiungeremo le informazioni sul trasporto post-ricevimento a breve.",
    faq2_q9: "Possiamo fare foto durante la cerimonia?",
    faq2_a9: "Sì, potete scattare qualche foto, ma vi chiediamo di vivere soprattutto questo momento insieme a noi.",
    faq2_q10: "Cosa succede se piove?",
    faq2_a10: "Se il tempo non sarà dalla nostra parte, ci sposteremo all’interno e ci godremo tutto con la stessa gioia.",
    faq2_q11: "Ci sarà tempo per andare in spiaggia?",
    faq2_a11: "Sì, certamente. Dipende soprattutto da quando arrivate — venerdì, sabato mattina o domenica possono essere momenti perfetti per il mare.",

    game_badge: "MINI GIOCO",
    game_title: "Vuoi vincere un premio?",
    game_desc: "Fai la valigia, sopravvivi al viaggio verso l'aeroporto e arriva a Rimini.\nI migliori viaggiatori vinceranno un ballo con gli sposi.",
    game_card1: "Fai la valigia",
    game_card2: "Vola a Rimini",
    game_card3: "Vinci un ballo",
    game_btn: "Gioca",
  }
};

let currentLang = "sk";

const RSVP_LINKS = {
  sk: "mailto:?subject=Svadba%20-%20%C5%A1peci%C3%A1lne%20po%C5%BEiadavky",
  en: "mailto:?subject=Wedding%20-%20special%20requests",
  it: "mailto:?subject=Matrimonio%20-%20richieste%20speciali"
};

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.documentElement.setAttribute("translate", "no");
  document.documentElement.classList.add("notranslate");

  const dict = i18n[lang];
  if (!dict) return;

  const rsvpBtn = document.getElementById("rsvpBtn");
  if (rsvpBtn && RSVP_LINKS[lang]) {
    rsvpBtn.href = RSVP_LINKS[lang];
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // Zvýraznenie aktívneho jazyka
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  // Texts that are written directly in HTML for each language
  document.querySelectorAll(".dresscode-desc, .dresscode-note, .bank-detail-row [lang]").forEach((el) => {
    el.style.display = el.getAttribute("lang") === lang ? "" : "none";
  });

  document.querySelectorAll("[data-lang-only]").forEach((el) => {
    el.style.display = el.getAttribute("data-lang-only") === lang ? "" : "none";
  });
}

// Kliknutie na tlačidlá jazyka (desktopové aj mobilné)
document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLang(btn.getAttribute("data-lang"));
  });
});

// Nastaviť slovenčinu ako predvolenú
applyLang("sk");

// Prepínanie kategórií v sekcii Tipy od nás
function preloadTipImages(category) {
  const selector = category
    ? `[data-tip-category="${category}"] img[src]`
    : "[data-tip-category] img[src]";

  document.querySelectorAll(selector).forEach((img) => {
    const src = img.getAttribute("src");
    if (!src || img.dataset.preloaded === "true") return;

    const preload = new Image();
    preload.decoding = "async";
    preload.src = src;
    img.dataset.preloaded = "true";
  });
}

function setupTipsFilters() {
  const filterButtons = document.querySelectorAll(".tips-filter-btn");
  const tipCards = document.querySelectorAll("[data-tip-category]");

  if (!filterButtons.length || !tipCards.length) return;

  function showCategory(category) {
    preloadTipImages(category);

    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tip-filter") === category);
    });

    tipCards.forEach((card) => {
      const isVisible = card.getAttribute("data-tip-category") === category;
      card.hidden = !isVisible;
    });
  }

  filterButtons.forEach((btn) => {
    const category = btn.getAttribute("data-tip-filter");

    btn.addEventListener("mouseenter", () => preloadTipImages(category));
    btn.addEventListener("focus", () => preloadTipImages(category));

    btn.addEventListener("click", () => {
      showCategory(category);
    });
  });

  const activeButton = document.querySelector(".tips-filter-btn.active") || filterButtons[0];
  showCategory(activeButton.getAttribute("data-tip-filter"));

  // Skryté kategórie majú lazy obrázky, preto ich po načítaní stránky pripravíme do cache.
  const preloadAllTips = () => preloadTipImages();
  if ("requestIdleCallback" in window) {
    requestIdleCallback(preloadAllTips, { timeout: 2000 });
  } else {
    window.addEventListener("load", () => setTimeout(preloadAllTips, 800), { once: true });
  }
}

setupTipsFilters();

