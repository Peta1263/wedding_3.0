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

    const introScreen = document.getElementById("introScreen");
    const storyScreen = document.getElementById("storyScreen");
    const packingScreen = document.getElementById("packingScreen");
    const roadScreen = document.getElementById("roadScreen");
    const securityScreen = document.getElementById("securityScreen");
    const finalScreen = document.getElementById("finalScreen");

    const beginJourneyBtn = document.getElementById("beginJourneyBtn");
    const finishPackingBtn = document.getElementById("finishPackingBtn");
    const resetSuitcaseBtn = document.getElementById("resetSuitcaseBtn");
    const repackBtn = document.getElementById("repackBtn");
    const downloadPrizeBtn = document.getElementById("downloadPrizeBtn");

    const guestNameInput = document.getElementById("guestName");
    const guestCountrySelect = document.getElementById("guestCountry");

    const storyImage = document.getElementById("storyImage");
    const storyText = document.getElementById("storyText");
    const storyNextBtn = document.getElementById("storyNextBtn");

    const packingItems = document.getElementById("packingItems");
    const suitcaseGrid = document.getElementById("suitcaseGrid");
    const suitcaseCount = document.getElementById("suitcaseCount");

    const roadCanvas = document.getElementById("roadCanvas");
    const roadCtx = roadCanvas.getContext("2d");
    const roadProgressText = document.getElementById("roadProgressText");
    const roadHitsText = document.getElementById("roadHitsText");
    const startRoadBtn = document.getElementById("startRoadBtn");
    const roadUpBtn = document.getElementById("roadUpBtn");
    const roadDownBtn = document.getElementById("roadDownBtn");

    const securityMessage = document.getElementById("securityMessage");
    const scannerSuitcase = document.getElementById("scannerSuitcase");
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
        document.getElementById("stepIndicator4")
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
        [introScreen, storyScreen, packingScreen, roadScreen, securityScreen, finalScreen].forEach((el) => {
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
        storyImage.src = slide.image;
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
                    startFinalStory();
                }, 1800);
            }
        }, 1800);
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
        setStep(3);
        finalPersonalText.textContent = TEXTS[currentLang].story.welcome(playerName);
    }

    function downloadPrize() {
        const prizeWindow = window.open("", "_blank");
        if (!prizeWindow) return;

        const prize = TEXTS[currentLang].prize;

        prizeWindow.document.write(`
            <!DOCTYPE html>
            <html lang="${prize.lang}">
            <head>
                <meta charset="UTF-8">
                <title>${prize.title}</title>
                <style>
                    body {
                        margin: 0;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #f7f3ee;
                        font-family: Georgia, serif;
                        color: #2f2f2f;
                    }
                    .card {
                        width: 850px;
                        max-width: 92%;
                        background: #fff;
                        border: 1px solid #ddd2c7;
                        border-radius: 28px;
                        padding: 56px;
                        box-shadow: 0 18px 40px rgba(0,0,0,0.08);
                        text-align: center;
                    }
                    .kicker {
                        margin: 0 0 10px;
                        letter-spacing: 0.16em;
                        text-transform: uppercase;
                        color: #8a827b;
                        font-size: 14px;
                    }
                    h1 {
                        margin: 0 0 18px;
                        font-size: 52px;
                        font-weight: 500;
                    }
                    .name {
                        font-size: 38px;
                        margin: 18px 0;
                        color: #7f9788;
                        font-weight: 700;
                    }
                    .reward {
                        font-size: 28px;
                        margin: 20px 0 8px;
                    }
                    .meta {
                        font-size: 22px;
                        margin: 8px 0;
                    }
                    .footer {
                        margin-top: 30px;
                        color: #8a827b;
                        font-size: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <p class="kicker">${prize.kicker}</p>
                    <h1>${prize.title}</h1>
                    <div class="name">${playerName}</div>
                    <p class="reward">${prize.reward}</p>
                    <p class="meta">${prize.destination}</p>
                    <p class="footer">${prize.footer}</p>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                    };
                <\/script>
            </body>
            </html>
        `);

        prizeWindow.document.close();
    }

    function applyLanguage(lang) {
        if (!TEXTS[lang]) return;

        currentLang = lang;
        saveLanguage(lang);
        document.documentElement.lang = lang;

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

    renderPackingItems();
    applyLanguage(currentLang);
});