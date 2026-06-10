document.addEventListener("DOMContentLoaded", () => {
    const SCENES = {
        countries: {
            sk: "images/country-sk.png",
            lu: "images/country-lu.png",
            it: "images/country-it.png"
        },
        room: "images/room.png",
        zapcha: "images/zapcha.png",
        airports: {
            sk: "images/airport-sk.png",
            lu: "images/airport-lu.png",
            it: "images/airport-it.png"
        },
        airportInside: "images/airport-inside.png",
        checkin: "images/checkin.png",
        airplaneInside: "images/airplane-inside.png",
        airplaneStart: "images/airplane-start.png",
        airplaneFly: "images/airplane-fly.png",
        airplaneFinish: "images/airplane-finish.png",
        bus: "images/bus.png",
        busFinish: "images/bus-finish.png",
        couple: "images/couple.png"
    };

    const imageCache = new Map();

    function collectSceneImages() {
        const paths = [];

        function walk(value) {
            if (!value) return;
            if (typeof value === "string") {
                paths.push(value);
                return;
            }
            if (typeof value === "object") {
                Object.values(value).forEach(walk);
            }
        }

        walk(SCENES);
        return [...new Set(paths)];
    }

    function preloadImage(src) {
        if (!src || imageCache.has(src)) return imageCache.get(src);

        const img = new Image();
        img.decoding = "async";
        const promise = new Promise((resolve) => {
            img.onload = () => resolve({ ok: true, src });
            img.onerror = () => resolve({ ok: false, src });
        });

        imageCache.set(src, promise);
        img.src = src;
        return promise;
    }

    function preloadGameImages() {
        collectSceneImages().forEach(preloadImage);
    };

    const introScreen = document.getElementById("introScreen");
    const storyScreen = document.getElementById("storyScreen");
    const packingScreen = document.getElementById("packingScreen");
    const roadScreen = document.getElementById("roadScreen");
    const securityScreen = document.getElementById("securityScreen");
    const italianWordsScreen = document.getElementById("italianWordsScreen");
    const finalScreen = document.getElementById("finalScreen");

    const beginJourneyBtn = document.getElementById("beginJourneyBtn");
    const finishPackingBtn = document.getElementById("finishPackingBtn");
    const resetSuitcaseBtn = document.getElementById("resetSuitcaseBtn") || document.getElementById("resetKuforBtn");
    const repackBtn = document.getElementById("repackBtn");
    const downloadPrizeBtn = document.getElementById("downloadPrizeBtn");
    const italianWordsList = document.getElementById("italianWordsList");
    const translationWordsList = document.getElementById("translationWordsList");
    const wordsMessage = document.getElementById("wordsMessage");
    const wordsContinueBtn = document.getElementById("wordsContinueBtn");

    const guestNameInput = document.getElementById("guestName");
    const guestCountrySelect = document.getElementById("guestCountry");

    const storyImage = document.getElementById("storyImage");
    const storyText = document.getElementById("storyText");
    const storyNextBtn = document.getElementById("storyNextBtn") || document.getElementById("storyĎalejBtn");

    const packingItems = document.getElementById("packingItems");
    const suitcaseGrid = document.getElementById("suitcaseGrid");
    const suitcaseCount = document.getElementById("suitcaseCount");

    const roadCanvas = document.getElementById("roadCanvas");
    const roadCtx = roadCanvas.getContext("2d");
    const roadProgressText = document.getElementById("roadProgressText") || document.getElementById("roadPostupText");
    const roadHitsText = document.getElementById("roadHitsText");
    const startRoadBtn = document.getElementById("startRoadBtn");
    const roadUpBtn = document.getElementById("roadUpBtn");
    const roadDownBtn = document.getElementById("roadDownBtn");

    const securityMessage = document.getElementById("securityMessage");
    const scannerSuitcase = document.getElementById("scannerSuitcase") || document.getElementById("scannerKufor");
    const scannerLight = document.getElementById("scannerLight");
    const securityRetryWrap = document.getElementById("securityRetryWrap");

    const finalPersonalText = document.getElementById("finalPersonalText");

    const roadEndOverlay = document.getElementById("roadEndOverlay");
    const roadEndTitle = document.getElementById("roadEndTitle");
    const roadEndHits = document.getElementById("roadEndHits");
    const roadEndBtn = document.getElementById("roadEndBtn");

    const stepIndicators = [
        document.getElementById("stepIndicator1"),
        document.getElementById("stepIndicator2"),
        document.getElementById("stepIndicator3"),
        document.getElementById("stepIndicator4"),
        document.getElementById("stepIndicator5")
    ];

    const langButtons = document.querySelectorAll("[data-lang]");

    const TEXTS = {
        sk: {
            buttons: {
                beginJourney: "Začať cestu",
                finishPacking: "Dokončiť balenie",
                resetSuitcase: "Vyprázdniť kufor",
                repack: "Prebaliť kufor",
                downloadPrize: "Stiahnuť odmenu",
                next: "Ďalej",
                continue: "Pokračovať",
                start: "Štart"
            },
            form: {
                guestNamePlaceholder: "Zadaj svoje meno"
            },
            alerts: {
                enterName: "Najprv zadaj svoje meno.",
                packItems: "Najprv vlož do kufra 8 vecí."
            },
            story: {
                journeyStart: (name) => `${name}, tvoja cesta sa začína tu.`,
                packing: "Pred odchodom na svadbu si musíš starostlivo zbaliť kufor.",
                traffic: "Si na ceste. Vyhni sa zápche a doraz na letisko včas.",
                airport1: "Dorazil/a si na letisko.",
                airport2: "Vo vnútri terminálu začína byť cesta veľmi reálna.",
                airport3: "Teraz musí tvoj kufor prejsť bezpečnostnou kontrolou.",
                securityProgress: "Prebieha bezpečnostná kontrola...",
                securityFail: "V kufri je niečo zakázané. Musíš sa prebaliť.",
                securityOk: "Všetko je v poriadku. Môžeš nastúpiť do lietadla.",
                final1: (name) => `${name} je konečne na palube.`,
                final2: "Lietadlo sa pripravuje na odlet.",
                final3: "Cesta pokračuje oblohou.",
                final4: "Bezpečne si pristál/a.",
                final5: "Na hostí už čaká autobus.",
                final6: "Začína posledná časť cesty.",
                final7: (name) => `${name}, zvládol/a si to. Tvoja výhra je tanec s novomanželmi!`,
                welcome: (name) => `${name}, vitaj v Rimini.`
            },
            items: {
                water: "Voda",
                suit: "Svadobné oblečenie",
                gift: "Darček",
                food: "Jedlo",
                hygiene: "Hygiena",
                cosmetics: "Kozmetika",
                clothes: "Náhradné oblečenie",
                phone: "Telefón",
                passport: "Pas",
                keys: "Kľúče",
                danger: "Podozrivý predmet"
            },
            ui: {
                "game.kicker": "Interaktívna svadobná cesta",
                "game.title": "Cesta do Rimini",
                "game.subtitle": "Zbaľ kufor, zvládni cestu a doraz na svadbu.",
                "game.nameLabel": "Tvoje meno",
                "game.countryLabel": "Odkiaľ cestuješ",
                "country.sk": "Slovensko",
                "country.lu": "Luxembursko",
                "country.it": "Taliansko",
                "game.introText": "Pred odchodom na svadbu si najprv priprav kufor.",
                "game.begin": "Začať cestu",
                "game.packTitle": "Zbaľ kufor",
                "game.packText": "Klikni na veci, ktoré chceš vložiť do kufra. Vyberaj opatrne, nie všetko prejde kontrolou.",
                "game.suitcase": "Kufor",
                "game.reset": "Vyprázdniť",
                "game.finishPacking": "Pokračovať",
                "game.progress": "Cesta",
                "game.delays": "Nárazy",
                "game.swipeHint": "Na mobile použi tlačidlá alebo potiahni po ceste hore/dole.",
                "game.roadHelp": "Na počítači použi šípky ↑ ↓ a vyhni sa premávke.",
                "game.securityTitle": "Bezpečnostná kontrola",
                "game.repack": "Prebaliť kufor",
                "game.finalTitle": "Zvládol/a si to",
                "game.rewardText": "Tvoja výhra: tanec s novomanželmi",
                "game.downloadPrize": "Stiahnuť odmenu",
                "game.backSite": "Späť na stránku",
                "step.pack": "1. Kufor",
                "step.travel": "2. Cesta",
                "step.airport": "3. Letisko",
                "step.words": "4. Slovíčka",
                "step.arrival": "5. Príchod",
                "words.title": "Talianske slovíčka",
                "words.text": "Spoj talianske slovíčka so správnym slovenským prekladom.",
                "words.italian": "Taliansky",
                "words.translation": "Slovensky",
                "words.continue": "Pokračovať"
            },
            prize: {
                lang: "sk",
                title: "Svadobný cestovný pas",
                kicker: "Odmena",
                reward: "Tanec s novomanželmi",
                destination: "Destinácia: Rimini",
                footer: "Tešíme sa na oslavu"
            }
        },

        en: {
            buttons: {
                beginJourney: "Start journey",
                finishPacking: "Finish packing",
                resetSuitcase: "Reset suitcase",
                repack: "Repack suitcase",
                downloadPrize: "Download reward",
                next: "Next",
                continue: "Continue",
                start: "Start"
            },
            form: {
                guestNamePlaceholder: "Enter your name"
            },
            alerts: {
                enterName: "Enter your name first.",
                packItems: "Put 8 items into the suitcase first."
            },
            story: {
                journeyStart: (name) => `${name}, your journey begins from here.`,
                packing: "Before leaving for the wedding, you need to pack your suitcase carefully.",
                traffic: "You are on the way now. Try to avoid traffic and arrive at the airport in time.",
                airport1: "You arrived at the airport.",
                airport2: "Inside the terminal, the journey feels very real now.",
                airport3: "Now your suitcase has to pass the security check.",
                securityProgress: "Security check in progress...",
                securityFail: "There is something forbidden in your suitcase. You need to repack.",
                securityOk: "Everything is fine. You can board the plane.",
                final1: (name) => `${name} is finally on board.`,
                final2: "The plane is getting ready to take off.",
                final3: "The journey continues through the sky.",
                final4: "You have landed safely.",
                final5: "A bus is waiting for the guests.",
                final6: "The final part of the journey begins.",
                final7: (name) => `${name}, you made it. Your prize: a dance with the newlyweds.`,
                welcome: (name) => `${name}, welcome to Rimini.`
            },
            items: {
                water: "Water",
                suit: "Wedding outfit",
                gift: "Gift",
                food: "Food",
                hygiene: "Hygiene",
                cosmetics: "Cosmetics",
                clothes: "Extra clothes",
                phone: "Phone",
                passport: "Passport",
                keys: "Keys",
                danger: "Suspicious item"
            },
            ui: {
                "game.kicker": "Interactive Wedding Journey",
                "game.title": "Journey to Rimini",
                "game.subtitle": "Pack wisely, travel safely and arrive at the wedding.",
                "game.nameLabel": "Your name",
                "game.countryLabel": "Where you travel from",
                "country.sk": "Slovakia",
                "country.lu": "Luxembourg",
                "country.it": "Italy",
                "game.introText": "Before leaving for the wedding, prepare your suitcase first.",
                "game.begin": "Start journey",
                "game.packTitle": "Pack your suitcase",
                "game.packText": "Click the items you want to pack. Choose carefully, not everything will pass security.",
                "game.suitcase": "Suitcase",
                "game.reset": "Reset",
                "game.finishPacking": "Continue",
                "game.progress": "Journey",
                "game.delays": "Hits",
                "game.swipeHint": "On mobile, use the buttons or swipe up/down on the road.",
                "game.roadHelp": "On desktop, use ↑ ↓ arrow keys and avoid traffic.",
                "game.securityTitle": "Airport security",
                "game.repack": "Repack suitcase",
                "game.finalTitle": "You made it",
                "game.rewardText": "Your prize: a dance with the newlyweds",
                "game.downloadPrize": "Download reward",
                "game.backSite": "Back to website",
                "step.pack": "1. Pack",
                "step.travel": "2. Travel",
                "step.airport": "3. Airport",
                "step.words": "4. Words",
                "step.arrival": "5. Arrival",
                "words.title": "Italian word match",
                "words.text": "Match the Italian words with the correct English translations.",
                "words.italian": "Italian",
                "words.translation": "English",
                "words.continue": "Continue"
            },
            prize: {
                lang: "en",
                title: "Wedding Journey Pass",
                kicker: "Reward",
                reward: "A dance with the newlyweds",
                destination: "Destination: Rimini",
                footer: "See you at the celebration"
            }
        },

        it: {
            buttons: {
                beginJourney: "Inizia il viaggio",
                finishPacking: "Finisci di preparare",
                resetSuitcase: "Svuota la valigia",
                repack: "Rifai la valigia",
                downloadPrize: "Scarica il premio",
                next: "Avanti",
                continue: "Continua",
                start: "Start"
            },
            form: {
                guestNamePlaceholder: "Inserisci il tuo nome"
            },
            alerts: {
                enterName: "Inserisci prima il tuo nome.",
                packItems: "Metti prima 8 oggetti nella valigia."
            },
            story: {
                journeyStart: (name) => `${name}, il tuo viaggio inizia qui.`,
                packing: "Prima di partire per il matrimonio, devi preparare con cura la valigia.",
                traffic: "Sei in viaggio. Evita il traffico e arriva in aeroporto in tempo.",
                airport1: "Sei arrivato/a in aeroporto.",
                airport2: "Dentro il terminal il viaggio sembra ormai reale.",
                airport3: "Ora la tua valigia deve passare il controllo di sicurezza.",
                securityProgress: "Controllo di sicurezza in corso...",
                securityFail: "C'è qualcosa di vietato nella valigia. Devi rifarla.",
                securityOk: "Va tutto bene. Puoi salire a bordo.",
                final1: (name) => `${name} è finalmente a bordo.`,
                final2: "L'aereo si prepara al decollo.",
                final3: "Il viaggio continua nel cielo.",
                final4: "Sei atterrato/a in sicurezza.",
                final5: "Un autobus sta aspettando gli ospiti.",
                final6: "Inizia l'ultima parte del viaggio.",
                final7: (name) => `${name}, ce l'hai fatta. Il tuo premio: un ballo con gli sposi.`,
                welcome: (name) => `${name}, benvenuto/a a Rimini.`
            },
            items: {
                water: "Acqua",
                suit: "Abito da matrimonio",
                gift: "Regalo",
                food: "Cibo",
                hygiene: "Igiene",
                cosmetics: "Cosmetici",
                clothes: "Vestiti extra",
                phone: "Telefono",
                passport: "Passaporto",
                keys: "Chiavi",
                danger: "Oggetto sospetto"
            },
            ui: {
                "game.kicker": "Viaggio interattivo di nozze",
                "game.title": "Viaggio a Rimini",
                "game.subtitle": "Prepara la valigia, viaggia sicuro e arriva al matrimonio.",
                "game.nameLabel": "Il tuo nome",
                "game.countryLabel": "Da dove parti",
                "country.sk": "Slovacchia",
                "country.lu": "Lussemburgo",
                "country.it": "Italia",
                "game.introText": "Prima di partire per il matrimonio, prepara la valigia.",
                "game.begin": "Inizia il viaggio",
                "game.packTitle": "Prepara la valigia",
                "game.packText": "Clicca sugli oggetti che vuoi mettere in valigia. Scegli con attenzione, non tutto passa il controllo.",
                "game.suitcase": "Valigia",
                "game.reset": "Svuota",
                "game.finishPacking": "Continua",
                "game.progress": "Viaggio",
                "game.delays": "Urti",
                "game.swipeHint": "Su mobile usa i pulsanti o scorri su/giù sulla strada.",
                "game.roadHelp": "Su computer usa le frecce ↑ ↓ ed evita il traffico.",
                "game.securityTitle": "Controllo di sicurezza",
                "game.repack": "Rifai la valigia",
                "game.finalTitle": "Ce l'hai fatta",
                "game.rewardText": "Il tuo premio: un ballo con gli sposi",
                "game.downloadPrize": "Scarica il premio",
                "game.backSite": "Torna al sito",
                "step.pack": "1. Valigia",
                "step.travel": "2. Viaggio",
                "step.airport": "3. Aeroporto",
                "step.words": "4. Sfida",
                "step.arrival": "5. Arrivo",
                "words.title": "Sfida del matrimonio",
                "words.text": "Abbina ogni simbolo alla parte giusta del viaggio verso la festa.",
                "words.italian": "Simbolo",
                "words.translation": "Significato",
                "words.continue": "Continua"
            },
            prize: {
                lang: "it",
                title: "Pass di viaggio del matrimonio",
                kicker: "Premio",
                reward: "Un ballo con gli sposi",
                destination: "Destinazione: Rimini",
                footer: "Ci vediamo alla festa"
            }
        }
    };

    let currentLang = getInitialLanguage();
    let playerName = "";
    let playerCountry = "sk";
    let packedItems = [];
    let selectedItalianWord = null;
    let selectedTranslationWord = null;
    let matchedWords = new Set();
    let translationWordOrder = [];

    let currentStorySlides = [];
    let currentStoryIndex = 0;
    let storyAfterFinish = null;

    let roadAnimationId = null;
    let roadRunning = false;
    let roadProgress = 0;
    let roadHits = 0;
    let spawnTick = 0;
    let trafficCars = [];
    let laneMarkers = [];
    let keys = { ArrowUp: false, ArrowDown: false };

    let roadResult = "success";

    const MAX_ITEMS = 8;
    const MAX_HITS = 3;
    const suitcaseBadItems = ["water", "food", "danger"];

    const packingData = [
        { id: "water", icon: "💧" },
        { id: "suit", icon: "👔" },
        { id: "gift", icon: "🎁" },
        { id: "food", icon: "🍎" },
        { id: "hygiene", icon: "🪥" },
        { id: "cosmetics", icon: "💄" },
        { id: "clothes", icon: "👕" },
        { id: "phone", icon: "📱" },
        { id: "passport", icon: "🛂" },
        { id: "keys", icon: "🔑" },
        { id: "danger", icon: "❗" }
    ];

    const italianWordPairs = [
        { id: "ciao", it: "Ciao", sk: "Ahoj", en: "Hello" },
        { id: "grazie", it: "Grazie", sk: "Ďakujem", en: "Thank you" },
        { id: "prego", it: "Prego", sk: "Prosím", en: "You are welcome" },
        { id: "mare", it: "Mare", sk: "More", en: "Sea" },
        { id: "amore", it: "Amore", sk: "Láska", en: "Love" }
    ];

    const italianWeddingPairs = [
        { id: "suitcase", it: "🧳 Valigia", sk: "Partenza", en: "Start of the trip" },
        { id: "plane", it: "✈️ Aereo", sk: "Viaggio", en: "Journey" },
        { id: "church", it: "⛪ Chiesa", sk: "Cerimonia", en: "Ceremony" },
        { id: "cake", it: "🍰 Torta", sk: "Festa", en: "Celebration" },
        { id: "dance", it: "💃 Ballo", sk: "Premio", en: "Prize" }
    ];

    const playerBus = {
        x: 180,
        lane: 1,
        width: 120,
        height: 70
    };

    const lanes = [120, 220, 320];

    function getInitialLanguage() {
        const fromStorage =
            localStorage.getItem("selectedLang") ||
            localStorage.getItem("lang") ||
            localStorage.getItem("language");

        if (fromStorage && TEXTS[fromStorage]) return fromStorage;

        const htmlLang = document.documentElement.lang?.toLowerCase();
        if (htmlLang && TEXTS[htmlLang]) return htmlLang;

        return "en";
    }

    function saveLanguage(lang) {
        localStorage.setItem("selectedLang", lang);
        localStorage.setItem("lang", lang);
        localStorage.setItem("language", lang);
    }

    function t(section, key) {
        return TEXTS[currentLang]?.[section]?.[key] ?? "";
    }

    function getItemLabel(itemId) {
        return TEXTS[currentLang]?.items?.[itemId] ?? itemId;
    }

    function showScreen(screen) {
        [introScreen, storyScreen, packingScreen, roadScreen, securityScreen, italianWordsScreen, finalScreen].forEach((el) => {
            if (el) el.classList.add("hidden");
        });
        screen.classList.remove("hidden");
    }

    function setStep(index) {
        stepIndicators.forEach((step, i) => {
            if (!step) return;
            step.classList.toggle("active", i <= index);
            step.classList.toggle("current", i === index);
        });
    }

    function startStory(slides, onFinish) {
        currentStorySlides = slides;
        currentStoryIndex = 0;
        storyAfterFinish = onFinish;
        showScreen(storyScreen);
        renderStorySlide();
    }

    function renderStorySlide() {
        const slide = currentStorySlides[currentStoryIndex];
        setStoryImage(slide.image);
        storyText.textContent = slide.text;
        storyNextBtn.textContent =
            currentStoryIndex === currentStorySlides.length - 1
                ? t("buttons", "continue")
                : t("buttons", "next");
    }

    function nextStorySlide() {
        if (currentStoryIndex < currentStorySlides.length - 1) {
            currentStoryIndex += 1;
            renderStorySlide();
            return;
        }

        if (typeof storyAfterFinish === "function") {
            storyAfterFinish();
        }
    }

    function renderPackingItems() {
        packingItems.innerHTML = "";
        suitcaseGrid.innerHTML = "";

        packingData.forEach((item) => {
            const tile = document.createElement("button");
            tile.type = "button";
            tile.className = "pack-item";
            tile.dataset.id = item.id;
            tile.innerHTML = `
                <div class="pack-item-image-wrap">
                    <span class="pack-item-emoji">${item.icon}</span>
                </div>
                <span class="pack-item-label">${getItemLabel(item.id)}</span>
            `;
            tile.addEventListener("click", () => addToSuitcase(item.id));
            packingItems.appendChild(tile);
        });

        for (let i = 0; i < MAX_ITEMS; i++) {
            const slot = document.createElement("div");
            slot.className = "suitcase-slot";
            suitcaseGrid.appendChild(slot);
        }

        updateSuitcaseUI();
    }

    function updateSuitcaseUI() {
        const slots = suitcaseGrid.querySelectorAll(".suitcase-slot");

        slots.forEach((slot, index) => {
            slot.innerHTML = "";
            const itemId = packedItems[index];
            if (!itemId) return;

            const item = packingData.find((x) => x.id === itemId);
            if (!item) return;

            const div = document.createElement("button");
            div.type = "button";
            div.className = "suitcase-item";
            div.title = getItemLabel(item.id);
            div.setAttribute("aria-label", getItemLabel(item.id));
            div.innerHTML = `<span class="suitcase-item-emoji">${item.icon}</span>`;
            div.addEventListener("click", () => removeFromSuitcase(index));
            slot.appendChild(div);
        });

        suitcaseCount.textContent = `${packedItems.length} / ${MAX_ITEMS}`;

        packingItems.querySelectorAll(".pack-item").forEach((btn) => {
            const id = btn.dataset.id;
            const used = packedItems.includes(id);
            btn.disabled = used;
            btn.classList.toggle("used", used);

            const label = btn.querySelector(".pack-item-label");
            if (label) label.textContent = getItemLabel(id);
        });
    }

    function addToSuitcase(itemId) {
        if (packedItems.length >= MAX_ITEMS) return;
        if (packedItems.includes(itemId)) return;
        packedItems.push(itemId);
        updateSuitcaseUI();
    }

    function removeFromSuitcase(index) {
        packedItems.splice(index, 1);
        updateSuitcaseUI();
    }

    function resetSuitcase() {
        packedItems = [];
        updateSuitcaseUI();
    }

    function openPackingScreen() {
        showScreen(packingScreen);
        setStep(0);
    }

    function beginJourney() {
        playerName = guestNameInput.value.trim();
        playerCountry = guestCountrySelect?.value || "sk";

        if (!playerName) {
            alert(t("alerts", "enterName"));
            return;
        }

        startStory(
            [
                {
                    image: SCENES.countries[playerCountry],
                    text: TEXTS[currentLang].story.journeyStart(playerName)
                },
                {
                    image: SCENES.room,
                    text: TEXTS[currentLang].story.packing
                }
            ],
            openPackingScreen
        );
    }

    function finishPacking() {
        if (packedItems.length < MAX_ITEMS) {
            alert(t("alerts", "packItems"));
            return;
        }

        setStep(1);

        startStory(
            [
                {
                    image: SCENES.zapcha,
                    text: TEXTS[currentLang].story.traffic
                }
            ],
            startRoadLevel
        );
    }

    function startRoadLevel() {
        roadEndOverlay.classList.add("hidden");
        showScreen(roadScreen);
        setStep(1);

        roadRunning = false;
        roadProgress = 0;
        roadHits = 0;
        spawnTick = 0;
        trafficCars = [];
        laneMarkers = Array.from({ length: 14 }, (_, i) => ({ x: i * 100 }));
        playerBus.lane = 1;

        roadHitsText.textContent = "0";
        roadProgressText.textContent = "0%";
        startRoadBtn.textContent = t("buttons", "start");
        startRoadBtn.classList.remove("hidden");

        if (roadAnimationId) cancelAnimationFrame(roadAnimationId);
        drawRoad();
    }

    function roadLoop() {
        if (!roadRunning) return;

        updateRoad();
        drawRoad();

        if (roadProgress >= 100) {
            roadRunning = false;
            cancelAnimationFrame(roadAnimationId);

            roadResult = "success";
            roadEndOverlay.classList.remove("hidden");

            const winTexts = {
                sk: { title: "Výborne!", hits: (n) => `Nabúral/a si ${n}×. Pokračuješ na letisko!`, btn: "Pokračovať" },
                en: { title: "Well done!", hits: (n) => `You hit ${n} car(s). On to the airport!`, btn: "Continue" },
                it: { title: "Ottimo!", hits: (n) => `Hai urtato ${n} macchina/e. All'aeroporto!`, btn: "Continua" }
            };
            const wt = winTexts[currentLang] || winTexts.en;
            roadEndTitle.textContent = wt.title;
            roadEndHits.textContent = wt.hits(roadHits);
            roadEndBtn.textContent = wt.btn;

            return;
        }

        roadAnimationId = requestAnimationFrame(roadLoop);
    }

   function updateRoad() {
        if (keys.ArrowUp && playerBus.lane > 0) {
            playerBus.lane -= 1;
            keys.ArrowUp = false;
        }

        if (keys.ArrowDown && playerBus.lane < lanes.length - 1) {
            playerBus.lane += 1;
            keys.ArrowDown = false;
        }

        laneMarkers.forEach((mark) => {
            mark.x -= 8;
            if (mark.x < -80) mark.x = roadCanvas.width + 80;
        });

        spawnTick += 1;
        if (spawnTick > 38) {
            spawnTick = 0;
            const lane = Math.floor(Math.random() * 3);
            trafficCars.push({
                x: roadCanvas.width + 60,
                y: lanes[lane],
                width: 100,
                height: 58,
                speed: 7 + Math.random() * 2,
                color: ["#a36f5e", "#7f8fa2", "#9d8772"][Math.floor(Math.random() * 3)]
            });
        }

        trafficCars.forEach((car) => {
            car.x -= car.speed;
        });

        trafficCars = trafficCars.filter((car) => car.x + car.width > -60);

        const playerY = lanes[playerBus.lane];

        for (const car of trafficCars) {
            const hit =
                playerBus.x < car.x + car.width &&
                playerBus.x + playerBus.width > car.x &&
                playerY < car.y + car.height &&
                playerY + playerBus.height > car.y;

            if (hit) {
                roadHits += 1;
                roadHitsText.textContent = String(roadHits);
                car.x = -999;

                if (roadHits >= MAX_HITS) {
                    roadRunning = false;
                    cancelAnimationFrame(roadAnimationId);

                    roadResult = "fail";
                    roadEndOverlay.classList.remove("hidden");

                    const failTexts = {
                        sk: { title: "Ups!", hits: "Nabúral/a si 3×. Musíš začať odznova.", btn: "Skúsiť znova" },
                        en: { title: "Oops!", hits: "You hit 3 cars. Try again from the start.", btn: "Try again" },
                        it: { title: "Oops!", hits: "Hai urtato 3 macchine. Ricomincia dall'inizio.", btn: "Riprova" }
                    };
                    const ft = failTexts[currentLang] || failTexts.en;
                    roadEndTitle.textContent = ft.title;
                    roadEndHits.textContent = ft.hits;
                    roadEndBtn.textContent = ft.btn;

                    return;
                }
            }
        }

        roadProgress += 0.05 + roadProgress * 0.002;
        roadProgressText.textContent = `${Math.min(100, Math.floor(roadProgress))}%`;
    }

    function drawRoundedRect(ctx, x, y, width, height, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }

    function drawRoad() {
        roadCtx.clearRect(0, 0, roadCanvas.width, roadCanvas.height);

        const sky = roadCtx.createLinearGradient(0, 0, 0, roadCanvas.height);
        sky.addColorStop(0, "#e7edf3");
        sky.addColorStop(1, "#f8f2ea");
        roadCtx.fillStyle = sky;
        roadCtx.fillRect(0, 0, roadCanvas.width, roadCanvas.height);

        roadCtx.fillStyle = "#d2debf";
        roadCtx.fillRect(0, 0, roadCanvas.width, 90);
        roadCtx.fillRect(0, roadCanvas.height - 90, roadCanvas.width, 90);

        roadCtx.fillStyle = "#70757b";
        roadCtx.fillRect(0, 90, roadCanvas.width, roadCanvas.height - 180);

        roadCtx.strokeStyle = "rgba(255,255,255,0.9)";
        roadCtx.lineWidth = 4;
        roadCtx.setLineDash([35, 24]);

        laneMarkers.forEach((mark) => {
            roadCtx.beginPath();
            roadCtx.moveTo(mark.x, 195);
            roadCtx.lineTo(mark.x + 60, 195);
            roadCtx.stroke();

            roadCtx.beginPath();
            roadCtx.moveTo(mark.x, 295);
            roadCtx.lineTo(mark.x + 60, 295);
            roadCtx.stroke();
        });

        roadCtx.setLineDash([]);

        trafficCars.forEach((car) => {
            drawRoundedRect(roadCtx, car.x, car.y, car.width, car.height, 12, car.color);
            roadCtx.fillStyle = "rgba(255,255,255,0.75)";
            roadCtx.fillRect(car.x + 12, car.y + 10, 24, 12);

            roadCtx.fillStyle = "#1f1f1f";
            roadCtx.beginPath();
            roadCtx.arc(car.x + 18, car.y + car.height, 7, 0, Math.PI * 2);
            roadCtx.arc(car.x + car.width - 18, car.y + car.height, 7, 0, Math.PI * 2);
            roadCtx.fill();
        });

        const playerY = lanes[playerBus.lane];
        drawRoundedRect(roadCtx, playerBus.x, playerY, playerBus.width, playerBus.height, 16, "#59718e");
        roadCtx.fillStyle = "rgba(255,255,255,0.82)";
        roadCtx.fillRect(playerBus.x + 14, playerY + 10, 30, 14);
        roadCtx.fillRect(playerBus.x + 52, playerY + 10, 30, 14);

        roadCtx.fillStyle = "#1f1f1f";
        roadCtx.beginPath();
        roadCtx.arc(playerBus.x + 22, playerY + playerBus.height, 8, 0, Math.PI * 2);
        roadCtx.arc(playerBus.x + playerBus.width - 22, playerY + playerBus.height, 8, 0, Math.PI * 2);
        roadCtx.fill();
    }

    function startAirportStory() {
        startStory(
            [
                {
                    image: SCENES.airports[playerCountry],
                    text: TEXTS[currentLang].story.airport1
                },
                {
                    image: SCENES.airportInside,
                    text: TEXTS[currentLang].story.airport2
                },
                {
                    image: SCENES.checkin,
                    text: TEXTS[currentLang].story.airport3
                }
            ],
            startSecurityScreen
        );
    }

    function startSecurityScreen() {
        showScreen(securityScreen);
        setStep(2);

        securityRetryWrap.classList.add("hidden");
        scannerSuitcase.classList.remove("move");
        scannerLight.classList.remove("ok", "fail");
        securityMessage.textContent = TEXTS[currentLang].story.securityProgress;

        setTimeout(() => {
            scannerSuitcase.classList.add("move");
        }, 300);

        setTimeout(() => {
            const hasBad = packedItems.some((item) => suitcaseBadItems.includes(item));

            if (hasBad) {
                scannerLight.classList.add("fail");
                securityMessage.textContent = TEXTS[currentLang].story.securityFail;
                securityRetryWrap.classList.remove("hidden");
            } else {
                scannerLight.classList.add("ok");
                securityMessage.textContent = TEXTS[currentLang].story.securityOk;

                setTimeout(() => {
                    startItalianWordsGame();
                }, 1200);
            }
        }, 1800);
    }


    function getCurrentWordPairs() {
        return currentLang === "it" ? italianWeddingPairs : italianWordPairs;
    }

    function getWordTranslation(pair) {
        if (currentLang === "sk") return pair.sk;
        if (currentLang === "it") return pair.sk;
        return pair.en;
    }

    function shuffleArray(array) {
        return array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    function startItalianWordsGame() {
        showScreen(italianWordsScreen);
        setStep(3);
        selectedItalianWord = null;
        selectedTranslationWord = null;
        matchedWords = new Set();
        translationWordOrder = shuffleArray(getCurrentWordPairs());
        renderItalianWordsGame();
    }

    function renderItalianWordsGame() {
        if (!italianWordsList || !translationWordsList) return;

        italianWordsList.innerHTML = "";
        translationWordsList.innerHTML = "";

        const currentPairs = getCurrentWordPairs();

        if (!translationWordOrder.length) {
            translationWordOrder = shuffleArray(currentPairs);
        }

        currentPairs.forEach((pair) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "word-choice";
            btn.dataset.id = pair.id;
            btn.textContent = pair.it;
            btn.disabled = matchedWords.has(pair.id);
            btn.classList.toggle("matched", matchedWords.has(pair.id));
            btn.classList.toggle("selected", selectedItalianWord === pair.id);
            btn.addEventListener("click", () => chooseItalianWord(pair.id));
            italianWordsList.appendChild(btn);
        });

        translationWordOrder.forEach((pair) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "word-choice";
            btn.dataset.id = pair.id;
            btn.textContent = getWordTranslation(pair);
            btn.disabled = matchedWords.has(pair.id);
            btn.classList.toggle("matched", matchedWords.has(pair.id));
            btn.classList.toggle("selected", selectedTranslationWord === pair.id);
            btn.addEventListener("click", () => chooseTranslationWord(pair.id));
            translationWordsList.appendChild(btn);
        });

        updateWordsMessage();
    }

    function chooseItalianWord(id) {
        if (matchedWords.has(id)) return;
        selectedItalianWord = id;
        checkSelectedWords();
        renderItalianWordsGame();
    }

    function chooseTranslationWord(id) {
        if (matchedWords.has(id)) return;
        selectedTranslationWord = id;
        checkSelectedWords();
        renderItalianWordsGame();
    }

    function checkSelectedWords() {
        if (!selectedItalianWord || !selectedTranslationWord) return;

        if (selectedItalianWord === selectedTranslationWord) {
            matchedWords.add(selectedItalianWord);
        }

        selectedItalianWord = null;
        selectedTranslationWord = null;
    }

    function updateWordsMessage() {
        if (!wordsMessage || !wordsContinueBtn) return;

        const messages = {
            sk: {
                progress: (n, total) => `Správne spojené: ${n} / ${total}`,
                done: "Výborne, všetky slovíčka sú správne."
            },
            en: {
                progress: (n, total) => `Correct matches: ${n} / ${total}`,
                done: "Great, all words are matched."
            },
            it: {
                progress: (n, total) => `Abbinamenti corretti: ${n} / ${total}`,
                done: "Perfetto, sfida completata."
            }
        };

        const dict = messages[currentLang] || messages.en;
        const total = getCurrentWordPairs().length;
        const done = matchedWords.size === total;
        wordsMessage.textContent = done ? dict.done : dict.progress(matchedWords.size, total);
        wordsContinueBtn.disabled = !done;
    }

    function startFinalStory() {
        startStory(
            [
                {
                    image: SCENES.airplaneInside,
                    text: TEXTS[currentLang].story.final1(playerName)
                },
                {
                    image: SCENES.airplaneStart,
                    text: TEXTS[currentLang].story.final2
                },
                {
                    image: SCENES.airplaneFly,
                    text: TEXTS[currentLang].story.final3
                },
                {
                    image: SCENES.airplaneFinish,
                    text: TEXTS[currentLang].story.final4
                },
                {
                    image: SCENES.bus,
                    text: TEXTS[currentLang].story.final5
                },
                {
                    image: SCENES.busFinish,
                    text: TEXTS[currentLang].story.final6
                },
                {
                    image: SCENES.couple,
                    text: TEXTS[currentLang].story.final7(playerName)
                }
            ],
            openFinalScreen
        );
    }

    function openFinalScreen() {
        showScreen(finalScreen);
        setStep(4);
        finalPersonalText.textContent = TEXTS[currentLang].story.welcome(playerName);
    }

    function downloadPrize() {
        const prizeWindow = window.open("", "_blank");
        if (!prizeWindow) return;

        const prize = TEXTS[currentLang].prize;
        const safeName = String(playerName || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#039;");

        prizeWindow.document.write(`
            <!DOCTYPE html>
            <html lang="${prize.lang}">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${prize.title}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&family=Inter:wght@600;700;800&display=swap" rel="stylesheet">
                <style>
                    * { box-sizing: border-box; }

                    html, body {
                        margin: 0;
                        width: 100%;
                        min-height: 100%;
                        font-family: "Cormorant Garamond", Georgia, serif;
                        color: #fffaf2;
                        background: #211f1a;
                    }

                    body {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 28px;
                    }

                    .page {
                        width: min(1120px, 100%);
                        min-height: 660px;
                        position: relative;
                        overflow: hidden;
                        border-radius: 34px;
                        box-shadow: 0 26px 70px rgba(41, 32, 22, .28);
                        border: 1px solid rgba(255, 252, 246, .28);
                    }

                    .bg-photo {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        z-index: 0;
                    }

                    .shade {
                        position: absolute;
                        inset: 0;
                        z-index: 1;
                        background:
                            linear-gradient(180deg, rgba(19, 22, 16, .46), rgba(19, 22, 16, .62)),
                            radial-gradient(ellipse at 50% 28%, rgba(255, 252, 246, .26), transparent 60%);
                    }

                    .certificate {
                        position: absolute;
                        inset: 42px;
                        z-index: 2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        padding: 58px 72px;
                        border: 1px solid rgba(255, 252, 246, .42);
                        border-radius: 28px;
                        background: rgba(255, 252, 246, .13);
                        backdrop-filter: blur(4px);
                        -webkit-backdrop-filter: blur(4px);
                    }

                    .certificate::before {
                        content: "";
                        position: absolute;
                        inset: 16px;
                        border: 1px solid rgba(255, 252, 246, .25);
                        border-radius: 20px;
                        pointer-events: none;
                    }

                    .inner {
                        position: relative;
                        z-index: 3;
                        max-width: 760px;
                    }

                    .kicker {
                        margin: 0 0 16px;
                        font-family: "Inter", Arial, sans-serif;
                        font-size: 13px;
                        font-weight: 800;
                        letter-spacing: .30em;
                        text-transform: uppercase;
                        color: #f3d08e;
                    }

                    .brand {
                        margin: 0 0 18px;
                        font-size: 28px;
                        font-weight: 600;
                        letter-spacing: .10em;
                        color: rgba(255, 250, 242, .92);
                    }

                    .brand span,
                    .divider span {
                        color: #f3d08e;
                    }

                    h1 {
                        margin: 0;
                        font-size: clamp(46px, 6vw, 74px);
                        font-weight: 600;
                        line-height: 1.04;
                        letter-spacing: .015em;
                        color: #fffaf2;
                        text-shadow: 0 4px 20px rgba(0,0,0,.32);
                    }

                    .divider {
                        width: 180px;
                        height: 22px;
                        margin: 26px auto 18px;
                        position: relative;
                    }

                    .divider::before,
                    .divider::after {
                        content: "";
                        position: absolute;
                        top: 11px;
                        width: 72px;
                        height: 1px;
                        background: rgba(243, 208, 142, .76);
                    }

                    .divider::before { left: 0; }
                    .divider::after { right: 0; }

                    .divider span {
                        display: inline-block;
                        font-size: 18px;
                        line-height: 22px;
                    }

                    .name {
                        margin: 6px 0 20px;
                        font-family: "Great Vibes", cursive;
                        font-size: clamp(50px, 6.5vw, 82px);
                        color: #fffaf2;
                        line-height: 1.02;
                        text-shadow: 0 4px 22px rgba(0,0,0,.34);
                    }

                    .destination {
                        margin: 0 auto 12px;
                        font-size: 28px;
                        color: rgba(255, 250, 242, .92);
                    }

                    .reward {
                        display: inline-block;
                        margin: 18px 0 8px;
                        padding: 14px 32px;
                        border: 1px solid rgba(243, 208, 142, .62);
                        border-radius: 999px;
                        background: rgba(255, 252, 246, .16);
                        font-family: "Inter", Arial, sans-serif;
                        font-size: 14px;
                        font-weight: 800;
                        letter-spacing: .14em;
                        text-transform: uppercase;
                        color: #fffaf2;
                    }

                    .footer {
                        margin: 26px 0 0;
                        font-size: 24px;
                        font-style: italic;
                        color: rgba(255, 250, 242, .84);
                    }

                    .date {
                        margin: 26px 0 0;
                        font-family: "Inter", Arial, sans-serif;
                        font-size: 11px;
                        font-weight: 800;
                        letter-spacing: .26em;
                        text-transform: uppercase;
                        color: #f3d08e;
                    }

                    .print-note {
                        position: fixed;
                        left: 18px;
                        bottom: 14px;
                        z-index: 5;
                        font-family: "Inter", Arial, sans-serif;
                        font-size: 11px;
                        color: rgba(255, 250, 242, .70);
                    }

                    @media print {
                        @page {
                            size: A4 landscape;
                            margin: 0;
                        }

                        html, body {
                            width: 297mm;
                            height: 210mm;
                            min-height: 210mm;
                            background: #211f1a !important;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }

                        body {
                            padding: 0;
                            display: block;
                        }

                        .page {
                            width: 297mm;
                            height: 210mm;
                            min-height: 0;
                            border-radius: 0;
                            border: none;
                            box-shadow: none;
                        }

                        .certificate {
                            inset: 13mm;
                            border-radius: 9mm;
                            padding: 18mm 25mm;
                        }

                        .certificate::before {
                            inset: 5mm;
                            border-radius: 7mm;
                        }

                        .print-note {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <main class="page">
                    <img class="bg-photo" src="images/couple.png" alt="">
                    <div class="shade"></div>
                    <section class="certificate">
                        <div class="inner">
                            <p class="kicker">${prize.kicker}</p>
                            <p class="brand">Zuzana <span>&amp;</span> Valerio</p>
                            <h1>${prize.title}</h1>
                            <div class="divider"><span>♡</span></div>
                            <div class="name">${safeName}</div>
                            <p class="destination">${prize.destination}</p>
                            <p class="reward">${prize.reward}</p>
                            <p class="footer">${prize.footer}</p>
                            <p class="date">Rimini · 19. 09. 2026</p>
                        </div>
                    </section>
                </main>
                <div class="print-note">Pri ukladaní ako PDF nechaj orientáciu na šírku.</div>
                <script>
                    window.onload = function() {
                        setTimeout(function() { window.print(); }, 350);
                    };
                <\/script>
            </body>
            </html>
        `);

        prizeWindow.document.close();
    }

    function translateGameUi() {
        const ui = TEXTS[currentLang]?.ui || {};

        document.querySelectorAll("[data-game-i18n]").forEach((el) => {
            const key = el.getAttribute("data-game-i18n");
            if (ui[key] !== undefined) {
                el.textContent = ui[key];
            }
        });
    }

    async function setStoryImage(src) {
        if (!storyImage) return;

        storyImage.classList.remove("image-missing");
        storyImage.classList.add("image-loading");
        storyImage.onerror = () => {
            storyImage.onerror = null;
            storyImage.classList.remove("image-loading");
            storyImage.classList.add("image-missing");
            storyImage.removeAttribute("src");
            storyImage.alt = "";
        };

        const result = await preloadImage(src);

        if (!result?.ok) {
            storyImage.onerror();
            return;
        }

        storyImage.src = src;
        storyImage.onload = () => storyImage.classList.remove("image-loading");
    }

    function applyLanguage(lang) {
        if (!TEXTS[lang]) return;

        currentLang = lang;
        saveLanguage(lang);
        document.documentElement.lang = lang;
        translateGameUi();

        langButtons.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.lang === lang);
        });

        if (beginJourneyBtn) beginJourneyBtn.textContent = t("buttons", "beginJourney");
        if (finishPackingBtn) finishPackingBtn.textContent = t("buttons", "finishPacking");
        if (resetSuitcaseBtn) resetSuitcaseBtn.textContent = t("buttons", "resetSuitcase");
        if (repackBtn) repackBtn.textContent = t("buttons", "repack");
        if (downloadPrizeBtn) downloadPrizeBtn.textContent = t("buttons", "downloadPrize");
        if (startRoadBtn) startRoadBtn.textContent = t("buttons", "start");

        if (guestNameInput) {
            guestNameInput.placeholder = t("form", "guestNamePlaceholder");
        }

        if (storyScreen && !storyScreen.classList.contains("hidden") && currentStorySlides.length) {
            renderStorySlide();
        }

        if (packingScreen && !packingScreen.classList.contains("hidden")) {
            renderPackingItems();
        } else {
            updateSuitcaseUI();
        }

        if (securityScreen && !securityScreen.classList.contains("hidden")) {
            if (securityRetryWrap && !securityRetryWrap.classList.contains("hidden")) {
                securityMessage.textContent = TEXTS[currentLang].story.securityFail;
            } else if (scannerLight?.classList.contains("ok")) {
                securityMessage.textContent = TEXTS[currentLang].story.securityOk;
            } else if (scannerLight?.classList.contains("fail")) {
                securityMessage.textContent = TEXTS[currentLang].story.securityFail;
            } else {
                securityMessage.textContent = TEXTS[currentLang].story.securityProgress;
            }
        }

        if (italianWordsScreen && !italianWordsScreen.classList.contains("hidden")) {
            selectedItalianWord = null;
            selectedTranslationWord = null;
            matchedWords = new Set();
            translationWordOrder = shuffleArray(getCurrentWordPairs());
            renderItalianWordsGame();
        }

        if (finalScreen && !finalScreen.classList.contains("hidden") && playerName) {
            finalPersonalText.textContent = TEXTS[currentLang].story.welcome(playerName);
        }
    }

    if (startRoadBtn) {
        startRoadBtn.addEventListener("click", () => {
            roadRunning = true;
            startRoadBtn.classList.add("hidden");

            if (roadAnimationId) cancelAnimationFrame(roadAnimationId);
            roadLoop();
        });
    }

    if (roadUpBtn) {
        roadUpBtn.addEventListener("click", () => {
            if (!roadRunning) return;
            if (playerBus.lane > 0) playerBus.lane -= 1;
        });
    }

    if (roadDownBtn) {
        roadDownBtn.addEventListener("click", () => {
            if (!roadRunning) return;
            if (playerBus.lane < lanes.length - 1) playerBus.lane += 1;
        });
    }

    // Touch swipe on canvas
    let touchStartY = null;
    roadCanvas.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
        e.preventDefault();
    }, { passive: false });

    roadCanvas.addEventListener("touchend", (e) => {
        if (touchStartY === null || !roadRunning) return;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dy) > 20) {
            if (dy < 0 && playerBus.lane > 0) playerBus.lane -= 1;
            if (dy > 0 && playerBus.lane < lanes.length - 1) playerBus.lane += 1;
        }
        touchStartY = null;
        e.preventDefault();
    }, { passive: false });
    roadEndBtn.addEventListener("click", () => {
        roadEndOverlay.classList.add("hidden");
        if (roadResult === "success") {
            startAirportStory();
        } else {
            startRoadLevel();
        }
    });

    beginJourneyBtn.addEventListener("click", beginJourney);
    storyNextBtn.addEventListener("click", nextStorySlide);
    finishPackingBtn.addEventListener("click", finishPacking);
    resetSuitcaseBtn.addEventListener("click", resetSuitcase);
    repackBtn.addEventListener("click", () => {
        scannerSuitcase.classList.remove("move");
        scannerLight.classList.remove("ok", "fail");
        openPackingScreen();
    });
    if (wordsContinueBtn) wordsContinueBtn.addEventListener("click", startFinalStory);
    downloadPrizeBtn.addEventListener("click", downloadPrize);

    document.addEventListener("keydown", (e) => {
        if (!roadRunning) return;

        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            keys[e.key] = true;
            e.preventDefault();
        }
    });

    langButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const newLang = btn.dataset.lang;
            applyLanguage(newLang);
        });
    });

    preloadGameImages();
    renderPackingItems();
    applyLanguage(currentLang);
});